import DashBoard from '~/views/DashBoard';
import Search from '~/views/Search';
import config from '~/config';
import Home from '~/views/Home';
import Watch from '~/views/Watch';

const publicRoutes = [
   { path: config.routes.home, compnent: Home },
   { path: config.routes.search, compnent: Search },
   { path: config.routes.watch, compnent: Watch },
];

const privateRoutes = [{ path: config.routes.dashboard, compnent: DashBoard, layout: null }];

export { publicRoutes, privateRoutes };
