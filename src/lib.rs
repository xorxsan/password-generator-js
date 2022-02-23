use wasm_bindgen::prelude::*;
use web_sys::console;
mod password_generator;

// When the `wee_alloc` feature is enabled, this uses `wee_alloc` as the global
// allocator.
//
// If you don't want to use `wee_alloc`, you can safely delete this.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// This is like the `main` function, except for JavaScript.
#[wasm_bindgen(start)]
pub fn main_js() -> Result<(), JsValue> {
  // This provides better error messages in debug mode.
  // It's disabled in release mode so it doesn't bloat up the file size.
  #[cfg(debug_assertions)]
  console_error_panic_hook::set_once();

  // Your code goes here!
  console::log_1(&JsValue::from_str("Hello world!"));

  Ok(())
}

#[wasm_bindgen]
pub fn generate_v0(master: &str, seed: &str, length: usize) -> Result<String, JsValue> {
  let generator = password_generator::Generator::new(seed, master, length);
  let res = generator.generate_password_v0();
  Ok(res)
}

#[wasm_bindgen]
pub fn generate_v1(master: &str, seed: &str, length: usize) -> Result<String, JsValue> {
  let generator = password_generator::Generator::new(seed, master, length);
  let res = generator.generate_password_v1();
  Ok(res)
}

#[wasm_bindgen]
pub fn generate_v2(master: &str, seed: &str, length: usize) -> Result<String, JsValue> {
  let generator = password_generator::Generator::new(seed, master, length);
  let res = generator.generate_password_v2();
  Ok(res)
}
