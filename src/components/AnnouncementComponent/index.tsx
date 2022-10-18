import { useContext, useState } from "react"
import { CurrentComponentContext } from "../../contexts/currentComponent.context"
import { Announcement } from '../../interfaces/interfaces'
import Users from "../Users"
import './index.css'

const AnnouncementComponent = ({ announcement, setCurrentComponent } :
         { announcement: Announcement, setCurrentComponent: React.Dispatch<React.SetStateAction<React.ReactNode>> }) =>{
    const [clicked, click] = useState(false)

    const { from, title, email, content } = announcement
    const setCurrentName = useContext(CurrentComponentContext)

    const IFClicked = () =>{
        if(clicked){
            return (
                <div className='announcement-content'>
                { content }
                <div className="contact"> Contact email: <span> { email } </span></div>
            </div>
            )
        } else {
            return <></>
        }
    }

    const handleClick = (from: string) =>{
        //@ts-ignore
        setCurrentName('Users')
        setCurrentComponent(<Users choosenUserName={from} />)
    }

    return (
        <div className='announcement'>
            <h1 onClick={() => click(!clicked)}> { title } </h1>
            <h2 onClick={() => handleClick(from)}> From: <span> { from } </span></h2>
            <IFClicked />
        </div>
    )
}

export default AnnouncementComponent