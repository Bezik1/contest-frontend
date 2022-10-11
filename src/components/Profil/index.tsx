import { useState, useEffect } from "react"
import { GrAdd } from "react-icons/gr"
import { useFetch } from "../../hooks/useFetch"
import { Announcement, User } from '../../interfaces/interfaces'
import './index.css'

const Profil = ({ user } : { user: User | undefined }) =>{
    const API_LINK = "http://localhost:3000/announcements"
    const [data] = useFetch<Announcement[]>(API_LINK)

    const [userAnnouncements, setUserAnnouncements] = useState<Announcement[]>([])
    
    useEffect(() =>{
        setUserAnnouncements(data?.data)
    }, [data])

    const commentsMap = () =>{
        return user?.comments.map(comment =>(
            <div className='comment'>
                <h1> { comment.from } </h1>
                <div className='comment-content'>
                    { comment.content }
                </div>
            </div>
        ))
    }

    const mapUserAnnouncements = () =>{
        return userAnnouncements?.
            filter(userAnnouncement => userAnnouncement.from === user?.username).
            map(userAnnouncement => (
                <div className='announcement'>
                    <h1> { userAnnouncement.from } </h1>
                    <div className='announcement-content'>
                        { userAnnouncement.content }
                    </div>
                </div>
            ))
    }

    return (
        <div className='profil'>
            <h1> Username: <span>{ user?.username }</span> </h1>
            <div className="profil-content">
                <div className="user-email"> Email: <span>{ user?.email }</span> </div>
                <div className="user-comments-container">
                    { commentsMap() }
                </div>
                <div className="announcements-array">
                    <h2> Your Announcements </h2>
                    { mapUserAnnouncements() }
                    <button className='btn add-announcement'> Create Announcement <GrAdd className="plus"/> </button>
                </div>
            </div>
        </div>
    )
}

export default Profil