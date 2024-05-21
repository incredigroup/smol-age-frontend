import { ARBITRUM, COUNCIL_PASS_ADDRESS } from '@config';
import { CouncilPass__factory } from '@typechain';
import { BigNumber } from 'ethers';
import { useAccount, useContractRead, useNetwork } from 'wagmi';

export const useHasCouncilPass = () => {
  const { chain } = useNetwork();
  const chainId = !chain || chain?.unsupported ? ARBITRUM : chain?.id;
  const { address } = useAccount();

  const {
    data: hasCouncilPass,
    isLoading,
    error,
  } = useContractRead({
    address: COUNCIL_PASS_ADDRESS[chainId],
    abi: CouncilPass__factory.abi,
    functionName: 'balanceOf',
    args: [address, BigNumber.from(0)],
    chainId,
  });

  return {
    hasCouncilPass: hasCouncilPass?.gt(0),
    isLoading,
    error,
  };
};
