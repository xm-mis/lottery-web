import {Menu} from 'antd'
import './index.css'


const MenuContent = ({menuItems = [], className = '', theme = '', mode = '', selectedKeys = ''}) =>{
    return <Menu selectedKeys={[selectedKeys]} items={menuItems} className={className} theme={theme} mode={mode} />
}

export default MenuContent