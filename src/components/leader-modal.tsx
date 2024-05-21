import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@components/ui/dialog';
import { ContractContext } from '@context/contract-context';
import useQueryParams from '@hooks/useQueryParams';
import { IslandData, islandConfig } from '@island-config';
import { useSortStore } from '@lib/store/sort-store';
import { cn } from '@lib/utils';
import { NFTObject } from '@model/model';
import { BigNumber } from 'ethers';
import { ArrowUpDown, Circle, Fullscreen } from 'lucide-react';
import Image from 'next/image';
import { useContext, useMemo, useState, useEffect } from 'react';

const dinopiaFontStyle = {
  fontFamily: 'Dinopia, sans-serif',
  fontWeight: 300, // Light font weight
};

export function LeaderModal() {
  const { params, setQueryParams } = useQueryParams();

  const [selected, setSelected] = useState<BigNumber[]>();

  const section = params['style'];
  const data = islandConfig(section as string);

  const onSelect = (selectedId: BigNumber) => {
    if (selected?.includes(selectedId)) {
      setSelected(selected.filter((id) => id !== selectedId));
    } else {
      setSelected([...(selected ?? []), selectedId]);
    }
  };

  return (
    <Dialog
      modal
      open={params['style'] != undefined}
      onOpenChange={() => setQueryParams({ style: undefined })}
    >
      <DialogContent
        style={dinopiaFontStyle}
        className="w-[400px] max-w-[90%] rounded-xl bg-transparent bg-none text-center max-md:translate-y-[-40%] max-md:p-4 md:max-h-[70vh]"
      >
        <Image
          src="/static/images/new/Leaderboard_detail.png"
          width={100}
          height={100}
          alt="leader"
          className="absolute aspect-auto w-full rounded-lg"
        />
        <div className="z-10 mt-6 text-[35px] uppercase md:mt-8 lg:mt-8">LEADERBOARD</div>
        <div className="z-10 mt-1 text-[33px] uppercase md:mt-2 lg:mt-2">Neandersmol</div>
        <div className="z-10 mt-2 text-[30px] uppercase md:mt-3 lg:mt-3">Neandersmol</div>
        <div className="z-10 mt-1 text-[25px] uppercase md:mt-4 lg:mt-4">Neandersmol</div>
        <div className="z-10 mt-1 text-[15px] uppercase md:mt-4 lg:mt-4">
          Neandersmol
          <br />
          Neandersmol
          <br />
          Neandersmol
          <br />
          Neandersmol
        </div>
      </DialogContent>
    </Dialog>
  );
}
