import { client } from '@/client';
import { cn } from '@/lib/utils';
import { Navigation } from '@components/Navigation';
import { GroundsModal } from '@components/modals/GroundsModal';
import { InventoryBox } from '@components/modals/InventoryBox';
import WalletProvider from '@components/wallet-provider';
import Header from '@header';
import '@styles/global.css';
import { type AppType } from 'next/app';
import { Koulen } from 'next/font/google';
import { Caesar_Dressing } from 'next/font/google';
import { Toaster } from 'sonner';
import { WagmiConfig } from 'wagmi';

const koulen = Caesar_Dressing({ subsets: ['latin'], weight: ['400'] });

const dinopiaFontStyle = {
  fontFamily: 'Dinopia, sans-serif',
  fontWeight: 300, // Light font weight
};

const MyApp: AppType<{ title?: string }> = ({ Component, pageProps: { title, ...pageProps } }) => (
  <main>
    <Header title={title} />
    <WagmiConfig client={client}>
      <main className="relative min-h-screen" style={dinopiaFontStyle}>
        <Navigation />
        <WalletProvider>
          <GroundsModal />
          <InventoryBox />
          <Component {...pageProps} />
          <Toaster position="bottom-right" richColors />
        </WalletProvider>
      </main>
    </WagmiConfig>
  </main>
);

export default MyApp;
