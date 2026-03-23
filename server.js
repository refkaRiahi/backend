const express = require("express");
const cors = require("cors");
require("dotenv").config();

const SibApiV3Sdk = require("@sendinblue/client");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { fullName, email, phone, message } = req.body;

  const client = new SibApiV3Sdk.TransactionalEmailsApi();
  client.setApiKey(
    SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  );

  try {
    await client.sendTransacEmail({
      sender: { email: process.env.SENDER_EMAIL },
      to: [{ email: "riahiriahi762@gmail.com" }],
      subject: "Nouveau message client",
      htmlContent: `
        <p>Nom : ${fullName}</p>
        <p>Email : ${email}</p>
        <p>Téléphone : ${phone}</p>
        <p>Message : ${message}</p>
      `
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Serveur lancé sur port", PORT));