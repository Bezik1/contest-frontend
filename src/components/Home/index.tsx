import { useContext, useState, useRef, useEffect } from 'react'
import { UserContext } from '../../contexts/user.context'
import gsap from 'gsap'
import './index.css'

const Home = () =>{
    const [clicked, click] = useState(true)
    const [btnVisible, setBtnVisible] = useState(true)
    const homeRef = useRef<HTMLDivElement>(null!)
    const btnRef = useRef<HTMLButtonElement>(null!)
    const user = useContext(UserContext)

    const IFBtnVisible = () =>{
        if(btnVisible === false){
            return (
                <div ref={homeRef}>
                    <div className='home-content'>
                        <br />
                        Each resident / user of the application will be able to publish an advertisement
                        in the Announcements section, regarding your problem, and people willing to
                        help could apply for announcements.
                    </div>
                    <button
                        className='home-btn btn' 
                        onClick={() => click(!clicked)}>
                        Read Less
                    </button>
                </div>
            )
        } else {
            return <button className='home-btn btn' onClick={() => click(!clicked)} ref={btnRef}> Read More </button>
        }
    }

    useEffect(() =>{
        if(clicked === true){
            setBtnVisible(false)
            gsap.to(homeRef.current, {
                y: 10,
                opacity: 1
            })
            
            gsap.to(btnRef.current, {
                opacity: 0
            })
        } else {
            gsap.to(homeRef.current, {
                y: -10,
                opacity: 0
            })

            setTimeout(() => setBtnVisible(true), 500)

            gsap.to(btnRef.current, {
                opacity: 0
            })
        }
    }, [clicked, setBtnVisible])

    return (
        <div className='homes'>
            <h1> Welcome to <span> Neighborhood </span> { user?.username }</h1>
            <div className='home-content'>
                This website aims to develop the community of a given city and strengthen ties between residents through mutual help.
            </div>
            <IFBtnVisible />
        </div>
    )
}

export default Home