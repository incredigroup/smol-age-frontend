import { ARBITRUM, CAVES } from '@config';
import { Caves__factory } from '@typechain';
import { CavesFeInfoStructOutput } from '@typechain/Caves';
import { useAccount, useContractRead, useNetwork } from 'wagmi';

export const useStakedInCaves = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const chainId = !chain || chain?.unsupported ? ARBITRUM : chain?.id;

  const { data, isLoading } = useContractRead({
    abi: Caves__factory.abi,
    address: CAVES[chainId],
    functionName: 'getCavesFeInfo',
    args: [address],
  });

  return { stakedTokens: data as CavesFeInfoStructOutput[], isLoading };
};
