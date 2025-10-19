FROM python:3

WORKDIR /app

COPY ./requirements.txt .

# Add the new folder and its contents
COPY ./test /app/test

RUN pip install -r requirements.txt

CMD [ "python", "app.py" ]
