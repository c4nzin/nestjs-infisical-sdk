import { Module, DynamicModule, Provider } from '@nestjs/common';
import { InfisicalSDK } from '@infisical/sdk';
import { InfisicalOptions } from './interfaces/infisical-options.interface';
import { INFISICAL_OPTIONS } from './constants';
import { createInfisicalClient, injectSecretsIntoEnv } from './utils';
import { ConfigModule } from '@nestjs/config';

@Module({})
export class InfisicalModule {
  public static async register(options: InfisicalOptions): Promise<DynamicModule> {
    const client = await createInfisicalClient(options);

    if (options.injectIntoProcessEnv) {
      await injectSecretsIntoEnv(client, options);
    }

    return {
      module: InfisicalModule,
      imports: [ConfigModule.forRoot({ ignoreEnvFile: true })],
      providers: [
        {
          provide: INFISICAL_OPTIONS,
          useValue: options
        },
        {
          provide: InfisicalSDK,
          useValue: client
        }
      ],
      exports: [InfisicalSDK]
    };
  }

  public static registerAsync(options: {
    useFactory: (...args: any[]) => Promise<InfisicalOptions> | InfisicalOptions;
    inject?: any[];
  }): DynamicModule {
    const asyncProviders: Provider[] = [
      {
        provide: INFISICAL_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || []
      },
      {
        provide: InfisicalSDK,
        useFactory: async (options: InfisicalOptions): Promise<InfisicalSDK> => {
          const client = await createInfisicalClient(options);

          if (options.injectIntoProcessEnv) {
            await injectSecretsIntoEnv(client, options);
          }

          return client;
        },
        inject: [INFISICAL_OPTIONS]
      }
    ];

    return {
      module: InfisicalModule,
      imports: [ConfigModule.forRoot({ ignoreEnvFile: true })],
      providers: asyncProviders,
      exports: [InfisicalSDK]
    };
  }
}
