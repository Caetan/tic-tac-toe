# Run flask server
.PHONY: flask-server
flask-server:
	cd api/src && poetry run flask --app app.py --debug run

# Run frontend app
.PHONY: app
app:
	cd client && npm install && npm start