import { useState } from "react";
import axios from "axios";

function CreateForm() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([{ text: "", type: "text", options: [] }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: "", type: "text", options: [] }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleAddOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const formData = { title, questions };
      console.log(formData);
      const token = localStorage.getItem("adminToken");
      await axios.post("http://localhost:4000/api/forms", formData , 
        { headers: {  Authorization: `Bearer ${token}`,'Content-Type': 'application/json' } }
      );
      alert("Form Created!");
    }
    catch(err){
      console.log(err);
      alert("Error creating form");
    }
  };

  return (
    <div>
        
       
      <h2>Create Form</h2>
      <input
        placeholder="Form Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: "1rem" }}>
          <input
            placeholder={`Question ${i + 1}`}
            value={q.text}
            onChange={e => handleQuestionChange(i, "text", e.target.value)}
          />

          <select
            value={q.type}
            onChange={e => handleQuestionChange(i, "type", e.target.value)}
          >
            <option value="text">Text</option>
            <option value="multiple">Multiple Choice</option>
          </select>

          {q.type === "multiple" && (
            <div>
              <button onClick={() => handleAddOption(i)}>+ Add Option</button>
              {q.options.map((opt, j) => (
                <input
                  key={j}
                  placeholder={`Option ${j + 1}`}
                  value={opt}
                  onChange={e => handleOptionChange(i, j, e.target.value)}
                />
              ))}
            </div>
          )}
        </div>
      ))}

      <button onClick={handleAddQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Save Form</button>
      
    </div>
  );
}

export default CreateForm;
