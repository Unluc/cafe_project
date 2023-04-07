FROM python:3.10.6

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /app/backend

# RUN apt-get update && apt-get install libpq5 -y

# COPY requirements.txt /app/backend/

# # Build psycopg2-binary from source -- add required required dependencies
# RUN apk add --virtual .build-deps --no-cache postgresql-dev gcc python3-dev musl-dev && \
#         pip install --no-cache-dir -r requirements.txt && \
#         apk --purge del .build-deps
# #

# RUN apt-get update && apt-get install gettext -y

# Install pipenv
RUN pip install --upgrade pip && pip install pipenv

# Copy pipfile and install it as a system packages
COPY ./Pipfile ./Pipfile.lock /app/backend/

# No need in virtualenv as we are already inside container
RUN pipenv install --dev --system

#
#
COPY . /app/backend/

CMD [ "python3", "manage.py", "runserver", "0.0.0.0:8000" ]