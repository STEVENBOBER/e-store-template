"use client"

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useState } from "react";


interface MainNavProps {
  data: Category[]
}

export const MainNav: React.FC<MainNavProps> = ({
  data
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`
  }))


  return (
    <div className="flex-grow mx-6" >
      {/* Mobile Menu Button */}
      <button
        className="md:hidden font-bold text-xl"
        onClick={toggleDropdown}
      >
        BROWSE
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={handleLinkClick}
                className={cn(
                  "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
                  route.active ? 'bg-gray-100' : ''
                )}
                role="menuitem"
              >
                {route.label}

              </Link>
            ))}
          </div>
        </div>
      )}

      {/* DESKTOP NAV */}
      <nav
        className="hidden md:flex mx-6 items-center space-x-4 lg:space-x-6"
      >
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-black',
              route.active ? 'text-black' : 'text-neutral-500'
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}


