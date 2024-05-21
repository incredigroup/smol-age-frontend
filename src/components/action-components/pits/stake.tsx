import { StakeInput } from '@components/StakeInput';
import { ContractContext } from '@context/contract-context';
import { useIsMounted } from '@hooks/useIsMounted';
import { BigNumber } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils.js';
import { useContext, useState } from 'react';

export const StakeInPits = ({
  balance,
  staked,
  refetch,
}: {
  balance?: BigNumber;
  staked: BigNumber;
  refetch: () => void;
}) => {
  const { stakePits, unstakePits } = useContext(ContractContext);
  const [loading, setLoading] = useState<number>(0);
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <div className="relative mx-auto w-full max-w-xl pt-4 text-left">
      <p className="mb-2 pl-2 font-medium uppercase">
        Available: {parseFloat(formatEther(balance ?? '0')).toFixed(0)} $BONES
      </p>
      <StakeInput
        placeholder="AMOUNT TO STAKE"
        buttonText="Stake"
        loading={loading === 1}
        maxValue={formatEther(balance ?? '0')}
        onClick={async (value: string) => {
          let success = false;
          setLoading(1);
          stakePits(parseEther(value))
            .then(() => {
              success = true;
            })
            .finally(() => {
              refetch();
              setLoading(0);
            });
          return success;
        }}
      />
      <p className="mb-2 mt-4 pl-2 font-medium uppercase">
        Staked: {parseFloat(formatEther(staked ?? '0')).toFixed(0)} $BONES
      </p>
      <StakeInput
        placeholder="AMOUNT TO UNSTAKE"
        buttonText="Unstake"
        loading={loading === 2}
        maxValue={formatEther(staked ?? '0')}
        onClick={async (value: string) => {
          let success = false;
          setLoading(2);
          unstakePits(parseEther(value))
            .then(() => {
              success = true;
            })
            .finally(() => {
              refetch();
              setLoading(0);
            });
          return success;
        }}
      />
    </div>
  );
};
