import { BrowserProvider } from "ethers";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
class Walletconnect {
    constructor(ethereumProviderOptions) {
        this.ethereumProviderOptions = ethereumProviderOptions;
    }
    async connect() {
        this.web3Provider = await EthereumProvider.init(this.ethereumProviderOptions);
        await this.web3Provider.enable();
        const ethersProvider = new BrowserProvider(this.web3Provider);
        this.signer = await ethersProvider.getSigner();
        this.address = this.signer.address;
    }
    async disconnect() {
        await this.web3Provider.disconnect();
    }
    onAccountsChanged(callBack) {
        this.web3Provider.on("accountsChanged", accounts => callBack(accounts));
    }
    onChainChanged(callBack) {
        this.web3Provider.on("chainChanged", chainId => callBack(chainId));
    }
    async switchEthereumChain() {
        throw new Error("Does not support switchEthereumChain");
    }
}
export { Walletconnect };
