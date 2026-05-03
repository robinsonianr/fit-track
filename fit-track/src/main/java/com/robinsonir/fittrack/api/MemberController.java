package com.robinsonir.fittrack.api;

import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import com.robinsonir.fittrack.data.repository.member.MemberDTO;
import com.robinsonir.fittrack.data.service.member.MemberRegistrationRequest;
import com.robinsonir.fittrack.data.service.member.MemberService;
import com.robinsonir.fittrack.data.service.member.MemberUpdateRequest;
import com.robinsonir.fittrack.mappers.MemberMapper;
import com.robinsonir.fittrack.messages.ApiMessage;
import com.robinsonir.fittrack.messages.FitTrackMessageKeys;
import com.robinsonir.fittrack.security.auth.AuthResponse;
import com.robinsonir.fittrack.security.jwt.JwtTokenUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@Tag(name = "Member API", description = "API for managing members")
@RequestMapping(path = "api/v1/members")
public class MemberController {
    private final MemberService memberService;

    private final JwtTokenUtil jwtUtil;
    private final MemberMapper memberMapper;

    public MemberController(MemberService memberService,
                            JwtTokenUtil jwtUtil, MemberMapper memberMapper) {
        this.memberService = memberService;
        this.jwtUtil = jwtUtil;
        this.memberMapper = memberMapper;
    }

    @GetMapping("/me")
    public MemberDTO me(@AuthenticationPrincipal MemberEntity principal) {
        return memberMapper.memberEntityToMemberDTO(principal);
    }

    @GetMapping
    public List<MemberDTO> getAllMembers() {
        return memberService.getAllMembers();
    }

    @ApiResponse(responseCode = "401", description = "Unauthorized")
    @ApiResponse(responseCode = "404", description = "Member not found")
    @Operation(security = {}, summary = "Get member by ID")
    @GetMapping("{memberId}")
    public MemberDTO getMember(
            @Parameter(description = "memberId", required = true) @PathVariable final Long memberId) {
        return memberService.getMember(memberId);
    }

    @ApiResponse(responseCode = "409", description = "Member already exists")
    @Operation(security = {}, summary = "Register a new member")
    @PostMapping
    public AuthResponse registerMember(
            @Parameter(description = "request") @RequestBody MemberRegistrationRequest request) {
        MemberDTO created = memberService.addMember(request);
        String jwtToken = jwtUtil.generateToken(request.email(), created.roles());
        return new AuthResponse(jwtToken, created);
    }


    @ApiResponse(responseCode = "404", description = "Member not found")
    @Operation(summary = "Update member information")
    @PatchMapping("{memberId}")
    public MemberDTO updateMember(
            @Parameter(description = "memberId") @PathVariable final Long memberId,
            @Parameter(description = "updateRequest") @RequestBody MemberUpdateRequest updateRequest) {
        return memberService.updateMember(memberId, updateRequest);
    }

    @Operation(summary = "Upload profile image for member")
    @PutMapping(
            value = "{memberId}/profile-image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ApiMessage uploadMemberProfileImage(
            @Parameter(description = "memberId") @PathVariable final Long memberId,
            @Parameter(description = "file") @RequestParam("file") MultipartFile file) {
        memberService.uploadMemberProfilePicture(memberId, file);
        return FitTrackMessageKeys.MEMBER_IMAGE_UPLOAD_SUCCESS.toApiMessage();
    }

    @ApiResponse(responseCode = "404", description = "Member not found")
    @Operation(summary = "Get profile image for member")
    @GetMapping(
            value = "{memberId}/profile-image",
            produces = MediaType.IMAGE_JPEG_VALUE
    )
    public byte[] getMemberProfileImage(
            @Parameter(description = "memberId") @PathVariable Long memberId) {
        return memberService.getProfilePicture(memberId);
    }
}
