import { lazy, Suspense } from 'react'
import './App.css'

const LoginForm = lazy(() => import('./pages/auth/login/login'));

const RegisterForm = lazy(() => import('./pages/auth/registration/registration'));

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ProductList from './pages/cms/productList/productList';
import Spinner from './components/spinner/spinner';
import ProductCreate from './pages/cms/productCreate/productCreate';
import Wrapper from './layout/wrapper/wrapper';
import NoData from './components/NoData/noData';
import ProductUpdate from './pages/cms/productUpdate/productUpdate';
import ProfileDetails from './pages/auth/profileDetails/profileDetails';
function App() {

  function PrivateRoute({ children }) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    console.log("token12232323", token)
    return token !== null && token !== undefined ? (
      children
    ) : (
      <>
        <Navigate to="/" />
        {alert("You must login first to visit this page!")}
      </>
    );
  }



  const publicRoutes = [
    {
      path: "/",
      component: <LoginForm />
    },
    {
      path: "/auth/register",
      component: <RegisterForm />
    },
    {
      path: "*",
      component: <NoData />
    }

  ]


  const privateRoutes = [
    {
      path: "/cms/list",
      component: <ProductList />
    },
    {
      path: "/cms/create",
      component: <ProductCreate />
    },
    {
      path: "/cms/update/:id",
      component: <ProductUpdate />
    },
    {
      path: "/auth/profileDetails",
      component: <ProfileDetails />
    }

  ]
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Router>
          <Wrapper>
            <Routes>
              {
                publicRoutes.map((item) => {
                  return (
                    <Route path={item.path} element={item.component} />
                  )
                })
              }

              {
                privateRoutes.map((item) => {
                  return (
                    <Route path={item.path} element={<PrivateRoute>{item.component}</PrivateRoute>} />
                  )
                })
              }
            </Routes>
          </Wrapper>


        </Router>
      </Suspense>

    </>
  )
}

export default App