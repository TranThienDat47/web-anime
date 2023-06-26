import Search from '~/views/Search';
import config from '~/config';
import Home from '~/views/Home';
import Watch from '~/views/Watch';
import Product from '~/views/Product';

const publicRoutes = [
   { path: config.routes.home, compnent: Home },
   { path: config.routes.product, compnent: Product },
   { path: config.routes.search, compnent: Search },
   { path: config.routes.watch, compnent: Watch },
];

const privateRoutes = [{ path: null, compnent: null, layout: null }];

export { publicRoutes, privateRoutes };
