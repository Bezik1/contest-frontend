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
                        <br /> Każdy mieszkaniec / użytkownik aplikacji, będzie mógł wydać ogłoszenie
                        <br /> w sekcji Ogłoszenia, odnośnie swojego problemu, a osoby skore do
                        <br /> pomocy mogłyby zgłaszać się do ogłoszeń. 
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
        <>
            <h1> Witamy w <span> Sąsiedztwie </span> { user?.username }</h1>
            <div className='home-content'>
                Strona ta ma służyć rozwijaniu się społeczności danego miasta, oraz zacieśniać więzi między mieszkańcami poprzez wzajemną pomoc.
            </div>
            <IFBtnVisible />
        </>
    )
}

export default Home