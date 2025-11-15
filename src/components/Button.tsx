import type { ReactNode } from "react";

import Text from "@/components/Text";

interface ButtonProps {
  icon: ReactNode;
  type: "accent" | "regular";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function Button({ icon, type, children, className = "", onClick = () => {} }: ButtonProps) {
  let add;
  switch (type) {
    case "accent":
      add = "bg-accent";
      break;

    case "regular":
      add = "outline-2 outline-sub";
      break;
  }

  return (
    <button className={`flex w-fit cursor-pointer justify-center items-center gap-button p-button scale-on-hover rounded-md ${add} ${className}`} onClick={onClick}>
      <Text type="sub" className="text-text!">{children}</Text>
      {icon}
    </button>
  );
}

export default Button
