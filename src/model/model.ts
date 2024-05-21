import { BigNumber } from 'ethers';

export type UserToken = {
  tokenID: string;
  name: string;
  staked: boolean;
  stakeLocation?: string;
  commonSense?: number;
};

export type NFTObject = {
  id: BigNumber;
  staked: boolean;
  name: string;
  stakedLocation?: string;

  reward?: string;
  endTime?: number;
  image: string;
  stakes?: any;
  amountStaked?: number;
  commonSense?: number;
};

export type Stake = {
  amountStaked: number;
  lastRewardTime: Date;
  startTime: Date;
  tokenId: BigNumber;
};

export type Lock = {
  name: string;
  bones: number;
  days: number;
};

export const locks: Lock[] = [
  { name: 'No Lock', bones: 2, days: 0 },
  { name: '15 Days', bones: 10, days: 15 },
  { name: '30 Days', bones: 25, days: 30 },
];

export enum Jobs {
  Digging,
  Foraging,
  Mining,
}

export enum Ground {
  Mystic,
  Farmer,
  Warrior,
}

export type SelectedItem = { tokenId: BigNumber; lock: number; ground: Ground };

export type Animal = {
  id: BigNumber;
  name: string;
  image: string;
};

export enum ConsumableType {
  Common,
  Rare,
}

export type Consumable = {
  id: BigNumber;
  name: string;
  image: string;
  type: ConsumableType;
};

export type Job = {
  name: string;
  image: string;
  url: string;
  id: number;
};

export type Tool = {
  name: string;
  image: string;
  tokenId: BigNumber;
};
