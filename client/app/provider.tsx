"use client";
type Props = {
  children?: React.ReactNode;
};

export const Provider = ({ children }: Props) => {
  return <body>{children}</body>
};