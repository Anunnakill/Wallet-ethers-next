import { Config, LoginOptions } from "@particle-network/auth";

interface IParticleConfig {
  networkConfig: Config;
  loginOptions: LoginOptions;
}

export type { IParticleConfig };
