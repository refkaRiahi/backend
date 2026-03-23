const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurer SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/send-email", async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  const msg = {
    to: "riahiriahi762@gmail.com", // ton email de réception
    from: "refka.riahy@gmail.com", // email validé sur SendGrid
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
  };

  try {
    await sgMail.send(msg);
    console.log("✅ Mail envoyé avec succès !");
    res.json({ ok: true, sent: "true" });
  } catch (error) {
    console.error("❌ SendGrid erreur:", error);
    res.status(500).json({ error: "Erreur d'envoi", details: error.message });
  }
});

// Port dynamique pour Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur ${PORT}`));