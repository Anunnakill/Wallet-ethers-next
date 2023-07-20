import { BrowserProvider, JsonRpcSigner } from "ethers";
import { MetaMaskSDK, SDKProvider } from "@metamask/sdk";
import { ISwitchEthereumChainParameter } from "./interface";
import { MetaMaskSDKOptions } from "@metamask/sdk/dist/browser/es/src/sdk";

class Metamask {
  public address!: string;
  public signer!: JsonRpcSigner;
  public web3Provider!: SDKProvider;

  private MMSDK: MetaMaskSDK;

  constructor(MMSDKOptions?: MetaMaskSDKOptions) {
    this.MMSDK = new MetaMaskSDK(MMSDKOptions);
  }

  public async connect() {
    this.web3Provider = this.MMSDK.getProvider();
    await this.web3Provider.request({ method: "eth_requestAccounts", params: [] });

    const ethersProvider = new BrowserProvider(this.web3Provider);
    this.signer = await ethersProvider.getSigner();
    this.address = this.signer.address;
  }

  public async disconnect() {
    console.log("metamask disconnect!");
  }

  public onAccountsChanged(callBack: Function) {
    this.web3Provider.on("accountsChanged", accounts => callBack(accounts));
  }

  public onChainChanged(callBack: Function) {
    this.web3Provider.on("chainChanged", chainId => callBack(chainId));
  }

  public async switchEthereumChain(params: ISwitchEthereumChainParameter) {
    await this.web3Provider.request({ method: "wallet_addEthereumChain", params: [params] });
  }
}

export { Metamask };
export type { MetaMaskSDKOptions };
