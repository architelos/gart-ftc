import { useState, useCallback } from "react";
import type { FC, AnimationEvent, ReactNode, ElementType } from "react";

interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, "className"> {
  children: ReactNode;
  type: "title" | "pg" | "sub";
  link?: boolean;
  animate?: boolean;
  className?: string;
}

const Text: FC<TextProps> = ({
  children,
  type,
  link = false,
  animate = true,
  className = "",
  ...props
}) => {
  const [animated, setAnimated] = useState(false);
  const handleAnimated = useCallback((e: AnimationEvent) => {
    if (e.animationName.includes("slide-up")) setAnimated(true);
  }, []);

  if (!children) throw new Error("No children");

  let Component: ElementType = "p"; // default to satisfy ts
  let finalCn = className.trim();
  let animation = link ? "lift-on-hover" : "";

  if (animate && !animated) animation += " a-slide-up";

  switch (type) {
    case "title":
      Component = "h1";
      finalCn += " text-text text-title font-semibold tracking-all leading-[1.15]";

      break;

    case "pg":
      Component = "p";
      finalCn += " text-text text-pg font-medium tracking-all leading-[1.15]";

      break;

    case "sub":
      Component = "span";
      finalCn += " text-text text-sub font-medium tracking-all leading-tight";

      break;

    default:
      throw new Error("Invalid text type");
  }

  if (link) Component = "a";
  if (link || type === "sub") animation += " inline-block";

  return (
    <div className={`overflow-hidden ${finalCn.trim()}`}>
      <Component onAnimationEnd={handleAnimated} className={animation.trim()} {...props}>
        {children}
      </Component>
    </div>
  );
}

export default Text;
