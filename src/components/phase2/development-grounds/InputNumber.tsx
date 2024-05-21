import { LoadingButton } from '@components/LoadingButton';
import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

interface NumberInputProps {
  min?: number;
  max?: number;
  step?: number;
  loading: boolean;
  onClick: (value: number) => Promise<boolean>;
}

export const NumberInput: React.FC<NumberInputProps> = ({ min, max, step, loading, onClick }) => {
  const [numBones, setNumBones] = useState<number>(0);

  return (
    <div className="relative bg-smol-brown">
      <div className="flex h-8 w-full border-[4px] border-smol-brown-light bg-transparent focus:outline-none">
        <button
          disabled={numBones <= min}
          onClick={() => setNumBones((prev) => prev - step)}
          className="h-full w-8 text-smol-brown-light outline-none"
        >
          <FaMinus className="m-auto" />
        </button>
        <input
          type="number"
          className="border-x-[4px] border-smol-brown-light bg-transparent px-0 text-center text-xs font-semibold focus:border-smol-brown-alternative focus:ring-0"
          name="custom-input-number"
          min={min}
          max={max}
          step={step}
          readOnly={true}
          value={numBones}
        ></input>
        <button
          disabled={max && numBones >= max}
          onClick={() => setNumBones((prev) => prev + step)}
          className="h-full w-8 text-smol-brown-light"
        >
          <FaPlus className="m-auto" />
        </button>
      </div>
      <LoadingButton
        loading={loading}
        disabled={+numBones <= 0}
        text="Stake"
        onClick={() => onClick(numBones).then(() => setNumBones(0))}
        className="-mt-1 w-full border-[4px] border-smol-brown-light bg-transparent px-1.5 py-1 text-xs uppercase sm:px-2"
        spinnerClassName="mx-auto"
      />
    </div>
  );
};
