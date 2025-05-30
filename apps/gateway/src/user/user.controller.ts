import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UserController {
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns a list of users',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
          username: { type: 'string', example: 'johndoe' },
          displayName: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'john@example.com' },
          avatarUrl: { type: 'string', example: 'https://example.com/avatar.jpg' },
          createdAt: { type: 'string', example: '2023-05-30T12:00:00.000Z' }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    // This is a mock implementation - in a real app this would query the user service
    return [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        username: 'johndoe',
        displayName: 'John Doe',
        email: 'john@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
        createdAt: new Date().toISOString()
      }
    ];
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', description: 'User ID', example: '123e4567-e89b-12d3-a456-426614174000' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns a single user',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
        username: { type: 'string', example: 'johndoe' },
        displayName: { type: 'string', example: 'John Doe' },
        email: { type: 'string', example: 'john@example.com' },
        avatarUrl: { type: 'string', example: 'https://example.com/avatar.jpg' },
        createdAt: { type: 'string', example: '2023-05-30T12:00:00.000Z' }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id') id: string) {
    // This is a mock implementation - in a real app this would query the user service
    return {
      id,
      username: 'johndoe',
      displayName: 'John Doe',
      email: 'john@example.com',
      avatarUrl: 'https://example.com/avatar.jpg',
      createdAt: new Date().toISOString()
    };
  }
} 