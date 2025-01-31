import { Injectable, Inject } from "@nestjs/common";
import { InfisicalSDK } from "@infisical/sdk";
import { InfisicalOptions } from "./interfaces/infisical-options.interface";
import { INFISICAL_OPTIONS } from "./constants";

@Injectable()
export class InfisicalService {
  constructor(
    @Inject(InfisicalSDK) private readonly client: InfisicalSDK,
    @Inject(INFISICAL_OPTIONS) private readonly options: InfisicalOptions
  ) {}

  public async listSecrets(environment: string): Promise<any> {
    return await this.client.secrets().listSecrets({
      environment,
      projectId: this.options.projectId,
    });
  }

  public async getSecret(
    secretName: string,
    environment: string
  ): Promise<any> {
    const secrets = await this.client.secrets().listSecrets({
      environment,
      projectId: this.options.projectId,
    });

    const secret = secrets.secrets.find(
      (secret) => secret.secretKey == secretName
    );

    return secret?.secretValue;
  }
}
