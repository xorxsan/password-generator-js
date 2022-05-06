import React, { useState } from "react";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { generate_v0, generate_v1, generate_v2 } from "pkg";
import { InputArea } from "./input-area";
import { PasswordsArea } from "./passwords-area";

const App = (): JSX.Element => {
  const [masterPassword, setMasterPassword] = useState<string | undefined>(
    undefined
  );
  const [seed, setSeed] = useState<string | undefined>(undefined);
  const [lengthV0, setLengthV0] = useState<number>(20);
  const [lengthV1, setLengthV1] = useState<number>(20);
  const [lengthV2, setLengthV2] = useState<number>(25);
  const [passwordV0, setPasswordV0] = useState<string>("");
  const [passwordV1, setPasswordV1] = useState<string>("");
  const [passwordV2, setPasswordV2] = useState<string>("");

  const onChangeMasterPassword = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setMasterPassword(event.currentTarget.value);
  };

  const onChangeSeed = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSeed(event.currentTarget.value);
  };

  const onChangeLength = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    callback: (p: number) => void,
    defaultLength: number
  ) => {
    length = parseInt(event.currentTarget.value);
    callback(isNaN(length) ? defaultLength : length);
  };

  const onGeneratePasswordClicked = (
    _event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (masterPassword && seed) {
      setPasswordV0(generate_v0(masterPassword, seed, lengthV0));
      setPasswordV1(generate_v1(masterPassword, seed, lengthV1));
      setPasswordV2(generate_v2(masterPassword, seed, lengthV2));
    }
  };

  const onClearAllClicked = (_event: React.MouseEvent<HTMLButtonElement>) => {
    setMasterPassword("");
    setSeed("");
    setLengthV0(20);
    setLengthV1(20);
    setLengthV2(25);
    setPasswordV0("");
    setPasswordV1("");
    setPasswordV2("");
  };

  return (
    <Container>
      <Box marginTop={5}>
        <InputArea
          masterPassword={masterPassword}
          onChangeMasterPassword={onChangeMasterPassword}
          seed={seed}
          onChangeSeed={onChangeSeed}
          lengthV0={lengthV0}
          onChangeLengthV0={(e) => onChangeLength(e, setLengthV0, 20)}
          lengthV1={lengthV1}
          onChangeLengthV1={(e) => onChangeLength(e, setLengthV1, 20)}
          lengthV2={lengthV2}
          onChangeLengthV2={(e) => onChangeLength(e, setLengthV2, 25)}
          onGeneratePasswordClicked={onGeneratePasswordClicked}
          onClearAllClicked={onClearAllClicked}
        />
        <PasswordsArea
          passwordV0={passwordV0}
          passwordV1={passwordV1}
          passwordV2={passwordV2}
        />
      </Box>
    </Container>
  );
};

export default App;
