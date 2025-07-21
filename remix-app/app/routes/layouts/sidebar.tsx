import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, redirect, useLoaderData, useNavigation } from "@remix-run/react";
import Sidebar from "~/components/sidebar";
import { getContacts } from "~/data";

export const loader = async ({request}: LoaderFunctionArgs) => {

    const url = new URL(request.url);
    const q = url.searchParams.get('q');
  
      const contacts = await getContacts(q);
      return {contacts, q};
  }
  
export default function SidebarLayout() {
    
  const {contacts, q} = useLoaderData<typeof loader>();
  
  const navigation = useNavigation();
  const searching =
  navigation.location &&
  new URLSearchParams(navigation.location.search).has(
    "q"
  );

  return (
    <>
    <Sidebar contacts={contacts} q={q} />
    <div id="detail"  className={
      navigation.state === "loading" && !searching ? "loading" : ""
    }>
    <Outlet />
    </div>
    </>
    
  );
}