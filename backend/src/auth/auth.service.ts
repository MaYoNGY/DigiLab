import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class AuthService {
  private readonly secretKey = process.env.JWT_SECRET || 'digilab_secret_key_2026_pro';

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private hashPassword(password: string): string {
    const salt = 'digilab_salt_v1';
    return crypto.scryptSync(password, salt, 64).toString('hex');
  }

  createToken(user: UserEntity): string {
    const payload = {
      sub: user.id,
      username: user.username,
      name: user.name,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 días
    };
    const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = crypto
      .createHmac('sha256', this.secretKey)
      .update(data)
      .digest('base64url');
    return `${data}.${signature}`;
  }

  verifyToken(token: string): { sub: string; username: string; name: string } | null {
    if (!token || !token.includes('.')) return null;
    const [data, signature] = token.split('.');
    const expectedSig = crypto
      .createHmac('sha256', this.secretKey)
      .update(data)
      .digest('base64url');
    if (signature !== expectedSig) return null;

    try {
      const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
      if (payload.exp < Date.now()) return null;
      return payload;
    } catch {
      return null;
    }
  }

  async register(name: string, username: string, password: string) {
    const cleanUser = (username || '').trim().toLowerCase();
    const cleanName = (name || '').trim();

    if (!cleanName || cleanName.length < 2) {
      throw new BadRequestException('Por favor ingresa tu nombre (mínimo 2 caracteres).');
    }

    if (!cleanUser || cleanUser.length < 3 || cleanUser.length > 24) {
      throw new BadRequestException('El nombre de usuario debe tener entre 3 y 24 caracteres.');
    }

    if (!/^[a-z0-9_.-]+$/.test(cleanUser)) {
      throw new BadRequestException(
        'El usuario solo puede contener letras, números, puntos, guiones o guiones bajos (sin espacios).',
      );
    }

    if (!password || password.length < 4) {
      throw new BadRequestException('La contraseña debe tener al menos 4 caracteres.');
    }

    const existing = await this.userRepository
      .createQueryBuilder('u')
      .where('LOWER(u.username) = LOWER(:username)', { username: cleanUser })
      .getOne();

    if (existing) {
      throw new ConflictException(
        `El usuario "${cleanUser}" ya está ocupado. Por favor elige otro nombre de usuario.`,
      );
    }

    try {
      const user = this.userRepository.create({
        name: cleanName,
        username: cleanUser,
        passwordHash: this.hashPassword(password),
      });

      const saved = await this.userRepository.save(user);
      const token = this.createToken(saved);

      return {
        token,
        user: {
          id: saved.id,
          name: saved.name,
          username: saved.username,
        },
      };
    } catch (err: any) {
      if (err?.code === '23505') {
        throw new ConflictException(
          `El usuario "${cleanUser}" ya existe en la base de datos. Intenta con otro.`,
        );
      }
      throw err;
    }
  }

  async login(username: string, password: string) {
    const cleanUser = (username || '').trim().toLowerCase();
    if (!cleanUser || !password) {
      throw new BadRequestException('Ingresa tu usuario y contraseña.');
    }

    const user = await this.userRepository
      .createQueryBuilder('u')
      .where('LOWER(u.username) = LOWER(:username)', { username: cleanUser })
      .getOne();

    if (!user || user.passwordHash !== this.hashPassword(password)) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos.');
    }

    const token = this.createToken(user);
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
      },
    };
  }

  async getProfileFromHeader(authHeader?: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Sesión no válida.');
    }
    const token = authHeader.replace('Bearer ', '').trim();
    const payload = this.verifyToken(token);
    if (!payload) {
      throw new UnauthorizedException('Sesión expirada o inválida.');
    }
    const user = await this.userRepository.findOne({ where: { id: payload.sub } });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado.');
    }
    return {
      id: user.id,
      name: user.name,
      username: user.username,
    };
  }
}
