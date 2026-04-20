# Use a base image that includes Java
FROM eclipse-temurin:17-jre-alpine

RUN apk add --no-cache tini
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy the backend (Java application) JAR file into the image
COPY build/libs/fit-track-*.jar fit-track.jar
RUN chown appuser:appgroup fit-track.jar

USER appuser
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["java", \
    "-XX:+UseContainerSupport", \
    "-XX:MaxRAMPercentage=75.0", \
    "-XX:+ExitOnOutOfMemoryError", \
    "-Djava.security.egd=file:/dev/./urandom", \
    "-jar", "fit-track.jar"]
