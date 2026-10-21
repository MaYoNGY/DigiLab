import { Body, Controller, Delete, Get, Headers, Param, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CircuitPreset, SimulatorService } from './simulator.service';

@Controller('simulator')
export class SimulatorController {
  constructor(
    private readonly simulatorService: SimulatorService,
    private readonly authService: AuthService,
  ) {}

  @Get('health')
  async getHealth() {
    const presets = await this.simulatorService.getPresets();
    return {
      status: 'online',
      framework: 'NestJS 10 + TypeORM',
      database: 'PostgreSQL 16 (Docker WSL Ubuntu)',
      presetsCount: presets.length,
    };
  }

  @Get('catalog')
  getCatalog() {
    return this.simulatorService.getCatalog();
  }

  @Get('presets')
  async getPresets() {
    return this.simulatorService.getPresets();
  }

  @Get('my-circuits')
  async getMyCircuits(@Headers('authorization') authHeader: string) {
    const user = await this.authService.getProfileFromHeader(authHeader);
    return this.simulatorService.getUserCircuits(user.id);
  }

  @Post('circuits')
  async saveCircuit(
    @Headers('authorization') authHeader: string,
    @Body() circuit: CircuitPreset,
  ) {
    const user = await this.authService.getProfileFromHeader(authHeader);
    return this.simulatorService.saveUserCircuit(circuit, user);
  }

  @Delete('circuits/:id')
  async deleteCircuit(
    @Headers('authorization') authHeader: string,
    @Param('id') id: string,
  ) {
    const user = await this.authService.getProfileFromHeader(authHeader);
    return this.simulatorService.deleteUserCircuit(id, user.id);
  }
}
