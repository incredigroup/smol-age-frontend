import { NFTObject } from '@model/model';
import { toDaysNumber } from '@utils';
import { formatEther } from 'ethers/lib/utils.js';

export const Stat = ({ id, nft }: { id: string; nft: NFTObject }) => {
  switch (id) {
    case 'cs':
      return <p className="text-right">{nft.commonSense || 0} CS</p>;
    case 'days':
      return (
        <>
          {nft.staked ? (
            <div className="flex items-center justify-between">
              <p>Days Remaining:</p>
              <p>{toDaysNumber(nft.endTime ?? 0)}</p>
            </div>
          ) : (
            <></>
          )}
        </>
      );
    case 'bones':
      return (
        <>
          {nft.staked ? (
            <div className="flex items-center justify-between">
              <p>Bones Accrued:</p>
              <p>{parseFloat(formatEther(nft.reward ?? 0).toString()).toFixed(0)}</p>
            </div>
          ) : (
            <></>
          )}
        </>
      );
    case 'default':
      return <></>;
  }
};
