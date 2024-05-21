import { Button } from '@components/ui/button';
import { ContractContext } from '@context/contract-context';
import { NFTObject } from '@model/model';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { cn } from '@lib/utils';
import { Koulen } from 'next/font/google';
import { Caesar_Dressing } from 'next/font/google';

const koulen = Caesar_Dressing({ subsets: ['latin'], weight: ['400'] });

const dinopiaFontStyle = {
  fontFamily: 'Dinopia, sans-serif',
  fontWeight: 300, // Light font weight
};

export const ClaimBoneyardReward = () => {
  const router = useRouter();
  const { isLoading, claimBones, nfts } = useContext(ContractContext);

  const claimableBones = nfts?.reduce(
    (acc: number, nft: NFTObject) => (acc += Number(nft?.reward ?? 0)),
    0,
  );
  const rewardTokens = nfts?.filter((nft) => Number(nft.reward) > 0).map((nft) => nft.id);

  return (
    <Button
      disabled={claimableBones === 0}
      onClick={async () => {
        await claimBones(rewardTokens);
        router.refresh();
      }}
      className="rounded-2xl border-2 border-accent px-4 text-[0.75rem] uppercase"
      style={dinopiaFontStyle}
    >
      {isLoading === 'claimCaveReward' ? (
        <Loader2 className="inline-flex animate-spin" size={14} color="#cee7d6" />
      ) : (
        `Claim ${claimableBones > 0 ? claimableBones : ''} $BONES`
      )}
    </Button>
  );
};
