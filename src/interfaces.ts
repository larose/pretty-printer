export type PrettyPrinterComponent = (props: { value: string }) => JSX.Element;

export interface PrettyPrinter {
  component: PrettyPrinterComponent;
  is: (value: string) => boolean;
}
