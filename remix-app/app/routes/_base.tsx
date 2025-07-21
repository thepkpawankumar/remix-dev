import { Outlet } from "@remix-run/react";


export default function BaseLayout({children}: {children: React.ReactNode}) {
  return (
    <div style={{ border: "2px solid blue", padding: "1rem" }}>
      <h2>Base layout</h2>
      {children}
      <Outlet />
    </div>
  );
}