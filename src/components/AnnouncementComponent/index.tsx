import { Announcement } from '../../interfaces/interfaces'
import './index.css'

const AnnouncementComponent = ({ announcement } : { announcement: Announcement }) =>{
    const { from, content } = announcement

    return (
        <div className='announcement'>
            <h1> { from } </h1>
            <div className='announcement-content'>
                { content }
            </div>
        </div>
    )
}

export default AnnouncementComponent