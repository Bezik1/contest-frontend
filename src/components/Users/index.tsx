import { useState, useEffect } from 'react'
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import { Comment } from '../../interfaces/interfaces'
import { useFetch } from '../../hooks/useFetch'
import { API_URLS } from '../../constans/constans'
import './index.css'

const Users = ({ choosenUserName } : { choosenUserName?: string | undefined }) =>{

    const ifChoosenUserName = () =>{
        if(String(choosenUserName) === 'undefined'){
            return false
        } else {
            return true
        }
    }

    const [clicked, click] = useState([ifChoosenUserName(), String(choosenUserName)])
    const [comment, setComment] = useState(false)
    const [users, setUsers] = useState<{ username: string, email: string, comments: Comment[]}[]>([])

    const { USERS_URL } = API_URLS
    const API_URL = `${USERS_URL}/names`

    const [data] = useFetch<{ username: string, email: string, comments: Comment[]}[]>(API_URL)
    const previousUsers = data?.data

    useEffect(() =>{
        setUsers(data?.data)
    }, [data])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const filterData = users.filter(user => 
            user.email.includes(e.currentTarget.value) || user.username.includes(e.currentTarget.value))
            
        if(e.currentTarget.value === ''){
            setUsers(previousUsers)
        } else {
            setUsers(filterData)
        }
    }

    const mapUsers = () =>{
        return users?.map(user =>{
            
            const IfClicked = () =>{

                const commentsMap = () =>{
                    return user.comments.map(comment =>{

                        const IfCommentOpinion = () =>{
                            if(comment.opinion) return <FcLike className='like' />
                            else return <FcLikePlaceholder className='dislike' />
                        }

                        return (
                            <div className='comment'>
                                <h1> { comment.from } </h1>
                                <div className='comment-content'>
                                    { comment.content }
                                 </div>
                                <IfCommentOpinion />
                            </div>
                        )
                    })
                }

                const Comments = () => <> { commentsMap() } </>
                

                if(clicked[0] && clicked[1] === user.username){
                    return (
                        <>
                            <h2> { user.email } </h2>
                            <div className='comments'>
                                { comment ? <Comments /> : null}
                                <button className='btn comments-btn' onClick={() => setComment(!comment)}> Comments </button>
                            </div>
                        </>
                    )
                } else {
                    return <></>
                }
            }

            return (
                <div className='user'>
                    <h1 onClick={() => click([!clicked[0], user.username])}> { user.username } </h1>
                    <IfClicked />
                </div>
            )
        })
    }

    return (
        <div className='users-container'>
            <h1> Users </h1>
            <div className='users-searchbar'>
                <label htmlFor='searchbar' className='searchbar-label'>
                    Find User 
                </label>
                <input 
                    type='text' 
                    id='searchbar' 
                    onChange={handleChange}/>
            </div>
            <div className='users-content'>
                { mapUsers() }
            </div>
        </div>
    )
}

export default Users