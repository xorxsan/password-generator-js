import wasm from "../../Cargo.toml";

export async function generate_v0(masterPassword, seed, length) {
  const instance = await wasm();
  return instance.generate_v0(masterPassword, seed, length);
}
export async function generate_v1(masterPassword, seed, length) {
  const instance = await wasm();
  return instance.generate_v1(masterPassword, seed, length);
}

export async function generate_v2(masterPassword, seed, length) {
  const instance = await wasm();
  return instance.generate_v2(masterPassword, seed, length);
}
