# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

COMPOSE_FILE="docker-compose.yml"
export DB_CONTAINER="fit-db"

basename=`basename "$SCRIPT_DIR"`


cd "$SCRIPT_DIR"
docker-compose -f "$COMPOSE_FILE" \
	up --build -d

echo "connecting docker container $DB_CONTAINER to fit network "$basename"_fitness ..."
docker network connect "$basename"_fitness "$DB_CONTAINER"

docker ps