/** 还差一个随机数去重 */ 
//*  option+shift+a  */ 
import React,{ useState, useRef } from 'react';
import { Input, Button, List, Empty, message } from 'antd'


import { getLotteryList } from '../../common/io';

import './index.css'
const beforeList = Array.from(Array(35), (t, k) => k + 1)
const afterList = Array.from(Array(12), (t, k) => k + 1)

const OrdinaryAlg = () =>{
    const [layoutList, setLayoutList] = useState()
    const inputValue = useRef(null)

    const randomData = (lotteryData) => lotteryData[Math.floor(Math.random() * lotteryData.length)]   // 随机数据
    
    const noRepeatLottery = (repeatData) => Array.from(new Set(repeatData))  // 去重数据

    const traverseFun = (count, traverseData, oldData = [], noRepeatCount = null) => {
        let traverseList = [...Array(noRepeatCount || count)].map(() =>{
            return randomData(traverseData)
        })
        let noRepeatData = noRepeatLottery(traverseList.concat(oldData))
        if(noRepeatData.length < count){
          return traverseFun(count, traverseData, noRepeatData, count - noRepeatData.length)
        }
        return noRepeatData
     } // 遍历数据


    const sortLotteryData = () => [traverseFun(5, beforeList).sort((a, b) => a - b), '———' , traverseFun(2, afterList).sort((a, b) => a - b)] // 升成彩票号
 

    const btnClick = () =>{
        let inputText = inputValue.current.input.value.replace(/\s*/g,"");
        if(inputText === '' || inputText == null){
            message.error('不能为空')
            return
        }
        // Number parseFloat() 仅返回第一个数字，中间带空格也不算
        if(isNaN(inputText % 1) && inputText % 1 !== 0 ) {
            message.warning('只能为数字，整数')
            return
        }
        console.log(inputText % 1)
        setLayoutList([...Array(~~inputText * 1)].map(item =>{
            return sortLotteryData().toString().split(',').join(' ')
        })) 
    } // 按钮点击或者按下回车


    const lotteryList = async() => {
        try {
            const List = await getLotteryList()
            setData(List)
        } catch (error) {
            console.log(error, '---', 'error')
        }
    }

    return <>
        <Input 
            className="algorithm-input" placeholder="今天要买几组彩票呢？"
            ref={inputValue}
            onChange={(e) =>{
                if(e.target.value === ''&& Array.isArray(layoutList) && layoutList.length) setLayoutList()
            }}
            onPressEnter={btnClick}
         />
        <Button onClick={btnClick}>点击</Button>
        {Array.isArray(layoutList) && layoutList.length ? <List
            header={<div/>}
            footer={<div/>}
            grid={{ gutter: 8, column: 4 }}
            loader={true}
            bordered
            dataSource={layoutList}
            renderItem={item => (
                <List.Item>{item}</List.Item>
            )}
        /> : <Empty />}
    </> 
}

export default OrdinaryAlg