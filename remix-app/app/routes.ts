import { flatRoutes } from "@remix-run/fs-routes";
import type { RouteConfig } from "@remix-run/route-config";
import { index, layout, route } from "@remix-run/route-config";
//import { remixRoutesOptionAdapter } from "@remix-run/routes-option-adapter";

export default [
  ...(await flatRoutes({ rootDirectory: "fs-routes" })),

 // ...(await remixRoutesOptionAdapter(/* ... */)),

 
  layout("routes/layouts/sidebar.tsx", [
    index('routes/_index.tsx'),
    route("/contacts/:contactId/edit", "routes/contacts.$contactId_.edit.tsx"),
    route("/contacts/:contactId/destroy", "routes/contacts.$contactId_.destroy.tsx"),
    route("/contacts/:contactId", "routes/contacts.$contactId.tsx"),
  ]),
  //layout("routes/about/layout.tsx", [
    route("/about", "routes/about/index.tsx")
  //])
] satisfies RouteConfig;
