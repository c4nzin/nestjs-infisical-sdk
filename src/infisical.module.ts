import { Module, DynamicModule } from "@nestjs/common";
import { InfisicalService } from "./infisical.service";
import { InfisicalOptions } from "./interfaces/infisical-options.interface";
import { InfisicalSDK } from "@infisical/sdk";
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
        InfisicalService,
      ],
      exports: [InfisicalService],
    };
  }
}
