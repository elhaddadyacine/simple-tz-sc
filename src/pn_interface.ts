
import {
    TezosToolkit,
    BigMapAbstraction,
    MichelsonMap,
    OriginationOperation,
    OpKind,
    createTransferOperation,
    TransferParams,
    RPCOperation,
    createRevealOperation
} from "@taquito/taquito"
import { MichelsonV1Expression } from "@taquito/rpc"
import { encodeOpHash } from '@taquito/utils';
import { Parser } from '@taquito/michel-codec';
import { stringify } from "querystring";

import * as functolib from "./functolib";

let pn_code = require('./pn_code.json')


export type storage = functolib.int
export type initial_storage = functolib.int
export function storage_encode(arg: storage): MichelsonV1Expression { return functolib.int_encode(arg) }
export let storage_decode = function(m: MichelsonV1Expression): storage { return (functolib.int_decode(m)); }

export type _default = storage
export type initial__default = storage

export function _default_encode(arg: _default): MichelsonV1Expression { return storage_encode(arg) }

export function _default_decode(arg: MichelsonV1Expression): _default { return storage_decode(arg) }

export async function call__default(tk: TezosToolkit,
    _default_kt1: string,
    param: _default): Promise<functolib.operation_result> {
    let res = _default_encode(param);
    //console.log(`res: ${JSON.stringify(res,null,2)}`);
    return functolib.send(tk, _default_kt1, '_default', res);
}


async function deploy_pn_raw(
    tezosKit: TezosToolkit,
    storage: MichelsonV1Expression,
    debug = false): Promise<string> {
    console.log("[deploy_pn_raw] Deploying new pn smart contract");
    try {
        console.log(`pn initial storage ${JSON.stringify(storage)}`);
        var b = await functolib.client.getBlock();
        let origination_op = await tezosKit.contract
            .originate({
                code: pn_code,
                init: storage
            })
        console.log(`Waiting for confirmation of origination for ${origination_op.contractAddress}...`);
        var contract = await origination_op.contract();
        console.log(`Origination completed.`);
        return contract.address

    } catch (error) {
        console.log(`ERROR in deploy pn: ${JSON.stringify(error)}`)
        throw error
    }
}

export async function deploy_pn(
    tezosKit: TezosToolkit,
    storage: storage,
    debug = false): Promise<string> {
    let kt1_address = await deploy_pn_raw(tezosKit, storage_encode(storage), debug);
    return kt1_address;
}
