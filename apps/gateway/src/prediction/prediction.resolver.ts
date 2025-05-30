import { Resolver } from '@nestjs/graphql';
import { PredictionService } from './prediction.service';

@Resolver()
export class PredictionResolver {
  constructor(private predictionService: PredictionService) {}
} 