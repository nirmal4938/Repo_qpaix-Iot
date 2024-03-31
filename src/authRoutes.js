import Login from './views/pages/login/Login'
import { ForgotPassword } from './views/auth/ForgotPassword'
import { ResetPassword } from './views/auth/ResetPassword'
import { HomePage } from './views/auth/Home'
import { ClientActivationAccount } from './views/authview/ClientActivationAccount'

const authRoutes = [
  { path: '/', exact: true, name: 'Home', element: HomePage },
  { path: '/login', exact: true, name: 'Login', element: Login },
  { path: '/forgot-password', exact: false, name: 'Login', element: ForgotPassword },
  { path: '/reset-password/*', exact: false, name: 'Login', element: ResetPassword },
  {
    path: '/activate-client-account/*',
    exact: true,
    name: 'Login',
    element: ClientActivationAccount,
  },
]

export default authRoutes
