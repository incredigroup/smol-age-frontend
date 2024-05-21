import { ARBITRUM } from '@config';
import { useQuery } from 'wagmi';
import { BigNumber } from 'ethers';
import { useAccount, useNetwork } from 'wagmi';

export const useBonesBalance = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const chainId = !chain || chain?.unsupported ? ARBITRUM : chain?.id;

  const {
    data,
    refetch: refetchUserStake,
    isLoading,
  } = useQuery<{
    bonesBalance: BigNumber;
    bonesStaked: BigNumber;
  }>(
    ['bonesStaked', chainId, address],
    () => fetch(`/api/pits/${address}?chainId=${chainId}`).then((res) => res.json()),
    {
      enabled: !!address,
      staleTime: 1 * 60 * 1000,
      cacheTime: 5 * 60 * 1000, // 5 min
    },
  );
  return {
    bonesBalance: data?.bonesBalance,
    bonesStaked: data?.bonesStaked,
    refetchUserStake,
    isLoading,
  };
};
