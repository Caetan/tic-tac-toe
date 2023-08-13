FROM python:3.10.0-alpine

RUN pip install poetry
COPY ./api ./api
WORKDIR /api
RUN poetry install

EXPOSE 5000

CMD ["/bin/sh", "-c", "cd src && FLASK_RUN_HOST=0.0.0.0 FLASK_RUN_PORT=5000 poetry run flask --app app.py --debug run"]