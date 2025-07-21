import { Outlet } from "@remix-run/react";

export function ContactLayout({ children }: { children: React.ReactNode }) {

    return (
      <Outlet />
    );
  }