import { Announcement } from "../interfaces/interfaces";

const announcementAuth = (announcement: Announcement) =>{
    let message = ''
    let isError = false

    const { title, content } = announcement

    const IfEmptyString = () =>{
        switch(true){
            case title === '':
                message = 'Title must not be empty string'
                isError = true
                break
            case content === '':
                message = 'Content must not be empty string'
                isError = true
                break
        }
    }

    const IfLength = () =>{
        switch(true){
            case title.length < 5:
                message = 'Title must have minimum 5 letters'
                isError = true
                break
            case content.length < 20:
                message = 'Content must have minimum 20 letters'
                isError = true
                break
        }
    }

    IfEmptyString()
    IfLength()

    return [message, isError] as [string, boolean]
}

export default announcementAuth