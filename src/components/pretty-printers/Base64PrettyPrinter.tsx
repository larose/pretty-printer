import { TextAreaViewer } from "../text-area-viewer/TextAreaViewer";
import { base64 } from "rfc4648";

export function isBase64(value: string) {
  try {
    parse(value);
    return true;
  } catch {
    return false;
  }
}

function parse(value: string) {
  const bytes = base64.parse(value, { loose: true });
  return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
}

export function Base64PrettyPrinter({ value }: { value: string }) {
  let parsedValue: string;

  try {
    parsedValue = parse(value);
  } catch (error: unknown) {
    if (!(error instanceof Error)) {
      throw error;
    }

    parsedValue = `${error.name}: ${error.message}`;
  }

  return <TextAreaViewer value={parsedValue}></TextAreaViewer>;
}
