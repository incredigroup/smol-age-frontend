import { cn } from '@/lib/utils';
import { buttonVariants } from '@components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@components/ui/select';
import { ContractContext } from '@context/contract-context';
import { BigNumber } from 'ethers';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { toast } from 'sonner';
import { Koulen } from 'next/font/google';
import { Caesar_Dressing } from 'next/font/google';

const lockPeriods = ['0', '15', '30'];
const koulen = Caesar_Dressing({ subsets: ['latin'], weight: ['400'] });

const dinopiaFontStyle = {
  fontFamily: 'Dinopia, sans-serif',
  fontWeight: 300, // Light font weight
};

export const StakeBoneyard = ({ selected }: { selected?: BigNumber[] }) => {
  const { stake, isLoading } = useContext(ContractContext);

  const onValueSelect = async (value: string) => {
    if (!selected || selected.length === 0) {
      toast.error('No NFTs selected', {
        description: 'Please select NFTs to stake',
      });
      return;
    }
    await stake(
      selected.map((tokenId) => ({
        tokenId,
        lock: value,
      })),
    );
  };

  return (
    <Select name="stake-boneyard" onValueChange={onValueSelect}>
      <SelectTrigger
        style={dinopiaFontStyle}
        className={cn(
          buttonVariants({ variant: 'default' }),
          'items-center rounded-2xl border-2 border-accent px-4 text-[0.75rem] uppercase',
        )}
      >
        {isLoading === 'stake' ? (
          <Loader2 className="inline-flex animate-spin" size={20} color="#cee7d6" />
        ) : (
          <>Stake Selected</>
        )}
      </SelectTrigger>
      <SelectContent className="rounded-2xl border-accent bg-primary text-[0.65rem] text-primary-foreground hover:bg-primary/90">
        {lockPeriods.map((period) => (
          <SelectItem
            onClick={() => onValueSelect(period)}
            key={period}
            value={period}
            className="rounded-3xl pl-4 text-xs font-semibold focus:text-white"
          >
            {period === '0' ? 'No Time-Lock' : <>{period} Days</>}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
