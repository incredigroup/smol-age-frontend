import { buttonVariants } from '@components/ui/button';
import { stakedLocationImage } from '@constants';
import { cn } from '@lib/utils';
import { NFTObject } from '@model/model';
import { VariantProps } from 'class-variance-authority';
import { BigNumber } from 'ethers';
import { Circle } from 'lucide-react';
import Image from 'next/image';
import { IoMdLock } from 'react-icons/io';
import { Koulen } from 'next/font/google';
import { Caesar_Dressing } from 'next/font/google';

interface SmolCardMidProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  nft: NFTObject;
  isSelected: boolean;
  showLock?: boolean;
  handleClick?: (id: BigNumber) => void;
  handleDetailClick?: (nft: NFTObject) => void;
}

const koulen = Caesar_Dressing({ subsets: ['latin'], weight: ['400'] });

const dinopiaFontStyle = {
  fontFamily: 'Dinopia, sans-serif',
  fontWeight: 300, // Light font weight
};

const SmolCardMid = ({
  nft,
  isSelected,
  showLock = true,
  handleClick,
  handleDetailClick,
  children,
  ...props
}: SmolCardMidProps) => (
  <button
    key={nft.id.toString()}
    className={cn(
      'relative mx-auto flex h-full justify-start rounded-lg bg-accent-dark px-2 py-1 align-top',
      props.disabled && 'opacity-60',
    )}
    // onClick={() => handleClick?.(nft.id)}
    type="button"
    {...props}
  >
    {/* {showLock &&
            <>
                {nft.staked && <IoMdLock size={18} strokeWidth={2} className="absolute top-[17%] left-3" />}
                {nft.stakedLocation && <Image src={stakedLocationImage(nft.stakedLocation)} width={100} height={100} className="absolute top-[17%] right-3 w-[35px]" alt={nft.stakedLocation} />}
            </>
        } */}
    <div className="flex gap-3">
      <div className="flex flex-col">
        <div className="flex w-full items-center justify-between p-1">
          <p className="text-left text-[10px] font-bold uppercase tracking-tighter">
            Neandersmol #{nft.id}
          </p>
          <Circle
            strokeWidth={3}
            size={12}
            className={cn(isSelected && 'fill-white')}
            onClick={() => handleClick?.(nft.id)}
          />
        </div>
        <Image
          src={nft.image}
          alt={`smol #${nft.id.toString()}`}
          width={150}
          height={150}
          className="rounded-lg"
          onClick={() => handleDetailClick?.(nft)}
        />
        <span className="absolute left-[45%] top-[17%] h-[10px] w-[25px] rounded-sm bg-[#CD563B]"></span>
        {/* <span className="absolute top-[17%] left-[45%] w-[25px] h-[10px] bg-[#3BCD41] rounded-sm"></span>
                <span className="absolute top-[17%] left-[45%] w-[25px] h-[10px] bg-[#8D3BCD] rounded-sm"></span> */}
      </div>
      <div className="mt-6 flex flex-col items-center gap-2 text-center" style={dinopiaFontStyle}>
        <Image
          src={`/static/images/phase2/animals/baby_dino.gif`}
          alt={`smoldetail #${nft.id.toString()}`}
          width={75}
          height={75}
          className="rounded-lg"
        />
        <button className="h-8 rounded-xl bg-primary px-3 text-center text-[11px] uppercase">
          Bring/Remove
          <br />
          Animal
        </button>
        <button className="h-8 rounded-xl bg-primary px-3 text-center text-[11px] uppercase">
          Job Complete
        </button>
      </div>
    </div>
    {children}
  </button>
);

export default SmolCardMid;
