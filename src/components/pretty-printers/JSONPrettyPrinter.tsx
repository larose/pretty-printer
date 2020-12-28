import { TextAreaViewer } from "../text-area-viewer/TextAreaViewer";

const START_WITH_CURLY_BRACE_OR_SQUARE_BRACKET = /^\s*[[{}]/;

export function isJSON(value: string) {
  if (!value.match(START_WITH_CURLY_BRACE_OR_SQUARE_BRACKET)) {
    return false;
  }

  try {
    parse(value);
    return true;
  } catch {
    return false;
  }
}

function parse(value: string) {
  return JSON.stringify(JSON.parse(value), null, 2);
}

export function JSONPrettyPrinter({ value }: { value: string }) {
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
