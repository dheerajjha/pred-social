import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { LoginInput, RegisterInput, AuthResponse } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    // Call auth microservice to validate credentials
    const user = await firstValueFrom(
      this.authClient.send({ cmd: 'login' }, loginInput),
    );

    return this.generateTokens(user);
  }

  async register(registerInput: RegisterInput): Promise<AuthResponse> {
    // Call auth microservice to create user
    const user = await firstValueFrom(
      this.authClient.send({ cmd: 'register' }, registerInput),
    );

    return this.generateTokens(user);
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    // Verify refresh token
    const payload = this.jwtService.verify(refreshToken, {
      secret: this.configService.get<string>('jwt.refreshSecret'),
    });

    // Get fresh user data
    const user = await firstValueFrom(
      this.authClient.send({ cmd: 'getUser' }, { userId: payload.sub }),
    );

    return this.generateTokens(user);
  }

  private generateTokens(user: any): AuthResponse {
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.refreshSecret'),
      expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 604800, // 7 days in seconds
    };
  }
} 