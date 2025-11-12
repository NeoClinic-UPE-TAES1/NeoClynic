import { prisma } from "../src/infra/database/prismaClient";
import { NodemailerProvider } from "../src/infra/providers/email/NodeMailerProvider";
import bcrypt from "bcrypt";
import speakeasy from "speakeasy";
import qrcode from "qrcode";

async function createInitialAdmin() {
  const password = process.env.INIT_ADMIN_PASSWORD;
  if (!password) {
    throw new Error("INIT_ADMIN_PASSWORD not set");
  }

  const email = process.env.INIT_ADMIN_EMAIL;
  if (!email) {
    throw new Error("INIT_ADMIN_EMAIL not set");
    }

  await prisma.admin.create({
    data: {
      name: "Administrator",
      email,
      password: await bcrypt.hash(password, 10)
    }
  });

  console.log("Initial admin created");
}


async function twoFactorAuthConfig() {
  const secret = speakeasy.generateSecret({ name: "PainelInterno - Admin" });

  const admin = await prisma.admin.findUnique({
    where: { email: process.env.INIT_ADMIN_EMAIL || "" }
  });

  if (!admin) {
    throw new Error("Admin not found for 2FA configuration");
  }

  await prisma.admin.update({
    where: { email: admin.email },
    data: {
      twoFactorSecret: secret.base32
    }
  });

  const qrCodeBuffer = await qrcode.toBuffer(secret.otpauth_url!);

  const htmlBody = `
    <h2>Configuração de autenticação em duas etapas</h2>
    <p>Escaneie o QR code abaixo no Google Authenticator, Authy ou outro app compatível:</p>
    <img src="cid:qrcode2fa" alt="QR Code 2FA" />
    <p>Ou configure manualmente com o código: <b>${secret.base32}</b></p>
  `;

  await new NodemailerProvider().sendEmail(
    admin.email,
    "Configuração de 2FA",
    htmlBody,
    [
      {
        filename: "qrcode.png",
        content: qrCodeBuffer,
        cid: "qrcode2fa",
      },
    ]
  );
}


export async function main() {
  const exists = await prisma.admin.findFirst();
  if (exists) return;
  
  await createInitialAdmin();
  await twoFactorAuthConfig();
}

main()
  .then(async () => {
    await prisma.$disconnect();})
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
