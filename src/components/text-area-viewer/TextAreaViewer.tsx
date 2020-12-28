import styles from "./text-area-viewer.module.css";

export function TextAreaViewer({ value }: { value: string }) {
  return <textarea className={styles.textarea} value={value} readOnly />;
}
