import axios from "axios"
import { useRef, useState } from "react"
import { IoMdLogIn } from "react-icons/io"
import { CityProps, Data, User } from "../../interfaces/interfaces"
import Home from "../Home"
import './index.css'

const Login = ({ setUser, setCurrentComponent, setLogged } : CityProps) =>{
    const [message, setMessage] = useState('')

    const usernameRef = useRef<HTMLInputElement>(null!)
    const emailRef = useRef<HTMLInputElement>(null!)
    const passwordRef = useRef<HTMLInputElement>(null!)

    const handleSubmit = async () =>{
        const API_LINK = 'https://easy-dict.herokuapp.com/users/login'
        setMessage('')

        try {
            const data: User = {
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
                comments: []
            }
    
            const userData: Data<User> = await axios.post(API_LINK, data)

            if(userData.data.status === 'succes') {
                setUser(userData.data.data)
                setCurrentComponent(<Home />)

                //@ts-ignore
                setLogged(true)
            } else {
                setMessage(userData.data.message)
            }
        } catch(err) {
            alert(`Logginng error: ${err}`)
        }
    }

    const Content = () => (
            <div className="login-container">
                <h1> Login </h1>
                <div className="login-form">
                    <div className="input-container">
                        <label> Username: </label>
                        <input type='text' id='username' ref={usernameRef} />
                    </div>
                    <div className="input-container">
                        <label> Email: </label>
                        <input type='text' id='email' ref={emailRef} />
                    </div>
                    <div className="input-container">
                        <label> Password: </label>
                        <input type='password' id='password' ref={passwordRef} />
                    </div>
                    <div className="message-container">
                        <div className={message !== '' ? "message" :""}> { message } </div>
                    </div>
                    <div className="submit-container">
                        <IoMdLogIn className="login-submit" onClick={handleSubmit} />
                    </div>
                </div>
            </div>
        )
    return <Content />
}

export default Login