/** 还差一个随机数去重 */ 
//*  option+shift+a  */ 
import React,{ useState, useEffect, useRef } from 'react';
import { Input, Button, List, Typography, Empty, message } from 'antd'

import OridinaryAlg from './ordinary-alg'
import MethodsAlg from './methods-alg'

import { getLotteryList } from '../../common/io';
import './index.css'
const Algorithm = () =>{
    const [{data}, setData] = useState({data: {}})
    const lotteryList = async() => {
        try {
            const List = await getLotteryList()
            setData(List)
        } catch (error) {
            console.log(error, '---', 'error')
        }
    }

    useEffect(()=>{
        lotteryList()
    }, [])

    return <div className='algorithm-layout'>
            <OridinaryAlg />
            <MethodsAlg />
    </div> 
}

export default Algorithm