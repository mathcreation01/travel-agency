import {type RouteConfig, index, route, layout} from "@react-router/dev/routes";
import * as path from "node:path";

//export default [index("routes/home.tsx")] satisfies RouteConfig;
export default [
    layout('routes/admin/admin-layout.tsx', [
        route( 'dashboard', 'routes/admin/dashboard.tsx'),
        route( 'all-users', 'routes/admin/all-users.tsx')
        ])
] satisfies RouteConfig;

