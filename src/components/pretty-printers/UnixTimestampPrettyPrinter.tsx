import { TextAreaViewer } from "../text-area-viewer/TextAreaViewer";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

dayjs.extend(calendar);
dayjs.extend(relativeTime);
dayjs.extend(utc);

const DIGIT_ONLY = /^\d+$/;

const PP_DATE_FORMAT = "ddd MMM D HH:mm:ss ZZ";
// Fri Dec 25 22:07:21 2020 -0500

export function isUnixTimestamp(value: string) {
  const isDigitOnly = value.match(DIGIT_ONLY);
  if (!isDigitOnly) {
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
  const timestamp = parseInt(value, 10);
  if (isNaN(timestamp)) {
    throw new Error("NaN");
  }

  const date = dayjs.unix(timestamp);

  const prettyPrintedValue = {
    local: {
      iso: date.local().format(),
      pp: date.local().format(PP_DATE_FORMAT),
    },
    relative: {
      calendar: date.local().calendar(),
      relative: date.fromNow(),
    },
    utc: {
      iso: date.utc().format(),
      pp: date.utc().format(PP_DATE_FORMAT),
    },
  };

  return JSON.stringify(prettyPrintedValue, null, 2);
}

export function UnixTimestampPrettyPrinter({ value }: { value: string }) {
  let parsedValue: string;

  try {
    parsedValue = parse(value);
  } catch (error) {
    parsedValue = error;
  }

  return <TextAreaViewer value={parsedValue}></TextAreaViewer>;
}
