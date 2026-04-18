package com.robinsonir.fittrack.mappers;

import com.robinsonir.fittrack.data.entity.customer.CustomerEntity;
import com.robinsonir.fittrack.data.repository.customer.CustomerDTO;
import com.robinsonir.fittrack.data.service.customer.CustomerRegistrationRequest;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(config = FitTrackMapperConfig.class)
public interface CustomerMapper {

    @Mapping(target = "roles", source = "authorities")
    CustomerDTO customerEntityToCustomer(CustomerEntity customerEntity);

    @Mapping(target = "roles", source = "authorities")
    List<CustomerDTO> customerEntityListToCustomerList(List<CustomerEntity> customerEntityList);

    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "name", source = "name")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "password", source = "password")
    @Mapping(target = "age", source = "age")
    @Mapping(target = "gender", source = "gender")
    @Mapping(target = "memberSince", source =
            "memberSince")
    CustomerEntity registrationRequestToEntity(CustomerRegistrationRequest registrationRequest);

    default List<String> mapAuthorities(Collection<? extends GrantedAuthority> authorities) {
        return authorities == null ? List.of() :
                authorities.stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList());
    }

}
