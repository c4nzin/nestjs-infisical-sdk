![infisical](https://github.com/user-attachments/assets/28e5832d-5212-4568-9f90-3b05ca49249a)

# NestJS Infisical SDK

This project provides a NestJS module for integrating with the Infisical SDK, allowing users to manage secrets easily within their applications.

NOTE: This is not a official library!

## Installation

To install the package, run:

```bash
npm install nestjs-infisical-sdk
```

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
      renewAwsIamToken: true, // Optional
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
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

## Inject The Service

```typescript
import { Injectable } from "@nestjs/common";
import { InjectInfisical, InfisicalSDK } from "nestjs-infisical-sdk";

@Injectable()
export class SomeService {
  constructor(@InjectInfisical() private readonly infisicalSDK: InfisicalSDK) {}

  public async someMethod() {
    // List all secrets:::::
    const allSecrets = await this.infisicalSDK.secrets().listSecrets({
      environment: "dev",
      projectId: "your-project-id",
    });
    console.log("Fetched secrets", allSecrets);

    // Get a specific secret:::
    const specificSecret = allSecrets.secrets.find(
      (secret) => secret.secretKey === "my-secret"
    );
    console.log("Fetched specific secret", specificSecret?.secretValue);

    // Creating new secret ::::
    const newSecret = await this.infisicalSDK.secrets().createSecret({
      environment: "dev",
      projectId: "your-project-id",
      secretKey: "new-secret",
      secretValue: "new-value",
    });
    console.log("Created new secret", newSecret);
  }
}
```
