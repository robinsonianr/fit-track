#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

COMPOSE_FILE="docker-compose.yml"
export DB_CONTAINER="fit-db"

basename=$(basename "$SCRIPT_DIR")


./gradlew exportOpenApiSpec build --build-cache -x test
cd fit-track-ui/react && npm run api:gen

cd "$SCRIPT_DIR"
docker compose -f "$COMPOSE_FILE" \
	up --build -d

echo "connecting docker container $DB_CONTAINER to fitness network ${basename}_fitness ..."
docker network connect "$basename"_fitness "$DB_CONTAINER"

docker ps