import { InfisicalSDK } from "@infisical/sdk";
import { Inject } from "@nestjs/common";

export const InjectInfisical = () => Inject(InfisicalSDK);
