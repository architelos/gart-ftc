import type { ReactNode } from "react";

import Text from "@/components/Text";

interface ButtonProps {
  icon: ReactNode;
  type: "accent" | "regular";
  children: ReactNode;
  link: string;
  className?: string;
}

function Button({ icon, type, children, link, className = "" }: ButtonProps) {
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
    <a href={link} className={`flex w-fit cursor-pointer justify-center items-center gap-button p-button scale-on-hover rounded-md ${add} ${className}`}>
      <Text type="sub" className="text-text!">{children}</Text>
      {icon}
    </a>
  );
}

export default Button
