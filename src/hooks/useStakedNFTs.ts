import { ARBITRUM, SMOL_AGE_STAKING } from '@config';
import { Staking__factory } from '@typechain';
import { isAddress } from 'ethers/lib/utils.js';
import { Address, useContractRead, useNetwork } from 'wagmi';

export const useStakedNFTs = (address: Address) => {
  const { chain } = useNetwork();

  return useContractRead({
    address: SMOL_AGE_STAKING[chain?.id ?? ARBITRUM],
    abi: Staking__factory.abi,
    functionName: 'getUserInfo',
    args: [address],
    enabled: isAddress(address),
  });
};
