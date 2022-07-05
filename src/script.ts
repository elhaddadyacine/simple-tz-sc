//import { TezosToolkit } from "@taquito/taquito";
import { RpcClient } from "@taquito/rpc";
// import * as FunctoLib from "./functolib"
import * as Pn from "./pn_interface"

const CONTRACT_ADDRESS = "KT19sGbcjdK24AGTfXxz21sBC2Yob3DE2muT";
const RPC_URL = "https://ithacanet.ecadinfra.com";

// with the contract abstraction
//const Tezos = new TezosToolkit(RPC_URL);
//const contract = await Tezos?.contract.at(CONTRACT_ADDRESS);
//console.log(JSON.stringify(contract.script.storage, null, 2));
// with the RPC client
const client = new RpcClient(RPC_URL);
let s = await client.getStorage(CONTRACT_ADDRESS);
//console.log(JSON.stringify(s));
let app_tag = document.getElementById("app")
app_tag.textContent = Pn.storage_decode(s).toString()