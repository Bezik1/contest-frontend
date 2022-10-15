import axios from "axios"
import { useRef, useState, useContext } from "react"
import { IoMdLogIn } from "react-icons/io"
import { API_URLS } from "../../constans/constans"
import { CurrentComponentContext } from "../../contexts/currentComponent.context"
import { CityProps, Data, User } from "../../interfaces/interfaces"
import Profil from "../Profil"
import './index.css'

const Login = ({ setUser, setCurrentComponent, setLogged } : CityProps) =>{
    const [message, setMessage] = useState('')

    const setComponentName = useContext(CurrentComponentContext)

    const usernameRef = useRef<HTMLInputElement>(null!)
    const emailRef = useRef<HTMLInputElement>(null!)
    const passwordRef = useRef<HTMLInputElement>(null!)

    const handleSubmit = async () =>{
        const { USERS_URL } = API_URLS
        const API_URL= `${USERS_URL}/login`
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
                setUser(userData.data.data)
                setCurrentComponent(<Profil />)
                //@ts-ignore
                setComponentName('Profil')

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