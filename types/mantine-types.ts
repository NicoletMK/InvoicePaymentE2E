import { PaperProps } from "@mantine/core";
import { DetailedHTMLProps, HTMLAttributes, RefObject } from "react";

export type IPaperProps = JSX.IntrinsicAttributes &
  PaperProps & { component?: "div" | undefined } & Omit<
    Omit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
      "ref"
    >,
    "component" | keyof PaperProps
  > & {
    ref?:
      | ((instance: HTMLDivElement | null) => void)
      | RefObject<HTMLDivElement>
      | null
      | undefined;
  };
