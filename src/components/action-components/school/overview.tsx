import { ScrollArea } from '@components/ui/scroll-area';
import SmolCard from '@components/v2/smol-card';
import { NFTObject, Stake } from '@model/model';
import { BigNumber } from 'ethers';

const SchoolOverview = ({
  sortedNFTs,
  selected,
  onSelect,
}: {
  sortedNFTs: NFTObject[];
  selected: BigNumber[];
  onSelect: (id: BigNumber) => void;
}) => {
  const getDailyRate = (stakes: Stake[]) => {
    const amount = stakes.reduce((acc: number, stake: Stake) => (acc += stake.amountStaked), 0);
    return ((amount / 1000) * 0.1).toFixed(1);
  };

  const calcCommenSenseEarned = (nft: NFTObject) => {
    const now = new Date();

    const amount = nft?.stakes?.reduce((acc: number, stake: Stake) => {
      const daysStaked = Math.round(
        (now.getTime() - stake.startTime.getTime()) / (1000 * 60 * 60 * 24),
      );
      acc += (stake.amountStaked / 1000) * 0.1 * daysStaked;
      return acc;
    }, 0);

    return (amount + nft.commonSense || 0).toFixed(1);
  };

  const filteredNFTs = sortedNFTs
    .filter((n) => n.staked && n.stakedLocation === 'bone_yard')
    .sort((a, b) => a.amountStaked - b.amountStaked)
    .reverse();

  if (!filteredNFTs.length) {
    return (
      <div className="mx-auto mb-8 flex w-full max-w-xs items-center justify-center rounded-md bg-background-dark p-4">
        <p className="text-center">
          Your Neandersmols are ready to go to school. Stake them in the Bone Yard and come back!
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="mask-bottom mt-6 max-h-[50vh] w-full pb-2">
      <div className="grid w-full grid-cols-2 gap-2 px-1 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filteredNFTs.map((nft: NFTObject) => {
          return (
            <SmolCard
              nft={nft}
              isSelected={selected?.includes(nft.id)}
              handleClick={() => onSelect(nft.id)}
              showLock={false}
            >
              <div className="mt-1 w-full pl-1 text-left text-[10px] font-semibold uppercase tracking-tighter">
                <p className="absolute left-1/2 top-[16%] w-full max-w-[80%] -translate-x-1/2 rounded-full bg-accent px-4 py-2 text-center font-semibold text-white">
                  +{nft.stakes ? <>{getDailyRate(nft.stakes)}</> : '0'} CS per day
                </p>
                <div className="flex justify-between">
                  <p>$Bones Attached:</p>
                  <p>{nft.amountStaked ?? '0'}</p>
                </div>
                <div className="flex justify-between">
                  <p>CS:</p>
                  <p>{calcCommenSenseEarned(nft)}</p>
                </div>
              </div>
            </SmolCard>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default SchoolOverview;
