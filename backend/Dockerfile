FROM python:3.8.10

WORKDIR /app

RUN python3 -m pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV HOST db.opgikfefdmrknpxnshjv.supabase.co
ENV DB_USER postgres
ENV PASSWORD SVX6W2@5tu25VQS
ENV DATABASE postgres
ENV PORT 5432
ENV SECRET_KEY 'django-insecure-g@0kr8gix2*ezbvn5)kw&m(r!s9ycn5&xwww11x$%5d4!tm$#^'

COPY . .
EXPOSE 8000
CMD python3 manage.py runserver
