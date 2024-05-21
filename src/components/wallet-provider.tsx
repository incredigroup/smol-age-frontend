import {
  ARBITRUM,
  CAVES,
  DEVELOPMENT_GROUNDS,
  LABOR_GROUNDS,
  SHOP,
  SMOL_AGE_ADDRESS,
  SMOL_AGE_BONES,
  SMOL_AGE_BONES_STAKING,
  SMOL_AGE_STAKING,
  THE_GRAPH_API_URL,
  THE_PITS,
} from '@config';
import { ContractContext } from '@context/contract-context';
import { useStakedNFTs } from '@hooks/useStakedNFTs';
import { useStakes } from '@hooks/useStakes';
import { NFTObject, SelectedItem, UserToken } from '@model/model';
import {
  BonesStaking__factory,
  Bones__factory,
  Caves__factory,
  DevelopmentGrounds__factory,
  LaborGrounds__factory,
  NeanderSmol__factory,
  Pits__factory,
  Shop__factory,
  Staking__factory,
} from '@typechain';
import { LaborGroundFeInfoStructOutput } from '@typechain/LaborGrounds';
import { generateHash } from '@utils';
import { BigNumber, Contract, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { createClient } from 'urql';
import { Address, useAccount, useNetwork, useProvider, useSigner } from 'wagmi';

type Props = {
  children?: ReactNode;
};

const client = (chainId: number) =>
  createClient({
    url: THE_GRAPH_API_URL[chainId],
  });

const userTokensQuery = `query ($account: String!) {
  user(id: $account) {
    tokens(first: 500) {
      tokenID
      name
      staked
      stakeLocation
      commonSense
    }
   }
  }`;

const WalletProvider = ({ children }: Props) => {
  const { chain } = useNetwork();
  const chainId = !chain || chain?.unsupported ? ARBITRUM : chain?.id;

  const address = '0xd411c5C70339F15bCE20dD033B5FfAa3F8d2806f' as Address;
  // const { address } = useAccount();
  const provider = useProvider();
  const { data: signerData } = useSigner();
  const { data: stakedNfs } = useStakedNFTs(address);
  const [isLoading, setIsLoading] = useState<string>();
  const [nfts, setNfts] = useState<NFTObject[]>([]);

  const { stakes: stakesData, refetch } = useStakes(address);

  useEffect(() => {
    const onAddress = async () => {
      await getNfts();
    };
    if (!address || !chain) {
      setNfts([]);
    } else {
      onAddress();
    }
  }, [address, chain]);

  const getError = (error) => {
    if (
      error.message.includes('user rejected transaction') ||
      error.message.includes('User denied transaction.')
    ) {
      return;
    }
    const message = error?.data?.message || error?.error?.data?.message;
    toast.error(message || 'Something went wrong');
  };

  const getNfts = async () => {
    await refetch();

    const { data, error } = await client(chainId)
      .query(userTokensQuery, { account: address.toLowerCase() })
      .toPromise();

    if (error) {
      toast.error('Something went wrong with fetching your account info.');
      return;
    }

    //const data = testData
    if (!data?.user?.tokens || data?.user?.tokens?.length == 0) {
      setNfts([]);
      return;
    }

    const nfts: NFTObject[] = await Promise.all(
      data.user?.tokens?.map(async (token: UserToken) => {
        const stakedNft = stakedNfs?.find((nft) => nft.tokenId.toString() === token.tokenID);
        const stakes = stakesData.filter(
          (stake) => stake.tokenId.toString() === stakedNft?.tokenId.toString(),
        );
        const amountStaked =
          stakes?.length > 0 ? stakes.reduce((total, object) => total + object.amountStaked, 0) : 0;

        return {
          id: token.tokenID,
          name: token.name,
          endTime: stakedNft ? new Date(+stakedNft.endTime * 1000).getTime() : undefined,
          image: `/assets/neandersmols/${generateHash(String(token.tokenID) + '.png')}.png`,
          staked: token.staked,
          stakes: stakes ?? [],
          reward: stakedNft?.reward,
          amountStaked,
          stakedLocation: token.stakeLocation,
          commonSense: token.commonSense ? Number(formatUnits(token.commonSense, 9)) : undefined,
        };
      }),
    );

    setNfts(nfts);
  };

  // ------------------------------- PHASE 1 ---------------------------- //

  const claimBones = async (tokenIds: BigNumber[]): Promise<boolean> => {
    setIsLoading('claimBones');

    let success = false;
    try {
      const stakingContract = Staking__factory.connect(SMOL_AGE_STAKING[chainId], signerData);
      const txRes = await stakingContract.claimRewards(tokenIds);
      const receipt = await txRes.wait(1);

      if (receipt.status) {
        await getNfts();
        toast.success('Successfully claimed rewards!');
        success = true;
      } else {
        toast.error('Something went wrong with un staking your smoles. Please try again.');
      }
    } catch (error) {
      getError(error);
    }
    setIsLoading(null);
    return success;
  };

  // Start Staking
  const stake = async (smols: { id: BigNumber; period: string }[]): Promise<boolean> => {
    setIsLoading('stake');
    const tokenIds = smols.map((n) => n.id);
    const lockTimers = smols.map((n) => n.period);

    let success = false;
    try {
      const stakingAddress = SMOL_AGE_STAKING[chainId];
      const stakingContract = Staking__factory.connect(stakingAddress, signerData);

      const smolContract = NeanderSmol__factory.connect(SMOL_AGE_ADDRESS[chainId], signerData);

      const approved = await smolContract.isApprovedForAll(address, stakingAddress);
      if (!approved) {
        const approveTx = await smolContract.setApprovalForAll(stakingAddress, true);
        const receipt = await approveTx.wait(1);

        if (receipt.status) {
          toast.success('Approved!');
        } else {
          toast.error('Approval failed!');
        }
      }
      const txRes = await stakingContract.stakeSmol(tokenIds, lockTimers);
      const receipt = await txRes.wait(1);

      if (receipt.status) {
        await getNfts();
        toast.success('Your Neandersmol has entered the Bone Yard');
        success = true;
      } else {
        console.log('Staking error', txRes);
        toast.error('Something went wrong with staking your smoles. Please try again.');
      }
    } catch (error) {
      getError(error);
    }
    setIsLoading(null);
    return success;
  };

  const unStake = async (tokenIds: BigNumber[]): Promise<boolean> => {
    setIsLoading('unstake');

    let success = false;
    try {
      const stakingContract = Staking__factory.connect(SMOL_AGE_STAKING[chainId], signerData);
      const txRes = await stakingContract.unstakeSmol(tokenIds);
      const receipt = await txRes.wait(1);

      if (receipt.status) {
        await getNfts();
        toast.success('Your Neandersmol has left the Bone Yard');
        success = true;
      } else {
        console.log('Un staking error', txRes);
        toast.error('Something went wrong with un staking your smoles. Please try again.');
      }
    } catch (error) {
      getError(error);
    }
    setIsLoading(null);
    return success;
  };

  const stakeBones = async (amount: BigNumber, tokenId: BigNumber): Promise<boolean> => {
    setIsLoading('stakeBones');

    let success = false;
    try {
      const bonesStakingAddress = SMOL_AGE_BONES_STAKING[chainId];

      const bonesContract = Bones__factory.connect(SMOL_AGE_BONES[chainId], signerData);
      const balance = await bonesContract.balanceOf(address);
      if (balance.lt(amount)) {
        toast.error('Not enough Bones!');
        return;
      }

      const allowance = await bonesContract.allowance(address, bonesStakingAddress);
      if (allowance.lt(amount)) {
        const approveTx = await bonesContract.approve(
          bonesStakingAddress,
          ethers.constants.MaxUint256,
        );
        const receipt = await approveTx.wait(1);

        if (receipt.status) {
          toast.success('Allowance set!');
        } else {
          toast.error('Allowance failed!');
        }
      }

      const bonesStakingContract = new Contract(
        bonesStakingAddress,
        BonesStaking__factory.abi,
        signerData,
      );
      const stakeTx = await bonesStakingContract.stakeBones(amount, tokenId);
      const receipt = await stakeTx.wait(1);

      if (receipt.status) {
        toast.success('Your Bones have been staked!');
        await getNfts();
        success = true;
      } else {
        toast.error('Something went wrong with claiming rewards. Please try again.');
      }
    } catch (error) {
      getError(error);
    }
    setIsLoading(null);
    return success;
  };

  // End Staking
  const unstakeBones = async (startTime, tokenId: ethers.BigNumberish): Promise<boolean> => {
    setIsLoading('unstakeBones');

    let success = false;
    try {
      startTime = startTime.getTime() / 1000;

      const bonesStakingAddress = SMOL_AGE_BONES_STAKING[chainId];
      const bonesStakingContract = BonesStaking__factory.connect(bonesStakingAddress, signerData);
      const txRes = await bonesStakingContract.unstakeBones(startTime, tokenId);
      const receipt = await txRes.wait(1);

      if (receipt.status) {
        toast.success('Your Bones have been unstaked!');
        await getNfts();
        success = true;
      } else {
        toast.error('Something went wrong with claiming rewards. Please try again.');
      }
    } catch (error) {
      getError(error);
    }
    setIsLoading(null);
    return success;
  };

  const claimCommonSense = async (tokenId: ethers.BigNumberish): Promise<any> => {
    setIsLoading('claimCommonSense');
    // sanity check chain id

    try {
      const bonesStakingAddress = SMOL_AGE_BONES_STAKING[chainId];
      const bonesStakingContract = BonesStaking__factory.connect(bonesStakingAddress, signerData);
      const txRes = await bonesStakingContract.claimRewards(tokenId);
      const receipt = await txRes.wait(1);

      if (receipt.status) {
        toast.success('Your Common Sense has been claimed!');
        await getNfts();
      } else {
        toast.error('Something went wrong with claiming rewards. Please try again.');
      }
    } catch (error) {
      getError(error);
    }
    setIsLoading(null);
  };

  // unstake all

  const unstakeAllBones = async (): Promise<any> => {
    setIsLoading('unstakeAllBones');

    try {
      const bonesStakingAddress = SMOL_AGE_BONES_STAKING[chainId];
      const bonesStakingContract = BonesStaking__factory.connect(bonesStakingAddress, signerData);

      // get all staked bones
      const stakedBones = await bonesStakingContract.getStakes(address);
      if (stakedBones?.length === 0) {
        toast.success('No bones to unstake.');
        return;
      }

      // for each 50 stakes unstakeAll
      for (let i = 0; i < Math.ceil(stakedBones?.length / 50); i++) {
        const txRes = await bonesStakingContract.unstakeAll();
        await txRes.wait(1);
      }

      toast.success('Your Bones have been unstaked!');
    } catch (error) {
      getError(error);
    }
    setIsLoading(null);
  };

  const unstakeAllSmols = async (): Promise<any> => {
    setIsLoading('unstakeAllSmols');

    try {
      const stakingAddress = SMOL_AGE_STAKING[chainId];
      const stakingContract = Staking__factory.connect(stakingAddress, signerData);

      // get all staked bones
      const tx = await stakingContract.unstakeAll();
      await tx.wait(1);

      toast.success('Your Neandersmols have been unstaked. OOOGA!');
    } catch (error) {
      if (error.message.includes('No Stakes')) {
        toast.success('No Neandersmols to unstake.');
        return;
      }

      getError(error);
    }
    setIsLoading(null);
  };

  // ------------------------------- PITS ------------------------------- //

  const stakePits = async (amount: BigNumber): Promise<boolean> => {
    setIsLoading('stakePits');

    let success = false;
    try {
      const pitsContract = new Contract(THE_PITS[chainId], Pits__factory.abi, signerData);

      await handleBoneApproval(amount, THE_PITS[chainId]);

      const txRes = await pitsContract.stakeBonesInYard(amount);
      const receipt = await txRes.wait(1);
      if (receipt.status) {
        toast.success('Your Bones have been staked!');
        success = true;
      } else {
        toast.error('Something went wrong.');
      }
    } catch (error) {
      getError(error);
    }
    setIsLoading(null);
    return success;
  };

  const unstakePits = async (amount: BigNumber): Promise<boolean> => {
    setIsLoading('unstakePits');

    let success = false;
    try {
      const pitsContract = new Contract(THE_PITS[chainId], Pits__factory.abi, signerData);

      const txRes = await pitsContract.removeBonesFromYard(amount);
      const receipt = await txRes.wait(1);

      if (receipt.status) {
        toast.success('Your Bones have been unstaked!');
        success = true;
      } else {
        toast.error('Something went wrong with claiming rewards. Please try again.');
      }
    } catch (error) {
      getError(error);
    }
    setIsLoading(null);
    return success;
  };

  // ------------------------------- CAVES ------------------------------- //

  const enterCaves = async (tokenIds: BigNumber[]): Promise<boolean> => {
    setIsLoading('enterCaves');

    let success = false;
    try {
      const phase2Contract = new Contract(CAVES[chainId], Caves__factory.abi, signerData);
      const txRes = await phase2Contract.enterCaves(tokenIds);
      const receipt = await txRes.wait(1);

      if (receipt.status) {
        toast.success('Your Smols entered the caves!');
        success = true;
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      getError(error);
    }
    setIsLoading(null);
    return success;
  };

  const leaveCave = async (tokenIds: BigNumber[]): Promise<boolean> => {
    setIsLoading('leaveCave');

    let success = false;
    try {
      const phase2Contract = new Contract(CAVES[chainId], Caves__factory.abi, signerData);

      const txRes = await phase2Contract.leaveCave(tokenIds);
      const receipt = await txRes.wait(1);

      if (receipt.status) {
        toast.success('Your Smols left the cave!');
        success = true;
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      getError(error);
    }
    setIsLoading(null);
    return success;
  };

  const claimCaveReward = async (tokenIds: BigNumber[]): Promise<boolean> => {
    setIsLoading('claimCaveReward');

    let success = false;
    try {
      const phase2Contract = new Contract(CAVES[chainId], Caves__factory.abi, signerData);

      const txRes = await phase2Contract.claimCaveReward(tokenIds);
      const receipt = await txRes.wait(1);

      if (receipt.status) {
        toast.success('$BONES claimed!');
        success = true;
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      getError(error);
    }
    setIsLoading(null);
    return success;
  };

  // ------------------------ DEVELOPMENT GROUNDS ------------------------ //

  const enterDevelopmentGrounds = async (tokens: SelectedItem[]): Promise<boolean> => {
    setIsLoading('enterDevelopmentGrounds');

    let success = false;
    try {
      const devGroundsContract = new Contract(
        DEVELOPMENT_GROUNDS[chainId],
        DevelopmentGrounds__factory.abi,
        signerData,
      );

      const tx = await devGroundsContract.enterDevelopmentGround(
        tokens.map((t) => t.tokenId),
        tokens.map((t) => t.lock),
        tokens.map((t) => t.ground),
      );
      const receipt = await tx.wait(1);

      if (receipt.status) {
        toast.success('Your Smols entered the Development Grounds!');
        success = true;
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
    setIsLoading(null);
    return success;
  };

  const leaveDevelopmentGrounds = async (tokenIds: BigNumber[]) => {
    setIsLoading('leaveDevelopmentGrounds');

    try {
      const devGroundsContract = new Contract(
        DEVELOPMENT_GROUNDS[chainId],
        DevelopmentGrounds__factory.abi,
        signerData,
      );

      const tx = await devGroundsContract.leaveDevelopmentGround(tokenIds);
      const receipt = await tx.wait(1);

      if (receipt.status) {
        toast.success('Your Smols left the Development Grounds!');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
    setIsLoading(null);
  };

  const claimBonesDevelopmentGrounds = async (tokenIds: BigNumber[]) => {
    setIsLoading('claimBonesDevelopmentGrounds');

    try {
      const devGroundsContract = new Contract(
        DEVELOPMENT_GROUNDS[chainId],
        DevelopmentGrounds__factory.abi,
        signerData,
      );

      const tx = await devGroundsContract.claimDevelopmentGroundBonesReward(
        tokenIds,
        tokenIds.map(() => false),
      );
      const receipt = await tx.wait(1);

      receipt.status
        ? toast.success('Bones Claimed!')
        : toast.error('Something went wrong. Please try again.');
    } catch (error) {
      toast.error('Something went wrong');
    }
    setIsLoading(null);
  };

  const stakeBonesDevelopmentGrounds = async (
    tokenIds: BigNumber[],
    amounts: BigNumber[],
  ): Promise<boolean> => {
    setIsLoading('stakeBonesDevelopmentGrounds');

    let success = false;
    try {
      const devGroundsContract = new Contract(
        DEVELOPMENT_GROUNDS[chainId],
        DevelopmentGrounds__factory.abi,
        signerData,
      );

      const totalAmount = amounts.reduce((a, b) => a.add(b), BigNumber.from(0));
      await handleBoneApproval(totalAmount, DEVELOPMENT_GROUNDS[chainId]);

      const tx = await devGroundsContract.stakeBonesInDevelopmentGround(amounts, tokenIds);
      const receipt = await tx.wait(1);

      receipt.status
        ? toast.success('Bones Staked!')
        : toast.error('Something went wrong. Please try again.');
      success = true;
    } catch (error) {
      toast.error('Something went wrong');
    }
    setIsLoading(null);
    return success;
  };

  const unstakeSingleBonesDevelopmentGrounds = async (
    tokenId: BigNumber,
    position: number,
  ): Promise<boolean> => {
    setIsLoading('unstakeSingleBonesDevelopmentGrounds');

    let success = false;
    try {
      const devGroundsContract = new Contract(
        DEVELOPMENT_GROUNDS[chainId],
        DevelopmentGrounds__factory.abi,
        signerData,
      );

      const tx = await devGroundsContract.removeSingleBones(tokenId, position);
      const receipt = await tx.wait(1);

      receipt.status
        ? toast.success('Bones Removed!')
        : toast.error('Something went wrong. Please try again.');
      success = true;
    } catch (error) {
      toast.error('Something went wrong');
    }
    setIsLoading(null);
    return success;
  };

  // ------------------------------ SHOP --------------------------------- //

  const mintLaborTools = async (tokenIds: BigNumber[], amounts: number[], currencies: number[]) => {
    setIsLoading('mintLaborTools');

    let success = false;
    try {
      const chainId = !chain || chain?.unsupported ? ARBITRUM : chain?.id;
      const shopContract = new Contract(SHOP[chainId], Shop__factory.abi, signerData);
      const tx = await shopContract.mint(tokenIds, amounts, currencies);
      const receipt = await tx.wait(1);

      if (receipt.status) {
        toast.success('Successfully purchased tools!');
        success = true;
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
    setIsLoading(null);
    return success;
  };

  // ------------------------------ LABOR GROUNDS --------------------------------- //

  const enterLaborGrounds = async (
    tokenIds: BigNumber[],
    supplyIds: BigNumber[],
    jobs: number[],
  ) => {
    setIsLoading('enterLaborGrounds');

    let success = false;
    try {
      const chainId = !chain || chain?.unsupported ? ARBITRUM : chain?.id;
      const laborGroundsContract = new Contract(
        LABOR_GROUNDS[chainId],
        LaborGrounds__factory.abi,
        signerData,
      );
      const tx = await laborGroundsContract.enterLaborGround(tokenIds, supplyIds, jobs);
      const receipt = await tx.wait(1);

      if (receipt.status) {
        toast.success('You Smols entered the labor ground!');
        success = true;
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
    setIsLoading(null);
    return success;
  };

  const leaveLaborGrounds = async (tokenIds: BigNumber[]) => {
    setIsLoading('leaveLaborGrounds');

    let success = false;
    try {
      const chainId = !chain || chain?.unsupported ? ARBITRUM : chain?.id;
      const laborGroundsContract = new Contract(
        LABOR_GROUNDS[chainId],
        LaborGrounds__factory.abi,
        signerData,
      );
      const tx = await laborGroundsContract.leaveLaborGround(tokenIds);
      const receipt = await tx.wait(1);

      if (receipt.status) {
        toast.success('Your Smols left the labor ground!');
        success = true;
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
    setIsLoading(null);
    return success;
  };

  const bringInAnimalsToLaborGrounds = async (tokenIds: BigNumber[], animalIds: BigNumber[]) => {
    setIsLoading('bringInAnimalsToLaborGrounds');

    let success = false;
    try {
      const chainId = !chain || chain?.unsupported ? ARBITRUM : chain?.id;
      const laborGroundsContract = new Contract(
        LABOR_GROUNDS[chainId],
        LaborGrounds__factory.abi,
        signerData,
      );
      const tx = await laborGroundsContract.bringInAnimalsToLaborGround(tokenIds, animalIds);
      const receipt = await tx.wait(1);

      if (receipt.status) {
        toast.success('Your Animals have been put in labor grounds!');
        success = true;
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
    setIsLoading(null);
    return success;
  };

  const removeAnimalsFromLaborGrounds = async (tokenIds: BigNumber[]) => {
    setIsLoading('removeAnimalsFromLaborGrounds');

    let success = false;
    try {
      const chainId = !chain || chain?.unsupported ? ARBITRUM : chain?.id;
      const laborGroundsContract = new Contract(
        LABOR_GROUNDS[chainId],
        LaborGrounds__factory.abi,
        signerData,
      );
      const tx = await laborGroundsContract.removeAnimalsFromLaborGround(tokenIds);
      const receipt = await tx.wait(1);

      if (receipt.status) {
        toast.success('Your Animals have been removed from labor grounds!');
        success = true;
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
    setIsLoading(null);
    return success;
  };

  const claimCollectableLaborGrounds = async (tokenIds: BigNumber[]): Promise<boolean> => {
    setIsLoading('claimCollectableLaborGrounds');

    let success = false;
    try {
      const chainId = !chain || chain?.unsupported ? ARBITRUM : chain?.id;
      const laborGroundsContract = new Contract(
        LABOR_GROUNDS[chainId],
        LaborGrounds__factory.abi,
        signerData,
      );
      const txRes = await laborGroundsContract.claimCollectables(tokenIds);
      const receipt = await txRes.wait(1);

      if (receipt.status) {
        success = true;
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
    setIsLoading(null);
    return success;
  };

  const stakedSmolsInLaborGrounds = async (
    address: Address,
  ): Promise<LaborGroundFeInfoStructOutput[]> => {
    const stakedTokens = await LaborGrounds__factory.connect(
      LABOR_GROUNDS[chainId],
      provider,
    ).getLaborGroundFeInfo(address);
    return stakedTokens;
  };

  // ------------------------------ UTILITY ---------------------------------- //

  const handleBoneApproval = async (amount: BigNumber, contractAddress: string) => {
    const bonesContract = new Contract(SMOL_AGE_BONES[chainId], Bones__factory.abi, signerData);
    const balance: BigNumber = await bonesContract.balanceOf(address);
    if (balance.lt(amount)) {
      toast.error('Not enough Bones!');
      return;
    }

    const allowance = await bonesContract.allowance(address, contractAddress);
    if (allowance.lt(amount)) {
      const approveTx = await bonesContract.approve(contractAddress, ethers.constants.MaxUint256);
      const allowanceRes = await approveTx.wait(1);
      if (allowanceRes.status) {
        toast.success('Allowance set!');
      } else {
        toast.error('Allowance failed!');
        return;
      }
    }
  };

  return (
    <ContractContext.Provider
      value={{
        nfts,
        isLoading,
        claimBones,
        stake,
        unStake,
        stakeBones,
        unstakeBones,
        stakePits,
        unstakePits,
        enterCaves,
        leaveCave,
        unstakeAllBones,
        unstakeAllSmols,
        claimCommonSense,
        claimCaveReward,
        enterDevelopmentGrounds,
        leaveDevelopmentGrounds,
        claimBonesDevelopmentGrounds,
        stakeBonesDevelopmentGrounds,
        unstakeSingleBonesDevelopmentGrounds,
        mintLaborTools,
        stakedSmolsInLaborGrounds,
        enterLaborGrounds,
        leaveLaborGrounds,
        bringInAnimalsToLaborGrounds,
        removeAnimalsFromLaborGrounds,
        claimCollectableLaborGrounds,
        refetchNFTs: async () => {
          await getNfts();
        },
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default WalletProvider;

const testData = {
  user: {
    tokens: [
      {
        tokenID: '11',
        name: 'Neander Smol #11',
        staked: false,
        stakeLocation: null,
        commonSense: '100000000000',
      },
      {
        tokenID: '154',
        name: 'Neander Smol #154',
        staked: true,
        stakeLocation: 'caves',
        commonSense: '97800000000',
      },
      {
        tokenID: '2153',
        name: 'Neander Smol #2153',
        staked: true,
        stakeLocation: 'caves',
        commonSense: '100000000000',
      },
      {
        tokenID: '2282',
        name: 'Neander Smol #2282',
        staked: true,
        stakeLocation: 'development_ground',
        commonSense: '100000000000',
      },
      {
        tokenID: '2840',
        name: 'Neander Smol #2840',
        staked: true,
        stakeLocation: 'caves',
        commonSense: null,
      },
      {
        tokenID: '2946',
        name: 'Neander Smol #2946',
        staked: true,
        stakeLocation: 'development_ground',
        commonSense: '100000000000',
      },
      {
        tokenID: '2981',
        name: 'Neander Smol #2981',
        staked: false,
        stakeLocation: null,
        commonSense: null,
      },
      {
        tokenID: '3919',
        name: 'Neander Smol #3919',
        staked: true,
        stakeLocation: 'development_ground',
        commonSense: '100000000000',
      },
      {
        tokenID: '4280',
        name: 'Neander Smol #4280',
        staked: false,
        stakeLocation: null,
        commonSense: null,
      },
      {
        tokenID: '4568',
        name: 'Neander Smol #4568',
        staked: false,
        stakeLocation: null,
        commonSense: null,
      },
      {
        tokenID: '4576',
        name: 'Neander Smol #4576',
        staked: false,
        stakeLocation: null,
        commonSense: null,
      },
      {
        tokenID: '4621',
        name: 'Neander Smol #4621',
        staked: true,
        stakeLocation: 'development_ground',
        commonSense: '100000000000',
      },
      {
        tokenID: '4658',
        name: 'Neander Smol #4658',
        staked: false,
        stakeLocation: null,
        commonSense: null,
      },
      {
        tokenID: '4936',
        name: 'Neander Smol #4936',
        staked: true,
        stakeLocation: 'development_ground',
        commonSense: '100000000000',
      },
      {
        tokenID: '4944',
        name: 'Neander Smol #4944',
        staked: true,
        stakeLocation: 'development_ground',
        commonSense: '100000000000',
      },
      {
        tokenID: '4961',
        name: 'Neander Smol #4961',
        staked: false,
        stakeLocation: null,
        commonSense: null,
      },
      {
        tokenID: '4962',
        name: 'Neander Smol #4962',
        staked: true,
        stakeLocation: 'bone_yard',
        commonSense: '15000000000',
      },
      {
        tokenID: '4963',
        name: 'Neander Smol #4963',
        staked: true,
        stakeLocation: 'bone_yard',
        commonSense: null,
      },
      {
        tokenID: '4964',
        name: 'Neander Smol #4964',
        staked: true,
        stakeLocation: 'development_ground',
        commonSense: '100000000000',
      },
    ],
  },
};
