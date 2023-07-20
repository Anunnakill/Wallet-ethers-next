interface ISwitchEthereumChainParameter {
    chainId: string;
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    };
    rpcUrls: string[];
}
export type { ISwitchEthereumChainParameter };
