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
    },
   connectionTimeout: 10000, // 10 secondes
  greetingTimeout: 10000,
  socketTimeout: 10000,
    tls: { rejectUnauthorized: false },
  family: 4
  });

try {
  await transporter.sendMail({
    from: `"${fullName} <${email}>" <refka.riahy@gmail.com>`,
    replyTo: email,
    to: "riahiriahi762@gmail.com",
    subject: "Nouveau message client",
    html: `<p>Nom: ${fullName}</p><p>Email: ${email}</p><p>Téléphone: ${phone}</p><p>Message: ${message}</p>`
  });
  
  console.log("✅ Mail envoyé avec succès !");
  res.json({ ok: true, sent: "true" });

} catch (error) {
  console.error("❌ Nodemailer erreur:", error);
  res.status(500).json({ error: "Erreur d'envoi", details: error.message });
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur ${PORT}`));