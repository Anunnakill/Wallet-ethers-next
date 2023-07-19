import {
  EthereumProviderOptions,
  EthereumProvider as IEthereumProvider,
} from "@walletconnect/ethereum-provider/dist/types/EthereumProvider";

import { BrowserProvider, JsonRpcSigner } from "ethers";
import { EthereumProvider } from "@walletconnect/ethereum-provider";

class Walletconnect {
  public address!: string;
  public signer!: JsonRpcSigner;
  public web3Provider!: IEthereumProvider;

  private ethereumProviderOptions: EthereumProviderOptions;

  constructor(ethereumProviderOptions: EthereumProviderOptions) {
    this.ethereumProviderOptions = ethereumProviderOptions;
  }

  public async connect() {
    this.web3Provider = await EthereumProvider.init(this.ethereumProviderOptions);
    await this.web3Provider.enable();

    const ethersProvider = new BrowserProvider(this.web3Provider);
    this.signer = await ethersProvider.getSigner();
    this.address = this.signer.address;
  }

  public async disconnect() {
    await this.web3Provider.disconnect();
  }

  public onAccountsChanged(callBack: Function) {
    this.web3Provider.on("accountsChanged", accounts => callBack(accounts));
  }

  public onChainChanged(callBack: Function) {
    this.web3Provider.on("chainChanged", chainId => callBack(chainId));
  }

  public async switchEthereumChain() {
    throw new Error("Does not support switchEthereumChain");
  }
}

export { Walletconnect };
