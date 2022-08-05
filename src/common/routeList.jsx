import { Navigate } from 'react-router-dom'

import Layout from '@pages/layout'
import Login from '@pages/login'
import Home from '@pages/home'
import Algorithm from '@pages/algorithm'
import Charts from '@pages/charts'
import Manage from '@pages/manage'


export default [
    {
        path: 'layout',
        element: <Layout />,
        children:[
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'algorithm',
                element: <Algorithm />
            },
            {
                path: 'charts',
                element: <Charts />
            },
            {
                path: 'manage',
                element: <Manage />
            },
            {
                path: '/layout',
                element:  <Navigate to="home" replace={true}/>,  
            },
            {
                path: '/layout/*',
                element:  <Navigate to="charts" replace={true}/>,  
            },
        ] 
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/',
        element:  <Navigate to="/layout" replace={true}/>
    },
    {
        path: '*',
        element:  <Navigate to="/login" replace={true}/>
    }
]


