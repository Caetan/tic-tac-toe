# Run flask server
.PHONY: flask-server
flask-server:
	cd api/src && poetry run flask --app app.py --debug run

# Run frontend app
.PHONY: app
app:
	cd client && npm install && npm start

# Build images and run docker
.PHONY: docker-build-run
docker-build-run:
	COMPOSE_PROJECT_NAME=tic-tac-toe COMPOSE_HTTP_TIMEOUT=200 docker-compose -f docker-compose.yml up --force-recreate --build

# Run docker
.PHONY: docker-run
docker-run:
	COMPOSE_PROJECT_NAME=tic-tac-toe COMPOSE_HTTP_TIMEOUT=200 docker-compose -f docker-compose.yml up
