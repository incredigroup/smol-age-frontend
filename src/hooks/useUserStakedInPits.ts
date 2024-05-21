import { ARBITRUM } from '@config';
import { BigNumber } from 'ethers';
import { useAccount, useNetwork, useQuery } from 'wagmi';

export const useUserStakedInPits = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const chainId = !chain || chain?.unsupported ? ARBITRUM : chain?.id;

  const { data, refetch } = useQuery<{
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
    data,
    refetch,
  };
};
