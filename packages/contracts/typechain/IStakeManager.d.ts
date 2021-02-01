/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IStakeManagerInterface extends ethers.utils.Interface {
  functions: {
    "authorizeHubByManager(address)": FunctionFragment;
    "authorizeHubByOwner(address,address)": FunctionFragment;
    "getStakeInfo(address)": FunctionFragment;
    "isRelayManagerStaked(address,address,uint256,uint256)": FunctionFragment;
    "penalizeRelayManager(address,address,uint256)": FunctionFragment;
    "stakeForAddress(address,uint256)": FunctionFragment;
    "unauthorizeHubByManager(address)": FunctionFragment;
    "unauthorizeHubByOwner(address,address)": FunctionFragment;
    "unlockStake(address)": FunctionFragment;
    "versionSM()": FunctionFragment;
    "withdrawStake(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "authorizeHubByManager",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "authorizeHubByOwner",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "getStakeInfo",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "isRelayManagerStaked",
    values: [string, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "penalizeRelayManager",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "stakeForAddress",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "unauthorizeHubByManager",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "unauthorizeHubByOwner",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "unlockStake", values: [string]): string;
  encodeFunctionData(functionFragment: "versionSM", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawStake",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "authorizeHubByManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "authorizeHubByOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getStakeInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isRelayManagerStaked",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "penalizeRelayManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "stakeForAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unauthorizeHubByManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unauthorizeHubByOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unlockStake",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "versionSM", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawStake",
    data: BytesLike
  ): Result;

  events: {
    "HubAuthorized(address,address)": EventFragment;
    "HubUnauthorized(address,address,uint256)": EventFragment;
    "StakeAdded(address,address,uint256,uint256)": EventFragment;
    "StakePenalized(address,address,uint256)": EventFragment;
    "StakeUnlocked(address,address,uint256)": EventFragment;
    "StakeWithdrawn(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "HubAuthorized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "HubUnauthorized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StakeAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StakePenalized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StakeUnlocked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "StakeWithdrawn"): EventFragment;
}

export class IStakeManager extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IStakeManagerInterface;

  functions: {
    authorizeHubByManager(
      relayHub: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "authorizeHubByManager(address)"(
      relayHub: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    authorizeHubByOwner(
      relayManager: string,
      relayHub: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "authorizeHubByOwner(address,address)"(
      relayManager: string,
      relayHub: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    getStakeInfo(
      relayManager: string,
      overrides?: CallOverrides
    ): Promise<
      [
        [BigNumber, BigNumber, BigNumber, string] & {
          stake: BigNumber;
          unstakeDelay: BigNumber;
          withdrawBlock: BigNumber;
          owner: string;
        }
      ] & {
        stakeInfo: [BigNumber, BigNumber, BigNumber, string] & {
          stake: BigNumber;
          unstakeDelay: BigNumber;
          withdrawBlock: BigNumber;
          owner: string;
        };
      }
    >;

    "getStakeInfo(address)"(
      relayManager: string,
      overrides?: CallOverrides
    ): Promise<
      [
        [BigNumber, BigNumber, BigNumber, string] & {
          stake: BigNumber;
          unstakeDelay: BigNumber;
          withdrawBlock: BigNumber;
          owner: string;
        }
      ] & {
        stakeInfo: [BigNumber, BigNumber, BigNumber, string] & {
          stake: BigNumber;
          unstakeDelay: BigNumber;
          withdrawBlock: BigNumber;
          owner: string;
        };
      }
    >;

    isRelayManagerStaked(
      relayManager: string,
      relayHub: string,
      minAmount: BigNumberish,
      minUnstakeDelay: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "isRelayManagerStaked(address,address,uint256,uint256)"(
      relayManager: string,
      relayHub: string,
      minAmount: BigNumberish,
      minUnstakeDelay: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    penalizeRelayManager(
      relayManager: string,
      beneficiary: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "penalizeRelayManager(address,address,uint256)"(
      relayManager: string,
      beneficiary: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    stakeForAddress(
      relayManager: string,
      unstakeDelay: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    "stakeForAddress(address,uint256)"(
      relayManager: string,
      unstakeDelay: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<ContractTransaction>;

    unauthorizeHubByManager(
      relayHub: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "unauthorizeHubByManager(address)"(
      relayHub: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    unauthorizeHubByOwner(
      relayManager: string,
      relayHub: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "unauthorizeHubByOwner(address,address)"(
      relayManager: string,
      relayHub: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    unlockStake(
      relayManager: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "unlockStake(address)"(
      relayManager: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    versionSM(overrides?: CallOverrides): Promise<[string]>;

    "versionSM()"(overrides?: CallOverrides): Promise<[string]>;

    withdrawStake(
      relayManager: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "withdrawStake(address)"(
      relayManager: string,
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  authorizeHubByManager(
    relayHub: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "authorizeHubByManager(address)"(
    relayHub: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  authorizeHubByOwner(
    relayManager: string,
    relayHub: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "authorizeHubByOwner(address,address)"(
    relayManager: string,
    relayHub: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  getStakeInfo(
    relayManager: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, string] & {
      stake: BigNumber;
      unstakeDelay: BigNumber;
      withdrawBlock: BigNumber;
      owner: string;
    }
  >;

  "getStakeInfo(address)"(
    relayManager: string,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, string] & {
      stake: BigNumber;
      unstakeDelay: BigNumber;
      withdrawBlock: BigNumber;
      owner: string;
    }
  >;

  isRelayManagerStaked(
    relayManager: string,
    relayHub: string,
    minAmount: BigNumberish,
    minUnstakeDelay: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "isRelayManagerStaked(address,address,uint256,uint256)"(
    relayManager: string,
    relayHub: string,
    minAmount: BigNumberish,
    minUnstakeDelay: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  penalizeRelayManager(
    relayManager: string,
    beneficiary: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "penalizeRelayManager(address,address,uint256)"(
    relayManager: string,
    beneficiary: string,
    amount: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  stakeForAddress(
    relayManager: string,
    unstakeDelay: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  "stakeForAddress(address,uint256)"(
    relayManager: string,
    unstakeDelay: BigNumberish,
    overrides?: PayableOverrides
  ): Promise<ContractTransaction>;

  unauthorizeHubByManager(
    relayHub: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "unauthorizeHubByManager(address)"(
    relayHub: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  unauthorizeHubByOwner(
    relayManager: string,
    relayHub: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "unauthorizeHubByOwner(address,address)"(
    relayManager: string,
    relayHub: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  unlockStake(
    relayManager: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "unlockStake(address)"(
    relayManager: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  versionSM(overrides?: CallOverrides): Promise<string>;

  "versionSM()"(overrides?: CallOverrides): Promise<string>;

  withdrawStake(
    relayManager: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "withdrawStake(address)"(
    relayManager: string,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    authorizeHubByManager(
      relayHub: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "authorizeHubByManager(address)"(
      relayHub: string,
      overrides?: CallOverrides
    ): Promise<void>;

    authorizeHubByOwner(
      relayManager: string,
      relayHub: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "authorizeHubByOwner(address,address)"(
      relayManager: string,
      relayHub: string,
      overrides?: CallOverrides
    ): Promise<void>;

    getStakeInfo(
      relayManager: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, string] & {
        stake: BigNumber;
        unstakeDelay: BigNumber;
        withdrawBlock: BigNumber;
        owner: string;
      }
    >;

    "getStakeInfo(address)"(
      relayManager: string,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, string] & {
        stake: BigNumber;
        unstakeDelay: BigNumber;
        withdrawBlock: BigNumber;
        owner: string;
      }
    >;

    isRelayManagerStaked(
      relayManager: string,
      relayHub: string,
      minAmount: BigNumberish,
      minUnstakeDelay: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isRelayManagerStaked(address,address,uint256,uint256)"(
      relayManager: string,
      relayHub: string,
      minAmount: BigNumberish,
      minUnstakeDelay: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    penalizeRelayManager(
      relayManager: string,
      beneficiary: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "penalizeRelayManager(address,address,uint256)"(
      relayManager: string,
      beneficiary: string,
      amount: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    stakeForAddress(
      relayManager: string,
      unstakeDelay: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "stakeForAddress(address,uint256)"(
      relayManager: string,
      unstakeDelay: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    unauthorizeHubByManager(
      relayHub: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "unauthorizeHubByManager(address)"(
      relayHub: string,
      overrides?: CallOverrides
    ): Promise<void>;

    unauthorizeHubByOwner(
      relayManager: string,
      relayHub: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "unauthorizeHubByOwner(address,address)"(
      relayManager: string,
      relayHub: string,
      overrides?: CallOverrides
    ): Promise<void>;

    unlockStake(relayManager: string, overrides?: CallOverrides): Promise<void>;

    "unlockStake(address)"(
      relayManager: string,
      overrides?: CallOverrides
    ): Promise<void>;

    versionSM(overrides?: CallOverrides): Promise<string>;

    "versionSM()"(overrides?: CallOverrides): Promise<string>;

    withdrawStake(
      relayManager: string,
      overrides?: CallOverrides
    ): Promise<void>;

    "withdrawStake(address)"(
      relayManager: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    HubAuthorized(
      relayManager: string | null,
      relayHub: string | null
    ): EventFilter;

    HubUnauthorized(
      relayManager: string | null,
      relayHub: string | null,
      removalBlock: null
    ): EventFilter;

    StakeAdded(
      relayManager: string | null,
      owner: string | null,
      stake: null,
      unstakeDelay: null
    ): EventFilter;

    StakePenalized(
      relayManager: string | null,
      beneficiary: string | null,
      reward: null
    ): EventFilter;

    StakeUnlocked(
      relayManager: string | null,
      owner: string | null,
      withdrawBlock: null
    ): EventFilter;

    StakeWithdrawn(
      relayManager: string | null,
      owner: string | null,
      amount: null
    ): EventFilter;
  };

  estimateGas: {
    authorizeHubByManager(
      relayHub: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "authorizeHubByManager(address)"(
      relayHub: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    authorizeHubByOwner(
      relayManager: string,
      relayHub: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "authorizeHubByOwner(address,address)"(
      relayManager: string,
      relayHub: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    getStakeInfo(
      relayManager: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getStakeInfo(address)"(
      relayManager: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isRelayManagerStaked(
      relayManager: string,
      relayHub: string,
      minAmount: BigNumberish,
      minUnstakeDelay: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "isRelayManagerStaked(address,address,uint256,uint256)"(
      relayManager: string,
      relayHub: string,
      minAmount: BigNumberish,
      minUnstakeDelay: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    penalizeRelayManager(
      relayManager: string,
      beneficiary: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "penalizeRelayManager(address,address,uint256)"(
      relayManager: string,
      beneficiary: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    stakeForAddress(
      relayManager: string,
      unstakeDelay: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    "stakeForAddress(address,uint256)"(
      relayManager: string,
      unstakeDelay: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<BigNumber>;

    unauthorizeHubByManager(
      relayHub: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "unauthorizeHubByManager(address)"(
      relayHub: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    unauthorizeHubByOwner(
      relayManager: string,
      relayHub: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "unauthorizeHubByOwner(address,address)"(
      relayManager: string,
      relayHub: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    unlockStake(
      relayManager: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "unlockStake(address)"(
      relayManager: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    versionSM(overrides?: CallOverrides): Promise<BigNumber>;

    "versionSM()"(overrides?: CallOverrides): Promise<BigNumber>;

    withdrawStake(
      relayManager: string,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "withdrawStake(address)"(
      relayManager: string,
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    authorizeHubByManager(
      relayHub: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "authorizeHubByManager(address)"(
      relayHub: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    authorizeHubByOwner(
      relayManager: string,
      relayHub: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "authorizeHubByOwner(address,address)"(
      relayManager: string,
      relayHub: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    getStakeInfo(
      relayManager: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getStakeInfo(address)"(
      relayManager: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isRelayManagerStaked(
      relayManager: string,
      relayHub: string,
      minAmount: BigNumberish,
      minUnstakeDelay: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isRelayManagerStaked(address,address,uint256,uint256)"(
      relayManager: string,
      relayHub: string,
      minAmount: BigNumberish,
      minUnstakeDelay: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    penalizeRelayManager(
      relayManager: string,
      beneficiary: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "penalizeRelayManager(address,address,uint256)"(
      relayManager: string,
      beneficiary: string,
      amount: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    stakeForAddress(
      relayManager: string,
      unstakeDelay: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    "stakeForAddress(address,uint256)"(
      relayManager: string,
      unstakeDelay: BigNumberish,
      overrides?: PayableOverrides
    ): Promise<PopulatedTransaction>;

    unauthorizeHubByManager(
      relayHub: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "unauthorizeHubByManager(address)"(
      relayHub: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    unauthorizeHubByOwner(
      relayManager: string,
      relayHub: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "unauthorizeHubByOwner(address,address)"(
      relayManager: string,
      relayHub: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    unlockStake(
      relayManager: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "unlockStake(address)"(
      relayManager: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    versionSM(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "versionSM()"(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdrawStake(
      relayManager: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "withdrawStake(address)"(
      relayManager: string,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}