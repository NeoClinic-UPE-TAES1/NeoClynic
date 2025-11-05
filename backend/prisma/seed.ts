import { PrismaClient } from '../src/infra/database/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Hash passwords
  const hashedPassword = await bcrypt.hash('senha123', 10);

  // Create Secretaries
  const secretary1 = await prisma.secretary.upsert({
    where: { email: 'secretaria@neoclinic.com' },
    update: {},
    create: {
      name: 'Maria Silva',
      email: 'secretaria@neoclinic.com',
      password: hashedPassword,
    },
  });

  const secretary2 = await prisma.secretary.upsert({
    where: { email: 'ana.costa@neoclinic.com' },
    update: {},
    create: {
      name: 'Ana Costa',
      email: 'ana.costa@neoclinic.com',
      password: hashedPassword,
    },
  });

  // Create Medics
  const medic1 = await prisma.medic.upsert({
    where: { email: 'medico@neoclinic.com' },
    update: {},
    create: {
      name: 'Dr. João Santos',
      email: 'medico@neoclinic.com',
      password: hashedPassword,
      specialty: 'Cardiologia',
    },
  });

  const medic2 = await prisma.medic.upsert({
    where: { email: 'dra.lima@neoclinic.com' },
    update: {},
    create: {
      name: 'Dra. Paula Lima',
      email: 'dra.lima@neoclinic.com',
      password: hashedPassword,
      specialty: 'Pediatria',
    },
  });

  console.log('✅ Seed completed!');
  console.log('\n📋 Test users created:');
  console.log('');
  console.log('👤 Admin:');
  console.log('   Email: admin@neoclinic.com');
  console.log('   Password: admin123');
  console.log('');
  console.log('👤 Secretaries:');
  console.log(`   1. ${secretary1.email} - Password: senha123`);
  console.log(`   2. ${secretary2.email} - Password: senha123`);
  console.log('');
  console.log('👨‍⚕️ Medics:');
  console.log(`   1. ${medic1.email} (${medic1.specialty}) - Password: senha123`);
  console.log(`   2. ${medic2.email} (${medic2.specialty}) - Password: senha123`);
  console.log('');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error during seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
