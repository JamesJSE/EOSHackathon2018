import Vue from 'vue';
import Router from 'vue-router';

//splash init design
import Splash from '@/components/Splash';
//splash init design
import Login from '@/components/Login';
//splash init design
import Register from '@/components/Register';
//splash init design
import Dashboard from '@/components/Dashboard';
//splash init design
import Profile from '@/components/Profile';
//splash init design
import Link from '@/components/Link';

//store
import store from '../store';


Vue.use(Router);

const router = new Router({
  mode: ((typeof (process) !== 'undefined') && (typeof (process.browser) === 'undefined'))?'hash':'history',
  routes: [
    {
      path: '/',
      name: 'Splash',
      component: Splash,
	},
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/link',
      name: 'link',
      component: Link,
	},
  ],
});

//
/**
 * Before each route check user is authenticated on next path else redirect to login
 */
router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	if ((requiresAuth) && (!store.state.user.loggedIn)) {
		next('login');
	} else {
		next();
	}
});

export default router;
