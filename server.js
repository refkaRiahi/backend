const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/send-email", async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME, // TON email
      pass:  process.env.SMTP_PASSWORD  // Mot de passe d’application Gmail
    }
  });

  try {
await transporter.sendMail({
  from: `"${fullName} <${email}>" <refka.riahy@gmail.com>`,
  replyTo: email,
  to: "riahiriahi762@gmail.com",
  subject: "Nouveau message client",

  html: `
    <div style="background:#742F17; padding:20px; font-family:Arial; color:black;">
      <h2 style="color:white;">Nouveau message client</h2>

      <p><strong>Nom :</strong> ${fullName}</p>
      <p><strong>Téléphone :</strong> ${phone}</p>
      <p><strong>Email :</strong> ${email}</p>

    

      <p><strong>Message :</strong></p>
      <p>${message}</p>
    </div>
  `
});
    res.json({ ok: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur d'envoi" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur ${PORT}`));