import { useState, useCallback } from "react";
import type { AnimationEvent, ReactNode, ElementType, AnchorHTMLAttributes, HTMLAttributes } from "react";

interface TextProps extends Omit<HTMLAttributes<HTMLElement>, "className"> {
  children: ReactNode;
  type: "title" | "pg" | "sub";
  link?: boolean;
  clickable?: boolean
  animate?: boolean;
  sep?: boolean;
  className?: string;
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> {
    link: true;
    type: "title" | "pg" | "sub";
    clickable?: boolean;
    animate?: boolean;
    className?: string;
    sep?: boolean;
    children: ReactNode;
}

function Text({
  children,
  type,
  link = false,
  clickable = false,
  animate = true,
  sep = false,
  className = "",
  ...props
}: TextProps | LinkProps) {
  const [animated, setAnimated] = useState(false);
  const handleAnimated = useCallback((e: AnimationEvent<HTMLElement>) => {
    if (e.animationName.includes("slide-up")) setAnimated(true);
  }, []);

  if (!children) throw new Error("No children");

  let Component: ElementType = "p"; // default to satisfy ts
  let finalCn = className.trim();
  let animation = link ? "lift-on-hover" : "";

  const toAnimate = animate && !animated;
  if (animate) {
    animation += toAnimate ? " a-fade-in" : "";
  } else {
    animation += animated ? "" : " opacity-0";
  }

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
      finalCn += " text-sub text-footer font-medium tracking-all leading-tight";

      break;

    default:
      throw new Error("Invalid text type");
  }

  if (link) Component = "a";
  if (link || type === "sub") animation += " inline-block";
  if (clickable) animation += " underline! decoration-text/25! lift-on-hover";

  return (
    <div className={`overflow-hidden ${finalCn.trim()}`}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Component
        onAnimationEnd={handleAnimated}
        className={animation.trim()}
        target={sep ? "_blank" : "_self"}
        rel={sep ? "noopener noreferrer" : ""}
        {...props as any}
      >
        {children}
      </Component>
    </div>
  );
}

export default Text;
