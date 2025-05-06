import Message from '../models/Message.js';
import { sendEmail } from '../utils/sendEmail.js';

export const submitMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save message to MongoDB
    const newMsg = new Message({ name, email, subject, message });
    await newMsg.save();

    // Send email to site owner
    await sendEmail({
      to: process.env.OWNER_EMAIL,
      subject: `New Contact from ${name}: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `
    });

    res.status(201).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact form error:', error.message);
    res.status(500).json({ success: false, message: 'Something went wrong.', error: error.message });
  }
};
