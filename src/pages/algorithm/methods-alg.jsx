// @flow
import React, {useState, useRef} from 'react';
import {Button, Input, Segmented, message} from 'antd'

const MethodsAlg = () =>{
    const [sortList, setSortList] = useState([
        {
            label: '冒泡排序',
            value: 'bubbling'
        },
        {
            label: '选择排序',
            value: 'choose'
        },
        {
            label: '插入排序',
            value: 'insert'
        },
        {
            label: '堆排序',
            value: 'heap'
        },
        {
            label: '快速排序',
            value: 'fast'
        },
        
    ])
    const [sortValue, setSortValue] = useState('')
    const [randomNum, setRandomNum] = useState([])
    const methodInput = useRef(null)

    const MethodButton = () =>{
        const methodsInputValue = methodInput.current.input.value
        if(methodsInputValue === '' || methodsInputValue == null){
            message.error('不能为空')
            return
        }
        if(isNaN(methodsInputValue % 1) && methodsInputValue % 1 !== 0){
            message.warning('只能为数字，整数')
            return
        }

        setRandomNum(randomNumFun(~~methodsInputValue))
        setSortValue('')
    }

    const randomNumFun = (count) =>{
        const nums = [...Array(count).keys()]
        const res = []
        while (nums.length) {
            const randomIndex = Math.random() * nums.length - 1
            res.push(nums.splice(randomIndex, 1)[0]) // splice 可以把数组里的值给去掉， 第一个参数是下标，第二个参数是删掉几个，第三个是替换
        }
        return res    
    }

    const sortChange = (e) =>{
        setSortValue(e)
        switch (e) {
            case 'bubbling':
                bubblingSort(randomNum)
                break;
            case 'choose':
                chooseSort(randomNum)
                break;
            case 'insert':
                insertSort(randomNum)
                break;
            case 'heap':
                heapSort(randomNum)
                break;
            case 'fast':
                fastSort(randomNum)
                break;
        
            default:
                break;
        }
    }

    // 冒泡排序
    const bubblingSort = (value = []) =>{
        let bubblingList = value
        for (let x = 0; x < bubblingList.length - 1; x++) {
            for (let y = 0; y < bubblingList.length - 1 - x; y++) {
                if(bubblingList[y] > bubblingList[y + 1]){
                    listReplace(bubblingList, y, y + 1)
                }
            }
        }
        setRandomNum(bubblingList)
    } // 是比较相邻的两个元素排列

    // 选择排序
    const chooseSort = (value = []) =>{
        let chooseList = value
        for (let i = 0; i < chooseList.length; i++) {
            let min_index = i
            for (let j = i; j < chooseList.length; j++) {
                if(chooseList[min_index] > chooseList[j]){
                    min_index = j
                }
            }    
            listReplace(chooseList, i, min_index)      
        }
        setRandomNum(chooseList)
    } // 通过循环选择出最小或最大数，然后取出，下一次循环未选择的数进行排序
    // 插入排序
    const insertSort = (value = []) =>{
        let insertList = value
        // for (let i = 1; i < insertList.length; i++) {
        //     let insertIndex = i - 1
        //     let insertCount = insertList[i]
        //     while(insertList[insertIndex] >=  insertCount && insertIndex>=0){
        //         listReplace(insertList, insertIndex, insertIndex + 1)
        //         insertIndex--
        //     }
        // }
        for (let i = 1; i < insertList.length; i++) {
            // 未排序部分的第1个
            let current_ele = insertList[i]
            // 已排序部分的第1个和最后1个
            let left = 0, right = i - 1
            // 先找位置
            while (left <= right) {
              // 不再是从最后一个位置开始向前每个都比较，而是比较中间的元素
              let middle = parseInt((left + right) / 2)
              if (current_ele < insertList[middle]) right = middle - 1
              else left = middle + 1
              console.log(middle, left, right, insertList)
            }
            // while结束，已经找到了一个大于或等于当前元素的位置 left
            // 再修改数组：把 left 到 i 之间的元素向后移动一个位置
            for (let j = i - 1; j >= left; j--) insertList[j + 1] = insertList[j]
            // 插入当前元素
            insertList[left] = current_ele
          }
    } 
    // 堆排序
    const heapSort = (value = []) =>{
        let heapList = value
        const heapLength = heapList.length
        if(heapLength.length <= 1) return 
        for (let heapIndex = Math.floor(heapLength/2); heapIndex >= 0; heapIndex--) maxHeapify(heapList, heapIndex, heapLength)
        for (let j = heapLength; j >= 1 ; j--) {
            listReplace(heapList, 0, j - 1)
            // 2.2. 剩余的元素继续建最大堆
            maxHeapify(heapList, 0, j - 2)
            
        }
    } 
    const maxHeapify = (heapList = [], middleIndex = 0, length = 0) =>{
        const left_index = middleIndex * 2 + 1
        const right_index = middleIndex * 2 + 2
        let max_index = middleIndex
        if(left_index <= length && heapList[left_index] > heapList[max_index]) max_index = left_index
        if(right_index <= length && heapList[right_index] > heapList[max_index]) max_index = right_index

        if(max_index !== middleIndex) {
            listReplace(heapList, max_index, middleIndex)
            maxHeapify(heapList, max_index, length)
        }

    }    // 建最大堆

    // 快速排序
    const fastSort = (value = []) =>{
        let fastList = value
        setRandomNum(fastRecursiveSort(fastList))
    } 
    const fastRecursiveSort = (value) =>{
        if(value.length <= 1) return value
        let left = [],right = [], base = value[0]
        let mid = [base]
        for (let i = 1; i < value.length; i++) {
            if(value[i] < base) left.push(value[i])
            if(value[i] > base) right.push(value[i])
            if(value[i] === base) mid.push(value[i])       
        }
        return fastRecursiveSort(left).concat(mid, fastRecursiveSort(right))
    }
    const listReplace = (arr, a, b) => {[arr[a], arr[b]] = [arr[b], arr[a]]} // 数组位置互换

    return <>
            <Input
                className="algorithm-input" 
                placeholder="请输入随机数长度" 
                ref={methodInput}
             />
            <Button onClick={MethodButton}>
                随机数组生成
            </Button>
            <div className="methods-box">
                {randomNum.join(',')}
            </div>
            <hr style={{margin: '20px 0'}} />
            <Segmented options={sortList.map(({label, value}) =>{
                return {
                    label: (
                      <div style={{ padding: 4 }}>
                        <div>{label}</div>
                        <div>{value}</div>
                      </div>
                    ),
                    value,
                  }
            })}
                value={sortValue}
                onChange={sortChange}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
             />
         </>
}

export default MethodsAlg