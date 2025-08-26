import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ResponseForm({ formId }) {
  const { slug } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/forms/${slug}`).then(res => {
      setForm(res.data);
      setAnswers(res.data.questions.map(q => ({ questionId: q._id, answer: "" })));
    });
  }, [slug]);

  const handleSubmit = async () => {
    await axios.post(`http://localhost:4000/api/forms/${slug}/submit`, { answers });
    alert("Response submitted!");
  };

  if (!form) return <p>Loading...</p>;

  return (
    <div>
      <h2>{form.title}</h2>
      {form.questions.map((q, i) => (
        <div key={q._id}>
          <p>{q.text}</p>
          <input
            value={answers[i].answer}
            onChange={e => {
              const newAns = [...answers];
              newAns[i].answer = e.target.value;
              setAnswers(newAns);
            }}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ResponseForm;
