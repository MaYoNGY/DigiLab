import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let cachedApp: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Simulador Digital ejecutándose en: http://localhost:${port}`);
}

// Soporte para Serverless en Vercel y ejecución local
export default async function handler(req: any, res: any) {
  try {
    if (!cachedApp) {
      const app = await NestFactory.create(AppModule);
      app.enableCors();
      app.setGlobalPrefix('api');
      await app.init();
      cachedApp = app.getHttpAdapter().getInstance();
    }
    return cachedApp(req, res);
  } catch (err: any) {
    console.error('Error inicializando NestJS en Vercel Serverless:', err);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error al inicializar el backend en Vercel',
      error: err?.message || String(err),
    });
  }
}

if (!process.env.VERCEL) {
  bootstrap();
}
