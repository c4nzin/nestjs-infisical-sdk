<p align="center">
  <img src="https://github.com/user-attachments/assets/fe2a0806-fbf0-4540-b5ae-ae18fdc06391" alt="image"  width=400px />
</p>

</br>

This library uses the official Infisical SDK. What we’ve done is make the integration with NestJS easier, making your life a lot simpler, It’s written in pure TypeScript, and we’ve fully utilized type safety. you can easily inject the Infisical SDK as a service.

NOTE: This is not a official library!

## Installation

To install the package, run:

### With npm

```bash
npm install nestjs-infisical-sdk
```

### With yarn

```bash
yarn add nestjs-infisical-sdk
```

### With pnpm

```bash
pnpm install nestjs-infisical-sdk
```

### With bun (Not tested yet!)

```bash
bun add nestjs-infisical-sdk
```

## Example .env

```bash
INFISICAL_SITE_URL=https://app.infisical.com #default url
INFISICAL_CLIENT_ID=your-client-id
INFISICAL_CLIENT_SECRET=your-client-secret
INFISICAL_ACCESS_TOKEN=your-access-token
INFISICAL_AWS_IAM_LOGIN=your-aws-iam-identity-id
```

| Property                 | Type      | Description                                                                                                                   |
| ------------------------ | --------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `clientId`               | `string`  | The client ID of your Machine Identity.                                                                                       |
| `clientSecret`           | `string`  | The client secret of your Machine Identity.                                                                                   |
| `projectId`              | `string`  | The project ID of your Infisical project. _(Optional)_                                                                        |
| `environment`            | `string`  | The environment in which to operate (e.g., "dev", "stg", "prod"). _(Optional)_                                                |
| `siteUrl`                | `string`  | The site URL for your Infisical instance. Defaults to `"https://app.infisical.com"`. _(Optional)_                             |
| `secretPath`             | `string`  | The path within your Infisical project where secrets are stored. Defaults to `"/"`. _(Optional)_                              |
| `renewToken`             | `boolean` | Whether to renew the authentication token that is currently set. _(Optional)_                                                 |
| `setManuallyAccessToken` | `string`  | Manually set the access token for authentication. _(Optional)_                                                                |
| `awsIamLogin`            | `string`  | The ID of your AWS IAM identity for authentication. _(Optional)_                                                              |
| `renewAwsIamToken`       | `boolean` | Whether to renew the AWS IAM authentication token that is currently set. _(Optional)_                                         |
| `injectIntoProcessEnv`   | `boolean` | Determines fetched secrets should be injected into `process.env`. Defaults to `false`. _(Optional)_                           |
| `watchEnvFile`           | `boolean` | Automatically watches your `.env` file. Defaults to `false`. _(Optional)_                                                     |
| `expandSecretReferences` | `boolean` | Whether to expand secret references in values. Defaults to `true`. _(Optional)_                                               |
| `viewSecretValue`        | `boolean` | Whether to reveal secret values. If `false`, values are masked with `<hidden-by-infisical>`. Defaults to `true`. _(Optional)_ |
| `recursive`              | `boolean` | Whether to list secrets recursively from subfolders. Defaults to `false`. _(Optional)_                                        |
| `includeImports`         | `boolean` | Whether to include imported secrets from other projects/environments. Defaults to `false`. _(Optional)_                       |

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
   * The project ID of your Infisical project.
   * Used to fetch secrets from the correct project and inject them into `process.env`.
   */
  projectId?: string;
  /**
   * The environment in which to operate (e.g., "dev", "stg", "prod").
   */
  environment?: string;

  /**
   * The site URL for your Infisical instance. Defaults to "https://app.infisical.com".
   */
  siteUrl?: string;

  /**
   * The path within your Infisical project where secrets are stored.
   * Used to fetch secrets from a specific subpath and inject them into `process.env`.
   * Defaults to "/".
   */
  secretPath?: string;

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

  /**
   * The path to the environment file to watch for changes.
   * Default is ".env".
   */
  watchEnvFile?: boolean;

  /**
   * Whether to expand secret references in values.
   * Defaults to `true`.
   */
  expandSecretReferences?: boolean;

  /**
   * Whether to reveal the secret value of the secrets.
   * If set to `false`, the secretValue is masked with `<hidden-by-infisical>`.
   * Defaults to `true`.
   */
  viewSecretValue?: boolean;

  /**
   * Whether to list secrets recursively from subfolders.
   * Defaults to `false`.
   */
  recursive?: boolean;

  /**
   * Whether to include imported secrets from other projects/environments.
   * Defaults to `false`.
   */
  includeImports?: boolean;
}
```

## Register

```typescript
import { Module } from '@nestjs/common';
import { InfisicalModule } from 'nestjs-infisical-sdk';

