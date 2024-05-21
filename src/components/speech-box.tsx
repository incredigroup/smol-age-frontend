import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Box = ({
  children,
  className,
  boxStyle,
}: {
  children: React.ReactNode;
  className?: string;
  boxStyle?: string;
}) => (
  <div className={cn(className, 'z-10')}>
    <div className="relative w-fit">
      <Image
        src="/static/images/new/bubble.png"
        alt="bubble"
        width={95}
        height={42}
        className={cn('aspect-[95/42]', boxStyle)}
      />
      <p className="absolute left-2 top-1/2 w-fit -translate-y-[65%] text-left text-sm leading-3 text-black">
        {children}
      </p>
    </div>
  </div>
);
