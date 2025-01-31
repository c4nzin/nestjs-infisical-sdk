# NestJS Infisical SDK

This project provides a NestJS module for integrating with the Infisical SDK, allowing users to manage secrets easily within their applications.

NOTE: This is not a official library!

## Installation

To install the package, run:

```bash
npm install nestjs-infisical-sdk
```

```typescript
import { Module } from "@nestjs/common";
import { InfisicalModule } from "nestjs-infisical-sdk";

@Module({
  imports: [
    InfisicalModule.register({
      clientId: "your-client-id",
      clientSecret: "your-client-secret",
      projectId: "your-project-id",
      siteUrl: "https://app.infisical.com", // Optional
    }),
  ],
})
export class AppModule {}
```

## Inject The Service

```typescript
import { Injectable } from "@nestjs/common";
import { InjectInfisical, InfisicalService } from "nestjs-infisical-sdk";

@Injectable()
export class SomeService {
  constructor(
    @InjectInfisical() private readonly infisicalService: InfisicalService
  ) {}

  async someMethod() {
    const allSecrets = await this.infisicalService.listSecrets("dev");
    console.log("Fetched secrets", allSecrets);

    const specificSecret = await this.infisicalService.getSecret(
      "my-secret",
      "dev"
    );
    console.log("Fetched specific secret", specificSecret);
  }
}
```
