import React from 'react'
import { Breadcrumb } from 'antd'
import './index.css'
import { useLocation, useNavigate } from 'react-router-dom'
import Icon from '../icon'
// import Icons from '@icons/home.svg'

const breadcrumbNameMap = {
    '/layout': '主页',
    '/layout/home': '主页',
    '/layout/manage': '管理',
    '/layout/charts': '图像',
    '/layout/algorithm': '算法',
  }

const BreadCrumb = () =>{
    const {pathname} = useLocation()
    return <nav className='breadcrumbNav'>
        <Breadcrumb separator="">
            <Breadcrumb.Item href='/layout'>
                <Icon name="home" className="icon" />
                {/* <img src={Icons} /> */}
            </Breadcrumb.Item>
            <Breadcrumb.Separator/>
            <Breadcrumb.Item href={pathname}>{breadcrumbNameMap[pathname]}</Breadcrumb.Item>
        </Breadcrumb>
    </nav> 
}

export default BreadCrumb