import axios from "axios"
import { useRef, useState, useContext } from "react"
import { IoMdLogIn } from "react-icons/io"
import { API_URLS } from "../../constans/constans"
import { CurrentComponentContext } from "../../contexts/currentComponent.context"
import { Data, User } from "../../interfaces/interfaces"
import Home from "../Home"
import './index.css'

const Register = ({ setCurrentComponent } : { setCurrentComponent: React.Dispatch<React.SetStateAction<React.ReactNode>> }) =>{
    const usernameRef = useRef<HTMLInputElement>(null!)
    const emailRef = useRef<HTMLInputElement>(null!)
    const passwordRef = useRef<HTMLInputElement>(null!)

    const setComponentName = useContext(CurrentComponentContext)

    const [message, setMessage] = useState('')

    const handleSubmit = async () =>{
        const { USERS_URL } = API_URLS
        const API_URL= `${USERS_URL}`
        setMessage('')

        try {
            const data: User = {
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                comments: []
            }
    
            const userData: Data<User> = await axios.post(API_URL, data)

            if(userData.data.status === 'succes') {
                setCurrentComponent(<Home />)
                //@ts-ignore
                setComponentName('Profil')
            } else {
                setMessage(userData.data.message)
            }
        } catch(err) {
            alert(`Logginng error: ${err}`)
        }
    }
    return (
        <div className='register-container'>
            <h1> Register </h1>
                <div className="login-form">
                    <div className="input-container register-input">
                        <label> Username: </label>
                        <input type='text' id='username' ref={usernameRef} />
                    </div>
                    <div className="input-container register-input">
                        <label> Email: </label>
                        <input type='text' id='email' ref={emailRef} />
                    </div>
                    <div className="input-container register-input">
                        <label> Password: </label>
                        <input type='password' id='password' ref={passwordRef} />
                    </div>
                    <div className="message-container">
                        <div className={message !== '' ? "message" :""}> { message } </div>
                    </div>
                    <div className="submit-container">
                        <IoMdLogIn className="login-submit register-submit" onClick={handleSubmit} />
                    </div>
                </div>
        </div>
    )
}

export default Register