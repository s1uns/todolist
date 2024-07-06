import styled from "@emotion/styled";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, Typography } from "@mui/material";
import { FieldInputProps } from "formik";
import {
  FC,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  memo,
  useCallback,
  useMemo,
  useState
} from "react";

interface InputProps {
  autoFocus?: boolean;
  value?: string;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  field?: FieldInputProps<string>;
  error?: string;

  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onBlur?: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

interface PasswordVisibilityProps {
  type: string;
  passwordVisibility: boolean;
  handleChangeVisibility: () => void;
}

const PasswordVisibility = memo(
  ({
    type,
    passwordVisibility,
    handleChangeVisibility
  }: PasswordVisibilityProps) => {
    if (type === "text" && passwordVisibility) {
      return <VisibilityOff onClick={handleChangeVisibility} />;
    }

    if (type === "password" && !passwordVisibility) {
      return <Visibility onClick={handleChangeVisibility} />;
    }
    return null;
  }
);

const Input: FC<InputProps> = (props: InputProps) => {
  const {
    autoFocus,
    type,
    placeholder,
    field,
    value,
    onChange,
    onBlur,
    error
  } = props;

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);

  const inputValue = field ? field.value : value;
  const name = field ? field.name : "";

  const handleChangeVisibility = useCallback(() => {
    setPasswordVisibility(!passwordVisibility);
  }, [passwordVisibility]);

  const handleChangeValue = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (onChange) {
      onChange(e);
    } else if (field) {
      field.onChange(e);
    }
  };

  const inputType = useMemo(() => {
    if (type === "password" && !passwordVisibility) {
      return "password";
    }
    if (type === "password" && passwordVisibility) {
      return "text";
    }
    if (type) {
      return type;
    }
    return "text";
  }, [type, passwordVisibility]);

  const shouldShowIcon =
    (inputType === "text" && passwordVisibility) ||
    (inputType === "password" && !passwordVisibility);
  return (
    <InputContainer>
      <InputFieldContainer>
        <TextField
          name={name}
          onChange={handleChangeValue}
          onBlur={field ? field.onBlur : onBlur}
          label={placeholder}
          autoFocus={autoFocus}
          type={inputType}
          value={inputValue}
          placeholder={placeholder}
          InputProps={{
            endAdornment: shouldShowIcon && (
              <PasswordVisibility
                type={inputType}
                passwordVisibility={passwordVisibility}
                handleChangeVisibility={handleChangeVisibility}
              />
            )
          }}
        />
      </InputFieldContainer>
      <Typography color="error">{error ? error : "\u00A0"}</Typography>
    </InputContainer>
  );
};

export default Input;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.01rem;
`;

const InputFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
