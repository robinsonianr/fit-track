package com.robinsonir.fittrack.mappers;

import com.robinsonir.fittrack.data.entity.customer.CustomerEntity;
import com.robinsonir.fittrack.data.repository.customer.CustomerDTO;
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


    default List<String> mapAuthorities(Collection<? extends GrantedAuthority> authorities) {
        return authorities == null ? List.of() :
                authorities.stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList());
    }

}
