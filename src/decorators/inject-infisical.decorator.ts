import { Inject } from '@nestjs/common';
import { InfisicalSDK } from '@infisical/sdk';

export const InjectInfisical = (): PropertyDecorator & ParameterDecorator => Inject(InfisicalSDK);
