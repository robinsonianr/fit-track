package com.robinsonir.fittrack.s3;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;

@Configuration
public class S3Config {

    @Value("${s3.region.name}")
    private String s3RegionName;

    @Bean
    public S3Client s3Client() {
        return S3Client.builder()
                .region(Region.of(s3RegionName))
                .build();
    }
}
