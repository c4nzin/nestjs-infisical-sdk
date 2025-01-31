import { Inject } from "@nestjs/common";
import { InfisicalService } from "../infisical.service";

export const InjectInfisical = () => Inject(InfisicalService);
