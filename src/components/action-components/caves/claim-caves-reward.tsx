import { Button } from '@components/ui/button';
import { ContractContext } from '@context/contract-context';
import { useStakedInCaves } from '@hooks/useStakedInCaves';
import { formatRewards } from '@utils';
import { BigNumber } from 'ethers';
import { Loader2 } from 'lucide-react';
import { useContext, useMemo } from 'react';
import { cn } from '@lib/utils';
import { Koulen } from 'next/font/google';
import { Caesar_Dressing } from 'next/font/google';

const koulen = Caesar_Dressing({ subsets: ['latin'], weight: ['400'] });

const dinopiaFontStyle = {
  fontFamily: 'Dinopia, sans-serif',
  fontWeight: 300, // Light font weight
};

export const ClaimCavesReward = () => {
  const { stakedTokens } = useStakedInCaves();
  const { claimCaveReward, isLoading } = useContext(ContractContext);

  // const { tokensWithReward, claimableRewards } = useMemo(
  //     () => stakedTokens.reduce((acc, token) => {
  //         if (BigNumber.from(token.reward).gt(0)) {
  //             acc.tokensWithReward.push(token.stakedSmols);
  //             acc.claimableRewards = acc.claimableRewards.add(token.reward);
  //         }
  //         return acc;
  //     }, { tokensWithReward: [] as BigNumber[], claimableRewards: BigNumber.from(0) }),
  //     [stakedTokens],
  // );

  const { tokensWithReward, claimableRewards } = useMemo(() => {
    if (!stakedTokens) {
      return { tokensWithReward: [], claimableRewards: BigNumber.from(0) };
    }

    return stakedTokens.reduce(
      (acc, token) => {
        if (BigNumber.from(token.reward).gt(0)) {
          acc.tokensWithReward.push(token.stakedSmols);
          acc.claimableRewards = acc.claimableRewards.add(token.reward);
        }
        return acc;
      },
      { tokensWithReward: [] as BigNumber[], claimableRewards: BigNumber.from(0) },
    );
  }, [stakedTokens]);

  return (
    <Button
      disabled={
        isLoading === 'claimCaveReward' || !tokensWithReward || tokensWithReward.length === 0
      }
      onClick={async () => claimCaveReward(tokensWithReward)}
      className="rounded-2xl border-2 border-accent px-4 text-[0.75rem] uppercase"
      style={dinopiaFontStyle}
    >
      {isLoading === 'claimCaveReward' ? (
        <Loader2 className="inline-flex animate-spin" size={14} color="#cee7d6" />
      ) : (
        `Claim ${formatRewards(claimableRewards)} $BONES`
      )}
    </Button>
  );
};
