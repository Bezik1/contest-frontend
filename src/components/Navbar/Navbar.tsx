import './Navbar.css'
import { useState } from 'react'
import AnnouncementsArray from '../Announcements'
import Login from '../Login'
import { NavbarProps } from '../../interfaces/interfaces'
import Home from '../Home'
import Profil from '../Profil'

const Navbar = ({ user, currentComponent, setCurrentComponent, setUser, setLogged } : NavbarProps) =>{
    const names= [
        {
            name: 'Login',
            href: <Login user={user} setLogged={setLogged} setCurrentComponent={setCurrentComponent} setUser={setUser}/>
        },
        {
            name: 'Announcements',
            href: <AnnouncementsArray />
        },
        {
            name: 'Profil',
            href: <Profil user={user} />
        },
        {
            name: 'Home',
            href: <Home />
        }
    ]

    const [clicked, click] = useState<string>('Home')

    const handleClick = ({ name, href} : { name: string, href: React.ReactNode}) =>{
        click(name)
        setCurrentComponent(href)
    }

    const MapNames = () =>{
        const mapNames = () => names.map(name =>{
            if(user === undefined && name.name === 'Profil'){
                return <></>
            } else if(user !== undefined && name.name === 'Login'){
                return <></>
            } else {
                return (
                    <button 
                        className={clicked !== name.name
                                        ? 'nav-link' 
                                        : 'nav-link active'}
                        onClick={() => handleClick(name)}
                        key={name.name}>
                        { name.name }
                    </button>
                )
            }
        })

        return <div className='nav-links'>{ mapNames() } </ div >
    }
    return (
        <div className='nav' id='nav'>
            <div className='logo-container'>
            </div>
            <MapNames />
        </div>
    )
}

export default Navbar