import { EthereumProviderOptions, EthereumProvider as IEthereumProvider } from "@walletconnect/ethereum-provider/dist/types/EthereumProvider";
import { JsonRpcSigner } from "ethers";
declare class Walletconnect {
    address: string;
    signer: JsonRpcSigner;
    web3Provider: IEthereumProvider;
    private ethereumProviderOptions;
    constructor(ethereumProviderOptions: EthereumProviderOptions);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    onAccountsChanged(callBack: Function): void;
    onChainChanged(callBack: Function): void;
    switchEthereumChain(): Promise<void>;
}
export { Walletconnect };
export type { EthereumProviderOptions };
