import { useState, useEffect, useContext } from "react"
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { API_URLS } from "../../constans/constans"
import { UserContext } from "../../contexts/user.context"
import { useFetch } from "../../hooks/useFetch"
import { Announcement, Comment } from '../../interfaces/interfaces'
import './index.css'

const Profil = () =>{
    const [clicked, click] = useState(false)

    const { ANNOUNCEMENTS_URL } = API_URLS
    const [data] = useFetch<Announcement[]>(ANNOUNCEMENTS_URL)

    const user = useContext(UserContext)

    const [announcementClicked, setAnnouncementClicked] = useState(false)
    const [commentsClicked, setCommentsClicked] = useState(false)
    const [userAnnouncements, setUserAnnouncements] = useState<Announcement[]>([])
    
    useEffect(() =>{
        setUserAnnouncements(data?.data)
    }, [data])

    const commentsMap = (comments: Comment[] | undefined) =>{
        //@ts-ignore
        return comments.map(comment =>{

            const IfCommentOpinion = () =>{
                if(comment.opinion) return <FcLike className='like' />
                else return <FcLikePlaceholder className='dislike' />
            }

            return (
                <div className='profil-comment'>
                    <h1> { comment.from } </h1>
                    <div className='comment-content'>
                        { comment.content }
                     </div>
                    <IfCommentOpinion />
                </div>
            )
        })
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

    const UserComments = ({ comments } : { comments: Comment[] | undefined}) =>{
        if(commentsClicked){
            return (
                <>
                    <button 
                        className="hide-comments btn" 
                        onClick={() => setCommentsClicked(!commentsClicked)}> 
                        Hide your comments 
                    </button>
                    { commentsMap(comments) }
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
                    <UserComments comments={user?.comments} />
                </div>
                <div className="announcements-array">
                    <UserAnnouncements />
                </div>
            </div>
        </div>
    )
}

export default Profil