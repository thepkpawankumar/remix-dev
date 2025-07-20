import {
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import "./tailwind.css";
import "./app.css";
import Sidebar from "./components/sidebar";
import { createEmptyContact, getContacts } from "~/data";

export const loader = async ({request}: LoaderFunctionArgs) => {

  const url = new URL(request.url);
  const q = url.searchParams.get('q');

    const contacts = await getContacts(q);
    return {contacts, q};
}
export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {

  const {contacts, q} = useLoaderData<typeof loader>();
  
  return (
    <html lang="en" className="h-full m-0 leading-[1.5] text-[#121212]">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex w-full h-full m-0 leading-[1.5] text-[#121212]">
       
        <Sidebar contacts={contacts} q={q} />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  
  const navigation = useNavigation();
  const searching =
  navigation.location &&
  new URLSearchParams(navigation.location.search).has(
    "q"
  );

  return (
    <div id="detail"  className={
      navigation.state === "loading" && !searching ? "loading" : ""
    }>
    <Outlet />
    </div>
  );
}
