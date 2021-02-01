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
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface BaseRelayRecipientInterface extends ethers.utils.Interface {
  functions: {
    "isTrustedForwarder(address)": FunctionFragment;
    "trustedForwarder()": FunctionFragment;
    "versionRecipient()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "isTrustedForwarder",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "trustedForwarder",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "versionRecipient",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "isTrustedForwarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "trustedForwarder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "versionRecipient",
    data: BytesLike
  ): Result;

  events: {};
}

export class BaseRelayRecipient extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: BaseRelayRecipientInterface;

  functions: {
    isTrustedForwarder(
      forwarder: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    "isTrustedForwarder(address)"(
      forwarder: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    trustedForwarder(overrides?: CallOverrides): Promise<[string]>;

    "trustedForwarder()"(overrides?: CallOverrides): Promise<[string]>;

    versionRecipient(overrides?: CallOverrides): Promise<[string]>;

    "versionRecipient()"(overrides?: CallOverrides): Promise<[string]>;
  };

  isTrustedForwarder(
    forwarder: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  "isTrustedForwarder(address)"(
    forwarder: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  trustedForwarder(overrides?: CallOverrides): Promise<string>;

  "trustedForwarder()"(overrides?: CallOverrides): Promise<string>;

  versionRecipient(overrides?: CallOverrides): Promise<string>;

  "versionRecipient()"(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    isTrustedForwarder(
      forwarder: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    "isTrustedForwarder(address)"(
      forwarder: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    trustedForwarder(overrides?: CallOverrides): Promise<string>;

    "trustedForwarder()"(overrides?: CallOverrides): Promise<string>;

    versionRecipient(overrides?: CallOverrides): Promise<string>;

    "versionRecipient()"(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    isTrustedForwarder(
      forwarder: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "isTrustedForwarder(address)"(
      forwarder: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    trustedForwarder(overrides?: CallOverrides): Promise<BigNumber>;

    "trustedForwarder()"(overrides?: CallOverrides): Promise<BigNumber>;

    versionRecipient(overrides?: CallOverrides): Promise<BigNumber>;

    "versionRecipient()"(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    isTrustedForwarder(
      forwarder: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "isTrustedForwarder(address)"(
      forwarder: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    trustedForwarder(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "trustedForwarder()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    versionRecipient(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "versionRecipient()"(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}