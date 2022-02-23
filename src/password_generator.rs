use regex::Regex;
use sha1::{Digest as Sha1Digest, Sha1};
use sha2::{Digest as Sha256Digest, Sha256};

pub struct Generator {
    seed: String,
    master: String,
    length: usize,
}

impl Generator {
    pub fn new(seed: &str, master: &str, length: usize) -> Self {
        Generator {
            seed: String::from(seed),
            master: String::from(master),
            length,
        }
    }

    fn generate_chars() -> Vec<u8> {
        let mut ascii_chars = Vec::new();
        for i in 33..127 as u8 {
            ascii_chars.push(i);
        }

        ascii_chars
    }

    fn generate_allowed_chars_v0() -> Vec<u8> {
        let ascii_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        let ascii_chars = std::str::from_utf8(ascii_chars.as_bytes()).unwrap();

        let re = Regex::new(r#""|'|\\"#).unwrap();
        let chars_as_str: String = re.replace_all(&ascii_chars, "").into();
        chars_as_str.as_bytes().to_vec()
    }

    fn generate_allowed_chars_v1() -> Vec<u8> {
        let ascii_chars = Self::generate_chars();
        let ascii_chars = std::str::from_utf8(&ascii_chars).unwrap();

        let re = Regex::new(r#""|'|\\"#).unwrap();
        let chars_as_str: String = re.replace_all(&ascii_chars, "").into();
        chars_as_str.as_bytes().to_vec()
    }

    fn generate_allowed_chars_v2() -> Vec<u8> {
        let ascii_chars = Self::generate_chars();
        let ascii_chars = std::str::from_utf8(&ascii_chars).unwrap();

        let re = Regex::new(r#"<|>|"|'|\\"#).unwrap();
        let chars_as_str: String = re.replace_all(&ascii_chars, "").into();
        chars_as_str.as_bytes().to_vec()
    }

    fn generate_output(text: &Vec<char>, chars: &[u8]) -> String {
        let mut output: String = String::new();
        for i in (0..text.len()).step_by(3) {
            let mut triplet: u32 = (text[i] as u32) << 16;
            if i + 1 < text.len() {
                triplet |= (text[i + 1] as u32) << 8;
            }

            if i + 2 < text.len() {
                triplet |= text[i + 2] as u32;
            }

            for j in 0..4 {
                if i * 8 + j * 6 <= text.len() * 8 {
                    output.push(chars[((triplet >> 6 * (3 - j)) & 0x3F) as usize] as char);
                }
            }
        }
        output
    }

    pub fn convert_to_modified_base64_v0(&self, input: &str) -> String {
        let chars = Self::generate_allowed_chars_v0();
        let text: Vec<char> = input.chars().collect();
        Self::generate_output(&text, &chars)
    }

    pub fn convert_to_modified_base64_v1(&self, input: &str) -> String {
        let chars = Self::generate_allowed_chars_v1();
        let text: Vec<char> = input.chars().collect();
        Self::generate_output(&text, &chars)
    }

    pub fn convert_to_modified_base64_v2(&self, input: &str) -> String {
        let chars = Self::generate_allowed_chars_v2();
        let text: Vec<char> = input.chars().collect();
        Self::generate_output(&text, &chars)
    }

    pub fn generate_password_v0(&self) -> String {
        let mut total: String = String::new();
        total.push_str(&self.master);
        total.push(':');
        total.push_str(&self.seed);
        let hash = self.process_sha1::<Sha1>(&total);
        let modified_base64: String = self.convert_to_modified_base64_v0(&hash);
        let mut result: String = modified_base64.chars().take(self.length - 2).collect();
        result.push_str("1a");
        return result;
    }

    pub fn generate_password_v1(&self) -> String {
        let mut total: String = String::new();
        total.push_str(&self.master);
        total.push(':');
        total.push_str(&self.seed);
        let hash = self.process::<Sha256>(&total);
        let modified_base64: String = self.convert_to_modified_base64_v1(&hash);
        let result = modified_base64.chars().take(self.length).collect();
        return result;
    }

    pub fn generate_password_v2(&self) -> String {
        let mut total: String = String::new();
        total.push_str(&self.master);
        total.push(':');
        total.push_str(&self.seed);
        let hash = self.process::<Sha256>(&total);
        let modified_base64: String = self.convert_to_modified_base64_v2(&hash);
        let result: String = modified_base64.chars().take(self.length).collect();
        return result;
    }

    fn process<D: Sha256Digest + Default>(&self, reader: &str) -> String {
        let mut sh = D::default();
        sh.update(reader.as_bytes());
        let x = sh.finalize();
        let mut result: String = String::new();
        for byte in x {
            result.push(byte as char);
        }
        return result;
    }

    fn process_sha1<D: Sha1Digest + Default>(&self, reader: &str) -> String {
        let mut sh = D::default();
        sh.update(reader.as_bytes());
        let x = sh.finalize();
        let mut result: String = String::new();
        for byte in x {
            result.push(byte as char);
        }
        return result;
    }
}

#[cfg(test)]
mod tests {
    use crate::password_generator;

    #[test]

    fn it_converts_a_string_into_modified_base64() {
        let generator = password_generator::Generator::new("", "", 10);
        let res = generator.convert_to_modified_base64_v1("hola");

        assert_eq!(res, "=)aO;3");
    }

    #[test]
    fn generates_password_from_seed_v0() {
        let generator = password_generator::Generator::new("seed", "master", 10);
        let res = generator.generate_password_v0();

        assert_eq!(res, "pvgfL5dN1a");
    }

    #[test]
    fn generates_password_from_seed_v1() {
        let generator = password_generator::Generator::new("seed", "master", 20);
        let res = generator.generate_password_v1();

        assert_eq!(res, "`ULDQUc#GF>PB4HC>JV<");
    }

    #[test]
    fn generates_password_from_seed_v2() {
        let generator = password_generator::Generator::new("seed", "master", 25);
        let res = generator.generate_password_v2();

        assert_eq!(res, "bWNFSWe#IH@RD4JE@LX=6#O(X");
    }
}
