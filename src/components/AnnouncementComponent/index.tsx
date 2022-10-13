import { useState } from "react"
import { Announcement } from '../../interfaces/interfaces'
import './index.css'

const AnnouncementComponent = ({ announcement } : { announcement: Announcement }) =>{
    const [clicked, click] = useState(false)

    const { from, title, email, content } = announcement

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

    return (
        <div className='announcement'>
            <h1 onClick={() => click(!clicked)}> { title } </h1>
            <h2> From: <span> { from } </span></h2>
            <IFClicked />
        </div>
    )
}

export default AnnouncementComponent