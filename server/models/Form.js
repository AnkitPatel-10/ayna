import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    type: { type: String, enum: ['text', 'multiple'], required: true },
    options: {
        type: [String], // Only for multiple-choice questions
        required: function() { 
            return this.type === 'multiple'; 
        
    }
}
}, { _id: true });


const formSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions:[questionSchema],
    slug: { type: String, required: true, unique: true },
    createdAt: { type: Date , default: Date.now() },
    //createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true }
    createdBy: { type: String, default: "Admin" }
});

export default mongoose.model("Form", formSchema);

