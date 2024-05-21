import { ScrollArea } from '@components/ui/scroll-area';
import SmolCard from '@components/v2/smol-card';
import { NFTObject } from '@model/model';
import { BigNumber } from 'ethers';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IoMdLock } from 'react-icons/io';
import { stakedLocationImage } from '@constants';
import { Dispatch, SetStateAction } from 'react';
import { cn } from '@lib/utils';
import { Koulen } from 'next/font/google';
import { Caesar_Dressing } from 'next/font/google';

const koulen = Caesar_Dressing({ subsets: ['latin'], weight: ['400'] });

const dinopiaFontStyle = {
  fontFamily: 'Dinopia, sans-serif',
  fontWeight: 300, // Light font weight
};

const BoneyardOverview = ({
  sortedNFTs,
  selected,
  onSelect,
  selectedNFT,
  setSelectedNFT,
  gotoDetail,
}: {
  sortedNFTs: NFTObject[];
  selected: BigNumber[];
  onSelect: (id: BigNumber) => void;
  selectedNFT: NFTObject;
  setSelectedNFT: Dispatch<SetStateAction<NFTObject>>;
  gotoDetail: (nft: NFTObject) => void;
}) => {
  const filteredNFTs = sortedNFTs
    .filter((n) => !n.staked || (n.staked && n.stakedLocation === 'bone_yard'))
    .sort((a, b) => a.amountStaked - b.amountStaked)
    .reverse();

  useEffect(() => {
    return () => {
      setSelectedNFT(null);
    };
  }, []);

  return (
    <>
      <ScrollArea className="mask-bottom mt-4 max-h-[40vh] w-full pb-2">
        {selectedNFT == null ? (
          <div className="grid w-full grid-cols-2 gap-2 px-1 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredNFTs.map((nft: NFTObject) => (
              <SmolCard
                nft={nft}
                isSelected={selected?.includes(nft.id)}
                disabled={nft.staked && nft.stakedLocation !== 'bone-yard'}
                handleClick={() => onSelect(nft.id)}
                handleDetailClick={() => gotoDetail(nft)}
              >
                <div className="mt-1 w-full pl-1 text-[10px] uppercase tracking-tighter">
                  <p className="text-right">{nft.commonSense || 0} CS</p>
                </div>
              </SmolCard>
            ))}
          </div>
        ) : (
          <div className="flex w-[100%] place-content-center" style={dinopiaFontStyle}>
            <div className="grid w-[60%] grid-cols-1 gap-4 md:grid-cols-2">
              <div className="col-span-1 rounded-lg bg-background-dark p-4 max-md:mx-auto md:w-[100%]">
                <div className="flex w-full items-center justify-between p-1">
                  <p className="text-left text-[13px] uppercase">Neandersmol #{selectedNFT.id}</p>
                </div>
                <div className="relative w-full">
                  {selectedNFT.staked && (
                    <IoMdLock
                      size={20}
                      strokeWidth={2}
                      className="absolute left-2 top-[10%] mt-2"
                    />
                  )}
                  {selectedNFT.stakedLocation && (
                    <Image
                      src={stakedLocationImage(selectedNFT.stakedLocation)}
                      width={200}
                      height={200}
                      className="absolute right-0 top-[15%] w-[80px]"
                      alt={selectedNFT.stakedLocation}
                    />
                  )}
                </div>
                <Image
                  src={selectedNFT.image}
                  alt={`smol #${selectedNFT.id.toString()}`}
                  width={300}
                  height={300}
                  className="rounded-lg"
                />

                <div className="justify-left mt-2 flex">
                  <Link
                    target="_blank"
                    href={`https://app.treasure.lol/collection/neandersmols/${selectedNFT.id}`}
                    rel="noopener noreferrer"
                    className="w-[60%] rounded-full bg-primary py-1.5 text-center text-[12px] uppercase hover:bg-primary/80"
                  >
                    View on Marketplace
                  </Link>
                </div>
              </div>
              <div className="col-span-1 grid grid-flow-row gap-2 max-md:mx-auto md:w-[100%]">
                <div className="col-span-1 mb-6 rounded-lg bg-background-dark p-3 text-center max-md:mx-auto md:w-[100%]">
                  <div className="w-full text-left">
                    <span className="text-[12px] uppercase">On Chain: </span>
                  </div>
                  <div className="mt-6 grid w-full grid-cols-2 items-center text-left">
                    <span className="col-span-1 text-[12px] uppercase">Common Sense </span>
                    <input
                      type="number"
                      name="chain-common-sense"
                      id="chain-common-sense"
                      min={0}
                      value={selectedNFT.commonSense}
                      // onChange={(e) => {
                      //     setNumStake(e.target.value ?? '')
                      // }}
                      className="col-span-1 block h-5 rounded bg-[#1F494A] pl-4 pr-12 text-[10px] font-semibold text-white  opacity-30 placeholder:text-xs placeholder:text-gray-300"
                      placeholder=""
                      disabled
                    />
                  </div>
                </div>
                <div className="col-span-1 rounded-lg bg-background-dark p-3 text-center max-md:mx-auto md:w-[100%]">
                  <div className="w-full text-left">
                    <span className="text-[12px] uppercase">From Current Stake: </span>
                  </div>
                  <div className="grid w-full grid-cols-2 items-center text-left">
                    <span className="col-span-1 text-[12px] uppercase">Common Sense </span>
                    <input
                      type="number"
                      name="stake-common-sense"
                      id="stake-common-sense"
                      min={0}
                      value={selectedNFT.commonSense}
                      className="col-span-1 block h-5 rounded-t bg-[#1F494A] pl-4 pr-12 text-[10px] text-white  opacity-30 placeholder:text-xs placeholder:text-gray-300"
                      placeholder=""
                      disabled
                    />
                  </div>
                  <div className="grid w-full grid-cols-2 items-center text-left">
                    <span className="col-span-1 text-[12px] uppercase">$Bones Accrued </span>
                    <input
                      type="number"
                      name="bones-accrued"
                      id="bones-accrued"
                      min={0}
                      value={selectedNFT.reward}
                      className="col-span-1 block h-5 bg-[#1F494A] pl-4 pr-12 text-[10px] text-white opacity-30 placeholder:text-xs placeholder:text-gray-300"
                      placeholder=""
                      disabled
                    />
                  </div>
                  <div className="grid w-full grid-cols-2 items-center text-left">
                    <span className="col-span-1 text-[12px] uppercase">Days Remaining </span>
                    <input
                      type="number"
                      name="days-remain"
                      id="days-remain"
                      min={0}
                      value={selectedNFT.endTime}
                      className="col-span-1 block h-5 rounded-b bg-[#1F494A] pl-4 pr-12 text-[10px] text-white opacity-30 placeholder:text-xs placeholder:text-gray-300"
                      placeholder=""
                      disabled
                    />
                  </div>
                </div>
                <div className="col-span-1 grid w-[100%] rounded-lg max-md:mx-auto md:grid-cols-2">
                  <div className="col-span-1 mt-1 text-center md:text-left">
                    <button
                      onClick={() => console.log('claim $bones!')}
                      className="h-10 w-[90%] rounded-xl bg-primary px-3 text-[12px] uppercase"
                    >
                      Claim $Bones@
                    </button>
                  </div>
                  <div className="col-span-1 mt-1 text-center md:text-right">
                    <button
                      onClick={() => console.log('unstake!')}
                      className="h-10 w-[90%] rounded-xl bg-primary px-3 text-[12px] uppercase"
                    >
                      Unstake
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </ScrollArea>
      <div
        style={dinopiaFontStyle}
        className="absolute -bottom-[120px] right-0 max-w-[200px] rounded-2xl border-2 border-accent bg-primary px-4 py-2 text-center text-[0.65rem] uppercase leading-3 text-primary-foreground hover:bg-primary/90"
      >
        <p>Neandersmols staked in the boneyard can go to school!</p>
        <Link
          className="mt-2 inline-flex gap-2 rounded-full bg-accent px-4 py-1 uppercase"
          href="/?show=school"
        >
          Go to school
          <ArrowRight size={12} />
        </Link>
      </div>
    </>
  );
};

export default BoneyardOverview;
