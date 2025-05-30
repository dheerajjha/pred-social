import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  @ApiProperty({
    description: 'User email address',
    example: 'demo@pred-social.com'
  })
  email!: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: 'User password (min 6 characters)',
    example: 'demo123'
  })
  password!: string;
}

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  @ApiProperty({
    description: 'User email address',
    example: 'newuser@example.com'
  })
  email!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Username (for the profile URL)',
    example: 'newuser'
  })
  username!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Display name (shown on the profile)',
    example: 'New User'
  })
  displayName!: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    description: 'User password (min 6 characters)',
    example: 'Password123'
  })
  password!: string;
}

@InputType()
export class RefreshTokenInput {
  @Field()
  @IsNotEmpty()
  @ApiProperty({
    description: 'JWT refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  refreshToken!: string;
}

@ObjectType()
export class AuthResponse {
  @Field()
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  accessToken!: string;

  @Field()
  @ApiProperty({
    description: 'JWT refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  refreshToken!: string;

  @Field()
  @ApiProperty({
    description: 'Token expiration time in seconds',
    example: 604800
  })
  expiresIn!: number;
}

@ObjectType()
export class User {
  @Field()
  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id!: string;

  @Field()
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com'
  })
  email!: string;

  @Field()
  @ApiProperty({
    description: 'Username (for the profile URL)',
    example: 'johndoe'
  })
  username!: string;

  @Field()
  @ApiProperty({
    description: 'Display name (shown on the profile)',
    example: 'John Doe'
  })
  displayName!: string;

  @Field({ nullable: true })
  @ApiProperty({
    description: 'User bio',
    example: 'Passionate investor and analyst',
    required: false
  })
  bio?: string;

  @Field({ nullable: true })
  @ApiProperty({
    description: 'URL to user avatar image',
    example: 'https://example.com/avatar.jpg',
    required: false
  })
  avatarUrl?: string;

  @Field()
  @ApiProperty({
    description: 'User role',
    example: 'user',
    enum: ['user', 'admin', 'moderator']
  })
  role!: string;

  @Field()
  @ApiProperty({
    description: 'Account creation timestamp',
    example: '2023-05-30T12:00:00.000Z'
  })
  createdAt!: Date;
} 