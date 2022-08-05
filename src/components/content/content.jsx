import * as React from 'react'
import { Outlet } from 'react-router-dom'
import BreadCrumb from '../breadcrumb'
import './index.css'

const MainContent = () =>{
    return <div className='content-main'>
        <BreadCrumb />
        <div className="content-body">
            <Outlet />
        </div>
    </div>
}

export default MainContent