import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("http://localhost:8000/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Error during API request");
      }

      const data = await response.json();
      setResult(data.prediction);
    } catch (error) {
      console.error("Error calling the API:", error);
      setResult("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Spam Classification</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <textarea
            className="message-textarea"
            style={styles.textarea}
            rows="5"
            placeholder="Enter your message here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="classify-button"
            style={styles.button(loading)}
            disabled={loading}
          >
            {loading ? "Classifying..." : "Classify"}
          </button>
        </form>
        {result && (
          <div
            className={`result-message ${result === "spam" ? "resultSpam" : "resultHam"}`}
            style={result === "spam" ? styles.resultSpam : styles.resultHam}
          >
            The message is classified as: <strong>{result.toUpperCase()}</strong>
          </div>
        )}
      </div>
    </div>
  );
  }
  
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f3f4f6",
    },
    card: {
      maxWidth: "500px",
      width: "100%",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "16px",
      outline: "none",
      resize: "none",
    },
    button: (loading) => ({
      backgroundColor: loading ? "#a3a3a3" : "#4f46e5",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: loading ? "not-allowed" : "pointer",
      transition: "background-color 0.3s",
    }),
    resultSpam: {
      marginTop: "20px",
      padding: "10px",
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
      borderRadius: "5px",
      border: "1px solid #fca5a5",
    },
    resultHam: {
      marginTop: "20px",
      padding: "10px",
      backgroundColor: "#d1fae5",
      color: "#047857",
      borderRadius: "5px",
      border: "1px solid #6ee7b7",
    },
  };
  
  export default App;
  