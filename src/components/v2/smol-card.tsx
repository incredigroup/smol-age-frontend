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

interface SmolCardProps
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

const SmolCard = ({
  nft,
  isSelected,
  showLock = true,
  handleClick,
  handleDetailClick,
  children,
  ...props
}: SmolCardProps) => (
  <button
    key={nft.id.toString()}
    className={cn(
      'relative mx-auto flex h-full flex-col justify-start rounded-lg bg-accent-dark px-2 py-1 align-top',
      props.disabled && 'opacity-60',
    )}
    // onClick={() => handleClick?.(nft.id)}
    type="button"
    style={dinopiaFontStyle}
    {...props}
  >
    {showLock && (
      <>
        {console.log('---------->>>', nft)}
        {nft.staked && <IoMdLock size={18} strokeWidth={2} className="absolute left-3 top-[17%]" />}
        {nft.stakedLocation && (
          <Image
            src={stakedLocationImage(nft.stakedLocation)}
            width={100}
            height={100}
            className="absolute right-3 top-[17%] w-[35px]"
            alt={nft.stakedLocation}
          />
        )}
      </>
    )}
    <div className="flex w-full items-center justify-between p-1">
      <p className="text-left text-[12px] uppercase">Neandersmol #{nft.id}</p>
      <Circle
        strokeWidth={3}
        size={10}
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
    {children}
  </button>
);

export default SmolCard;
