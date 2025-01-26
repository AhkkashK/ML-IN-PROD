FROM python:3.10-slim

WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Configure NLTK Data
ENV NLTK_DATA=/usr/share/nltk_data
RUN python -m nltk.downloader punkt -d $NLTK_DATA
RUN python -m nltk.downloader stopwords -d $NLTK_DATA
RUN python -m nltk.downloader punkt_tab -d $NLTK_DATA

# Add PYTHONPATH for proper module resolution
ENV PYTHONPATH=/app

# Copy source code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Start FastAPI server with uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]