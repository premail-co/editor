import React from "react";
import { Input } from "./Input";
import { Surface } from "../Surface/index";
import { Typography } from "../Typography";
import { Chevron } from "@premail/icons";

export default {
  title: "Input",
  component: Input,
};

const Template = () => {
  const [invalidInput, setInvalidInput] = React.useState("");
  return (
    <Surface style={{ padding: 10 }}>
      <Typography variant={"h6"}>Text input</Typography>
      <Input
        id={"text-input"}
        type={"text"}
        placeholder={"Text input"}
        autoComplete={"off"}
      />
      <Typography variant={"h6"}>Number input</Typography>
      <Input id={"number-input"} type={"number"} placeholder={"Number input"} />
      <Typography variant={"h6"}>File input</Typography>
      <Input id={"file-input"} type={"file"} placeholder={"File input"} />
      <Typography variant={"h6"}>Email input</Typography>
      <Input id={"email-input"} type={"email"} placeholder={"Email input"} />
      <Typography variant={"h6"}>Date input</Typography>
      <Input id={"date-input"} type={"date"} placeholder={"Date input"} />
      <Typography variant={"h6"}>Tel input</Typography>
      <Input id={"tel-input"} type={"tel"} placeholder={"Tel input"} />
      <Typography variant={"h6"}>Password input</Typography>
      <Input id={"password-input"} type={"password"} />
      <Typography variant={"h6"}>Disabled input</Typography>
      <Input
        id={"disabled-input"}
        type={"text"}
        disabled
        value={"Hello world"}
      />
      <Typography variant={"h6"}>Invalid Input</Typography>
      <Input
        id={"error-input"}
        type={"text"}
        error={invalidInput.length == 0}
        value={invalidInput}
        onChange={(e) => {
          setInvalidInput(e.target.value);
        }}
        helperText={
          invalidInput.length == 0
            ? "This input displays error when it has no text"
            : "No errors detected"
        }
      />

      <Typography variant={"h6"}>Icon input</Typography>
      <Input
        id={"icon-input"}
        type={"text"}
        placeholder={"Text input"}
        icon={Chevron}
        iconPosition="end"
      />
    </Surface>
  );
};

export const FirstStory = Template.bind({});
