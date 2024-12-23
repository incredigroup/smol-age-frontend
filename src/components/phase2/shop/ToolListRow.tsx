import { Tool } from '@model/model';
import Image from 'next/image';

export const ToolsListRow = ({
  tool,
  amount,
  updateAmount,
}: {
  tool: Tool;
  amount: number;
  updateAmount: (amount: number) => void;
}) => {
  const increase = () => {
    const newVal = amount + 1;
    updateAmount(newVal);
  };
  const decrease = () => {
    if (amount > 0) {
      const newVal = amount - 1;
      updateAmount(newVal);
    }
  };

  return (
    <div className="flex w-[90%] items-center justify-around p-2">
      <Image
        src={tool.image}
        height={90}
        width={90}
        alt={tool.name}
        className="aspect-square rounded-xl border-4 border-smol-brown-light max-sm:w-[80px]"
      />
      <span className="hidden sm:block">{tool.name}</span>
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={decrease}
          className="mx-auto flex rounded-lg border-4 border-smol-brown-light bg-smol-brown px-2 py-1.5 text-[.60rem] uppercase"
        >
          -
        </button>
        <span>{amount}</span>
        <button
          onClick={increase}
          className="mx-auto flex rounded-lg border-4 border-smol-brown-light bg-smol-brown px-2 py-1.5 text-[.60rem] uppercase"
        >
          +
        </button>
      </div>
    </div>
  );
};
