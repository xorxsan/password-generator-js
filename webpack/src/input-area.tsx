import { Button, Stack, TextField } from "@mui/material";
import React from "react";

type InputAreaProps = {
  masterPassword: string | undefined;
  onChangeMasterPassword: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  seed: string | undefined;
  onChangeSeed: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  lengthV0: number;
  onChangeLengthV0: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  lengthV1: number;
  onChangeLengthV1: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  lengthV2: number;
  onChangeLengthV2: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onGeneratePasswordClicked: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  onClearAllClicked: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const InputArea = (props: InputAreaProps): JSX.Element => {
  return (
    <Stack spacing={2}>
      <TextField
        error={props.masterPassword === "" ? true : false}
        id="master-password"
        label="Master Password"
        variant="outlined"
        type="password"
        required
        value={props.masterPassword}
        onChange={props.onChangeMasterPassword}
        helperText="Required"
      />
      <TextField
        error={props.seed === "" ? true : false}
        id="seed"
        label="Seed"
        required
        value={props.seed}
        onChange={props.onChangeSeed}
        helperText="Required"
      />
      <Stack direction="row" spacing={2} justifyContent="space-evenly">
        <TextField
          id="length0"
          label="Top's password's length"
          helperText="Required"
          value={props.lengthV0}
          fullWidth
          onChange={props.onChangeLengthV0}
        />
        <TextField
          id="length1"
          label="Middle's password's length"
          helperText="Required"
          value={props.lengthV1}
          fullWidth
          onChange={props.onChangeLengthV1}
        />
        <TextField
          id="length2"
          label="Bottom's password's length"
          helperText="Required"
          value={props.lengthV2}
          fullWidth
          onChange={props.onChangeLengthV2}
        />
      </Stack>
      <Button variant="outlined" onClick={props.onGeneratePasswordClicked}>
        Generate password
      </Button>
      <Button variant="outlined" onClick={props.onClearAllClicked}>
        Clear all
      </Button>
    </Stack>
  );
};
