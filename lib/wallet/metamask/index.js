import { BrowserProvider } from "ethers";
import { MetaMaskSDK } from "@metamask/sdk";
class Metamask {
    constructor(MMSDKOptions) {
        this.MMSDK = new MetaMaskSDK(MMSDKOptions);
    }
    async connect() {
        let res = await this.MMSDK.connect();
        this.web3Provider = this.MMSDK.getProvider();
        const ethersProvider = new BrowserProvider(this.web3Provider);
        this.signer = await ethersProvider.getSigner();
        this.address = this.signer.address;
    }
    async disconnect() {
        console.log("metamask disconnect!");
    }
    onAccountsChanged(callBack) {
        this.web3Provider.on("accountsChanged", accounts => callBack(accounts));
    }
    onChainChanged(callBack) {
        this.web3Provider.on("chainChanged", chainId => callBack(chainId));
    }
    async switchEthereumChain(params) {
        await this.web3Provider.request({ method: "wallet_addEthereumChain", params: [params] });
    }
}
export { Metamask };
