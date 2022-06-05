import Arweave from "arweave";
const arweave = Arweave.init({
  host: "arweave.net", // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: "https", // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  logging: false, // Enable network request logging
});
export async function add(task: string, arweave_key: string) {
  const wallet = JSON.parse(arweave_key);
  const tx = await arweave.createTransaction({
    data: Buffer.from(task, "utf8"),
  });
  tx.addTag("Content-Type", "text/plain");
  await arweave.transactions.sign(tx, wallet);
  const response = await arweave.transactions.post(tx);
  if (response.status === 200) {
    //@ts-ignore
    window.contract.add({ arweave_tx: tx.id });
  }
}

export function get() {
  //@ts-ignore
  return window.contract.get();
}

export async function done(id: string) {
  //@ts-ignore
  return window.contract.done({ id: id });
}
