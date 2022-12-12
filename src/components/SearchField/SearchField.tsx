import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { StyledTextField, FieldWrapper } from "./SearchField.styles";
import { SearchFieldProps } from "../../types/types";
import { IconButton } from "@mui/material";
export default function SearchField(props: SearchFieldProps) {
  const {
    label,
    placeholder,
    handleKeyPress,
    handleSearch,
    handleSearchChange,
    value,
  } = props;
  return (
    <FieldWrapper>
      <StyledTextField
        label={label}
        placeholder={placeholder}
        onChange={handleSearchChange}
      />
      <SearchIcon
        onClick={value ? handleSearch : () => {}}
        sx={{ color: "white", marginRight: "1em", cursor: "pointer" }}
      />
    </FieldWrapper>
  );
}
