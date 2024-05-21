import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { ContractContext } from '@context/contract-context';
import { BigNumber } from 'ethers';
import { SelectedItem } from '@model/model';
import { parseUnits } from 'ethers/lib/utils.js';
import { ArrowUpDownIcon, Loader2 } from 'lucide-react';
import { useContext, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@lib/utils';
import { Koulen } from 'next/font/google';
import { Caesar_Dressing } from 'next/font/google';

const koulen = Caesar_Dressing({ subsets: ['latin'], weight: ['400'] });

const dinopiaFontStyle = {
  fontFamily: 'Dinopia, sans-serif',
  fontWeight: 300, // Light font weight
};

export const AddBones = ({ selected }: { selected: SelectedItem[] }) => {
  const { stakeBones, isLoading } = useContext(ContractContext);
  const [bonesToStake, setBonestoStake] = useState(1000);

  const handleSubmit = () => {
    if (selected.length === 0) {
      toast.error('Please select a Neandersmol to stake');
      return;
    }
    if (bonesToStake % 1000 != 0) {
      toast.error('Bones must be in increments of 1000');
      return;
    }
    stakeBones(parseUnits(String(bonesToStake), 18), selected?.[0]['tokenId']);
  };

  return (
    <div
      className="space-y-1 rounded-2xl border-2 border-background-dark bg-accent p-1"
      style={dinopiaFontStyle}
    >
      <Button
        disabled={isLoading === 'stakeBones' || !Boolean(selected?.length)}
        onClick={handleSubmit}
        className="w-full rounded-2xl px-4 text-[0.75rem] uppercase"
      >
        {isLoading === 'stakeBones' ? (
          <Loader2 className="inline-flex animate-spin" size={14} color="#cee7d6" />
        ) : (
          `Add bones to selected`
        )}
      </Button>
      <div className="relative">
        <Input
          className="rounded-full border-none bg-background-dark"
          type="number"
          min={0}
          step={1000}
          value={bonesToStake}
          onChange={(e) => setBonestoStake(Number(e.target.value))}
        />
        <ArrowUpDownIcon size={12} className="absolute right-2 top-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
};
