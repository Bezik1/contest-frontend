import { ParentCompProps } from '../../interfaces/interfaces'
import './index.css'

const Content = ({ childComp } : ParentCompProps) =>{
    return <div className='home-container'> { childComp } </div>
}

export default Content