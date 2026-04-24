val jjwtVer = "0.12.6"
val lambokVer = "1.18.38"


plugins {
    java
    id("org.springframework.boot") version "4.0.5"
    id("io.spring.dependency-management") version "1.1.0"
    id("org.flywaydb.flyway") version "12.3.0"
    id("org.springdoc.openapi-gradle-plugin") version "1.9.0"
    val kotlinVer = "2.3.20"
    kotlin("jvm") version kotlinVer
    kotlin("plugin.spring") version kotlinVer
    kotlin("plugin.jpa") version kotlinVer
    kotlin("plugin.allopen") version kotlinVer
}

group = "com.robinsonir"
version = "3.0.0"

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(17))
    }
}

springBoot {
    mainClass.set("com.robinsonir.fittrack.FitTrackApplication")
}

repositories {
    mavenCentral()
}

sourceSets {
    main {
        java {
            srcDir("build/generated/sources/annotationProcessor/java/main")
        }
    }
}


dependencies {
    // Springboot dependencies
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-data-jdbc")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-jdbc")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    // Json Web Token dependencies
    implementation("io.jsonwebtoken:jjwt-api:$jjwtVer")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:$jjwtVer")
    runtimeOnly("io.jsonwebtoken:jjwt-impl:$jjwtVer")
    // AWS S3 dependencies
    implementation(platform("software.amazon.awssdk:bom:2.31.6"))
    implementation("software.amazon.awssdk:s3")
    // OpenApi dependencies
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:3.0.3")
    // Other Dependencies
    implementation("io.github.cdimascio:dotenv-kotlin:6.4.1")
    implementation("org.apache.commons:commons-lang3:3.18.0")
    implementation("org.mapstruct:mapstruct:1.6.3")
    implementation("org.projectlombok:lombok:1.18.30")
    implementation("org.hibernate.orm:hibernate-envers")
    // Annotation Processors
    annotationProcessor("org.projectlombok:lombok:$lambokVer") // Add Lombok annotation processor dependency
    annotationProcessor("org.mapstruct:mapstruct-processor:1.6.3")
    // Database/Migration postgresql
    implementation("org.flywaydb:flyway-core")
    implementation("org.flywaydb:flyway-database-postgresql")
    implementation("org.springframework.boot:spring-boot-flyway")
    runtimeOnly("org.postgresql:postgresql")

    // Tests
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.boot:spring-boot-data-jpa-test")
    runtimeOnly("com.h2database:h2")
}

openApi {
    apiDocsUrl.set("http://localhost:8080/v3/api-docs")
    outputDir.set(layout.buildDirectory.dir("openapi"))
    outputFileName.set("api.json")
    customBootRun{
        args.add("--spring.profiles.active=openapi")
    }
}

tasks.register<Copy>("exportOpenApiSpec") {
    dependsOn("generateOpenApiDocs")
    from(layout.buildDirectory.file("openapi/api.json"))
            into(rootProject.layout.projectDirectory.dir("openapi"))
}

tasks.withType<Test> {
    useJUnitPlatform()
}
