import { Chain, configureChains, createClient } from 'wagmi';
import { arbitrum, arbitrumGoerli } from 'wagmi/chains';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { infuraProvider } from 'wagmi/providers/infura';

export const chains: Chain[] = [arbitrum, arbitrumGoerli];
// process.env.NODE_ENV === 'development' && chains.push(arbitrumGoerli);

const apiKey = process.env.NEXT_PUBLIC_INFURA_ID;

const { provider } = configureChains(chains, [infuraProvider({ apiKey })]);

export const client = createClient({
  autoConnect: true,
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: 'cc119023d427d6ba3d92ba2fe251569f',
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Smol Age',
      },
    }),
  ],
  provider,
});
