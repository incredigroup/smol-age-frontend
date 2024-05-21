/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import type { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from './common';

export type TokenAddonsStruct = {
  hat: PromiseOrValue<string>;
  hand: PromiseOrValue<string>;
  mask: PromiseOrValue<string>;
  special: PromiseOrValue<string>;
};

export type TokenAddonsStructOutput = [string, string, string, string] & {
  hat: string;
  hand: string;
  mask: string;
  special: string;
};

export type AddonStruct = {
  id: PromiseOrValue<string>;
  hasMax: PromiseOrValue<boolean>;
  max: PromiseOrValue<BigNumberish>;
  currentCount: PromiseOrValue<BigNumberish>;
  csLevel: PromiseOrValue<BigNumberish>;
  skillLevel: PromiseOrValue<BigNumberish>;
  requiresPass: PromiseOrValue<boolean>;
  skill: PromiseOrValue<BigNumberish>;
  trait: PromiseOrValue<BigNumberish>;
};

export type AddonStructOutput = [
  string,
  boolean,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  boolean,
  number,
  number,
] & {
  id: string;
  hasMax: boolean;
  max: BigNumber;
  currentCount: BigNumber;
  csLevel: BigNumber;
  skillLevel: BigNumber;
  requiresPass: boolean;
  skill: number;
  trait: number;
};

export interface AddonsControllerInterface extends utils.Interface {
  functions: {
    'addonPrice(string)': FunctionFragment;
    'addons(string)': FunctionFragment;
    'bones()': FunctionFragment;
    'csList(uint256)': FunctionFragment;
    'enabledAddons(string)': FunctionFragment;
    'getTokenAddons(uint256)': FunctionFragment;
    'initialize(address,address,address,address)': FunctionFragment;
    'isAddonPurchased(uint256,string)': FunctionFragment;
    'magic()': FunctionFragment;
    'owner()': FunctionFragment;
    'pass()': FunctionFragment;
    'purchaseAddon(uint256,string,bool)': FunctionFragment;
    'renounceOwnership()': FunctionFragment;
    'setAddonEnabled(string[],bool[])': FunctionFragment;
    'setAddonPrice(string,address,uint256,address,uint256)': FunctionFragment;
    'setAddons((string,bool,uint256,uint256,uint256,uint256,bool,uint8,uint8)[])': FunctionFragment;
    'setAddons(uint256,string[4])': FunctionFragment;
    'setCsList(uint256[])': FunctionFragment;
    'token()': FunctionFragment;
    'transferOwnership(address)': FunctionFragment;
    'withdraw()': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'addonPrice'
      | 'addons'
      | 'bones'
      | 'csList'
      | 'enabledAddons'
      | 'getTokenAddons'
      | 'initialize'
      | 'isAddonPurchased'
      | 'magic'
      | 'owner'
      | 'pass'
      | 'purchaseAddon'
      | 'renounceOwnership'
      | 'setAddonEnabled'
      | 'setAddonPrice'
      | 'setAddons((string,bool,uint256,uint256,uint256,uint256,bool,uint8,uint8)[])'
      | 'setAddons(uint256,string[4])'
      | 'setCsList'
      | 'token'
      | 'transferOwnership'
      | 'withdraw',
  ): FunctionFragment;

  encodeFunctionData(functionFragment: 'addonPrice', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'addons', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(functionFragment: 'bones', values?: undefined): string;
  encodeFunctionData(functionFragment: 'csList', values: [PromiseOrValue<BigNumberish>]): string;
  encodeFunctionData(functionFragment: 'enabledAddons', values: [PromiseOrValue<string>]): string;
  encodeFunctionData(
    functionFragment: 'getTokenAddons',
    values: [PromiseOrValue<BigNumberish>],
  ): string;
  encodeFunctionData(
    functionFragment: 'initialize',
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: 'isAddonPurchased',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>],
  ): string;
  encodeFunctionData(functionFragment: 'magic', values?: undefined): string;
  encodeFunctionData(functionFragment: 'owner', values?: undefined): string;
  encodeFunctionData(functionFragment: 'pass', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'purchaseAddon',
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>, PromiseOrValue<boolean>],
  ): string;
  encodeFunctionData(functionFragment: 'renounceOwnership', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'setAddonEnabled',
    values: [PromiseOrValue<string>[], PromiseOrValue<boolean>[]],
  ): string;
  encodeFunctionData(
    functionFragment: 'setAddonPrice',
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: 'setAddons((string,bool,uint256,uint256,uint256,uint256,bool,uint8,uint8)[])',
    values: [AddonStruct[]],
  ): string;
  encodeFunctionData(
    functionFragment: 'setAddons(uint256,string[4])',
    values: [
      PromiseOrValue<BigNumberish>,
      [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
      ],
    ],
  ): string;
  encodeFunctionData(
    functionFragment: 'setCsList',
    values: [PromiseOrValue<BigNumberish>[]],
  ): string;
  encodeFunctionData(functionFragment: 'token', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'transferOwnership',
    values: [PromiseOrValue<string>],
  ): string;
  encodeFunctionData(functionFragment: 'withdraw', values?: undefined): string;

  decodeFunctionResult(functionFragment: 'addonPrice', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'addons', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'bones', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'csList', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'enabledAddons', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getTokenAddons', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'initialize', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'isAddonPurchased', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'magic', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'owner', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'pass', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'purchaseAddon', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'renounceOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setAddonEnabled', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setAddonPrice', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'setAddons((string,bool,uint256,uint256,uint256,uint256,bool,uint8,uint8)[])',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'setAddons(uint256,string[4])', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setCsList', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'token', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transferOwnership', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'withdraw', data: BytesLike): Result;

  events: {
    'Initialized(uint8)': EventFragment;
    'OwnershipTransferred(address,address)': EventFragment;
    'SetAddons(uint8,uint8,string,bool)': EventFragment;
    'SmolAddonsChanged(uint256,tuple)': EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: 'Initialized'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'OwnershipTransferred'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SetAddons'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'SmolAddonsChanged'): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;

export interface SetAddonsEventObject {
  skill: number;
  Trait: number;
  addons: string;
  state: boolean;
}
export type SetAddonsEvent = TypedEvent<[number, number, string, boolean], SetAddonsEventObject>;

export type SetAddonsEventFilter = TypedEventFilter<SetAddonsEvent>;

export interface SmolAddonsChangedEventObject {
  tokenId: BigNumber;
  addons: TokenAddonsStructOutput;
}
export type SmolAddonsChangedEvent = TypedEvent<
  [BigNumber, TokenAddonsStructOutput],
  SmolAddonsChangedEventObject
>;

export type SmolAddonsChangedEventFilter = TypedEventFilter<SmolAddonsChangedEvent>;

export interface AddonsController extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: AddonsControllerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addonPrice(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<
      [string, BigNumber, string, BigNumber] & {
        tokenA: string;
        amountA: BigNumber;
        tokenB: string;
        amountB: BigNumber;
      }
    >;

    addons(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<
      [string, boolean, BigNumber, BigNumber, BigNumber, BigNumber, boolean, number, number] & {
        id: string;
        hasMax: boolean;
        max: BigNumber;
        currentCount: BigNumber;
        csLevel: BigNumber;
        skillLevel: BigNumber;
        requiresPass: boolean;
        skill: number;
        trait: number;
      }
    >;

    bones(overrides?: CallOverrides): Promise<[string]>;

    csList(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;

    enabledAddons(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;

    getTokenAddons(
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<[TokenAddonsStructOutput]>;

    initialize(
      _neandersmol: PromiseOrValue<string>,
      _pass: PromiseOrValue<string>,
      _magic: PromiseOrValue<string>,
      _bones: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    isAddonPurchased(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<[boolean]>;

    magic(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pass(overrides?: CallOverrides): Promise<[string]>;

    purchaseAddon(
      _tokenId: PromiseOrValue<BigNumberish>,
      _addon: PromiseOrValue<string>,
      useTokenB: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    setAddonEnabled(
      _addon: PromiseOrValue<string>[],
      _state: PromiseOrValue<boolean>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    setAddonPrice(
      _addon: PromiseOrValue<string>,
      _tokenA: PromiseOrValue<string>,
      _amountA: PromiseOrValue<BigNumberish>,
      _tokenB: PromiseOrValue<string>,
      _amountB: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    'setAddons((string,bool,uint256,uint256,uint256,uint256,bool,uint8,uint8)[])'(
      addon: AddonStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    'setAddons(uint256,string[4])'(
      _tokenId: PromiseOrValue<BigNumberish>,
      _addons: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
      ],
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    setCsList(
      _tokenId: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    token(overrides?: CallOverrides): Promise<[string]>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<ContractTransaction>;
  };

  addonPrice(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides,
  ): Promise<
    [string, BigNumber, string, BigNumber] & {
      tokenA: string;
      amountA: BigNumber;
      tokenB: string;
      amountB: BigNumber;
    }
  >;

  addons(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides,
  ): Promise<
    [string, boolean, BigNumber, BigNumber, BigNumber, BigNumber, boolean, number, number] & {
      id: string;
      hasMax: boolean;
      max: BigNumber;
      currentCount: BigNumber;
      csLevel: BigNumber;
      skillLevel: BigNumber;
      requiresPass: boolean;
      skill: number;
      trait: number;
    }
  >;

  bones(overrides?: CallOverrides): Promise<string>;

  csList(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;

  enabledAddons(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

  getTokenAddons(
    _tokenId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides,
  ): Promise<TokenAddonsStructOutput>;

  initialize(
    _neandersmol: PromiseOrValue<string>,
    _pass: PromiseOrValue<string>,
    _magic: PromiseOrValue<string>,
    _bones: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  isAddonPurchased(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides,
  ): Promise<boolean>;

  magic(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  pass(overrides?: CallOverrides): Promise<string>;

  purchaseAddon(
    _tokenId: PromiseOrValue<BigNumberish>,
    _addon: PromiseOrValue<string>,
    useTokenB: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  setAddonEnabled(
    _addon: PromiseOrValue<string>[],
    _state: PromiseOrValue<boolean>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  setAddonPrice(
    _addon: PromiseOrValue<string>,
    _tokenA: PromiseOrValue<string>,
    _amountA: PromiseOrValue<BigNumberish>,
    _tokenB: PromiseOrValue<string>,
    _amountB: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  'setAddons((string,bool,uint256,uint256,uint256,uint256,bool,uint8,uint8)[])'(
    addon: AddonStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  'setAddons(uint256,string[4])'(
    _tokenId: PromiseOrValue<BigNumberish>,
    _addons: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
    ],
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  setCsList(
    _tokenId: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  token(overrides?: CallOverrides): Promise<string>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> },
  ): Promise<ContractTransaction>;

  withdraw(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<ContractTransaction>;

  callStatic: {
    addonPrice(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<
      [string, BigNumber, string, BigNumber] & {
        tokenA: string;
        amountA: BigNumber;
        tokenB: string;
        amountB: BigNumber;
      }
    >;

    addons(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<
      [string, boolean, BigNumber, BigNumber, BigNumber, BigNumber, boolean, number, number] & {
        id: string;
        hasMax: boolean;
        max: BigNumber;
        currentCount: BigNumber;
        csLevel: BigNumber;
        skillLevel: BigNumber;
        requiresPass: boolean;
        skill: number;
        trait: number;
      }
    >;

    bones(overrides?: CallOverrides): Promise<string>;

    csList(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;

    enabledAddons(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;

    getTokenAddons(
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<TokenAddonsStructOutput>;

    initialize(
      _neandersmol: PromiseOrValue<string>,
      _pass: PromiseOrValue<string>,
      _magic: PromiseOrValue<string>,
      _bones: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<void>;

    isAddonPurchased(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<boolean>;

    magic(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    pass(overrides?: CallOverrides): Promise<string>;

    purchaseAddon(
      _tokenId: PromiseOrValue<BigNumberish>,
      _addon: PromiseOrValue<string>,
      useTokenB: PromiseOrValue<boolean>,
      overrides?: CallOverrides,
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setAddonEnabled(
      _addon: PromiseOrValue<string>[],
      _state: PromiseOrValue<boolean>[],
      overrides?: CallOverrides,
    ): Promise<void>;

    setAddonPrice(
      _addon: PromiseOrValue<string>,
      _tokenA: PromiseOrValue<string>,
      _amountA: PromiseOrValue<BigNumberish>,
      _tokenB: PromiseOrValue<string>,
      _amountB: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<void>;

    'setAddons((string,bool,uint256,uint256,uint256,uint256,bool,uint8,uint8)[])'(
      addon: AddonStruct[],
      overrides?: CallOverrides,
    ): Promise<void>;

    'setAddons(uint256,string[4])'(
      _tokenId: PromiseOrValue<BigNumberish>,
      _addons: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
      ],
      overrides?: CallOverrides,
    ): Promise<void>;

    setCsList(_tokenId: PromiseOrValue<BigNumberish>[], overrides?: CallOverrides): Promise<void>;

    token(overrides?: CallOverrides): Promise<string>;

    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    'Initialized(uint8)'(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    'OwnershipTransferred(address,address)'(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null,
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null,
    ): OwnershipTransferredEventFilter;

    'SetAddons(uint8,uint8,string,bool)'(
      skill?: PromiseOrValue<BigNumberish> | null,
      Trait?: PromiseOrValue<BigNumberish> | null,
      addons?: PromiseOrValue<string> | null,
      state?: null,
    ): SetAddonsEventFilter;
    SetAddons(
      skill?: PromiseOrValue<BigNumberish> | null,
      Trait?: PromiseOrValue<BigNumberish> | null,
      addons?: PromiseOrValue<string> | null,
      state?: null,
    ): SetAddonsEventFilter;

    'SmolAddonsChanged(uint256,tuple)'(
      tokenId?: PromiseOrValue<BigNumberish> | null,
      addons?: null,
    ): SmolAddonsChangedEventFilter;
    SmolAddonsChanged(
      tokenId?: PromiseOrValue<BigNumberish> | null,
      addons?: null,
    ): SmolAddonsChangedEventFilter;
  };

  estimateGas: {
    addonPrice(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    addons(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    bones(overrides?: CallOverrides): Promise<BigNumber>;

    csList(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;

    enabledAddons(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;

    getTokenAddons(
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    initialize(
      _neandersmol: PromiseOrValue<string>,
      _pass: PromiseOrValue<string>,
      _magic: PromiseOrValue<string>,
      _bones: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    isAddonPurchased(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    magic(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pass(overrides?: CallOverrides): Promise<BigNumber>;

    purchaseAddon(
      _tokenId: PromiseOrValue<BigNumberish>,
      _addon: PromiseOrValue<string>,
      useTokenB: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    setAddonEnabled(
      _addon: PromiseOrValue<string>[],
      _state: PromiseOrValue<boolean>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    setAddonPrice(
      _addon: PromiseOrValue<string>,
      _tokenA: PromiseOrValue<string>,
      _amountA: PromiseOrValue<BigNumberish>,
      _tokenB: PromiseOrValue<string>,
      _amountB: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    'setAddons((string,bool,uint256,uint256,uint256,uint256,bool,uint8,uint8)[])'(
      addon: AddonStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    'setAddons(uint256,string[4])'(
      _tokenId: PromiseOrValue<BigNumberish>,
      _addons: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
      ],
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    setCsList(
      _tokenId: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<BigNumber>;

    withdraw(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<BigNumber>;
  };

  populateTransaction: {
    addonPrice(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    addons(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    bones(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    csList(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    enabledAddons(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    getTokenAddons(
      _tokenId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    initialize(
      _neandersmol: PromiseOrValue<string>,
      _pass: PromiseOrValue<string>,
      _magic: PromiseOrValue<string>,
      _bones: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    isAddonPurchased(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    magic(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pass(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    purchaseAddon(
      _tokenId: PromiseOrValue<BigNumberish>,
      _addon: PromiseOrValue<string>,
      useTokenB: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    setAddonEnabled(
      _addon: PromiseOrValue<string>[],
      _state: PromiseOrValue<boolean>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    setAddonPrice(
      _addon: PromiseOrValue<string>,
      _tokenA: PromiseOrValue<string>,
      _amountA: PromiseOrValue<BigNumberish>,
      _tokenB: PromiseOrValue<string>,
      _amountB: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    'setAddons((string,bool,uint256,uint256,uint256,uint256,bool,uint8,uint8)[])'(
      addon: AddonStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    'setAddons(uint256,string[4])'(
      _tokenId: PromiseOrValue<BigNumberish>,
      _addons: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<string>,
      ],
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    setCsList(
      _tokenId: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> },
    ): Promise<PopulatedTransaction>;
  };
}
