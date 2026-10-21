import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../backend/src/app.module';

let cachedApp: any;

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
    console.error('Vercel API error:', err);
    return res.status(500).json({
      statusCode: 500,
      message: 'Error en el servidor NestJS',
      error: err?.message || String(err),
    });
  }
}
