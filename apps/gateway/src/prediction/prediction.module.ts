import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PredictionResolver } from './prediction.resolver';
import { PredictionService } from './prediction.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'PREDICTION_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('microservices.prediction.host'),
            port: configService.get<number>('microservices.prediction.port'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [PredictionResolver, PredictionService],
})
export class PredictionModule {} 