import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CircuitEntity } from './circuit.entity';
import { SimulatorController } from './simulator.controller';
import { SimulatorService } from './simulator.service';

const isVercelWithoutCloudDb =
  !!process.env.VERCEL &&
  !process.env.DATABASE_URL &&
  (!process.env.DB_HOST || process.env.DB_HOST === 'localhost' || process.env.DB_HOST === '127.0.0.1');

@Module({
  imports: isVercelWithoutCloudDb ? [AuthModule] : [TypeOrmModule.forFeature([CircuitEntity]), AuthModule],
  controllers: [SimulatorController],
  providers: [SimulatorService],
})
export class SimulatorModule {}
