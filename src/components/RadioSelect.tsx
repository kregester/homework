import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";

export default function RadioButtonSelect(props: {
  setSelectedValue: (arg0: any) => void;
}) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel
          onChange={(e) => props.setSelectedValue(e.target.value)}
          value="nameStartsWith"
          control={<Radio />}
          label="Name Starts With"
        />
        <FormControlLabel
          onChange={(e) => props.setSelectedValue(e.target.value)}
          value="exactName"
          control={<Radio />}
          label="Exact Name"
        />
      </RadioGroup>
    </FormControl>
  );
}
