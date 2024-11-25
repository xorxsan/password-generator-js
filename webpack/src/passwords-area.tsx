import { ContentCopy } from "@mui/icons-material";
import { IconButton, Stack, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";

type PasswordsAreaProps = {
  passwordV0: string;
  passwordV1: string;
  passwordV2: string;
};

export const PasswordsArea = (props: PasswordsAreaProps): JSX.Element => {
  return (
    <Stack spacing={2} marginTop={2}>
      <Grid container>
        <Grid size={11}>
          <TextField hiddenLabel disabled fullWidth value={props.passwordV0} />
        </Grid>
        <Grid size={1}>
          <IconButton aria-label="Copy password v0 to clipboard">
            <ContentCopy
              onClick={() => {
                navigator.clipboard.writeText(props.passwordV0);
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container>
        <Grid size={11}>
          <TextField hiddenLabel disabled fullWidth value={props.passwordV1} />
        </Grid>
        <Grid size={1}>
          <IconButton aria-label="Copy password v1 to clipboard">
            <ContentCopy
              onClick={() => {
                navigator.clipboard.writeText(props.passwordV1);
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container>
        <Grid size={11}>
          <TextField hiddenLabel disabled fullWidth value={props.passwordV2} />
        </Grid>
        <Grid size={1}>
          <IconButton aria-label="Copy password v2 to clipboard">
            <ContentCopy
              onClick={() => {
                navigator.clipboard.writeText(props.passwordV2);
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </Stack>
  );
};
