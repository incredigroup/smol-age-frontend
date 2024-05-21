import { Button } from '@components/ui/button';
import { ContractContext } from '@context/contract-context';
import { BigNumber } from 'ethers';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { cn } from '@lib/utils';
import { Koulen } from 'next/font/google';
import { Caesar_Dressing } from 'next/font/google';

const koulen = Caesar_Dressing({ subsets: ['latin'], weight: ['400'] });

const dinopiaFontStyle = {
  fontFamily: 'Dinopia, sans-serif',
  fontWeight: 300, // Light font weight
};

export const EnterCaves = ({ selected }: { selected: BigNumber[] }) => {
  const { enterCaves, isLoading, nfts } = useContext(ContractContext);

  const filteredNfts = selected?.filter((id) => !nfts.find((nft) => nft.id === id).staked);

  return (
    <Button
      onClick={() => enterCaves(filteredNfts)}
      className="rounded-2xl border-2 border-accent px-4 text-[0.75rem] uppercase"
      style={dinopiaFontStyle}
    >
      {isLoading === 'enterCaves' ? (
        <Loader2 className="inline-flex animate-spin" size={14} color="#cee7d6" />
      ) : (
        'Hibernate Selected'
      )}
    </Button>
  );
};
