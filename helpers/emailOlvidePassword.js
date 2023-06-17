import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, token, nombre } = datos;
  //Enviar email

  const info = await transporter.sendMail({
    from: "APV - Administrador de Pacientes de Veterinaria",
    to: email,
    subject: "Reestablece tu cuenta Password",
    text: "Reestablece tu cuenta Password",
    html: `<p>Hola: ${nombre}, hassolicitado reestablecer tu password.</p>
            <p>Sigue el siguiente enlace para generar un nuevo password:
            <a href="${process.env.FRONTEND_URL}/nuevo-password/${token}">Reestablecer Password</a></p>
            <p>Si tu creaste esta cuenta, puedes ignorar este mensaje</p>`,
  });
  console.log("Mensaje Enviado: %s,", info.messageId);
};
export default emailOlvidePassword;
