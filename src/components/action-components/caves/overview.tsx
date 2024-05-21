import { ScrollArea } from '@components/ui/scroll-area';
import SmolCard from '@components/v2/smol-card';
import { useStakedInCaves } from '@hooks/useStakedInCaves';
import { NFTObject } from '@model/model';
import { toDaysNumber } from '@utils';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils.js';

const CavesOverview = ({
  sortedNFTs,
  selected,
  onSelect,
}: {
  sortedNFTs: NFTObject[];
  selected: BigNumber[];
  onSelect: (id: BigNumber) => void;
}) => {
  const { stakedTokens } = useStakedInCaves();

  return (
    <ScrollArea className="mask-bottom mt-6 max-h-[50vh] w-full pb-2">
      <div className="grid w-full grid-cols-2 gap-2 px-1 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {sortedNFTs.map((nft: NFTObject) => {
          const stakedToken = stakedTokens?.find((t) => t[1].toString() === nft.id.toString());
          const daysRemaining = stakedToken
            ? toDaysNumber(stakedToken.timeLeft.toNumber() ?? 0)
            : 0;
          const bonesAccrued = stakedToken
            ? parseFloat(formatEther(stakedToken.reward ?? 0).toString()).toFixed(0)
            : 0;
          return (
            <SmolCard
              nft={nft}
              isSelected={selected?.includes(nft.id)}
              disabled={nft.staked && nft.stakedLocation !== 'caves'}
              handleClick={() => onSelect(nft.id)}
            >
              <div className="mt-1 w-full pl-1 text-xs uppercase">
                {nft.staked && (
                  <>
                    <div className="flex items-center justify-between">
                      <p>Days Remaining:</p>
                      <p>{daysRemaining}</p>
                      {/* <p>{toDaysNumber(stakedToken.timeLeft.toNumber() ?? 0)}</p> */}
                    </div>
                    <div className="flex items-center justify-between">
                      <p>Bones Accrued:</p>
                      <p>{bonesAccrued}</p>
                      {/* <p>{parseFloat(formatEther(stakedToken.reward ?? 0).toString()).toFixed(0)}</p> */}
                    </div>
                  </>
                )}
              </div>
            </SmolCard>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default CavesOverview;