@Module({
  imports: [
    InfisicalModule.register({
      clientId: 'your-client-id',
      clientSecret: 'your-client-secret',
      projectId: 'your-project-id', // Optional (required if injectIntoProcessEnv is true)
      siteUrl: 'https://app.infisical.com', // Optional
      environment: 'dev', // Optional
      secretPath: '/', // Optional
      renewToken: true, // Optional
      setManuallyAccessToken: 'your-access-token', // Optional
      awsIamLogin: 'your-aws-iam-identity-id', // Optional
      renewAwsIamToken: true, // Optional
      injectIntoProcessEnv: true, // Optional
      watchEnvFile: true, // Optional
      expandSecretReferences: true, // Optional
      viewSecretValue: true, // Optional
      recursive: false, // Optional
      includeImports: false // Optional
    })
  ]
})
export class AppModule {}
```

## Async Register

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InfisicalModule } from 'nestjs-infisical-sdk';

@Module({
  imports: [
    ConfigModule.forRoot(),
    InfisicalModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        clientId: configService.get<string>('INFISICAL_CLIENT_ID'),
        clientSecret: configService.get<string>('INFISICAL_CLIENT_SECRET'),
        projectId: configService.get<string>('INFISICAL_PROJECT_ID'), // Optional (required if injectIntoProcessEnv is true)
        siteUrl: configService.get<string>('INFISICAL_SITE_URL'), // Optional
        environment: configService.get<string>('INFISICAL_ENVIRONMENT'), // Optional
        secretPath: '/', // Optional
        renewToken: false, // Optional
        setManuallyAccessToken: configService.get<string>('INFISICAL_ACCESS_TOKEN'), // Optional
        awsIamLogin: configService.get<string>('INFISICAL_AWS_IAM_LOGIN'), // Optional
        renewAwsIamToken: false, // Optional
        injectIntoProcessEnv: true, // Optional
        watchEnvFile: true, // Optional
        expandSecretReferences: true, // Optional
        viewSecretValue: true, // Optional
        recursive: false, // Optional
        includeImports: false // Optional
      }),
      inject: [ConfigService]
    })
  ]
})
export class AppModule {}
```

## Inject The Service

