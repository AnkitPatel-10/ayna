import express from "express";
import { nanoid } from "nanoid";
import Form from "../models/Form.js";
import Response from "../models/Response.js";
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();
router.use(requireAuth);

// create
router.post("/", async (req, res) => {
  console.log(req.body);
  const { title, questions } = req.body;
  if (!title || !Array.isArray(questions) || questions.length < 0)
    return res.status(400).json({ error: "Title and 3+ questions required" });

  const slugBase = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const form = await Form.create({
    //ownerId: req.user.id,
    createdBy: "ankit",
    title,
    slug: `${slugBase}-${nanoid(6)}`,
    questions,
  });
  res.json(form);
  console.log(form);
});

// router.post("/test", async (req, res) => {
//     try {
//         const { title, questions } = req.body;
//         // if (!title || !Array.isArray(questions) || questions.length < 3) {
//         //     return res.status(400).json({ error: "Title and 3+ questions required" });
//         // }
//         const form = await Form.create({ title, questions });
//         console.log(form);

//         res.status(201).json(form);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// list own
router.get("/", async (req, res) => {
  const forms = await Form.find({ createdBy: "ankit"}).sort({ createdAt: -1 });
   res.json(forms);
   res.send("hello");
});

// submit answers to a form
router.post("/:id/submit", async (req, res) => {
  const { answers } = req.body;
  const formId = req.params.id;
  

  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: "Answers are required" });
  }

  // Optionally, you can validate that questionIds exist in the form
  
  try {
    const response = await Response.create({
      formId,
      answers,
      submittedAt: new Date()
    });
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// responses (raw)
router.get("/:id/responses", async (req, res) => {
  console.log(req);
  const form = await Form.findOne({ 
    _id: req.params.id, 
    // ownerId: req.user.id 
  });
  if (!form) 
    return res.status(404).json({ error: "Not found" });
  const responses = await Response.find({ formId: form._id }).sort({ submittedAt: -1 });
  res.json(responses);
});

// summary
router.get("/:id/summary", async (req, res) => {
  const form = await Form.findOne({ _id: req.params.id, ownerId: req.user.id });
  if (!form) return res.status(404).json({ error: "Not found" });
  const responses = await Response.find({ formId: form._id });
  const totalResponses = responses.length;

  const mcqStats = {};
  for (const q of form.questions.filter(q => q.type === "mcq")) {
    mcqStats[q._id] = { label: q.label, counts: Object.fromEntries(q.options.map(o => [o, 0])) };
  }
  for (const r of responses) {
    for (const a of r.answers) {
      const q = form.questions.id(a.questionId);
      if (q?.type === "mcq" && mcqStats[q._id].counts[a.value] !== undefined) {
        mcqStats[q._id].counts[a.value] += 1;
      }
    }
  }
  res.json({ totalResponses, mcqStats });
});

export default router;
