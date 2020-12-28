import styles from "./viewer.module.css";

import { Dispatch, SetStateAction, useState } from "react";
import { Source } from "../source/Source";
import {
  Base64PrettyPrinter,
  isBase64,
} from "../pretty-printers/Base64PrettyPrinter";
import {
  isJSON,
  JSONPrettyPrinter,
} from "../pretty-printers/JSONPrettyPrinter";
import { EmptyPrettyPrinter } from "../pretty-printers/EmptyPrettyPrinter";
import { PrettyPrinter, PrettyPrinterComponent } from "../../interfaces";
import {
  isUnixTimestamp,
  UnixTimestampPrettyPrinter,
} from "../pretty-printers/UnixTimestampPrettyPrinter";
import Select from "react-select";
import { isJWT, JWTPrettyPrinter } from "../pretty-printers/JWTPrettyPrinter";

const AUTO_DETECT_VALUE = "autoDetect";
const AUTO_DETECT_LABEL = "Auto Detect";

const PRETTY_PRINTERS: Record<string, { pp: PrettyPrinter; label: string }> = {
  base64: {
    pp: {
      component: Base64PrettyPrinter,
      is: isBase64,
    },
    label: "Base64 (UTF-8)",
  },
  json: {
    pp: {
      component: JSONPrettyPrinter,
      is: isJSON,
    },
    label: "JSON",
  },
  jwt: {
    pp: {
      component: JWTPrettyPrinter,
      is: isJWT,
    },
    label: "JWT",
  },
  unixTime: {
    pp: { component: UnixTimestampPrettyPrinter, is: isUnixTimestamp },
    label: "Unix Timestamp",
  },
};

export function ViewerApp() {
  const [inputText, setInputText] = useState("");

  const [selectedOptionKey, setSelectedOptionKey] = useState<string>(
    AUTO_DETECT_VALUE
  );
  const [autoDetectLabel, setAutoDetectLabel] = useState<string>(
    AUTO_DETECT_LABEL
  );

  const PrettyPrinter = prettyPrinterComponent({
    inputText,
    selectedPrettyPrinterKey: selectedOptionKey,
    autoDetectLabel,
    setAutoDetectLabel,
  });

  const selectOptions = [
    { label: autoDetectLabel, value: AUTO_DETECT_VALUE },
    ...Object.entries(PRETTY_PRINTERS).map(([key, { label }]) => {
      return {
        label,
        value: key,
      };
    }),
  ];

  const selectValue = selectOptions.find(({ value }) => {
    return value === selectedOptionKey;
  })!;

  return (
    <div className={styles.viewer}>
      <Select
        id="foo123"
        instanceId="foo123"
        className={styles.select}
        defaultValue={selectOptions[0]}
        options={selectOptions}
        onChange={(event) => {
          setSelectedOptionKey(event!.value);
        }}
        value={selectValue}
      />
      <div></div>
      <Source inputText={inputText} setInputText={setInputText} />
      <PrettyPrinter value={inputText} />
    </div>
  );
}

function prettyPrinterComponent({
  inputText,
  selectedPrettyPrinterKey,
  autoDetectLabel,
  setAutoDetectLabel,
}: {
  inputText: string;
  selectedPrettyPrinterKey: string;
  autoDetectLabel: string;
  setAutoDetectLabel: Dispatch<SetStateAction<string>>;
}): PrettyPrinterComponent {
  if (inputText.length === 0) {
    if (autoDetectLabel !== AUTO_DETECT_LABEL) {
      setAutoDetectLabel(AUTO_DETECT_LABEL);
    }

    return EmptyPrettyPrinter;
  }

  if (selectedPrettyPrinterKey !== AUTO_DETECT_VALUE) {
    if (autoDetectLabel !== AUTO_DETECT_LABEL) {
      setAutoDetectLabel(AUTO_DETECT_LABEL);
    }

    return PRETTY_PRINTERS[selectedPrettyPrinterKey].pp.component;
  }

  for (const prettyPrinter of Object.values(PRETTY_PRINTERS)) {
    if (prettyPrinter.pp.is(inputText)) {
      const label = `${prettyPrinter.label} - Detected`;

      if (autoDetectLabel !== label) {
        setAutoDetectLabel(label);
      }

      return prettyPrinter.pp.component;
    }
  }

  const label = "Auto Detect (no match)";
  if (autoDetectLabel !== label) {
    setAutoDetectLabel(label);
  }

  return EmptyPrettyPrinter;
}
