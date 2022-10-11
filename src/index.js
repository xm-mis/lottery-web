import { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import {Empty} from 'antd'
import RoutesContent from '@common/routes'
import '@common/common.css'
// import './index.css'

import './icons'

import {ConfigProvider,locales} from 'antd'

const {zh_CN} = locales

ReactDOM.render(
    <ConfigProvider
        locales={zh_CN} 
        renderEmpty={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        componentSize="small"
    >
        <Suspense callback={'loading'}>
            <Router>
                <RoutesContent />
            </Router>
        </Suspense>
    </ConfigProvider>
    ,
    document.getElementById('root')
)