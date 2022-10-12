import axios from "axios"
import { useRef } from "react"
import { API_URLS } from "../../constans/constans"
import { Announcement, Response } from "../../interfaces/interfaces"
import './index.css'

const CreateAnnouncement = ({ from } : { from: string | undefined }) =>{
    const contentRef = useRef<HTMLTextAreaElement>(null!)

    const handleSubmit = async () =>{
        const { ANNOUNCEMENTS_URL } = API_URLS

        const content = contentRef.current.value
        const announcement = {
            from,
            content
        }

        const res: Response<Response<Announcement>> = await axios.post(ANNOUNCEMENTS_URL, announcement)
        console.log(res.data.message)
    }

    return (
        <div className='create-announcement'>
            <h1> Create Announcement </h1>
            <textarea className="content-input" ref={contentRef}/>
            <button type="submit" className="create-submit btn" onClick={handleSubmit}> Create Announcement</button>
        </div>
    )
}

export default CreateAnnouncement