import { URL } from 'src/resources/constants/url';
import Contact from 'src/screens/contact';
import About from 'src/screens/about';
import Login from 'src/screens/login';
import Register from 'src/screens/register';
import forgetPassword from 'src/screens/forgetPassword';
import forgetPasswordFinish from 'src/screens/forgetPassword/finish';
import Coin from 'src/screens/coin';
import Me from 'src/screens/me/pages/Me';
import AccountInfo from 'src/screens/me/pages/AccountInfo';
import Setting from 'src/screens/me/pages/Setting';
import MeProfile from 'src/screens/me/pages/MeProfile';
import MeHistory from 'src/screens/me/pages/History';
import BankInfo from 'src/screens/me/pages/BankInfo';
import MyReferral from 'src/screens/me/pages/Referral';
import Wallet from 'src/screens/wallet';
import CoinBowlFAQ from 'src/screens/landingpage/CoinBowlFAQ';
import AgreementPrivacy from 'src/screens/agreementPrivacy';
import PromotionProgram from 'src/screens/promotionProgram';
import StaticPage from 'src/screens/static';
import routeWrapper from './routeWraper';
import renderRoutes from './renderRoutes';
import privateRoute from './privateRoute';

/**
 * {
    path: '/some-path',
    component: YourComponent,
    componentProps: { name: 'Component Name' },
    auth: bool ==> need to auth to see this view
    containerProps: { header: true [,headerProps] , footer: true [,footerProps], bodyWrapper: true, noContainer: false }; noContainer = true to render children without container
    ...react-router props
  },
 */
const routes = [
  {
    path: URL.HOME,
    component: Coin,
    exact: true,
    containerProps: {
      bodyWrapper: false
    }
  },
  {
    path: URL.FAQ_URL,
    component: CoinBowlFAQ,
    exact: true,
    containerProps: {
      bodyWrapper: false
    }
  },
  {
    path: URL.CONTACT,
    component: Contact,
    exact: true,
  },
  {
    path: URL.ABOUT_US,
    component: About,
    exact: true,
    containerProps: {
      bodyWrapper: false
    }
  },
  {
    path: URL.USER_SIGN_IN,
    component: Login,
    exact: true,
  },
  {
    path: URL.USER_SIGN_UP,
    component: Register,
    exact: true,
  },
  {
    path: URL.REFERRAL,
    component: Register,
    //exact: true,
  },
  {
    path: URL.USER_FORGET_PASSWORD,
    component: forgetPassword,
    exact: true,
  },
  {
    path: URL.USER_FORGET_PASSWORD_FINISH,
    component: forgetPasswordFinish,
    exact: true,
  },
  {
    path: URL.ME,
    component: Me,
    // exact: true,
    auth: true,
    containerProps: {
      bodyWrapper: false
    },
    routes: [
      {
        path: URL.ME,
        component: AccountInfo,
        exact: true,
        auth: true,
      },
      {
        path: URL.ME_PROFILE,
        component: AccountInfo,
        exact: true,
        auth: true,
      },
      {
        path: URL.ME_SETTING,
        component: Setting,
        exact: true,
        auth: true,
      },
      {
        path: URL.ME_ACCOUNT_LEVEL,
        component: MeProfile,
        exact: true,
        auth: true,
      },
      {
        path: URL.ME_HISTORY,
        component: MeHistory,
        exact: true,
        auth: true,
      },
      {
        path: URL.ME_BANK_INFO,
        component: BankInfo,
        exact: true,
        auth: true,
      },
      {
        path: URL.ME_REFERRAL,
        component: MyReferral,
        exact: true,
        auth: true,
      }
    ]
  },

  {
    path: '/wallet/:address?',//URL.WALLET,
    component: Wallet,
    exact: true,
    strict: false,
    auth: true,
    containerProps: {
      bodyWrapper: false
    }
  },
  {
    path: URL.AGREEMENT,
    component: AgreementPrivacy,
    exact: true,
    containerProps: {
      bodyWrapper: false
    }
  },
  {
    path: URL.PROMOTION_PROGRAM,
    component: PromotionProgram,
    exact: true,
    containerProps: {
      bodyWrapper: false
    }
  },
  {
    path: URL.STATIC_PAGE,
    component: StaticPage,
    exact: true,
    containerProps: {
      bodyWrapper: false
    }
  }
];

export default routes;
export const RouteWrapper = routeWrapper;
export const RenderRoutes = renderRoutes;
export const PrivateRoute = privateRoute;
