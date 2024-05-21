import { ContractContext } from '@context/contract-context';
import { NFTObject } from '@model/model';
import { utils } from 'ethers';
import Image from 'next/image';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

interface BonesInterface {
  setModalOn: Dispatch<SetStateAction<boolean>>;
  nft: NFTObject;
  setNft: Dispatch<SetStateAction<NFTObject>>;
}

const BonesModal: React.FC<BonesInterface> = ({ setModalOn, nft, setNft }) => {
  const { stakeBones, unstakeBones } = useContext(ContractContext);

  const [bonesToStake, setBonestoStake] = useState(1000);

  const handleBonesUpdateClick = (type: string) => {
    if (type === 'up') {
      setBonestoStake((bones) => (bones += 1000));
    } else if (type === 'down' && bonesToStake - 1000 >= 1000) {
      setBonestoStake((bones) => (bones -= 1000));
    }
  };

  const handleCancelClick = () => {
    setModalOn(false);
    setNft(null);
  };

  const handleOnClick = async () => {
    const success = await stakeBones(utils.parseUnits(String(bonesToStake), 18), nft.id);
    if (success) handleCancelClick();
  };

  const handleUnstakeBones = async (s) => {
    const success = await unstakeBones(s.startTime, s.tokenId);
    if (success) handleCancelClick();
  };

  const getDailyRate = (stakes) => {
    let amount = 0;
    stakes.forEach((s) => {
      amount += s.amountStaked;
    });
    return ((amount / 1000) * 0.1).toFixed(2);
  };

  const getTimeDifferenceInDays = (stake) => {
    const now = new Date();
    const difference = now.getTime() - stake.startTime.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days;
  };

  const pastThirtyDays = (stake) => {
    const now = new Date();
    const difference = now.getTime() - stake.startTime.getTime();
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days >= 30;
  };

  const calcCommenSenseEarned = (object) => {
    let amount = 0;
    object.stakes.forEach((s) => {
      const days = getTimeDifferenceInDays(s);
      if (days > 1) {
        amount += (s.amountStaked / 1000) * 0.1 * (days - 1);
      }
    });
    return (amount + object.commonSense).toFixed(2);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 bg-black/80">
      <div
        aria-hidden="true"
        className="hide-scrollbars hide-scrollbars fixed z-50 h-full w-full overflow-y-auto overflow-x-hidden md:inset-0"
      >
        <div className="relative mx-auto h-full w-full p-4 md:h-auto md:p-20">
          <div className="border-yellow relative h-full border-2 bg-[#24261F]/[.97]">
            <div className="mt-4 flex flex-col items-center">
              <h3 className="mb-2 text-sm font-semibold md:text-lg">
                Add / Remove
                <span className="max-md:hidden">
                  <br /> Bones
                </span>
              </h3>
              <button
                type="button"
                onClick={handleCancelClick}
                className="yellow-text absolute right-5 top-2 text-4xl"
              >
                X
              </button>
              <div className="border-yellow w-80 border-2" />
            </div>

            <div className="w-1/8 m:w-48 mb-2 mt-2 flex flex-col items-center p-1">
              {nft && (
                <>
                  <div className="flex flex-col items-center">
                    <Image
                      id={nft.id.toString()}
                      src={nft.image}
                      alt={nft.id.toString()}
                      height={128}
                      width={128}
                    />
                    <p className="mb-2 mt-2 text-[10px] font-bold text-white">
                      #{nft.id.toString()}
                    </p>
                    <p className="mb-2 mt-2 text-[10px] font-bold text-white">
                      Bones Carrying: {nft.amountStaked ?? '0'}
                    </p>
                    <p className="mb-2 mt-2 text-[10px] font-bold text-white">
                      Daily Rate: {nft.stakes ? <>{getDailyRate(nft.stakes)}</> : '0'}
                    </p>

                    <p className="mb-2 mt-2 text-[10px] font-bold text-white">
                      Common Sense:
                      {nft.stakes ? <>{calcCommenSenseEarned(nft)}</> : '0'}
                    </p>

                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <button
                          className="mb-2 h-8 w-8 border p-2"
                          onClick={() => handleBonesUpdateClick('up')}
                        >
                          <FaArrowUp />
                        </button>
                        <button
                          className="h-8 w-8 border p-2"
                          onClick={() => handleBonesUpdateClick('down')}
                        >
                          <FaArrowDown />
                        </button>
                      </div>
                      <button
                        className="yellow-background pixel-button flex h-16 items-center p-2 text-xs md:grow"
                        onClick={handleOnClick}
                      >
                        Add {bonesToStake} $BONES
                      </button>
                    </div>
                  </div>

                  <hr className="yellow-hr mb-5 mt-5 h-5 w-[90%]" />

                  {nft.stakes && (
                    <div className="hide-scrollbars max-h-40 overflow-y-scroll">
                      {nft.stakes.map((s, idx) => {
                        const days = getTimeDifferenceInDays(s);
                        return (
                          <div className="mb-5 flex flex-col items-center text-center" key={idx}>
                            {s.amountStaked} $BONES staked for {days > 1 ? 'days' : 'day'}
                            <button
                              type="button"
                              className={`pixel-button mt-2 h-16 p-2 text-xs md:grow  ${
                                !pastThirtyDays(s) ? 'red-background' : 'yellow-background'
                              }`}
                              onClick={() => handleUnstakeBones(s)}
                            >
                              Remove $BONES
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonesModal;
