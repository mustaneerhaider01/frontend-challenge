import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

function Button({
  label,
  onClick,
  disabled,
  outline,
  small,
  type = "button",
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        `
      relative
      disabled:opacity-70
      disabled:cursor-not-allowed
      rounded-lg
      hover:opacity-80
      transition
      w-full
    `,
        outline
          ? "bg-white border-black text-black"
          : "bg-blue-500 border-blue-500 text-white",
        small ? "p-2 text-sm border" : "p-3 text-base font-semibold border-2"
      )}
    >
      {label}
    </button>
  );
}

export default Button;
