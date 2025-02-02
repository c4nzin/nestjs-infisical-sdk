![infisical](https://github.com/user-attachments/assets/28e5832d-5212-4568-9f90-3b05ca49249a)

# NestJS Infisical SDK

This project provides a NestJS module for integrating with the Infisical SDK, allowing users to manage secrets easily within their applications.

NOTE: This is not a official library!

## Installation

To install the package, run:

```bash
npm install nestjs-infisical-sdk
```

## Example .env

```bash
INFISICAL_SITE_URL=https://app.infisical.com #default url
INFISICAL_CLIENT_ID=your-client-id
INFISICAL_CLIENT_SECRET=your-client-secret
INFISICAL_ACCESS_TOKEN=your-access-token
INFISICAL_AWS_IAM_LOGIN=your-aws-iam-identity-id
```

| Property                      | Type       | Description |
|--------------------------------|-----------|-------------|
| `clientId`                    | `string`  | The client ID of your Machine Identity. |
| `clientSecret`                | `string`  | The client secret of your Machine Identity. |
| `environment`                 | `string`  | The environment in which to operate (e.g., "dev", "stg", "prod"). *(Optional)* |
| `siteUrl`                     | `string`  | The site URL for your Infisical instance. Defaults to `"https://app.infisical.com"`. *(Optional)* |
| `renewToken`                  | `boolean` | Whether to renew the authentication token that is currently set. *(Optional)* |
| `setManuallyAccessToken`       | `string`  | Manually set the access token for authentication. *(Optional)* |
| `awsIamLogin`                 | `string`  | The ID of your AWS IAM identity for authentication. *(Optional)* |
| `renewAwsIamToken`            | `boolean` | Whether to renew the AWS IAM authentication token that is currently set. *(Optional)* |
| `injectIntoProcessEnv`        | `boolean` |  Determines fetched secrets should be injected into `process.env`. Defaults to `false`. *(Optional)* |


## Options

```typescript
interface InfisicalOptions {
  /**
   * The client ID of your Machine Identity.
   */
  clientId: string;

  /**
   * The client secret of your Machine Identity.
   */
  clientSecret: string;

  /**
   * The environment in which to operate (e.g., "dev", "stg", "prod").
   */
  environment?: string;

  /**
   * The site URL for your Infisical instance. Defaults to "https://app.infisical.com".
   */
  siteUrl?: string;

  /**
   * Whether to renew the authentication token that is currently set.
   */
  renewToken?: boolean;

  /**
   * Manually set the access token for authentication.
   */
  setManuallyAccessToken?: string;

  /**
   * The ID of your AWS IAM identity for authentication.
   */
  awsIamLogin?: string;

  /**
   * Whether to renew the AWS IAM authentication token that is currently set.
   */
  renewAwsIamToken?: boolean;

    /**
   * Determines whether fetched secrets should be injected into `process.env`.
   * If `true`, secrets will be automatically set in `process.env`.
   * If `false`, secrets will only be returned and not modified.
   * Defaults to `false`.
   */
  injectIntoProcessEnv?: boolean;
}
```

## Register

```typescript
import { Module } from "@nestjs/common";
import { InfisicalModule } from "nestjs-infisical-sdk";

@Module({
  imports: [
    InfisicalModule.register({
      clientId: "your-client-id",
      clientSecret: "your-client-secret",
      siteUrl: "https://app.infisical.com", // Optional
      environment: "dev", // Optional
      renewToken: true, // Optional
      setManuallyAccessToken: "your-access-token", // Optional
      awsIamLogin: "your-aws-iam-identity-id", // Optional
      renewAwsIamToken: true, // Optional,
      injectIntoProcessEnv : true, // Optional
    }),
  ],
})
export class AppModule {}
```

## Async Register

```typescript
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { InfisicalModule } from "nestjs-infisical-sdk";

@Module({
  imports: [
    ConfigModule.forRoot(),
    InfisicalModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        clientId: configService.get<string>("INFISICAL_CLIENT_ID"),
        clientSecret: configService.get<string>("INFISICAL_CLIENT_SECRET"),
        siteUrl: configService.get<string>("INFISICAL_SITE_URL"), // Optional
        environment: configService.get<string>("INFISICAL_ENVIRONMENT"), // Optional
        renewToken: false, // Optional
        setManuallyAccessToken: configService.get<string>(
          "INFISICAL_ACCESS_TOKEN"
        ), // Optional
        awsIamLogin: configService.get<string>("INFISICAL_AWS_IAM_LOGIN"), // Optional
        renewAwsIamToken: false, // Optional
        injectIntoProcessEnv : true / Optional
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

## Inject The Service

```typescript
import { Injectable, Logger } from "@nestjs/common";
import {
  CreateDynamicSecretResult,
  CreateSecretResult,
  DeleteDynamicSecretResult,
  DeleteSecretResult,
  DynamicSecretProviders,
  GetSecretResult,
  InfisicalSDK,
  InjectInfisical,
  ListSecretsResult,
  UpdateSecretResult,
} from "nestjs-infisical-sdk";

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(@InjectInfisical() private readonly infisicalSdk: InfisicalSDK) {}

  public async getSecret(secretName: string): Promise<GetSecretResult> {
    this.logger.log(`Getting secret: ${secretName}`);
    const secretResponse = await this.infisicalSdk.secrets().getSecret({
      environment: "dev",
      secretName,
      projectId: process.env.INFISICAL_PROJECT_ID,
    });
    this.logger.log(`Secret retrieved: ${JSON.stringify(secretResponse)}`);
    return secretResponse;
  }

  public async createSecret(
    secretName: string,
    secretValue: string
  ): Promise<CreateSecretResult> {
    this.logger.log(`Creating secret: ${secretName}`);
    const secret = await this.infisicalSdk.secrets().createSecret(secretName, {
      environment: "dev",
      secretValue,
      projectId: process.env.INFISICAL_PROJECT_ID,
    });
    this.logger.log(`Secret created: ${JSON.stringify(secret)}`);
    return secret;
  }

  public async updateSecret(
    secretName: string,
    secretValue: string
  ): Promise<UpdateSecretResult> {
    this.logger.log(`Updating secret: ${secretName}`);
    const secret = await this.infisicalSdk.secrets().updateSecret(secretName, {
      environment: "dev",
      secretValue,
      projectId: process.env.INFISICAL_PROJECT_ID,
    });
    this.logger.log(`Secret updated: ${JSON.stringify(secret)}`);
    return secret;
  }

  public async deleteSecret(secretName: string): Promise<DeleteSecretResult> {
    this.logger.log(`Deleting secret: ${secretName}`);
    const secret = await this.infisicalSdk.secrets().deleteSecret(secretName, {
      environment: "dev",
      projectId: process.env.INFISICAL_PROJECT_ID,
    });
    this.logger.log(`Secret deleted: ${JSON.stringify(secret)}`);
    return secret;
  }

  public async listSecrets(): Promise<ListSecretsResult> {
    this.logger.log("Listing secrets");
    const secrets = await this.infisicalSdk.secrets().listSecrets({
      environment: "dev",
      projectId: process.env.INFISICAL_PROJECT_ID,
    });
    this.logger.log(`Secrets listed: ${JSON.stringify(secrets)}`);
    return secrets;
  }

  public async createDynamicSecret(): Promise<CreateDynamicSecretResult> {
    const createDynamicSecret = await this.infisicalSdk
      .dynamicSecrets()
      .create({
        provider: {
          type: DynamicSecretProviders.Redis,
          inputs: {
            host: "localhost",
            port: 6379,
            username: "user1",
            password: "12345612356",
            creationStatement: `ACL SETUSER {{user1}} on >{{123456123456}} ~* &* +@all`,
            revocationStatement: `ACL DELUSER {{user1}}`,
          },
        },
        defaultTTL: "1h",
        environmentSlug: "dev",
        name: "dynamic-secret-name",
        projectSlug: "project-slug",
      });

    this.logger.log(
      `Dynamic secret created: ${JSON.stringify(createDynamicSecret)}`
    );
    return createDynamicSecret;
  }

  public async deleteDynamicSecret(
    dynamicSecretName: string
  ): Promise<DeleteDynamicSecretResult> {
    const deleteDynamicSecret = await this.infisicalSdk
      .dynamicSecrets()
      .delete(dynamicSecretName, {
        environmentSlug: "dev",
        projectSlug: "project-slug",
      });

    return deleteDynamicSecret;
  }
}

```





## Example Nest.js Project

Looking for a working example?
[NestJS Infisical Example](https://github.com/c4nzin/nestjs-infisical-example)
