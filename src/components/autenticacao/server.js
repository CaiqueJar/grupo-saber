const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

// ⚠️ Coloque suas credenciais aqui
const accountSid = 'US6abb67943d9f82bc99a5e88b5f5fc72c';
const authToken = '98754fb59841fab9e1d42b488932a867';
const serviceSid = 'VA134e0d5761aff1b718ba58713f866707';

const client = twilio(accountSid, authToken);
const app = express();

app.use(cors());
app.use(bodyParser.json());

// 📤 Enviar código SMS
app.post('/send-code', async (req, res) => {
  const { phone } = req.body;

  try {
    await client.verify.v2.services(serviceSid).verifications.create({
      to: phone,
      channel: 'sms'
    });

    res.status(200).json({ message: 'Código enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar código:', error);
    res.status(500).json({ error: 'Erro ao enviar código' });
  }
});

// ✅ Verificar código
app.post('/verify-code', async (req, res) => {
  const { phone, code } = req.body;

  try {
    const verificationCheck = await client.verify.v2.services(serviceSid)
      .verificationChecks.create({ to: phone, code });

    if (verificationCheck.status === 'approved') {
      res.status(200).json({ message: 'Verificação aprovada' });
    } else {
      res.status(401).json({ error: 'Código incorreto' });
    }
  } catch (error) {
    console.error('Erro ao verificar código:', error);
    res.status(500).json({ error: 'Erro ao verificar código' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
