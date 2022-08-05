import { useRoutes } from 'react-router-dom'
import routeList from './routeList'

const RoutesContent = () =>{
    const element = useRoutes(routeList)
    return <>{element}</>
}

export default RoutesContent