import { ScrollArea } from '@components/ui/scroll-area';
import { ToggleGroup, ToggleGroupItem } from '@components/ui/toggle-group';
import SmolCard from '@components/v2/smol-card';
import SmolCardMid from '@components/v2/smol-card-mid';
import { cn } from '@lib/utils';
import { Ground, NFTObject, SelectedItem } from '@model/model';
import { BigNumber } from 'ethers';
import { useState, useEffect } from 'react';
import { PiMagicWandBold, PiPottedPlantBold, PiSwordBold } from 'react-icons/pi';
// import { StakeDevelopmentGrounds } from "./stake-development-grounds"
import Image from 'next/image';
import Link from 'next/link';
import { stakedLocationImage } from '@constants';
import { IoMdLock } from 'react-icons/io';
import { Button } from '@components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Koulen } from 'next/font/google';
// import { AddBones } from "./add-bones"
import { Caesar_Dressing } from 'next/font/google';

const koulen = Caesar_Dressing({ subsets: ['latin'], weight: ['400'] });

const dinopiaFontStyle = {
  fontFamily: 'Dinopia, sans-serif',
  fontWeight: 300, // Light font weight
};

const LaborGroundsOverview = ({
  sortedNFTs,
  viewActiveWorker,
  viewWorker,
  setViewWorker,
}: {
  sortedNFTs: NFTObject[];
  viewActiveWorker: () => void;
  viewWorker: boolean;
  setViewWorker: Dispatch<SetStateAction<boolean>>;
}) => {
  const [selected, setSelected] = useState<SelectedItem[]>();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      setViewWorker(false);
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
        <p className="text-center">None of your Neandersmols are ready for the Labor grounds!</p>
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

  let gridColumns = 'grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5';

  if (viewWorker) {
    gridColumns = 'xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-2';
  }

  return (
    <>
      <ScrollArea
        className={`${
          windowWidth < 640 ? 'max-h-[30vh]' : 'max-h-[40vh]'
        } mask-bottom mt-6 w-full pb-2`}
      >
        {
          <div className={`grid w-full gap-2 px-1 ${gridColumns}`}>
            {filteredNFTs.map((nft: NFTObject) => {
              return (
                <div key={nft.id.toString()}>
                  {viewWorker == false ? (
                    <SmolCard
                      nft={nft}
                      disabled={nft.staked}
                      isSelected={Boolean(selected?.find((n) => n.tokenId === nft.id))}
                    ></SmolCard>
                  ) : (
                    <SmolCardMid
                      nft={nft}
                      // disabled={nft.staked}
                      isSelected={Boolean(selected?.find((n) => n.tokenId === nft.id))}
                    ></SmolCardMid>
                  )}
                </div>
              );
            })}
          </div>
        }
      </ScrollArea>
      <div
        style={dinopiaFontStyle}
        className="absolute -bottom-[120px] right-0 max-w-[200px] rounded-2xl border-2 border-accent bg-primary px-4 py-2 text-center text-[0.65rem] uppercase leading-3 text-primary-foreground hover:bg-primary/90"
      >
        <p>Neandersmols staked in the boneyard can now enter school!</p>
        <Link
          className="mt-2 inline-flex gap-2 rounded-full bg-accent px-4 py-1 uppercase"
          href="/?show=school"
        >
          Go to school
          <ArrowRight size={12} />
        </Link>
      </div>
      {viewWorker == false ? (
        <div style={dinopiaFontStyle}>
          <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 gap-2 xs:flex-row">
            <Button
              onClick={() => console.log('Forage selected')}
              className="rounded-2xl border-2 border-accent px-4 text-[0.75rem] uppercase"
            >
              Forage <br />
              (Selected)
              <span className="absolute -bottom-[10%] left-[11.5%] h-[10px] w-[25px] rounded-sm bg-[#CD563B]"></span>
            </Button>
            <Button
              onClick={() => console.log('Mine selected')}
              className="rounded-2xl border-2 border-accent px-4 text-[0.75rem] uppercase"
            >
              Mine <br />
              (Selected)
              <span className="absolute -bottom-[10%] left-[46%] h-[10px] w-[25px] rounded-sm bg-[#3BCD41]"></span>
            </Button>
            <Button
              onClick={() => console.log('Dig selected')}
              className="rounded-2xl border-2 border-accent px-4 text-[0.75rem] uppercase"
            >
              Dig <br />
              (Selected)
              <span className="absolute -bottom-[10%] right-[11.5%] h-[10px] w-[25px] rounded-sm bg-[#8D3BCD]"></span>
            </Button>
          </div>
          <div
            className={`absolute bottom-0 left-3/4 -translate-x-1/4 translate-y-1/2 gap-2 xs:flex-row ${
              windowWidth < 640 ? 'contents' : ''
            }`}
          >
            <Button
              onClick={() => viewActiveWorker()}
              className={`rounded-2xl border-2 border-accent px-4 text-[0.75rem] uppercase ${
                windowWidth < 640 ? 'mb-2' : ''
              }`}
            >
              View active workers
              <ArrowRight size={12} />
            </Button>
          </div>
        </div>
      ) : (
        <div style={dinopiaFontStyle}>
          <div className="absolute bottom-0 left-1/4 -translate-x-3/4 translate-y-1/2 gap-2 xs:flex-row">
            <Button
              onClick={() => console.log('Claim Consumables and leave work')}
              className="rounded-2xl border-2 border-accent px-4 text-[0.75rem] uppercase"
            >
              Claim Consumables <br />
              and keep working
            </Button>
          </div>
          <div className="absolute bottom-0 left-3/4 -translate-x-1/4 translate-y-1/2 gap-2 xs:flex-row">
            <Button
              onClick={() => console.log('Claim Consumables and leave work')}
              className="rounded-2xl border-2 border-accent px-4 text-[0.75rem] uppercase"
            >
              Claim Consumables <br />
              and leave work
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default LaborGroundsOverview;
