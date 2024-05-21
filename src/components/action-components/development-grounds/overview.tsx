import { ScrollArea } from '@components/ui/scroll-area';
import { ToggleGroup, ToggleGroupItem } from '@components/ui/toggle-group';
import SmolCard from '@components/v2/smol-card';
import { cn } from '@lib/utils';
import { Ground, NFTObject, SelectedItem } from '@model/model';
import { BigNumber } from 'ethers';
import { useState, useEffect } from 'react';
import { PiMagicWandBold, PiPottedPlantBold, PiSwordBold } from 'react-icons/pi';
import { StakeDevelopmentGrounds } from './stake-development-grounds';
import Image from 'next/image';
import Link from 'next/link';
import { stakedLocationImage } from '@constants';
import { IoMdLock } from 'react-icons/io';
import { Button } from '@components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { AddBones } from './add-bones';
import { Koulen } from 'next/font/google';
import { Caesar_Dressing } from 'next/font/google';

const koulen = Caesar_Dressing({ subsets: ['latin'], weight: ['400'] });

const dinopiaFontStyle = {
  fontFamily: 'Dinopia, sans-serif',
  fontWeight: 300, // Light font weight
};

const DevelopmentGroundsOverview = ({
  sortedNFTs,
  enterGround,
  detailGround,
  setDetailGround,
}: {
  sortedNFTs: NFTObject[];
  enterGround: () => void;
  detailGround: boolean;
  setDetailGround: Dispatch<SetStateAction<boolean>>;
}) => {
  const [selected, setSelected] = useState<SelectedItem[]>();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      setDetailGround(false);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filteredNFTs = sortedNFTs
    .filter(
      (n) =>
        (n.commonSense >= 100 && !n.staked) ||
        (n.staked && n.stakedLocation === 'development_ground'),
    )
    .sort((a, b) => a.amountStaked - b.amountStaked)
    .reverse();

  if (!filteredNFTs.length) {
    return (
      <div className="mx-auto mb-8 flex w-full max-w-xs items-center justify-center rounded-md bg-background-dark p-4">
        <p className="text-center">
          None of your Neandersmols are ready for the development grounds!
        </p>
      </div>
    );
  }

  const onSelect = (id: BigNumber, ground: Ground) => {
    const newSelection = { tokenId: id, ground, lock: 100 };
    const select = selected?.filter((item) => item.tokenId == id);
    if (select?.length > 0) {
      setSelected((prev) =>
        select[0].ground === ground
          ? prev.filter((item) => item.tokenId !== id)
          : prev.map((item) => (item.tokenId === id ? newSelection : item)),
      );
    } else {
      setSelected([...(selected ?? []), newSelection]);
    }
  };

  return (
    <>
      <ScrollArea className="mask-bottom mt-6 flex max-h-[40vh] w-full place-content-center content-center pb-2">
        {
          <div
            className="grid w-full grid-cols-2 gap-2 px-1 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            style={dinopiaFontStyle}
          >
            {filteredNFTs.map((nft: NFTObject) => {
              return (
                <div key={nft.id.toString()}>
                  <SmolCard
                    nft={nft}
                    disabled={nft.staked}
                    isSelected={Boolean(selected?.find((n) => n.tokenId === nft.id))}
                  >
                    {!nft.staked && detailGround == true && (
                      <div className="flex w-full content-center items-center justify-around p-1">
                        <button className="absolute left-3 top-8 flex w-fit items-center gap-2 rounded-lg bg-accent-dark px-1 py-1 text-left text-[12px] uppercase text-white hover:bg-accent-dark/80">
                          Earning 10 SP per day
                        </button>
                        <button className="absolute right-3 top-8 inline-grid w-6 items-center rounded-lg bg-accent-dark px-1 py-0.5 uppercase text-white hover:bg-accent-dark/80">
                          <span className="text-[5px]">LVL</span>
                          <span className="text-[8px]">28</span>
                        </button>
                      </div>
                    )}
                    {nft.staked ? (
                      <div className="mt-1 w-full pl-1 text-[10px] uppercase">
                        <p className="text-right">{nft.commonSense || 0} CS</p>
                      </div>
                    ) : (
                      <ToggleGroup
                        type="single"
                        className={cn(nft.staked && 'hidden', 'mt-1 w-full text-[10px]')}
                        onValueChange={(value) => {
                          onSelect(nft.id, Number(value) as Ground);
                        }}
                      >
                        <ToggleGroupItem
                          value={Ground.Warrior.toString()}
                          aria-label="Toggle Warrior"
                          className="h-6 rounded-full border-2 border-red-500 py-0.5 hover:bg-red-500 hover:text-white data-[state=on]:bg-red-500 data-[state=on]:text-white"
                        >
                          <PiSwordBold className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value={Ground.Farmer.toString()}
                          aria-label="Toggle Farmer"
                          className="h-6 rounded-full border-2 border-green-500 py-0.5 hover:bg-green-500 hover:text-white data-[state=on]:bg-green-500 data-[state=on]:text-white"
                        >
                          <PiPottedPlantBold className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value={Ground.Mystic.toString()}
                          aria-label="Toggle Mystic"
                          className="h-6 rounded-full border-2 border-indigo-500 py-0.5 hover:bg-indigo-500 hover:text-white active:bg-indigo-500 data-[state=on]:bg-indigo-500 data-[state=on]:text-white"
                        >
                          <PiMagicWandBold className="h-4 w-4" />
                        </ToggleGroupItem>
                      </ToggleGroup>
                    )}
                    {!nft.staked && detailGround == true && (
                      <div className="col-span-1 mt-1 rounded-lg text-center max-md:mx-auto md:w-[100%]">
                        <div className="grid w-full grid-cols-3 items-center text-left">
                          <span className="col-span-2 text-[12px] uppercase">$Bones Stake:</span>
                          <input
                            type="number"
                            name="bone-stake"
                            id="bone-stake"
                            min={0}
                            value={nft.amountStaked}
                            className="col-span-1 block h-5 rounded-t bg-[#1F494A] pl-2 pr-2 text-[12px] text-white  opacity-30 placeholder:text-xs placeholder:text-gray-300"
                            placeholder=""
                            disabled
                          />
                        </div>
                        <div className="grid w-full grid-cols-3 items-center text-left">
                          <span className="col-span-2 text-[12px] uppercase">Time Remaining:</span>
                          <input
                            type="number"
                            name="time-remain"
                            id="time-remain"
                            min={0}
                            value={nft.endTime}
                            className="col-span-1 block h-5 bg-[#1F494A] pl-2 pr-2 text-[10px] text-white opacity-30 placeholder:text-xs placeholder:text-gray-300"
                            placeholder=""
                            disabled
                          />
                        </div>
                        <div className="grid w-full grid-cols-3 items-center text-left">
                          <span className="col-span-2 text-[12px] uppercase">
                            Pending Skill Points:
                          </span>
                          <input
                            type="number"
                            name="days-remain"
                            id="days-remain"
                            min={0}
                            value={nft.commonSense}
                            className="col-span-1 block h-5 rounded-b bg-[#1F494A] pl-2 pr-2 text-[10px] text-white opacity-30 placeholder:text-xs placeholder:text-gray-300"
                            placeholder=""
                            disabled
                          />
                        </div>
                      </div>
                    )}
                  </SmolCard>
                </div>
              );
            })}
          </div>
        }
      </ScrollArea>
      {detailGround == false ? (
        <div style={dinopiaFontStyle}>
          <div
            className={`absolute bottom-0 translate-y-1/2 gap-2 xs:flex-row ${
              windowWidth < 640 ? 'left-1/4' : 'left-1/2'
            } -translate-x-1/2`}
          >
            <StakeDevelopmentGrounds selected={selected} />
          </div>
          <div className="absolute bottom-0 left-3/4 -translate-x-1/2 translate-y-1/2 gap-2 xs:flex-row">
            <Button
              onClick={() => enterGround()}
              className="rounded-2xl border-2 border-accent px-4 text-[0.75rem] uppercase"
            >
              Enter the grounds
              <ArrowRight size={12} />
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div
            style={dinopiaFontStyle}
            className={`flex xs:flex-row ${
              windowWidth < 640 ? 'left-1/2 mt-2 gap-2' : 'left-1/3 gap-32'
            } absolute bottom-0 -translate-x-1/2 translate-y-1/2`}
          >
            <Button
              onClick={() => console.log('Claim xxx accrued bones(burn xxx bones)')}
              className="rounded-2xl border-2 border-accent px-4 text-[0.75rem] uppercase"
            >
              Claim accrued bones <br /> (Burn bones)
            </Button>
            <Button
              onClick={() => console.log('remove $bones from selected')}
              className="rounded-2xl border-2 border-accent px-4 text-[0.75rem] uppercase"
            >
              Remove $bones <br />
              from selected
            </Button>
          </div>
          <div
            className={`absolute bottom-0 left-3/4 -translate-x-1/4 translate-y-3/4 gap-2 xs:flex-row ${
              windowWidth < 640 ? 'contents' : ''
            }`}
          >
            <AddBones key="add-bones" selected={selected}></AddBones>
          </div>
        </>
      )}
    </>
  );
};

export default DevelopmentGroundsOverview;
