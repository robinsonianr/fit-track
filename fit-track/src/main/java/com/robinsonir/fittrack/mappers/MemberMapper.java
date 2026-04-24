package com.robinsonir.fittrack.mappers;

import com.robinsonir.fittrack.data.entity.member.MemberEntity;
import com.robinsonir.fittrack.data.repository.member.MemberDTO;
import com.robinsonir.fittrack.data.service.member.MemberRegistrationRequest;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(config = FitTrackMapperConfig.class)
public interface MemberMapper {

    @Mapping(target = "roles", source = "authorities")
    MemberDTO memberEntityToMemberDTO(MemberEntity memberEntity);

    @Mapping(target = "roles", source = "authorities")
    List<MemberDTO> memberEntityListToMemberDTOList(List<MemberEntity> memberEntityList);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "name", source = "name")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "password", source = "password")
    @Mapping(target = "age", source = "age")
    @Mapping(target = "gender", source = "gender")
    @Mapping(target = "memberSince", ignore = true)
    MemberEntity registrationRequestToEntity(MemberRegistrationRequest registrationRequest);

    default List<String> mapAuthorities(Collection<? extends GrantedAuthority> authorities) {
        return authorities == null ? List.of() :
                authorities.stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList());
    }

}
