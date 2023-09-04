import { ParticleProvider } from "@particle-network/provider";
import { BrowserProvider } from "ethers";
import { ParticleNetwork } from "@particle-network/auth";
class Particle {
    constructor(particleConfig) {
        this.particle = new ParticleNetwork(particleConfig.networkConfig);
        this.particleConfig = particleConfig;
    }
    async connect() {
        if (!this.particle.auth.isLogin())
            await this.particle.auth.login(this.particleConfig.loginOptions);
        this.web3Provider = new ParticleProvider(this.particle.auth);
        const ethersProvider = new BrowserProvider(this.web3Provider);
        this.signer = await ethersProvider.getSigner();
        this.address = this.signer.address;
    }
    async disconnect() {
        await this.particle.auth.logout();
    }
    onAccountsChanged(callBack) {
        console.log("onAccountsChanged!");
    }
    onChainChanged(callBack) {
        this.particle.auth.on("chainChanged", chainId => callBack(chainId));
    }
    async switchEthereumChain(params) {
        await this.particle.switchChain(params);
    }
}
export { Particle };
