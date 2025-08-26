import { useState } from "react";
import axios from "axios"; // axios instance

const api = axios.create({
  baseURL: "http://localhost:4000/api",
    headers: { "Content-Type": "application/json" },
});

function CreateFormv2() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", type: "text", options: [] }, // Question 1
    { text: "", type: "text", options: [] }, // Question 2
    { text: "", type: "text", options: [] }, // Question 3
    { text: "", type: "text", options: [] }, // Question 4
  ]);

  // Update a question
  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  // Add option for multiple-choice
  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await api.post("/forms", { title, questions });
      console.log("Form saved:", res.data);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Feedback Form</h2>

      <input
        type="text"
        placeholder="Form Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {questions.map((q, i) => (
        <div key={i} style={{ marginTop: "10px" }}>
          <input
            type="text"
            placeholder={`Question ${i + 1}`}
            value={q.text}
            onChange={(e) => handleQuestionChange(i, "text", e.target.value)}
          />

          <select
            value={q.type}
            onChange={(e) => handleQuestionChange(i, "type", e.target.value)}
          >
            <option value="text">Text</option>
            <option value="multiple">Multiple Choice</option>
          </select>

          {q.type === "multiple" && (
            <div>
              {q.options.map((opt, j) => (
                <input
                  key={j}
                  type="text"
                  placeholder={`Option ${j + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(i, j, e.target.value)}
                />
              ))}
              <button type="button" onClick={() => addOption(i)}>
                + Add Option
              </button>
            </div>
          )}
        </div>
      ))}

      <button type="submit">Save Form</button>
    </form>
  );
}

export default CreateFormv2;
