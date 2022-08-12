import React from 'react'
import { Breadcrumb } from 'antd'
import './index.css'
import { useLocation } from 'react-router-dom'

const breadcrumbNameMap = {
    '/layout': 'layout',
    '/layout/home': '主页',
    '/layout/manage': '管理',
    '/layout/charts': '图像',
    '/layout/2/algorithm': '算法',
  }

const BreadCrumb = () =>{
    const {pathname} = useLocation()

    return <nav className='breadcrumbNav'>
        <Breadcrumb separator="">
            <Breadcrumb.Item>Location</Breadcrumb.Item>
            <Breadcrumb.Separator>:</Breadcrumb.Separator>
            <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
    </nav> 
}

export default BreadCrumb