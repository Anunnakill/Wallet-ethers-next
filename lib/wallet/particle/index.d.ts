import { Chain } from "@particle-network/common";
import { JsonRpcSigner, Eip1193Provider } from "ethers";
import { IParticleConfig } from "./interface";
declare class Particle {
    address: string;
    signer: JsonRpcSigner;
    web3Provider: Eip1193Provider;
    private particle;
    private particleConfig;
    constructor(particleConfig: IParticleConfig);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    onAccountsChanged(callBack: Function): void;
    onChainChanged(callBack: Function): void;
    switchEthereumChain(params: Chain): Promise<void>;
}
export { Particle };
export type { IParticleConfig };
