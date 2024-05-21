import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@components/ui/dialog';
import { ContractContext } from '@context/contract-context';
import useQueryParams from '@hooks/useQueryParams';
import { IslandData, islandConfig } from '@island-config';
import { useSortStore } from '@lib/store/sort-store';
import { cn } from '@lib/utils';
import { NFTObject } from '@model/model';
import { BigNumber } from 'ethers';
import { ArrowUpDown, Circle } from 'lucide-react';
import Image from 'next/image';
import { useContext, useMemo, useState, useEffect } from 'react';
import { ClaimBoneyardReward } from './action-components/boneyard/claim-reward';
import BoneyardOverview from './action-components/boneyard/overview';
import { StakeBoneyard } from './action-components/boneyard/stake-boneyard';
import { UnstakeBoneyard } from './action-components/boneyard/unstake-boneyard';
import { ClaimCavesReward } from './action-components/caves/claim-caves-reward';
import { EnterCaves } from './action-components/caves/enter-caves';
import { LeaveCave } from './action-components/caves/leave-cave';
import CavesOverview from './action-components/caves/overview';
import DevelopmentGroundsOverview from './action-components/development-grounds/overview';
import LaborGroundsOverview from './action-components/labor-grounds/overview';
import PitsOverview from './action-components/pits/overview';
import { AttachBones } from './action-components/school/attach-bones';
import SchoolOverview from './action-components/school/overview';
import { RemoveBones } from './action-components/school/remove-bones';
import { ScrollArea } from './ui/scroll-area';
import SmolCard from './v2/smol-card';
import { Stat } from './v2/stat';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { flare } from 'wagmi/dist/chains';
import { Turret_Road } from 'next/font/google';
import { Koulen } from 'next/font/google';
import { Istok_Web } from 'next/font/google';
import { Caesar_Dressing } from 'next/font/google';

type NodeMap = {
  [id: string]: React.ReactNode;
};

const koulen = Caesar_Dressing({ subsets: ['latin'], weight: ['400'] });
const istok_Web = Istok_Web({ subsets: ['latin'], weight: ['400'] });

const dinopiaFontStyle = {
  fontFamily: 'Dinopia, sans-serif',
  fontWeight: 300, // Light font weight
};

