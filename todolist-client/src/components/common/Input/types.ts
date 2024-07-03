export interface InputProps {
  componentName: "string";
  autoFocus: boolean;
  type: string;
  placeholder: string;
  // field: undefined | any;
  // form: undefined | any;
  fieldName?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: any) => void;
  error: undefined | string;
  touched: boolean;
}
