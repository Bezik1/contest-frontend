import { Comment } from "../interfaces/interfaces"

const commentAuth = (
    comment: Comment, users: { username: string, email: string, comments: Comment[]}[], username: string | undefined
    ) =>{
    let message = ''
    let isError = false

    const { to, content } = comment

    const IfEmptyString = () =>{
        switch(true){
            case to === '':
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
            case content.length < 2:
                message = 'Content must have minimum 2 letters'
                isError = true
                break
        }
    }

    const IfUserOnSite = () =>{
        users.forEach(user =>{
            switch(true){
                case to !== user.username && message !== '':
                    message = 'User not found'
                    isError = true
                    break
                case to === user.username:
                    message = ''
                    break
            }
        })
    }

    IfEmptyString()
    IfUserOnSite()
    IfLength()

    if(to === String(username)){
        message = 'Cannot write comment to yourself'
        isError = true
    }

    return [message, isError] as [string, boolean]
}

export default commentAuth