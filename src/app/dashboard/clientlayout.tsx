"use client"

import { useState } from 'react'
import { CustomSidebar, SidebarBody, SidebarLink } from '@/components/ui/customsidebar'
import { cn } from '@/lib/utils'
import { HamIcon, Hammer, LogOut } from 'lucide-react';
import Image from 'next/image'
import {
    Github,
    Link as LinkIcon,
    Linkedin,
    Mail,
  } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const triggerLogout = (e: React.MouseEvent) => {
      console.log("triggerLogout");
      e.stopPropagation();
      localStorage.removeItem("dashboard-layout");
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("name");
       fetch('/api/auth/logout').then(() => {
        router.push('/');
       })
    }
    const [open, setOpen] = useState(false);
      const links = [
        {
          label: "GitHub",
          href: "https://github.com/darzhz",
          icon: (
            <Github className="h-5 w-5 shrink-0 text-[#6551F3] dark:text-neutral-200" />
          ),
        },
        {
          label: "Portfolio",
          href: "https://darzhz.github.io/",
          icon: (
            <LinkIcon className="h-5 w-5 shrink-0 text-[#6551F3] dark:text-neutral-200" />
          ),
        },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/darzhz", // Update if needed
          icon: (
            <Linkedin className="h-5 w-5 shrink-0 text-[#6551F3] dark:text-neutral-200" />
          ),
        },
        {
          label: "Email",
          href: "mailto:darzhz@protonmail.com",
          icon: (
            <Mail className="h-5 w-5 shrink-0 text-[#6551F3] dark:text-neutral-200" />
          ),
        },
      ];
      
  return <div
      className={cn(
        "mx-auto flex w-full  flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
        "h-screen", 
      )}
    >
      <CustomSidebar open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-10 w-full">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <HamIcon /> : <Hammer />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
              <div onClick={triggerLogout}>
              <SidebarLink link={{ label: "Logout", href: "#", icon: <LogOut className="h-5 w-5 shrink-0 text-[#6551F3] dark:text-neutral-200" /> }} />
              </div>
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Darsh Shyam",
                href: "https://darzhz.github.io/",
                icon: (
                  <Image
                    src="https://avatars.githubusercontent.com/u/68496521?s=40&v=4"
                    className="h-7 w-7 shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </CustomSidebar>
      {children}

    </div>
}
