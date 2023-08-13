FROM python:3.10.0-alpine

RUN pip install poetry
COPY ./api ./api
WORKDIR /api
RUN poetry install

EXPOSE 5000

CMD ["/bin/sh", "-c", "cd src && poetry run flask --app app.py --debug run"]