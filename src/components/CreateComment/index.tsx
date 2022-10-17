import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { API_URLS } from "../../constans/constans"
import { UserContext } from "../../contexts/user.context"
import { useFetch } from "../../hooks/useFetch"
import { Comment, Response, User } from "../../interfaces/interfaces"
import commentAuth from "../../middleware/commentAuth"
import './index.css'

const CreateComment = () =>{
    const [message, setMessage] = useState('') 
    const [clicked, click] = useState(false)
    const [users, setUsers] = useState<{ username: string, email: string, comments: Comment[]}[]>([])

    const contentRef = useRef<HTMLTextAreaElement>(null!)
    const toRef = useRef<HTMLInputElement>(null!)

    const user = useContext(UserContext)

    const { USERS_URL } = API_URLS
    const API_URL = `${USERS_URL}/names`

    const [data] = useFetch<{ username: string, email: string, comments: Comment[]}[]>(API_URL)

    useEffect(() =>{
        setUsers(data?.data)
    }, [data])

    const IfCommentOpinion = () =>{
        if(clicked) return <FcLike className='like create-like' onClick={() => click(!clicked)} />
        else return <FcLikePlaceholder className='dislike create-like' onClick={() => click(!clicked)} />
    }

    const handleSubmit = async () =>{
        const { USERS_URL } = API_URLS
        const API_URL = `${USERS_URL}/addComment`

        const comment = {
            from: String(user?.username),
            to: toRef.current.value,
            content: contentRef.current.value,
            opinion: clicked
        }

        const data = {
            username: toRef.current.value,
            comment
        }
        
        try {
            const [message, isError] = commentAuth(comment, users, user?.username)

            if(!isError) {
                const res: Response<Response<User>> = await axios.post(API_URL, data)
                setMessage(res.data.message)
            } else {
                setMessage(message)
            }
        } catch(err) {
            setMessage('Comment createing error')
        }
    }

    return (
        <div className='create-comment'>
            <h1> Create Comment </h1>
            <div className='create-comment-form'>
                <div className="title-container">
                    <label htmlFor="title-input"> Recipient: </label>
                    <input id="to-input" type="text" ref={toRef}/>
                </div>
                <textarea className="content-input create-input" ref={contentRef}/>
                <IfCommentOpinion />
                <div className="message-container">
                        <div className={message !== '' ? "message" :""}> { message } </div>
                    </div>
                <button type="submit" className="btn create-comment-submit" onClick={handleSubmit}> Create </button>
            </div>
        </div>
    )
}

export default CreateComment