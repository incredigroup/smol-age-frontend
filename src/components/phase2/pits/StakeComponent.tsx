import { StakeInput } from '@components/StakeInput';
import { ContractContext } from '@context/contract-context';
import { useIsMounted } from '@hooks/useIsMounted';
import { BigNumber } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils.js';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';

export const StakeComponent = ({
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
    <div className="relative mx-auto w-full max-w-xl pt-4">
      <Link href="/phase2">
        <Image
          src="/static/images/back.png"
          height={200}
          width={200}
          alt="Back Button"
          className="absolute left-[-20px] top-1/2 w-[60px]"
        />
      </Link>
      <div className="mx-4 my-6 rounded-2xl bg-black/60 p-8 pb-4 max-sm:px-4">
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
        <p className="mt-2 pl-2 text-xs">
          Available {parseFloat(formatEther(balance ?? '0')).toFixed(0)} $BONES
        </p>
      </div>

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
