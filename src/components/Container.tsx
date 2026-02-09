import { ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const Container = ({ children, className, id }: ContainerProps) => {
  return (
    <div className={clsx("max-w-300 mx-auto px-3", className)} id={id || ""}>
      {children}
    </div>
  );
};
