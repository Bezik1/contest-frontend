import axios from "axios"
import { useContext, useRef, useState } from "react"
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { API_URLS } from "../../constans/constans"
import { UserContext } from "../../contexts/user.context"
import { Response, User } from "../../interfaces/interfaces"
import './index.css'

const CreateComment = () =>{
    const [clicked, click] = useState(false)
    const contentRef = useRef<HTMLTextAreaElement>(null!)
    const toRef = useRef<HTMLInputElement>(null!)

    const user = useContext(UserContext)

    const IfCommentOpinion = () =>{
        if(clicked) return <FcLike className='like create-like' onClick={() => click(!clicked)} />
        else return <FcLikePlaceholder className='dislike create-like' onClick={() => click(!clicked)} />
    }

    const handleSubmit = async () =>{
        const { USERS_URL } = API_URLS
        const API_URL = `${USERS_URL}/addComment`

        const comment = {
            from: user?.username,
            to: toRef.current.value,
            content: contentRef.current.value,
            opinion: clicked
        }

        const data = {
            username: "bezik",
            comment
        }

        const res: Response<Response<User>> = await axios.post(API_URL, data)
        console.log(res.data.message)
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
                <button type="submit" className="btn create-comment-submit" onClick={handleSubmit}> Create </button>
            </div>
        </div>
    )
}

export default CreateComment