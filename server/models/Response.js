import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    answer: String
}, { _id: false });

const responseSchema = new mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true },
    answers: [answerSchema],
    submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Response", responseSchema);