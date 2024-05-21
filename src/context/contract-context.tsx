import { NFTObject, SelectedItem } from '@model/model';
import { LaborGroundFeInfoStructOutput } from '@typechain/LaborGrounds';
import { BigNumber } from 'ethers';
import React from 'react';
import { Address } from 'wagmi';

export interface ContractContextData {
  isLoading: string;
  nfts: NFTObject[];

  claimBones: (smols: BigNumber[]) => Promise<boolean>;
  stake: (smols: any[]) => Promise<boolean>;
  unStake: (tokenIds: BigNumber[]) => Promise<boolean>;

  stakeBones: (amount: BigNumber, tokenId: BigNumber) => Promise<boolean>;
  unstakeBones: (amount: BigNumber, tokenId: BigNumber) => Promise<boolean>;

  unstakeAllBones: () => Promise<any>;
  unstakeAllSmols: () => Promise<any>;
  claimCommonSense: (e: any) => void;

  stakePits: (amount: BigNumber) => Promise<boolean>;
  unstakePits: (amount: BigNumber) => Promise<boolean>;
  enterCaves: (amount: BigNumber[]) => Promise<boolean>;
  leaveCave: (amount: BigNumber[]) => Promise<boolean>;
  claimCaveReward: (amount: BigNumber[]) => Promise<boolean>;
  enterDevelopmentGrounds: (tokens: SelectedItem[]) => Promise<boolean>;
  leaveDevelopmentGrounds: (tokenIds: BigNumber[]) => Promise<void>;
  claimBonesDevelopmentGrounds: (tokenIds: BigNumber[]) => Promise<void>;
  stakeBonesDevelopmentGrounds: (tokenIds: BigNumber[], amounts: BigNumber[]) => Promise<boolean>;
  unstakeSingleBonesDevelopmentGrounds: (tokenId: BigNumber, position: number) => Promise<boolean>;
  mintLaborTools: (
    tokenIds: BigNumber[],
    amounts: number[],
    currencies: number[],
  ) => Promise<boolean>;
  stakedSmolsInLaborGrounds: (address: Address) => Promise<LaborGroundFeInfoStructOutput[]>;
  enterLaborGrounds: (
    tokenIds: BigNumber[],
    supplyIds: BigNumber[],
    jobs: number[],
  ) => Promise<boolean>;
  leaveLaborGrounds: (tokenIds: BigNumber[]) => Promise<boolean>;
  bringInAnimalsToLaborGrounds: (tokenIds: BigNumber[], animalIds: BigNumber[]) => Promise<boolean>;
  removeAnimalsFromLaborGrounds: (tokenIds: BigNumber[]) => Promise<boolean>;
  claimCollectableLaborGrounds: (tokenIds: BigNumber[]) => Promise<boolean>;
  refetchNFTs?: () => Promise<void>;
}

export const contractContextDefaults: ContractContextData = {
  isLoading: null,
  nfts: [],

  claimBones: async () => Promise.resolve(false),
  stake: async () => Promise.resolve(false),
  unStake: async () => Promise.resolve(false),
  claimCommonSense: async () => Promise.resolve(),

  unstakeAllBones: async () => Promise.resolve(),
  unstakeAllSmols: async () => Promise.resolve(),

  stakeBones: async () => Promise.resolve(false),
  unstakeBones: async () => Promise.resolve(false),
  stakePits: async () => Promise.resolve(false),
  unstakePits: async () => Promise.resolve(false),
  enterCaves: async () => Promise.resolve(false),
  leaveCave: async () => Promise.resolve(false),
  claimCaveReward: async () => Promise.resolve(false),
  enterDevelopmentGrounds: async () => Promise.resolve(false),
  leaveDevelopmentGrounds: async () => Promise.resolve(),
  claimBonesDevelopmentGrounds: async () => Promise.resolve(),
  stakeBonesDevelopmentGrounds: async () => Promise.resolve(false),
  unstakeSingleBonesDevelopmentGrounds: async () => Promise.resolve(false),
  mintLaborTools: async () => Promise.resolve(false),
  stakedSmolsInLaborGrounds: async () => Promise.resolve([]),
  enterLaborGrounds: async () => Promise.resolve(false),
  leaveLaborGrounds: async () => Promise.resolve(false),
  bringInAnimalsToLaborGrounds: async () => Promise.resolve(false),
  removeAnimalsFromLaborGrounds: async () => Promise.resolve(false),
  claimCollectableLaborGrounds: async () => Promise.resolve(false),
  refetchNFTs: async () => Promise.resolve(),
};

export const ContractContext = React.createContext<ContractContextData>(contractContextDefaults);
