import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Servir arquivos estáticos da pasta uploads
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  // Cookie parser (para ler o token JWT dos cookies)
  app.use(cookieParser());

  // Global validation pipe com configurações
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove campos não declarados no DTO
      forbidNonWhitelisted: true, // Retorna erro se enviar campos não declarados
      transform: true, // Transforma os dados para os tipos do DTO
    }),
  );

  // Configuração de CORS (para o frontend Next.js)
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // ============================================
  // Configuração do Swagger (Documentação da API)
  // ============================================
  const config = new DocumentBuilder()
    .setTitle('FlexShoe API')
    .setDescription('API do e-commerce FlexShoe')
    .setVersion('1.0')
    .addCookieAuth('jwt')
    .addTag('auth', '🔐 Autenticação (login, logout, verificação)')
    .addTag('account', '👤 Gestão de utilizadores (admin)')
    .addTag('password', '🔑 Alteração e recuperação de senha')
    .addTag('permission', '🎫 Gestão de permissões (roles)')
    .addTag('store', '🏪 Configurações da loja')
    .addTag('system', '📊 Monitoramento e health check')
    .addTag('brand', '🏷️ Gestão de marcas (Nike, Adidas, etc)')
    .addTag('product', '👟 Gestão de produtos/tênis')
    .addTag('inventory', '📦 Gestão de estoque (tamanhos/cores)')
    .addTag('cart', '🛒 Carrinho de compras')
    .addTag('order', '📋 Pedidos e finalização via WhatsApp')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`🚀 FlexShoe API running on http://localhost:${port}`);
  console.log(`📚 Swagger docs: http://localhost:${port}/api-docs`);
  console.log(`📁 Uploads disponíveis em: http://localhost:${port}/uploads/`);
}

bootstrap().catch((err) => {
  console.error('❌ Error starting NestJS app:', err);
});
