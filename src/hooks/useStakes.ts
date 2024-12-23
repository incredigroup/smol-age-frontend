import { ARBITRUM, SMOL_AGE_BONES_STAKING } from '@config';
import { Stake } from '@model/model';
import { BonesStaking__factory } from '@typechain';
import { utils } from 'ethers';
import { isAddress } from 'ethers/lib/utils.js';
import { useMemo } from 'react';
import { Address, useContractRead, useNetwork } from 'wagmi';

export const useStakes = (address: Address): { stakes: Stake[]; refetch: () => any } => {
  const { chain } = useNetwork();

  const { data, refetch } = useContractRead({
    address: SMOL_AGE_BONES_STAKING[chain?.id ?? ARBITRUM],
    abi: BonesStaking__factory.abi,
    functionName: 'getStakes',
    args: [address],
    enabled: isAddress(address),
  });

  const stakes = useMemo(() => {
    const newTempStakes: Stake[] = [];
    data?.map((n) => {
      const { amountStaked, lastRewardTime, startTime, tokenId } = n;
      newTempStakes.push({
        amountStaked: Number(utils.formatUnits(amountStaked, 18)),
        lastRewardTime: new Date(Number(lastRewardTime) * 1000),
        startTime: new Date(Number(startTime) * 1000),
        tokenId,
      });
    });
    return newTempStakes;
  }, [data]);

  return { stakes, refetch };
};
