import * as React from 'react'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from './ui/navigation-menu'
import { NAV_LINKS, SERVICES, servicePath } from '../config/company'

function ListItem(
  props: React.ComponentPropsWithoutRef<'a'> & { title: string }
) {
  const { title, children, ...rest } = props
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
          {...rest}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children ? (
            <p className="line-clamp-2 text-sm leading-snug text-gray-600">{children}</p>
          ) : null}
        </a>
      </NavigationMenuLink>
    </li>
  )
}

const linkClass =
  'inline-flex h-9 items-center rounded-md px-3 text-sm font-medium hover:bg-gray-100'

export default function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {NAV_LINKS.map((link) =>
          link.dropdown ? (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[320px] gap-2 p-3 md:w-[420px]">
                  <ListItem href={link.href} title={`All ${link.label}`} />
                  {SERVICES.map((service) => (
                    <ListItem
                      key={service.slug}
                      href={servicePath(service.slug)}
                      title={service.name}
                    >
                      {service.excerpt}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink asChild>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
