import mlflow
import mlflow.sklearn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# Set MLflow tracking URI to your Dagshub instance
mlflow.set_tracking_uri("https://dagshub.com/AhkkashK/ML-IN-PROD.mlflow")

# Load model and vectorizer from MLflow
model_uri = "runs:/8815fb7d7d9f4085bd7c79bd812fafc2/random_forest_model" 
tfidf_uri = "runs:/8815fb7d7d9f4085bd7c79bd812fafc2/tfidf_vectorizer"    
model = mlflow.sklearn.load_model(model_uri)
tfidf = mlflow.sklearn.load_model(tfidf_uri)

# Initialize stopwords and stemmer once (better performance)
stop_words = set(stopwords.words('english'))
stemmer = PorterStemmer()

def transform_text(text):
    # Lowercase and tokenize the text
    words = nltk.word_tokenize(text.lower())
    
    # Filter out non-alphanumeric words and stopwords, and apply stemming
    words = [
        stemmer.stem(word) for word in words
        if word.isalnum() and word not in stop_words
    ]
    
    # Join the words back into a single string
    return " ".join(words)

# Define a data model for input
class TextInput(BaseModel):
    text: str

# Initialize FastAPI app
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

@app.post("/predict/")
def predict(input: TextInput):
    # Extract text from the request body
    processed_input = transform_text(input.text)
    
    # Vectorize the input message using the loaded TF-IDF vectorizer
    X_input = tfidf.transform([processed_input])
    
    # Predict using the loaded RandomForest model
    prediction = model.predict(X_input)
    
    # Return prediction result
    return {"prediction": "spam" if prediction[0] == 1 else "ham"}

