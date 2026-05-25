/* import { PrismaClient } from '../src/infrastructure/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Seeding FlexShoe database...');

  // ============================================
  // 1. USER ADMIN
  // ============================================
  console.log('\n📝 Criando usuário admin...');
  
  const existingAdmin = await prisma.user.findFirst({
    where: { role: 'admin' },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        name: 'Administrador FlexShoe',
        email: 'admin@flexshoe.ao',
        password: hashedPassword,
        role: 'admin',
        active: true,
      },
    });
    console.log('✅ Admin criado:');
    console.log('   📧 Email: admin@flexshoe.ao');
    console.log('   🔑 Senha: admin123');
  } else {
    console.log('⚠️ Admin já existe');
  }

  // ============================================
  // 2. STORE
  // ============================================
  console.log('\n🏪 Configurando loja...');
  
  const existingStore = await prisma.store.findFirst();

  if (!existingStore) {
    await prisma.store.create({
      data: {
        name: 'FlexShoe',
        whatsapp: '244900000000',
        email: 'contato@flexshoe.ao',
        address: 'Luanda, Angola',
        primaryColor: '#E05A2A',
      },
    });
    console.log('✅ Store FlexShoe criada');
  } else {
    console.log('⚠️ Store já existe');
  }

  // ============================================
  // 3. MARCAS (Brands)
  // ============================================
  console.log('\n👟 Criando marcas...');
  
  const brands = [
    { name: 'Nike', slug: 'nike' },
    { name: 'Adidas', slug: 'adidas' },
    { name: 'Puma', slug: 'puma' },
    { name: 'Vans', slug: 'vans' },
    { name: 'Converse', slug: 'converse' },
    { name: 'New Balance', slug: 'new-balance' },
  ];

  for (const brand of brands) {
    const existingBrand = await prisma.brand.findUnique({
      where: { slug: brand.slug },
    });
    
    if (!existingBrand) {
      await prisma.brand.create({
        data: {
          name: brand.name,
          slug: brand.slug,
          active: true,
        },
      });
      console.log(`   ✅ Marca ${brand.name} criada`);
    } else {
      console.log(`   ⚠️ Marca ${brand.name} já existe`);
    }
  }

  // ============================================
  // 4. RESUMO FINAL
  // ============================================
  console.log('\n📊 RESUMO DO SEED:');
  
  const userCount = await prisma.user.count();
  const storeCount = await prisma.store.count();
  const brandCount = await prisma.brand.count();
  
  console.log(`   👥 Usuários: ${userCount}`);
  console.log(`   🏪 Stores: ${storeCount}`);
  console.log(`   👟 Marcas: ${brandCount}`);
  
  console.log('\n✅ FlexShoe seeding completed!');
  console.log('\n🔐 Credenciais de acesso:');
  console.log('   📧 Email: admin@flexshoe.ao');
  console.log('   🔑 Senha: admin123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); */