from fastapi.testclient import TestClient
from backend.app import app

client = TestClient(app)

def test_predict_endpoint_ham():
    response = client.post("/predict/", json={"text": "Hello, how are you?"})
    assert response.status_code == 200
    assert response.json()["prediction"] == "ham"

def test_predict_endpoint_spam():
    response = client.post("/predict/", json={"text": "Claim your prize! You've won a 100€ gift voucher! Reply to get it."})
    assert response.status_code == 200
    assert response.json()["prediction"] == "spam"

def test_predict_endpoint_invalid_request():
    response = client.post("/predict/", json={})
    assert response.status_code == 422  # Error validation Pydantic