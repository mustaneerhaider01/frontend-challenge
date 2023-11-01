import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
  allowInputBorder?: boolean;
  errorMessage?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      disabled,
      id,
      type,
      hasError,
      allowInputBorder = true,
      className,
      errorMessage,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-1">
        <div
          className={twMerge(
            `
          relative
          flex
          items-center
          gap-x-2
          w-full
          rounded-2xl
          border-0
          py-4
          pl-5
          pr-4
          bg-kfield
          focus-within:ring-2
          focus-within:ring-inset
          focus-within:ring-blue-500
          focus-within:bg-white
          transition
        `,
            allowInputBorder && "ring-1 ring-inset ring-kTextColor2",
            hasError && "ring-error focus-within:ring-error bg-error/20",
            disabled && "opacity-50",
            type === "password" && "py-2",
            className
          )}
        >
          <input
            type={type}
            id={id}
            className="outline-none flex-1 bg-transparent text-sm
          leading-6 text-kTextColor1 placeholder:text-kTextColor2 disabled:cursor-not-allowed"
            disabled={disabled}
            ref={ref}
            {...props}
          />
        </div>

        {hasError && (
          <motion.p
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
            }}
            className="text-xs font-medium text-error ml-2"
          >
            {errorMessage}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
