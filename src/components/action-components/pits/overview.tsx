import { GroundsState } from '@components/BonesStaked';
import ClientOnly from '@components/ClientOnly';
import { ScrollArea } from '@components/ui/scroll-area';
import { useHasCouncilPass } from '@hooks/useHasCouncilPass';
import { useStakedInPits } from '@hooks/useStakedInPits';
import { useUserStakedInPits } from '@hooks/useUserStakedInPits';
import { cn } from '@lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import { StakeInPits } from './stake';
import { BigNumber } from 'ethers';
import { Koulen } from 'next/font/google';
import { Caesar_Dressing } from 'next/font/google';

const koulen = Caesar_Dressing({ subsets: ['latin'], weight: ['400'] });

const dinopiaFontStyle = {
  fontFamily: 'Dinopia, sans-serif',
  fontWeight: 300, // Light font weight
};

const PitsOverview = () => {
  const { percentage, open, refetch: refetchTotal } = useStakedInPits();
  const { hasCouncilPass } = useHasCouncilPass();
  const { data, refetch } = useUserStakedInPits();

  const refetchAll = useCallback(() => {
    refetchTotal();
    refetch();
  }, [refetch, refetchTotal]);

  return (
    <ScrollArea className="mask-bottom mx-auto mt-6 max-h-[50vh] w-full max-w-[750px] pb-2">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2" style={dinopiaFontStyle}>
        <div className="col-span-1 rounded-lg bg-background-dark p-4 max-md:mx-auto md:w-full">
          <p className="text-center font-medium uppercase">
            You do {!hasCouncilPass && <span className="text-[#9F4F3B]">not</span>} own a council
            pass
          </p>
          <Image
            src="/static/images/council-pass.gif"
            alt="Council Pass"
            width={600}
            height={600}
            className={cn(!hasCouncilPass && 'grayscale', 'mx-auto my-2 w-[250px]')}
          />
          {!hasCouncilPass && (
            <div className="flex justify-center">
              <Link
                target="_blank"
                href="https://app.treasure.lol/collection/smol-age-council-passes/0"
                rel="noopener noreferrer"
                className="rounded-full bg-primary px-6 py-1.5 text-xs uppercase hover:bg-primary/80"
              >
                View on Marketplace
              </Link>
            </div>
          )}
        </div>
        <div className="col-span-1 mx-auto w-full rounded-lg bg-background-dark p-4 text-center">
          <p className="font-medium uppercase">Amount staked</p>

          <StakeInPits
            balance={data?.bonesBalance}
            staked={data?.bonesStaked}
            refetch={refetchAll}
          />

          <div className="mt-10 md:mt-20">
            <ClientOnly>
              <span className="text-center uppercase text-white">
                Total Amount Staked:
                <br />
                {BigNumber.from(data.bonesStaked).toNumber()}
              </span>
              <GroundsState percentage={percentage.toFixed(1)} open={open} />
            </ClientOnly>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default PitsOverview;
