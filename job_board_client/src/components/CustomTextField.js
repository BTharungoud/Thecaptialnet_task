import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";
import { Controller } from "react-hook-form";

const CustomTextField = ({
  name,
  control,
  defaultValue,
  label,
  error,
  rules,
  placeholder,
  type,
}) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input
            {...field}
            error={Boolean(error)}
            placeholder={placeholder}
            fullWidth
            type={type}
            size="small"
            border={error ? "1px solid red" : "1px solid black"}
            padding="6px 4px 6px 8px"
            borderRadius="8px"
          />
        )}
        rules={rules}
      />
      {error && <FormHelperText color="red">{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default CustomTextField;
