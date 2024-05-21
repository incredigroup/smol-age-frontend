import { cn } from '@/lib/utils';
import { ARBITRUM, SMOL_AGE_BONES, SMOL_AGE_BONES_STAKING } from '@config';
import { ContractContext } from '@context/contract-context';
import { useIsMounted } from '@hooks/useIsMounted';
import { BonesStaking__factory, Bones__factory } from '@typechain';
import { formatEther, isAddress } from 'ethers/lib/utils.js';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useContext, useState } from 'react';
import { useAccount, useContractRead, useNetwork } from 'wagmi';
import { LoadingButton } from './LoadingButton';

const SchoolModal = dynamic(() => import('./modals/SchoolModal'));

const Play = () => {
  const isMounted = useIsMounted();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [modal, setModal] = useState<string>(undefined);
  const { unstakeAllBones, unstakeAllSmols, isLoading } = useContext(ContractContext);

  const [hovered, setHovered] = useState<string>(undefined);

  const { data } = useContractRead({
    address: SMOL_AGE_BONES_STAKING[chain?.id ?? ARBITRUM],
    abi: BonesStaking__factory.abi,
    functionName: 'getStakes',
    args: [address],
    enabled: isAddress(address),
  });

  const { data: bones, refetch } = useContractRead({
    address: SMOL_AGE_BONES[chain?.id ?? ARBITRUM],
    abi: Bones__factory.abi,
    functionName: 'balanceOf',
    args: [address],
    enabled: !!address && !!chain,
  });

  const closeModal = useCallback(() => {
    setModal(undefined);
    address && refetch();
  }, []);

  if (!isMounted) return null;

  const bonesOwned = parseFloat(formatEther(bones?.toString() ?? '0')).toFixed(0);

  return (
    <div className="relative flex min-h-screen bg-game-page bg-cover bg-center max-xs:overflow-x-scroll">
      <Link href="/play">
        <Image
          src="/static/images/back.png"
          height={200}
          width={200}
          alt="Back Button"
          className="absolute left-[5%] top-1/2 z-10 w-[60px] -translate-y-1/2 sm:w-[80px]"
        />
      </Link>
      <div className="m-auto flex w-full flex-col md:hidden">
        <div className="flex w-full flex-col items-center	space-y-4 px-12 text-center">
          <span>Bones collected: {bonesOwned}</span>
          <button className="btn w-full py-4 text-sm" onClick={() => setModal('boneyard')}>
            Bone Yard
          </button>
          <button className="btn w-full py-4 text-sm" onClick={() => setModal('school')}>
            Common Sense School
          </button>
        </div>
      </div>
      <div className="hidden md:block">
        <span className="absolute right-16 top-[120px] text-sm">Bones: {bonesOwned}</span>
        <div
          onMouseEnter={() => setHovered('school')}
          onMouseLeave={() => setHovered(undefined)}
          className="absolute left-[48%] top-[38%] z-[10] h-[25%] w-[30%] cursor-pointer"
          onClick={() => setModal('school')}
        >
          <p className="absolute bottom-0 text-lg font-bold">Common Sense School</p>
        </div>

        <div
          onMouseEnter={() => setHovered('boneyard')}
          onMouseLeave={() => setHovered(undefined)}
          className="absolute bottom-[7%] left-[14%] z-[10] h-[35%] w-[32%] cursor-pointer"
          onClick={() => setModal('boneyard')}
        >
          <p className="text-center text-xl font-bold">Bone Yard</p>
        </div>

        <div
          style={
            hovered === 'school'
              ? { backgroundImage: "url('/static/images/school_glow.webp')" }
              : hovered === 'boneyard'
              ? {
                  backgroundImage: "url('/static/images/mammoth_glow.webp')",
                }
              : {
                  zIndex: -1,
                }
          }
          className="absolute inset-0 bg-cover bg-center"
        />
      </div>

      <div className="absolute bottom-5 right-5 space-y-4 text-sm max-sm:text-xs">
        <div className="flex flex-col justify-center gap-2 pb-2">
          <LoadingButton
            className="btn"
            onClick={unstakeAllBones}
            loading={isLoading === 'unstakeAllBones'}
            text="unstake all $BONES"
          />
          <LoadingButton
            className={cn(data?.length > 0 ? 'cursor-default bg-gray-500' : '', 'btn')}
            onClick={unstakeAllSmols}
            loading={isLoading === 'unstakeAllSmols'}
            text={'unstake all Smols'}
            disabled={data?.length > 0}
          />
        </div>
        {/* <p>
          Unstake all $BONES and Neandersmols and join phase 2. OOGA!
        </p>
        <p>
          Important: You must first unstake your $BONES before unstaking your Neandersmols.
        </p>
        <p>
          NOTE: you can unstake 50 stakes of $BONES per transaction.
          If you staked more, you may be prompted to sign multiple transactions.
        </p> */}
      </div>

      {modal === 'school' && <SchoolModal closeModal={closeModal} />}
    </div>
  );
};

export default Play;
