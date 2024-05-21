import { useState } from 'react';
import { LoadingButton } from './LoadingButton';

interface StakeInputProps {
  placeholder: string;
  buttonText: string;
  maxValue: string;
  onClick: (value: string) => Promise<boolean>;
  loading: boolean;
}

export const StakeInput: React.FC<StakeInputProps> = ({
  placeholder,
  buttonText,
  maxValue,
  onClick,
  loading,
}) => {
  const [numStake, setNumStake] = useState<string>('');

  return (
    <div className="flex h-full items-center justify-between gap-2">
      <div className="relative">
        <input
          type="number"
          name="amount"
          id="amount"
          min={0}
          value={numStake}
          onChange={(e) => {
            setNumStake(e.target.value ?? '');
          }}
          className="block h-10 w-[200px] rounded-xl bg-[#102B2D] pl-4 pr-12 text-sm placeholder:text-xs placeholder:text-gray-300"
          placeholder={placeholder}
          aria-describedby="bone-amount"
        />
        <button
          onClick={() => setNumStake(maxValue)}
          className="pt-1/2 absolute inset-y-0 right-0 flex items-center pr-3 text-xs"
        >
          MAX
        </button>
      </div>
      <LoadingButton
        loading={loading}
        disabled={+numStake <= 0}
        text={buttonText}
        onClick={() => onClick(numStake).then(() => setNumStake(''))}
        className="h-10 w-[100px] rounded-xl bg-primary px-3 uppercase"
        spinnerClassName="mx-auto"
      />
    </div>
  );
};
