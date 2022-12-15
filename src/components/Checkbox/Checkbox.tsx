import React from "react";
import { StyledCheckbox } from "./Checkbox.styles";
import { CheckboxProps } from "../../types/types";

export default function Checkbox(props: CheckboxProps) {
  const { checked, onChange } = props;
  // const [checked, setChecked] = React.useState(true);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  // };

  return <StyledCheckbox checked={checked} onChange={onChange} />;
}
