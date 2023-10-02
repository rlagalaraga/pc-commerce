FROM python:3.11.1-alpine

WORKDIR /backend

COPY requirements.txt /backend/
RUN pip install -Ur requirements.txt

COPY . /backend/

RUN python manage.py migrate

ARG DJANGO_SUPERUSER_PASSWORD
ENV DJANGO_SUPERUSER_PASSWORD ${DJANGO_SUPERUSER_PASSWORD}

RUN python manage.py createsuperuser --noinput --first_name Admin --last_name Admin --email admin@admin.com

EXPOSE 8000

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]