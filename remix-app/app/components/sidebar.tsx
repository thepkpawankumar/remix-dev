import { Form, Link, NavLink, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import clsx from "clsx";
import { useEffect, useRef } from "react";

export default function Sidebar({contacts, q}) {
  
    const inputRef = useRef(null);
    const submit = useSubmit();
    const navigation = useNavigation();
    const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );
    
    useEffect(() => {
        if (inputRef.current && inputRef.current instanceof HTMLInputElement) {
          inputRef.current.value = q || "";
        }
      }, [q]);

    //   useEffect(() => {
    //     const searchField = document.getElementById("q");
    //     if (searchField instanceof HTMLInputElement) {
    //       searchField.value = q || "";
    //     }
    //   }, [q]);


    return (
        <div id="sidebar" className="flex flex-col w-[22rem] bg-[#f7f7f7] border-r border-r-[#e3e3e3]">
        <h1 className="flex items-center text-base font-medium m-0 px-8 py-4 border-t border-t-[#e3e3e3] order-1 leading-none before:mr-2 before:relative before:top-[1px]">
          
          <Link to="/about">About us</Link>
          </h1>
        <div className="flex items-center py-4 px-8 gap-2 border-b border-b-[#e3e3e3]">
          <Form id="search-form" role="search" className="relative" 
            onChange={(event) => {
                const isFirstSearch = q === null;
                submit(event.currentTarget, {
                  replace: !isFirstSearch,
                });
              }}
          >
            <input
              id="q"
              ref={inputRef}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              defaultValue={q || ""}
              className={clsx("box-border w-full pl-8 relative bg-no-repeat bg-[position:0.625rem_0.75rem] bg-[length:1rem]", {
                "loading": searching
              })}
              
              name="q"
            />
            <div id="search-spinner" className="absolute w-4 h-4 top-3 left-2.5" aria-hidden hidden={!searching} />
          </Form>
          <Form method="post" className="relative">
            <button type="submit" className="font-medium text-[#3992ff]">New</button>
          </Form>
        </div>
        <nav className="flex-1 overflow-auto pt-4 py-4 px-8">
            {contacts?.length ? (
                    <ul className="p-0 m-0 list-none">
                        {contacts?.map(contact => (
                            <li className="py-1 px-0" key={contact.id}>
                            <NavLink 
                             className={({ isActive, isPending }) => 
                                clsx( // It is added here to add dynamic classes
                                    "flex items-center justify-between overflow-hidden whitespace-pre p-2 rounded-lg text-inherit no-underline gap-4 transition-colors duration-100",
                                    {
                                      "active": isActive,
                                      "pending": isPending,
                                    }
                                  )
                              }
                            to={`/contacts/${contact.id}`}>
                              {
                                (contact.first || contact.last) ? (<>
                                
                                {contact.first} {contact.last}
                                
                                </>): <i>No name</i>
                              }{" "}
                              {contact.favorite ? (
                        <span>★</span>
                      ) : null}
                            </NavLink>
                          </li>
                        ))}
                    
                    
                  </ul>
            ): <p><i>No contacts</i></p>}
          
        </nav>
      </div>
    );
}