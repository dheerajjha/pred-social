import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HealthResolver {
  @Query(() => String)
  health(): string {
    return 'OK';
  }

  @Query(() => String)
  version(): string {
    return process.env.npm_package_version || '1.0.0';
  }
} 