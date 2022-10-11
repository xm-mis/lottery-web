import request from './io-context'

export async function getLotteryList(params){
    return await request({
        url: '/api/getHistoryPageListV1.qry?gameNo=85&provinceId=0&pageSize=30&isVerify=1&pageNo=1',
        params
    })
}