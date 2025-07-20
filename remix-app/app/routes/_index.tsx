import type { MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (

      <div id="sidebar" className="flex flex-col w-[22rem] bg-[#f7f7f7] border-r border-r-[#e3e3e3]">
          <h1 className="flex items-center text-base font-medium m-0 px-8 py-4 border-t border-t-[#e3e3e3] order-1 leading-none before:mr-2 before:relative before:top-[1px]">Remix Contacts</h1>
          <div className="flex items-center py-4 px-8 gap-2 border-b border-b-[#e3e3e3]">
            <Form id="search-form" role="search" className="relative">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                className="box-border w-full pl-8 relative bg-no-repeat bg-[position:0.625rem_0.75rem] bg-[length:1rem]"
                name="q"
              />
              <div id="search-spinner" className="absolute w-4 h-4 top-3 left-2.5" aria-hidden hidden={true} />
            </Form>
            <Form method="post" className="relative">
              <button type="submit" className="font-medium text-[#3992ff]">New</button>
            </Form>
          </div>
          <nav className="flex-1 overflow-auto pt-4 py-4 px-8">
            <ul className="p-0 m-0 list-none">
              <li className="py-1 px-0">
                <a href={`/contacts/1`} className="flex items-center justify-between overflow-hidden whitespace-pre p-2 rounded-lg text-inherit no-underline gap-4 transition-colors duration-100">Your Name</a>
              </li>
              <li className="py-1 px-0">
                <a href={`/contacts/2`} className="flex items-center justify-between overflow-hidden whitespace-pre p-2 rounded-lg text-inherit no-underline gap-4 transition-colors duration-100">Your Friend</a>
              </li>
            </ul>
          </nav>
        </div>

  );
}
