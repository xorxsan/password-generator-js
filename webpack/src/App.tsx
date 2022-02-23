import React, { useState } from "react";
import { Container, Stack, Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";

import { generate_v0, generate_v1, generate_v2 } from "pkg";

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
    callback: (p: number) => void
  ) => {
    callback(parseInt(event.currentTarget.value));
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

  return (
    <Container>
      <Box marginTop={5}>
        <Stack spacing={2}>
          <TextField
            error={masterPassword === "" ? true : false}
            id="master-password"
            label="Master Password"
            variant="outlined"
            type="password"
            required
            value={masterPassword}
            onChange={onChangeMasterPassword}
            helperText="Required"
          />
          <TextField
            error={seed === "" ? true : false}
            id="seed"
            label="Seed"
            variant="outlined"
            required
            value={seed}
            onChange={onChangeSeed}
            helperText="Required"
          />
          <Button variant="outlined" onClick={onGeneratePasswordClicked}>
            Generate password
          </Button>
        </Stack>
        <Stack spacing={2} marginTop={2}>
          <Grid container>
            <Grid item xs={4}>
              <TextField
                id="length"
                label="Length"
                variant="outlined"
                value={lengthV0}
                fullWidth
                onChange={(e) => onChangeLength(e, setLengthV0)}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField hiddenLabel disabled fullWidth value={passwordV0} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <TextField
                id="length"
                label="Length"
                variant="outlined"
                value={lengthV1}
                fullWidth
                onChange={(e) => onChangeLength(e, setLengthV1)}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField hiddenLabel disabled fullWidth value={passwordV1} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={4}>
              <TextField
                id="length"
                label="Length"
                variant="outlined"
                value={lengthV2}
                fullWidth
                onChange={(e) => onChangeLength(e, setLengthV2)}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField hiddenLabel disabled fullWidth value={passwordV2} />
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </Container>
  );
};

export default App;