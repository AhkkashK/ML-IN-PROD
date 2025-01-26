FROM python:3.10-slim

WORKDIR /app

# Copy and install dependances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# PATH
ENV NLTK_DATA /nltk_data/ ADD . $NLTK_DATA
# Loads files
RUN python -m nltk.downloader punkt -d /usr/share/nltk_data
RUN python -m nltk.downloader stopwords -d /usr/share/nltk_data
RUN python -m nltk.downloader punkt_tab -d /usr/share/nltk_data
# COPY source code
COPY . .

# Port FastAPI
EXPOSE 8000

# Start FastApi server with unicorn 
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]

