import { TextAreaViewer } from "../text-area-viewer/TextAreaViewer";
import jwt from "jsonwebtoken";

export function isJWT(value: string) {
  return decode(value) !== null;
}

function decode(value: string) {
  return jwt.decode(value, { complete: true });
}

function parse(value: string) {
  const decodedValue = decode(value);
  if (decodedValue === null) {
    return "Invalid input";
  }

  return JSON.stringify(decodedValue, null, 2);
}

export function JWTPrettyPrinter({ value }: { value: string }) {
  let parsedValue: string;

  try {
    parsedValue = parse(value);
  } catch (error) {
    if (!(error instanceof Error)) {
      throw error;
    }

    parsedValue = `${error.name}: ${error.message}`;
  }

  return <TextAreaViewer value={parsedValue}></TextAreaViewer>;
}
