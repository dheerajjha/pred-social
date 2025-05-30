import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput, RegisterInput, RefreshTokenInput, AuthResponse, User } from './dto/auth.dto';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthResponse)
  async register(@Args('registerInput') registerInput: RegisterInput): Promise<AuthResponse> {
    return this.authService.register(registerInput);
  }

  @Mutation(() => AuthResponse)
  async refreshToken(@Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput): Promise<AuthResponse> {
    return this.authService.refreshToken(refreshTokenInput.refreshToken);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: any): Promise<User> {
    // In a real app, you'd fetch fresh user data from the database
    return {
      id: user.userId,
      email: user.email,
      username: user.username,
      displayName: user.username, // You'd fetch this from DB
      role: user.role,
      createdAt: new Date(),
    };
  }
} 