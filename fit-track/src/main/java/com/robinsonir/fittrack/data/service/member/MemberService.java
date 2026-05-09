package com.robinsonir.fittrack.data.service.member;

import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import com.robinsonir.fittrack.data.repository.member.MemberDTO;
import com.robinsonir.fittrack.data.repository.member.MemberRepository;
import com.robinsonir.fittrack.exception.DuplicateResourceException;
import com.robinsonir.fittrack.exception.FileUploadException;
import com.robinsonir.fittrack.exception.ResourceNotFoundException;
import com.robinsonir.fittrack.mappers.MemberMapper;
import com.robinsonir.fittrack.s3.S3Service;
import jakarta.transaction.Transactional;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
public class MemberService {

    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;
    private final S3Service s3Service;
    private final MemberRepository memberRepository;

    @Setter
    @Value("${s3.bucket.name}")
    private String s3Bucket;

    private static final Logger LOGGER = LoggerFactory.getLogger(MemberService.class);

    public MemberService(final MemberMapper memberMapper,
                         final PasswordEncoder passwordEncoder,
                         final S3Service s3Service,
                         final MemberRepository memberRepository) {
        this.memberMapper = memberMapper;
        this.passwordEncoder = passwordEncoder;
        this.s3Service = s3Service;
        this.memberRepository = memberRepository;
    }

    public List<MemberDTO> getAllMembers() {
        return memberMapper.memberEntityListToMemberDTOList(memberRepository.findAll());
    }


    public MemberDTO getMemberById(Long id) {
        MemberEntity memberEntity = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                            "member with ID: [%s] not found".formatted(id)
                    )
                );
        return memberMapper.memberEntityToMemberDTO(memberEntity);
    }

    @Transactional
    public MemberDTO addMember(MemberRegistrationRequest memberRegistrationRequest) {
        String email = memberRegistrationRequest.email();
        if (memberRepository.existsByEmail(email)) {
            throw new DuplicateResourceException(
                    "email already taken"
            );
        }


        MemberEntity memberEntity = memberMapper.registrationRequestToEntity(memberRegistrationRequest);
        memberEntity.setPassword(passwordEncoder.encode(memberRegistrationRequest.password()));
        memberEntity.setMemberSince(OffsetDateTime.now());

        // Allows revinfo to obtain username after member is persisted
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        try {
            memberRepository.save(memberEntity);
            LOGGER.info("Created member with email [{}] and ID: [{}]", memberEntity.getEmail(), memberEntity.getId());
        } finally {
            SecurityContextHolder.clearContext();
        }
        return memberMapper.memberEntityToMemberDTO(memberEntity);
    }

    @Transactional
    public void uploadMemberProfilePicture(Long memberId, MultipartFile file) {
        String profileImageId = UUID.randomUUID().toString();

        memberRepository.updateProfileImageId(profileImageId, memberId);
        try {
            LOGGER.info("Uploading profile image for member with ID: [{}]", memberId);
            s3Service.putObject(
                    s3Bucket,
                    profileImageKey(memberId, profileImageId),
                    file.getBytes());

        } catch (IOException e) {
            throw new FileUploadException("failed to upload profile image", e);
        }
    }


    public byte[] getProfilePicture(Long memberId) {
        MemberEntity memberEntity = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "member with ID: [%s] not found".formatted(memberId)
                ));


        if (StringUtils.isBlank(memberEntity.getProfileImageId())) {
            throw new ResourceNotFoundException(
                    "member with ID: [%s] profile image not found".formatted(memberId));
        }

        return s3Service.getObject(
                s3Bucket,
                profileImageKey(memberId, memberEntity.getProfileImageId())
        );
    }

    @Transactional
    public MemberDTO updateMember(Long id, MemberUpdateRequest updateRequest) {
        MemberEntity memberEntity = memberRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "member with ID: [%s] not found".formatted(id)
                ));

        if (updateRequest.email() != null &&
                !updateRequest.email().equals(memberEntity.getEmail())) {
            if (memberRepository.existsByEmail(updateRequest.email())) {
                throw new DuplicateResourceException(
                        "email already used."
                );
            }
            memberEntity.setEmail(updateRequest.email());
        }

        if (updateRequest.name() != null)
            memberEntity.setName(updateRequest.name());
        if (updateRequest.dateOfBirth() != null)
            memberEntity.setDateOfBirth(updateRequest.dateOfBirth());
        if (updateRequest.gender() != null)
            memberEntity.setGender(updateRequest.gender());
        if (updateRequest.weight() != null)
            memberEntity.setWeight(updateRequest.weight());
        if (updateRequest.height() != null)
            memberEntity.setHeight(updateRequest.height());
        if (updateRequest.weightGoal() != null)
            memberEntity.setWeightGoal(updateRequest.weightGoal());
        if (updateRequest.fitness() != null)
            memberEntity.setFitness(updateRequest.fitness());
        if (updateRequest.bodyFat() != null)
            memberEntity.setBodyFat(updateRequest.bodyFat());
        LOGGER.info("Updating member with ID: [{}] and email [{}]", id, memberEntity.getEmail());

        return memberMapper.memberEntityToMemberDTO(memberEntity);
    }


    private String profileImageKey(Long memberId, String profileImageId) {
        return "profile-images/%s/%s".formatted(memberId, profileImageId);
    }

}
