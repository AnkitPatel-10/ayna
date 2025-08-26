import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import Admin from '../models/Admin.js';


const router = Router();

router.get("/", async (req, res) => {
    res.send("Auth route");
});

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    if (!name || !email || !password) 
        return res.status(400).json({ error: "Missing fields" });

    const exists = await Admin.findOne({ email });
    if (exists) 
        return res.status(400).json({ error: "Email already registered" });

    let passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = await Admin.create({ name, email, password: passwordHash });
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET || "changeme", { expiresIn: "1d" });

    res.json({ token, admin: { id: user._id, name, email } });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Admin.findOne({ email });
  if (!user) 
    return res.status(401).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) 
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET || "changeme", { expiresIn: "1d" });
  res.json({ token, user: { id: user._id, name: user.name, email } });
});


export default router;