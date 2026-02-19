import {
  NavLink as RouterNavLink,
  NavLinkProps,
} from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "underline" | "pill" | "sidebar";

interface Props extends Omit<NavLinkProps, "className"> {
  className?: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  default:
    "text-white/70 hover:text-white transition",

  underline:
    "relative text-white/70 hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full",

  pill:
    "px-3 py-1.5 rounded-full hover:bg-white/10 transition",

  sidebar:
    "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 data-[active=true]:bg-accent/20 data-[active=true]:text-accent",
};

export const NavLink = forwardRef<HTMLAnchorElement, Props>(
  ({ className, icon, badge, variant = "default", children, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          cn(
            "group flex items-center gap-2 text-sm font-medium",
            variantStyles[variant],
            isActive && "data-[active=true]",
            className
          )
        }
      >
        {(navLinkProps) => (
          <>
            {/* Icon */}
            {icon && (
              <span className="text-current opacity-80 group-hover:opacity-100">
                {icon}
              </span>
            )}

            {/* Label */}
            <span>
              {typeof children === "function"
                ? children(navLinkProps)
                : children}
            </span>

            {/* Badge */}
            {badge && (
              <span className="ml-1 text-xs bg-accent text-black px-1.5 py-0.5 rounded">
                {badge}
              </span>
            )}
          </>
        )}
      </RouterNavLink>
    );
  }
);

NavLink.displayName = "NavLink";
