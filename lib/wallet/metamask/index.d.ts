import { JsonRpcSigner } from "ethers";
import { SDKProvider } from "@metamask/sdk";
import { ISwitchEthereumChainParameter } from "./interface";
import { MetaMaskSDKOptions } from "@metamask/sdk/dist/browser/es/src/sdk";
declare class Metamask {
    address: string;
    signer: JsonRpcSigner;
    web3Provider: SDKProvider;
    private MMSDK;
    constructor(MMSDKOptions?: MetaMaskSDKOptions);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    onAccountsChanged(callBack: Function): void;
    onChainChanged(callBack: Function): void;
    switchEthereumChain(params: ISwitchEthereumChainParameter): Promise<void>;
}
export { Metamask };
export type { MetaMaskSDKOptions };
