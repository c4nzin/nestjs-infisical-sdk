import { InfisicalSDK } from '@infisical/sdk';
import { Inject } from '@nestjs/common';

export const InjectInfisical = (): PropertyDecorator & ParameterDecorator => Inject(InfisicalSDK);
