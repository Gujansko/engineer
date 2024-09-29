import { Dispatch, SetStateAction } from "react";

export const handleCopy = (
  objectToCopy: object,
  setTextAction: Dispatch<SetStateAction<string>>,
  successMessage = "Copied to clipboard!",
  errorMessage = "Failed to copy!"
) => {
  if (objectToCopy) {
    const jsonString = JSON.stringify(objectToCopy, null, 2);
    navigator.clipboard.writeText(jsonString).then(
      () => {
        setTextAction(successMessage);
      },
      (_err) => {
        setTextAction(errorMessage);
      }
    );
  }
};

export const getButtonVariant = (
  textAction: string,
  defaultVariant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "teal"
    | "red"
    | "green"
    | null
    | undefined,
  successMessage = "Copied to clipboard!",
  errorMessage = "Failed to copy!"
):
  | "link"
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "teal"
  | "red"
  | "green"
  | null
  | undefined => {
  if (textAction === successMessage) {
    return "green";
  } else if (textAction === errorMessage) {
    return "red";
  }
  return defaultVariant;
};
