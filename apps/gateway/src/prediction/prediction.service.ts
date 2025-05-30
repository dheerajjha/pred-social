import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PredictionService {
  constructor(
    @Inject('PREDICTION_SERVICE') private predictionClient: ClientProxy,
  ) {}
} 