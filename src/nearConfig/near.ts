import { env } from "./config";
import { connect, Contract, keyStores, WalletConnection } from "near-api-js";

const nearEnv = env;

export async function initializeContract() {
  const near = await connect(
    //@ts-ignore
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearEnv
    )
  );

  //@ts-ignore
  window.walletConnection = new WalletConnection(near);
  //@ts-ignore
  window.walletConnection = new WalletConnection(near);
  //@ts-ignore
  window.accountId = window.walletConnection.getAccountId();
  //@ts-ignore
  window.contract = new Contract(
    //@ts-ignore
    window.walletConnection.account(),
    nearEnv.contractName,
    {
      viewMethods: ["get"],
      changeMethods: ["add", "done"],
    }
  );
}

export async function getAccountId() {
  //@ts-ignore
  return window.walletConnection.getAccountId();
}

export function login() {
  //@ts-ignore
  window.walletConnection.requestSignIn(nearEnv.contractName);
}

export function logout() {
  //@ts-ignore
  window.walletConnection.signOut();
  window.location.reload();
}
