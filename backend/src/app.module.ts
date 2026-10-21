import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './auth/user.entity';
import { CircuitEntity } from './simulator/circuit.entity';
import { SimulatorModule } from './simulator/simulator.module';

// En Vercel Serverless, solo conectar a PostgreSQL si existe DATABASE_URL o un DB_HOST remoto (no localhost)
const isVercelWithoutCloudDb =
  !!process.env.VERCEL &&
  !process.env.DATABASE_URL &&
  (!process.env.DB_HOST || process.env.DB_HOST === 'localhost' || process.env.DB_HOST === '127.0.0.1');

const dbImports = isVercelWithoutCloudDb
  ? []
  : [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          const databaseUrl = config.get<string>('DATABASE_URL');
          if (databaseUrl) {
            return {
              type: 'postgres',
              url: databaseUrl,
              entities: [CircuitEntity, UserEntity],
              synchronize: true,
              ssl: databaseUrl.includes('localhost') ? false : { rejectUnauthorized: false },
            };
          }
          return {
            type: 'postgres',
            host: config.get<string>('DB_HOST', 'localhost'),
            port: Number(config.get<number>('DB_PORT', 5432)),
            username: config.get<string>('DB_USER'),
            password: config.get<string>('DB_PASSWORD'),
            database: config.get<string>('DB_NAME', 'digilab_db'),
            entities: [CircuitEntity, UserEntity],
            synchronize: true,
          };
        },
      }),
    ];

// En Vercel Serverless, los archivos estáticos los sirve directamente Vercel mediante vercel.json.
// Solo montar ServeStaticModule en local para evitar errores ENOENT en la lambda de Vercel.
const staticImports = process.env.VERCEL
  ? []
  : [
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', '..', 'frontend'),
        exclude: ['/api/(.*)'],
      }),
    ];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [join(__dirname, '..', '.env'), '.env'],
    }),
    ...staticImports,
    ...dbImports,
    AuthModule,
    SimulatorModule,
  ],
})
export class AppModule {}
