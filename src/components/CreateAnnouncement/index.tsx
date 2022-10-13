import axios from "axios"
import { useContext, useRef } from "react"
import { API_URLS } from "../../constans/constans"
import { UserContext } from "../../contexts/user.context"
import { Announcement, Response } from "../../interfaces/interfaces"
import './index.css'

const CreateAnnouncement = ({ from } : { from: string | undefined }) =>{
    const contentRef = useRef<HTMLTextAreaElement>(null!)
    const titleRef = useRef<HTMLInputElement>(null!)

    const user = useContext(UserContext)

    const handleSubmit = async () =>{
        const { ANNOUNCEMENTS_URL } = API_URLS

        const content = contentRef.current.value
        const title = titleRef.current.value

        const announcement = {
            from,
            email: user?.email,
            title,
            content
        }

        const res: Response<Response<Announcement>> = await axios.post(ANNOUNCEMENTS_URL, announcement)
        console.log(res.data.message)
    }

    return (
        <div className='create-announcement'>
            <h1> Create Announcement </h1>
            <div className="title-container">
                <label htmlFor="title-input"> Title: </label>
                <input id="title-input" type="text" ref={titleRef}/>
            </div>
            <textarea className="content-input" ref={contentRef}/>
            <button type="submit" className="create-submit btn" onClick={handleSubmit}> Create Announcement</button>
        </div>
    )
}

export default CreateAnnouncement