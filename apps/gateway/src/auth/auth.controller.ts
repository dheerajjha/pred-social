import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput, RefreshTokenInput, AuthResponse } from './dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with credentials' })
  @ApiBody({
    type: LoginInput,
    description: 'User credentials',
    examples: {
      example1: {
        value: {
          email: 'demo@pred-social.com',
          password: 'demo123'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful',
    type: AuthResponse
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginInput: LoginInput): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: RegisterInput,
    description: 'User registration data',
    examples: {
      example1: {
        value: {
          email: 'newuser@example.com',
          username: 'newuser',
          displayName: 'New User',
          password: 'Password123'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Registration successful',
    type: AuthResponse
  })
  @ApiResponse({ status: 400, description: 'Invalid input or email already exists' })
  async register(@Body() registerInput: RegisterInput): Promise<AuthResponse> {
    return this.authService.register(registerInput);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({
    type: RefreshTokenInput,
    description: 'Refresh token data',
    examples: {
      example1: {
        value: {
          refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Token refresh successful',
    type: AuthResponse
  })
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
  async refreshToken(@Body() refreshTokenInput: RefreshTokenInput): Promise<AuthResponse> {
    return this.authService.refreshToken(refreshTokenInput.refreshToken);
  }
} 