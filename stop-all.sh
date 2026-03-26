SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

COMPOSE_FILE="docker-compose.yml"
export DB_CONTAINER="fit-db"


echo "Stopping environment using $COMPOSE_FILE..."
basename=`basename "$SCRIPT_DIR"`

echo "disconnecting docker container $DB_CONTAINER from fitness network..."
docker network disconnect "$basename"_fitness "$DB_CONTAINER"

cd "$SCRIPT_DIR"
docker-compose -f "$COMPOSE_FILE" \
	down -v
