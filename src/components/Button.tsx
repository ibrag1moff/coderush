import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  id?: string;
  className?: string;
  secondaryStyle?: boolean;
}

export const Button = ({
  children,
  onClick,
  id,
  className,
  secondaryStyle = false,
}: Props) => {
  return (
    <button
      id={id || ""}
      onClick={onClick}
      className={clsx(
        "text-white px-3 py-2 rounded-md cursor-pointer capitalize transition duration-300",
        secondaryStyle
          ? "bg-gray-500 hover:bg-gray-600"
          : "bg-blue-600 hover:bg-blue-700",
        className
      )}
    >
      {children}
    </button>
  );
};