export function IslandModal() {
  const { nfts } = useContext(ContractContext);
  const { params, setQueryParams } = useQueryParams();
  const { sort, setSort } = useSortStore();

  const [selected, setSelected] = useState<BigNumber[]>();
  const [selectedNFT, setSelectedNFT] = useState<NFTObject | null>(null);
  const [detailGround, setDetailGround] = useState(false);
  const [viewWorker, setViewWorker] = useState(false);

  const section = params['show'];
  const data = islandConfig(section as string);

  const gotoDetail = (nft: NFTObject) => {
    if (!nft.staked) {
      setSelectedNFT(nft);
    }
  };

  const enterGround = () => {
    setDetailGround(true);
  };

  const viewActiveWorker = () => {
    setViewWorker(true);
  };

  const handleGoBack = () => {
    setSelectedNFT(null);
    setDetailGround(false);
    setViewWorker(false);
  };

  const actionsMap: NodeMap = {
    'claim-bones': <ClaimBoneyardReward key="claim-bones" />,
    'stake-selected-time': <StakeBoneyard key="stake-selected" selected={selected} />,
    'ustake-selected': <UnstakeBoneyard key="unstake-selected" selected={selected} />,
    'enter-caves': <EnterCaves key="enter-caves" selected={selected} />,
    'leave-cave': <LeaveCave key="enter-cave" selected={selected} />,
    'claim-caves-rewards': <ClaimCavesReward key="claim-caves-rewards" />,
    'attach-bones': <AttachBones key="attach-bones" selected={selected} />,
    'remove-bones': <RemoveBones key="remove-bones" selected={selected} />,
  };

  const islandComponent: NodeMap = {
    caves: <CavesOverview sortedNFTs={nfts} onSelect={(id) => onSelect(id)} selected={selected} />,
    boneyard: (
      <BoneyardOverview
        sortedNFTs={nfts}
        onSelect={(id) => onSelect(id)}
        selected={selected}
        selectedNFT={selectedNFT}
        setSelectedNFT={setSelectedNFT}
        gotoDetail={(nft) => gotoDetail(nft)}
      />
    ),
    pits: <PitsOverview />,
    school: (
      <SchoolOverview sortedNFTs={nfts} onSelect={(id) => onSelect(id)} selected={selected} />
    ),
    'labor-grounds': (
      <LaborGroundsOverview
        sortedNFTs={nfts}
        viewActiveWorker={() => viewActiveWorker()}
        viewWorker={viewWorker}
        setViewWorker={setViewWorker}
      />
    ),
    'development-grounds': (
      <DevelopmentGroundsOverview
        sortedNFTs={nfts}
        enterGround={() => enterGround()}
        detailGround={detailGround}
        setDetailGround={setDetailGround}
      />
    ),
  };

  const onSelect = (selectedId: BigNumber) => {
    if (selected?.includes(selectedId)) {
      setSelected(selected.filter((id) => id !== selectedId));
    } else {
      setSelected([...(selected ?? []), selectedId]);
    }
  };

  const sortedNFTs = useMemo(() => {
    if (!sort) return nfts;
    return nfts?.sort((a, b) => {
      if (sort === 'asc') {
        return (a.commonSense || 0) - (b.commonSense || 0);
      } else {
        return (b.commonSense || 0) - (a.commonSense || 0);
      }
    });
  }, [sort, nfts]);

  const Toolbar = () => (
    <div className="mb-2 space-y-1">
      <button
        onClick={() => {
          const selectable = nfts
            ?.filter((nft) => !nft.staked || nft.stakedLocation === section)
            .map((nft) => nft.id);
          setSelected(selected?.length === selectable?.length ? [] : selectable);
        }}
        className={cn(
          ['school'].includes(section as string) && 'hidden',
          'flex items-center gap-2 rounded-lg bg-accent-dark px-3 py-1 text-xs font-semibold text-white hover:bg-accent-dark/80',
        )}
      >
        Select All
        <Circle
          strokeWidth={3}
          size={10}
          className={cn(Number(selected?.length) === Number(nfts?.length) && 'fill-white')}
        />
      </button>
      <button
        onClick={() => setSort(sort === null || sort === 'asc' ? 'desc' : 'asc')}
        className="flex items-center gap-2 rounded-lg bg-accent-dark px-3 py-1 text-xs font-semibold text-white hover:bg-accent-dark/80"
      >
        Common Sense
        <ArrowUpDown
          strokeWidth={3}
          size={10}
          className={cn(Number(selected?.length) === Number(nfts?.length) && 'fill-white')}
        />
      </button>
    </div>
  );

  return (
    <Dialog
      modal
      open={params['show'] != undefined}
      onOpenChange={() => setQueryParams({ show: undefined })}
    >
      <DialogContent
        style={dinopiaFontStyle}
        className="w-[900px] max-w-[90%] rounded-xl max-md:translate-y-[-40%] max-md:p-4 md:max-h-[70vh]"
      >
        <IslandHeader data={data} />
        {selectedNFT == null && detailGround == false && viewWorker == false ? (
          <Toolbar />
        ) : (
          <button
            className="flex w-fit items-center gap-2 rounded-lg bg-accent-dark px-3 py-1 text-xs text-white hover:bg-accent-dark/80"
            onClick={handleGoBack}
          >
            <ArrowLeft size={12} />
            Back to all Neandersmols
          </button>
        )}
        <Image
          src={data.image}
          alt={data.title}
          width={300}
          height={300}
          className="absolute right-10 top-4 aspect-auto w-[75px] rounded-lg"
        />
        {islandComponent[section as string] ?? (
          <ScrollArea className="mask-bottom mt-6 max-h-[40vh] w-full pb-2">
            <div className="grid w-full grid-cols-2 gap-2 px-1 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {sortedNFTs.map((nft: NFTObject) => (
                <SmolCard
                  nft={nft}
                  isSelected={selected?.includes(nft.id)}
                  disabled={nft.staked && nft.stakedLocation !== section}
                  onSelect={() => onSelect(nft.id)}
                >
                  <div className="mt-1 w-full pl-1 text-[10px] font-bold uppercase tracking-tighter">
                    {data.stats?.map((stat) => (
                      <Stat key={stat} id={stat} nft={nft} />
                    ))}
                  </div>
                </SmolCard>
              ))}
            </div>
          </ScrollArea>
        )}

        {data.actions && selectedNFT == null && (
          <DialogFooter className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 gap-2 xs:flex-row">
            {data.actions.map((action) => actionsMap[action])}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

const IslandHeader = ({ data }: { data: IslandData }) => (
  <div className="absolute mx-auto flex -translate-y-[110%] items-start rounded-xl border-[3px] border-accent bg-background p-2 md:left-1/2 md:w-[450px] md:max-w-[90%] md:-translate-x-1/2 md:-translate-y-2/3 md:flex-row">
    <Image
      src={data.npc}
      alt="npc"
      width={100}
      height={100}
      className="m-2 w-[100px] self-center rounded-lg max-md:mx-auto md:w-[120px]"
    />
    <div className="mt-0 flex flex-1 shrink flex-col px-2">
      <DialogTitle
        style={dinopiaFontStyle}
        className="mb-2 text-center text-lg font-semibold uppercase"
      >
        {data.title}
      </DialogTitle>
      <ScrollArea itemScope className="h-[100px] pr-4 text-center text-[10.5px]">
        {data.description}
      </ScrollArea>
    </div>
  </div>
);
