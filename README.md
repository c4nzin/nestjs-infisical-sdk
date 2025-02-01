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
import { InfisicalSDK, InjectInfisical } from "nestjs-infisical-sdk";

@Injectable()
export class AppService {
  /**
   * Using Infisical SDK with nestjs-infisical-sdk
   */
  constructor(@InjectInfisical() private readonly infisicalSdk: InfisicalSDK) {}
  public async someMethod() {
    //Get secret by Name
    const getSecret = await this.infisicalSdk.secrets().getSecret({
      environment: "dev",
      secretName: "example-key",
      projectId: "deda1d6c-dbd4-44f9-91cd-dac118dcc18f",
    });

    console.log(getSecret, "specific secret");

    //Create secret
    const createSecret = await this.infisicalSdk
      .secrets()
      .createSecret("secretName", {
        environment: "dev",
        projectId: "deda1d6c-dbd4-44f9-91cd-dac118dcc18f",
        secretValue: "secretValue",
        secretComment: "this is a secret comment", //Optional field.
        secretPath: "/foo/bar", //Optional field.
        secretReminderNote: "this is a reminder note", //Optional field.
        secretReminderRepeatDays: 7, //Optional field.
        skipMultilineEncoding: false, //Optional field.
        tagIds: ["tagId1", "tagId2"], //Optional field.
        type: "personal", //Optional field.
      });

    console.log(createSecret, "created secret");

    //list all secrets
    const listSecrets = await this.infisicalSdk.secrets().listSecrets({
      environment: "dev",
      projectId: "deda1d6c-dbd4-44f9-91cd-dac118dcc18f",
      expandSecretReferences: true, //Optional field.
      includeImports: false, //Optional field.
      recursive: false, //Optional field.
    });

    console.log(listSecrets, "list secrets");

    //update secret
    const updateSecret = await this.infisicalSdk
      .secrets()
      .updateSecret("secretName", {
        environment: "dev",
        projectId: "deda1d6c-dbd4-44f9-91cd-dac118dcc18f",
        secretValue: "updated_secret_value",
        newSecretName: "new_secret_name", //Optional field.
        secretComment: "this is a secret comment", //Optional field.
        secretPath: "/foo/bar", //Optional field.
        secretReminderNote: "this is a reminder note", //Optional field.
        secretReminderRepeatDays: 7, //Optional field.
        skipMultilineEncoding: false, //Optional field.
        tagIds: ["tagId1", "tagId2"], //Optional field.
        type: "personal", //Optional field.
        metadata: {
          //Optional field.
          key1: "value1",
          key2: "value2",
        },
      });

    console.log(updateSecret, "updated secret");

    //delete secret.
    const deleteSecret = await this.infisicalSdk
      .secrets()
      .deleteSecret("secret-name", {
        environment: "dev",
        projectId: "deda1d6c-dbd4-44f9-91cd-dac118dcc18f",
        secretPath: "/foo/bar", //Optional field.
        type: "personal", //Optional field.
      });

    console.log(deleteSecret, "deleted secret");
  }
}
```
