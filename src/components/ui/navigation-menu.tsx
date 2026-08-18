import * as React from "react";
import {
  Root as NavigationMenuPrimitive,
  List as NavigationMenuListPrimitive,
  Item as NavigationMenuItemPrimitive,
  Trigger as NavigationMenuTriggerPrimitive,
  Content as NavigationMenuContentPrimitive,
  Viewport as NavigationMenuViewportPrimitive,
  Indicator as NavigationMenuIndicatorPrimitive,
  Link as NavigationMenuLinkPrimitive,
} from "@radix-ui/react-navigation-menu";
import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive
    ref={ref}
    className={cn(
      "relative z-50 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive>
));
NavigationMenu.displayName = "NavigationMenu";

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuListPrimitive>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuListPrimitive>
>(({ className, ...props }, ref) => (
  <NavigationMenuListPrimitive
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center gap-1",
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = "NavigationMenuList";

const NavigationMenuItem = NavigationMenuItemPrimitive;

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuTriggerPrimitive>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuTriggerPrimitive>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuTriggerPrimitive
    ref={ref}
    className={cn(
      "group inline-flex h-9 items-center justify-center rounded-md bg-transparent px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
  </NavigationMenuTriggerPrimitive>
));
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuContentPrimitive>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuContentPrimitive>
>(({ className, ...props }, ref) => (
  <NavigationMenuContentPrimitive
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion=from-start]:animate-in data-[motion=from-start]:fade-in-0 data-[motion=from-start]:zoom-in-95 data-[motion=to-end]:animate-out data-[motion=to-end]:fade-out-0 data-[motion=to-end]:zoom-out-95 md:absolute md:w-auto",
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = "NavigationMenuContent";

const NavigationMenuLink = NavigationMenuLinkPrimitive;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuViewportPrimitive>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuViewportPrimitive>
>(({ className, ...props }, ref) => (
  <div className="absolute left-0 top-full z-50 flex w-full justify-center">
    <NavigationMenuViewportPrimitive
      ref={ref}
      className={cn(
        "origin-top-center relative h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-white shadow data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = "NavigationMenuViewport";

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
};
