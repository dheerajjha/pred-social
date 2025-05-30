import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';

// Feature modules
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PredictionModule } from './prediction/prediction.module';
import { HealthModule } from './health/health.module';

// Configuration
import configuration from './config/configuration';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.local', '.env'],
    }),

    // GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'apps/gateway/src/schema.gql'),
      sortSchema: true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      subscriptions: {
        'graphql-ws': {
          onConnect: (context: any) => {
            const { connectionParams, extra } = context;
            extra.token = connectionParams.Authorization;
          },
        },
      },
      context: ({ req, res, connection }) => {
        if (connection) {
          return { req: connection.context };
        }
        return { req, res };
      },
    }),

    // Rate limiting
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minute
      limit: 100, // 100 requests per minute
    }]),

    // Feature modules
    AuthModule,
    UserModule,
    PredictionModule,
    HealthModule,
  ],
})
export class AppModule {} 