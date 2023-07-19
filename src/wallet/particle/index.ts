import { Chain } from "@particle-network/common";
import { ParticleProvider } from "@particle-network/provider";
import { BrowserProvider, JsonRpcSigner, Eip1193Provider } from "ethers";
import { ParticleNetwork } from "@particle-network/auth";
import { IParticleConfig } from "./interface";

class Particle {
  public address!: string;
  public signer!: JsonRpcSigner;
  public web3Provider!: Eip1193Provider;

  private particle: ParticleNetwork;
  private particleConfig: IParticleConfig;

  constructor(particleConfig: IParticleConfig) {
    this.particle = new ParticleNetwork(particleConfig.networkConfig);
    this.particleConfig = particleConfig;
  }

  public async connect() {
    await this.particle.auth.login(this.particleConfig.loginOptions);
    this.web3Provider = new ParticleProvider(this.particle.auth);

    const ethersProvider = new BrowserProvider(this.web3Provider);
    this.signer = await ethersProvider.getSigner();
    this.address = this.signer.address;
  }

  public async disconnect() {
    await this.particle.auth.logout();
  }

  public onAccountsChanged(callBack: Function) {
    console.log("onAccountsChanged!");
  }

  public onChainChanged(callBack: Function) {
    this.particle.auth.on("chainChanged", chainId => callBack(chainId));
  }

  public async switchEthereumChain(params: Chain) {
    await this.particle.switchChain(params);
  }
}

export { Particle };
