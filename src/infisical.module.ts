import { Module, DynamicModule, Provider } from "@nestjs/common";
import { InfisicalSDK } from "@infisical/sdk";
import { InfisicalOptions } from "./interfaces/infisical-options.interface";
import { INFISICAL_OPTIONS } from "./constants";

@Module({})
export class InfisicalModule {
  public static async register(
    options: InfisicalOptions
  ): Promise<DynamicModule> {
    const client = new InfisicalSDK({
      siteUrl: options.siteUrl || "https://app.infisical.com",
    });

    await client.auth().universalAuth.login({
      clientId: options.clientId,
      clientSecret: options.clientSecret,
    });

    if (options.renewToken) {
      await client.auth().universalAuth.renew();
    }

    if (options.setManuallyAccessToken) {
      client.auth().accessToken(options.setManuallyAccessToken);
    }

    if (options.awsIamLogin) {
      await client.auth().awsIamAuth.login({
        identityId: options.awsIamLogin,
      });
    }

    if (options.renewAwsIamToken) {
      await client.auth().awsIamAuth.renew();
    }

    return {
      module: InfisicalModule,
      providers: [
        {
          provide: INFISICAL_OPTIONS,
          useValue: options,
        },
        {
          provide: InfisicalSDK,
          useValue: client,
        },
      ],
      exports: [InfisicalSDK],
    };
  }

  public static registerAsync(options: {
    useFactory: (
      ...args: any[]
    ) => Promise<InfisicalOptions> | InfisicalOptions;
    inject?: any[];
  }): DynamicModule {
    const asyncProviders: Provider[] = [
      {
        provide: INFISICAL_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
      {
        provide: InfisicalSDK,
        useFactory: async (infisicalOptions: InfisicalOptions) => {
          const client = new InfisicalSDK({
            siteUrl: infisicalOptions.siteUrl || "https://app.infisical.com",
          });

          await client.auth().universalAuth.login({
            clientId: infisicalOptions.clientId,
            clientSecret: infisicalOptions.clientSecret,
          });

          if (infisicalOptions.renewToken) {
            await client.auth().universalAuth.renew();
          }

          if (infisicalOptions.setManuallyAccessToken) {
            client.auth().accessToken(infisicalOptions.setManuallyAccessToken);
          }

          if (infisicalOptions.awsIamLogin) {
            await client.auth().awsIamAuth.login({
              identityId: infisicalOptions.awsIamLogin,
            });
          }

          if (infisicalOptions.renewAwsIamToken) {
            await client.auth().awsIamAuth.renew();
          }

          return client;
        },
        inject: [INFISICAL_OPTIONS],
      },
    ];

    return {
      module: InfisicalModule,
      providers: [...asyncProviders],
      exports: [InfisicalSDK],
    };
  }
}
