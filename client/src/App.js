import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//import all components 
import Username from './components/Username'
import Password from './components/Password'
import Profile from './components/Profile'
import Reset from './components/Reset'
import PageNotFound from './components/PageNotFound'
import Recovery from './components/Recovery'
import Register from './components/Register'
import { AuthorizeUser, ProtectRoute } from './middleware/auth';


// root Routes 

const router = createBrowserRouter([
    {
        path: '/',
        element: <Username></Username>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/password',
        element: <ProtectRoute><Password /></ProtectRoute> 
    },
    {
        path: '/profile',
        element: <AuthorizeUser><Profile /></AuthorizeUser>
    },
    {
        path: '/recovery',
        element: <Recovery></Recovery>
    }, {
        path: '/reset',
        element: <Reset></Reset>
    }, {
        path: '*',
        element: <PageNotFound></PageNotFound>
    },


])
export default function App() {
    return (
        <main>
            <RouterProvider router={router}>

            </RouterProvider>
        </main>
    )
}
