//import { TezosToolkit } from "@taquito/taquito";
import { RpcClient } from "@taquito/rpc";

const CONTRACT_ADDRESS = "KT1GRSvLoikDsXujKgZPsGLX8k8VvR2Tq95b";
const RPC_URL = "https://mainnet.api.tez.ie";

(async () => {
  // with the contract abstraction
  //const Tezos = new TezosToolkit(RPC_URL);
  //const contract = await Tezos?.contract.at(CONTRACT_ADDRESS);
  //console.log(JSON.stringify(contract.script.storage, null, 2));
  // with the RPC client
  const client = new RpcClient(RPC_URL);
  let s = await client.getStorage(CONTRACT_ADDRESS);
  console.log(JSON.stringify(s));
})();
