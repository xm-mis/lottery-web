/** 还差一个随机数去重 */ 
//*  option+shift+a  */ 
import React,{ useState, useEffect, useRef } from 'react';
import { Input, Button, List, Typography, Empty, message } from 'antd'


import { getLotteryList } from '../../common/io';

import './index.css'
const beforeList = Array.from(Array(35), (t, k) => k + 1)
const afterList = Array.from(Array(12), (t, k) => k + 1)

const Home = () =>{
    const [{data}, setData] = useState({data: {}})
    const [layoutList, setLayoutList] = useState()
    const inputValue = useRef(null)

    const randomData = (lotteryData) => lotteryData[Math.floor(Math.random() * lotteryData.length)]   // 随机数据
    
    const noRepeatLottery = (repeatData) => Array.from(new Set(repeatData))  // 去重数据

    const traverseFun = (count, traverseData) => {
        let traverseList = [...Array(count)].map(() =>{
            return randomData(traverseData)
        })
        let noRepeatData = noRepeatLottery(traverseList)
        if(noRepeatData.length < count){
          return noRepeatData.concat(traverseFun(count - noRepeatData.length, traverseData))
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
        if(isNaN(parseInt(inputText)) && +inputText % 1 !== 0 ) {
            message.warning('只能为数字，整数')
            return
        }
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


    useEffect(()=>{
        lotteryList()
    }, [])

    return <div className='algorithm-layout'>
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
            loader={true}
            bordered
            dataSource={layoutList}
            renderItem={(item, index) => (
                <List.Item>
                    <Typography.Text mark>{index + 1}、</Typography.Text> {item}
                </List.Item>
            )}
        /> : <Empty />}
    </div> 
}

export default Home