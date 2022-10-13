import { useState, useEffect, useContext } from "react"
import { GrAdd } from "react-icons/gr"
import { API_URLS } from "../../constans/constans"
import { CurrentComponentContext } from "../../contexts/currentComponent.context"
import { UserContext } from "../../contexts/user.context"
import { useFetch } from "../../hooks/useFetch"
import { Announcement } from '../../interfaces/interfaces'
import CreateAnnouncement from "../CreateAnnouncement"
import './index.css'

const Profil = ({ setCurrentComponent } : { setCurrentComponent: React.Dispatch<React.SetStateAction<React.ReactNode>> }) =>{
    const [clicked, click] = useState(false)

    const { ANNOUNCEMENTS_URL } = API_URLS
    const [data] = useFetch<Announcement[]>(ANNOUNCEMENTS_URL)

    const user = useContext(UserContext)
    const setComponentName = useContext(CurrentComponentContext)

    const [announcementClicked, setAnnouncementClicked] = useState(false)
    const [commentsClicked, setCommentsClicked] = useState(false)
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
        return userAnnouncements?.filter(
            userAnnouncement => userAnnouncement.from === user?.username).map(
            userAnnouncement => {
                const { from, email, title, content } = userAnnouncement

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
        })
    }

    const handleClick = () =>{
        //@ts-ignore
        setComponentName('Create Announcement')
        setCurrentComponent(<CreateAnnouncement from={user?.username} />)
    }

    const UserAnnouncements = () =>{
        if(announcementClicked){
            return (
                <>
                    <button 
                        className="hide-announcements btn" 
                        onClick={() => setAnnouncementClicked(!announcementClicked)}> 
                        Hide your announcements 
                    </button>
                    { mapUserAnnouncements() }
                </>
            )
        } else {
            return <button 
                        className="see-announcements btn" 
                        onClick={() => setAnnouncementClicked(!announcementClicked)}> 
                        See your announcements 
                    </button>
        }
    }

    const UserComments = () =>{
        if(commentsClicked){
            return (
                <>
                    <button 
                        className="hide-comments btn" 
                        onClick={() => setCommentsClicked(!commentsClicked)}> 
                        Hide your comments 
                    </button>
                    { commentsMap() }
                </>
            )
        } else {
            return <button 
                        className="see-comments btn" 
                        onClick={() => setCommentsClicked(!commentsClicked)}> 
                        See your comments 
                    </button>
        }
    }

    return (
        <div className='profil'>
            <h1> Username: <span>{ user?.username }</span> </h1>
            <div className="profil-content">
                <div className="user-email"> Email: <span>{ user?.email }</span> </div>
                <div className="user-comments-container">
                    <UserComments />
                </div>
                <div className="announcements-array">
                    <UserAnnouncements />
                </div>
                <button 
                    className='btn add-announcement' 
                    onClick={handleClick}> 
                    Create Announcement <GrAdd className="plus"/> 
                </button>
            </div>
        </div>
    )
}

export default Profil