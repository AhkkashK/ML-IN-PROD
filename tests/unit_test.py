from backend.app import transform_text, model, tfidf, app

def test_transform_text():
    text = "Hello World! This is a test message."
    expected = "hello world test messag"
    assert transform_text(text) == expected

def test_model_prediction():
    input_text = ["test spam message"]
    transformed = tfidf.transform(input_text)
    prediction = model.predict(transformed)
    assert prediction in [0, 1]  # 0: ham, 1: spam

def test_transform_text_empty_string():
    text = ""
    expected = ""
    assert transform_text(text) == expected



