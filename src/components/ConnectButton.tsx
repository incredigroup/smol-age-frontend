import { WalletModal } from '@components/wallet-modal';
import { ARBITRUM } from '@config';
import { useBonesBalance } from '@hooks/useBonesBalance';
import { useIsMounted } from '@hooks/useIsMounted';
import { formatEther } from 'ethers/lib/utils';
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';
import { Skeleton } from './Skeleton';

const ConnectButton = () => {
  const isMounted = useIsMounted();
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const { disconnect } = useDisconnect();
  const { bonesBalance, isLoading } = useBonesBalance();

  if (!isMounted) return null;

  return (
    <>
      {address ? (
        <>
          {chain.unsupported ? (
            <button
              onClick={() => switchNetwork(ARBITRUM)}
              className="rounded-xl bg-background-light px-4 py-1 text-lg text-red-500"
            >
              Switch Network
            </button>
          ) : (
            <button
              onClick={() => disconnect()}
              className="flex items-center gap-1 rounded-xl bg-background-light px-3 py-0.5 text-lg"
            >
              $BONES |{' '}
              {isLoading ? (
                <Skeleton className="h-[18px] w-[50px]" />
              ) : (
                <>{parseFloat(formatEther(bonesBalance ?? '0')).toFixed(0)}</>
              )}
            </button>
          )}
        </>
      ) : (
        <WalletModal />
      )}
    </>
  );
};

export default ConnectButton;
