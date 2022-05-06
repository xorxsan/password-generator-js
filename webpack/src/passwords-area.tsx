import { ContentCopy } from "@mui/icons-material";
import { Grid, IconButton, Stack, TextField } from "@mui/material";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";

type PasswordsAreaProps = {
  passwordV0: string;
  passwordV1: string;
  passwordV2: string;
};

export const PasswordsArea = (props: PasswordsAreaProps): JSX.Element => {
  return (
    <Stack spacing={2} marginTop={2}>
      <Grid container>
        <Grid item xs={11}>
          <TextField hiddenLabel disabled fullWidth value={props.passwordV0} />
        </Grid>
        <Grid item xs={1}>
          <CopyToClipboard text={props.passwordV0}>
            <IconButton aria-label="Copy password v0 to clipboard">
              <ContentCopy />
            </IconButton>
          </CopyToClipboard>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={11}>
          <TextField hiddenLabel disabled fullWidth value={props.passwordV1} />
        </Grid>
        <Grid item xs={1}>
          <CopyToClipboard text={props.passwordV1}>
            <IconButton aria-label="Copy password v1 to clipboard">
              <ContentCopy />
            </IconButton>
          </CopyToClipboard>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={11}>
          <TextField hiddenLabel disabled fullWidth value={props.passwordV2} />
        </Grid>
        <Grid item xs={1}>
          <CopyToClipboard text={props.passwordV2}>
            <IconButton aria-label="Copy password v2 to clipboard">
              <ContentCopy />
            </IconButton>
          </CopyToClipboard>
        </Grid>
      </Grid>
    </Stack>
  );
};
