import { Router } from "express";
import Form from "../models/Form.js";
import Response from "../models/Response.js";
const router = Router();

// when link is clicked , this route fetches the form
router.get("/forms/:slug", async (req, res) => {
  const form = await Form.findOne({ slug: req.params.slug });
  if (!form) 
    return res.status(404).json({ error: "Form not found" });

  res.json({ title: form.title, slug: form.slug, questions: form.questions });
});

// validation of form data and matching of answers to questions
router.post("/forms/:slug/submit", async (req, res) => {
  const form = await Form.findOne({ slug: req.params.slug });
  if (!form) 
    return res.status(404).json({ error: "Form not found" });

  const { answers } = req.body;
  if (!Array.isArray(answers)) 
    return res.status(400).json({ error: "Invalid answers" });

  for (const q of form.questions) {
    const a = answers.find(x => String(x.questionId) === String(q._id));
    if (q.required && (!a || !a.value)) 
        return res.status(400).json({ error: `Missing: ${q.label}` });
    
    if (a && q.type === "mcq" && !q.options.includes(a.value))
      return res.status(400).json({ error: `Invalid option for: ${q.label}` });
  }
  const created = await Response.create({ formId: form._id, answers });
  res.json({ ok: true, id: created._id });
});

export default router;
