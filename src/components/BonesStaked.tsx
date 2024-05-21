import { cn } from '@lib/utils';

interface GroundsStateProps {
  percentage?: string;
  open: boolean;
}

export const GroundsState: React.FC<GroundsStateProps> = ({ percentage, open }) => (
  <h3 className={cn(open ? 'text-green-500' : 'text-red-700', 'text-sm font-bold uppercase')}>
    {percentage ?? 0}% of total supply - Grounds {open ? 'open' : 'closed'}
  </h3>
);
