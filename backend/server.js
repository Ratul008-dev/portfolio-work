import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { error } from 'three';

dotenv.config()


const app = express();
const port = 3000;

app.use(cors())
app.use(express.json())

const contactSchema = new
  mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  })

const Contact = mongoose.model('Contact', contactSchema)
app.post("/api/contact", async (req, res) => {
  try {
    const { username, email, message } = req.body
    const contact = new Contact({
      username, email, message
    })
    await contact.save()
    res.status(201).json({
      success: true,
      message: 'Message saved successfully'
    })
  } catch (error) {
    console.error('Error saving contact:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to save message'
    })
  }
})
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully')

  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error)
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
