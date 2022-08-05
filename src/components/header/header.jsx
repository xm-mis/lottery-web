import * as React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Menu from '../menu'

import './index.css'

const getItem = (label = '', key = '', icon = '', children = '', type = '') =>{
    return {
        label,
        key,
        children,
        icon,
        type,
    }
}

const item = [
    getItem(<NavLink to="home" >主页</NavLink>, 'home'),
    getItem(<NavLink to="manage" >管理</NavLink>, 'manage'),
    getItem(<NavLink to="charts" >图像</NavLink>, 'charts'),
    getItem(<NavLink to="algorithm" >算法</NavLink>, 'algorithm'),

]

const HeaderContent = () =>{

    const { pathname } = useLocation()

    return <div className='header-content'>
        <div className="logo"></div>
        <Menu
            selectedKeys ={pathname.split('/').at(-1)}
            menuItems={item} 
            className={"menu-content"}
            theme={"dark"}
            mode={"horizontal"}
         />
    </div>
}

export default HeaderContent