```typescript
import { Injectable, Logger } from '@nestjs/common';
import {
  CreateDynamicSecretResult,
  CreateSecretResult,
  DeleteDynamicSecretResult,
  DeleteSecretResult,
  DynamicSecretProviders,
  GetSecretResult,
  InfisicalService,
  InjectInfisical,
  ListSecretsResult,
  UpdateSecretResult,
  CreateProjectResponse,
  Membership,
  CreateEnvironmentResponse,
  CreateFolderResponse,
  ListFoldersResponse,
  CreateKmsKeyResponse,
  KeyUsage,
  EncryptionAlgorithm,
  GetKmsKeyByNameResponse,
  DeleteKmsKeyResponse,
  KmsEncryptResponse,
  KmsDecryptResponse,
  KmsSignDataResponse,
  SigningAlgorithm,
  KmsVerifyDataResponse,
  KmsGetPublicKeyResponse,
  KmsListSigningAlgorithmsResponse
} from 'nestjs-infisical-sdk';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(@InjectInfisical() private readonly infiscalService: InfisicalService) {}

  public async getSecret(secretName: string): Promise<GetSecretResult> {
    this.logger.log(`Getting secret: ${secretName}`);
    const secretResponse = await this.infiscalService.secrets().getSecret({
      environment: 'dev',
      secretName,
      projectId: process.env.INFISICAL_PROJECT_ID
    });
    this.logger.log(`Secret retrieved: ${JSON.stringify(secretResponse)}`);
    return secretResponse;
  }

  public async createSecret(secretName: string, secretValue: string): Promise<CreateSecretResult> {
    this.logger.log(`Creating secret: ${secretName}`);
    const secret = await this.infiscalService.secrets().createSecret(secretName, {
      environment: 'dev',
      secretValue,
      projectId: process.env.INFISICAL_PROJECT_ID
    });
    this.logger.log(`Secret created: ${JSON.stringify(secret)}`);
    return secret;
  }

  public async updateSecret(secretName: string, secretValue: string): Promise<UpdateSecretResult> {
    this.logger.log(`Updating secret: ${secretName}`);
    const secret = await this.infiscalService.secrets().updateSecret(secretName, {
      environment: 'dev',
      secretValue,
      projectId: process.env.INFISICAL_PROJECT_ID
    });
    this.logger.log(`Secret updated: ${JSON.stringify(secret)}`);
    return secret;
  }

  public async deleteSecret(secretName: string): Promise<DeleteSecretResult> {
    this.logger.log(`Deleting secret: ${secretName}`);
    const secret = await this.infiscalService.secrets().deleteSecret(secretName, {
      environment: 'dev',
      projectId: process.env.INFISICAL_PROJECT_ID
    });
    this.logger.log(`Secret deleted: ${JSON.stringify(secret)}`);
    return secret;
  }

  public async listSecrets(): Promise<ListSecretsResult> {
    this.logger.log('Listing secrets');
    const secrets = await this.infiscalService.secrets().listSecrets({
      environment: 'dev',
      projectId: process.env.INFISICAL_PROJECT_ID
    });
    this.logger.log(`Secrets listed: ${JSON.stringify(secrets)}`);
    return secrets;
  }

  public async createDynamicSecret(): Promise<CreateDynamicSecretResult> {
    const createDynamicSecret = await this.infiscalService.dynamicSecrets().create({
      provider: {
        type: DynamicSecretProviders.Redis,
        inputs: {
          host: 'localhost',
          port: 6379,
          username: 'user1',
          password: '12345612356',
          creationStatement: `ACL SETUSER {{user1}} on >{{123456123456}} ~* &* +@all`,
          revocationStatement: `ACL DELUSER {{user1}}`
        }
      },
      defaultTTL: '1h',
      environmentSlug: 'dev',
      name: 'dynamic-secret-name',
      projectSlug: 'project-slug'
    });

    this.logger.log(`Dynamic secret created: ${JSON.stringify(createDynamicSecret)}`);
    return createDynamicSecret;
  }

  public async deleteDynamicSecret(dynamicSecretName: string): Promise<DeleteDynamicSecretResult> {
    const deleteDynamicSecret = await this.infiscalService
      .dynamicSecrets()
      .delete(dynamicSecretName, {
        environmentSlug: 'dev',
        projectSlug: 'project-slug'
      });

    return deleteDynamicSecret;
  }

  public async createProject(): Promise<CreateProjectResponse> {
    const project = await this.infiscalService.projects().create({
      projectName: 'My New Project',
      type: 'secret-manager',
      projectDescription: 'Project description', // Optional
      slug: 'my-new-project' // Optional
    });

    this.logger.log(`Project created: ${JSON.stringify(project)}`);
    return project;
  }

  public async inviteMembers(projectId: string): Promise<Membership[]> {
    const memberships = await this.infiscalService.projects().inviteMembers({
      projectId,
      emails: ['user1@example.com', 'user2@example.com'], // Optional
      usernames: ['username1', 'username2'], // Optional
      roleSlugs: ['member'] // Optional, defaults to 'member'
    });

    this.logger.log(`Members invited: ${JSON.stringify(memberships)}`);
    return memberships;
  }

  // Environments Management
  public async createEnvironment(projectId: string): Promise<CreateEnvironmentResponse> {
    const environment = await this.infiscalService.environments().create({
      name: 'staging',
      projectId,
      slug: 'stg',
      position: 2 // Optional
    });

    this.logger.log(`Environment created: ${JSON.stringify(environment)}`);
    return environment;
  }

  // Folders Management
  public async createFolder(projectId: string): Promise<CreateFolderResponse> {
    const folder = await this.infiscalService.folders().create({
      name: 'api-keys',
      path: '/',
      projectId,
      environment: 'dev',
      description: 'Folder for API keys' // Optional
    });

    this.logger.log(`Folder created: ${JSON.stringify(folder)}`);
    return folder;
  }

  public async listFolders(projectId: string): Promise<ListFoldersResponse> {
    const folders = await this.infiscalService.folders().listFolders({
      environment: 'dev',
      projectId,
      path: '/', // Optional
      recursive: false // Optional
    });

    this.logger.log(`Folders listed: ${JSON.stringify(folders)}`);
    return folders;
  }

  // KMS - Key Management
  public async createEncryptionKey(projectId: string): Promise<CreateKmsKeyResponse> {
    const encryptionKey = await this.infiscalService.kms().keys().create({
      projectId,
      name: 'my-encryption-key',
      description: 'Key for encrypting sensitive data',
      keyUsage: KeyUsage.ENCRYPTION,
      encryptionAlgorithm: EncryptionAlgorithm.AES_256_GCM
    });

    this.logger.log(`Encryption key created: ${JSON.stringify(encryptionKey)}`);
    return encryptionKey;
  }

  public async createSigningKey(projectId: string): Promise<CreateKmsKeyResponse> {
    const signingKey = await this.infiscalService.kms().keys().create({
      projectId,
      name: 'my-signing-key',
      description: 'Key for signing documents',
      keyUsage: KeyUsage.SIGNING,
      encryptionAlgorithm: EncryptionAlgorithm.RSA_4096
    });

    this.logger.log(`Signing key created: ${JSON.stringify(signingKey)}`);
    return signingKey;
  }

  public async getKeyByName(projectId: string, keyName: string): Promise<GetKmsKeyByNameResponse> {
    const key = await this.infiscalService.kms().keys().getByName({
      projectId,
      name: keyName
    });

    this.logger.log(`Key retrieved: ${JSON.stringify(key)}`);
    return key;
  }

  public async deleteKey(keyId: string): Promise<DeleteKmsKeyResponse> {
    const deletedKey = await this.infiscalService.kms().keys().delete({
      keyId
    });

    this.logger.log(`Key deleted: ${JSON.stringify(deletedKey)}`);
    return deletedKey;
  }

  // KMS - Encryption
  public async encryptData(keyId: string, plaintext: string): Promise<KmsEncryptResponse> {
    // Plaintext must be base64 encoded
    const base64Data = Buffer.from(plaintext).toString('base64');

    const encrypted = await this.infiscalService.kms().encryption().encrypt({
      keyId,
      plaintext: base64Data
    });

    this.logger.log(`Data encrypted: ${encrypted}`);
    return encrypted;
  }

  public async decryptData(keyId: string, ciphertext: string): Promise<KmsDecryptResponse> {
    const decrypted = await this.infiscalService.kms().encryption().decrypt({
      keyId,
      ciphertext
    });

    this.logger.log(`Data decrypted: ${decrypted}`);
    return decrypted;
  }

  public async signData(keyId: string, data: string): Promise<KmsSignDataResponse> {
    const signature = await this.infiscalService
      .kms()
      .signing()
      .sign({
        keyId,
        data: Buffer.from(data).toString('base64'), // Must be base64 encoded
        signingAlgorithm: SigningAlgorithm.RSASSA_PSS_SHA_256,
        isDigest: false // Optional: set to true if data is already a hash digest
      });

    this.logger.log(`Data signed: ${JSON.stringify(signature)}`);
    return signature;
  }

  public async verifySignature(
    keyId: string,
    data: string,
    signature: string
  ): Promise<KmsVerifyDataResponse> {
    const verification = await this.infiscalService
      .kms()
      .signing()
      .verify({
        keyId,
        data: Buffer.from(data).toString('base64'), // Must be base64 encoded
        signature,
        signingAlgorithm: SigningAlgorithm.RSASSA_PSS_SHA_256,
        isDigest: false // Optional
      });

    this.logger.log(`Signature valid: ${verification.signatureValid}`);
    return verification;
  }

  public async getPublicKey(keyId: string): Promise<KmsGetPublicKeyResponse> {
    const publicKey = await this.infiscalService.kms().signing().getPublicKey({
      keyId
    });

    this.logger.log(`Public key: ${publicKey}`);
    return publicKey;
  }

  public async listSigningAlgorithms(keyId: string): Promise<KmsListSigningAlgorithmsResponse> {
    const algorithms = await this.infiscalService.kms().signing().listSigningAlgorithms({
      keyId
    });

    this.logger.log(`Supported algorithms: ${JSON.stringify(algorithms)}`);
    return algorithms;
  }
}
```

## Example Nest.js Project

Looking for a working example?
[NestJS Infisical Example](https://github.com/c4nzin/nestjs-infisical-example)

## Contribute

We welcome contributions! Feel free to open an issue or submit a pull request.

For more details, visit the [GitHub repository](https://github.com/c4nzin/nestjs-infisical-sdk).
