import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import styles from "./source.module.css";

export function Source({
  setInputText,
  inputText,
}: {
  setInputText: Dispatch<SetStateAction<string>>;
  inputText: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.source}>
      <textarea
        ref={textareaRef}
        value={inputText}
        onChange={(event) => {
          setInputText(event.target.value);
        }}
      />
    </div>
  );
}
