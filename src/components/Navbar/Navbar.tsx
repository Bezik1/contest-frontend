import './Navbar.css'
import { useContext } from 'react'
import AnnouncementsArray from '../Announcements'
import Login from '../Login'
import { NavbarProps } from '../../interfaces/interfaces'
import Home from '../Home'
import Profil from '../Profil'
import { UserContext } from '../../contexts/user.context'
import CreateAnnouncement from '../CreateAnnouncement'
import { CurrentComponentContext } from '../../contexts/currentComponent.context'

const Navbar = ({ componentName, setCurrentComponent, setUser, setLogged } : NavbarProps) =>{
    const user = useContext(UserContext)
    const setComponentName = useContext(CurrentComponentContext)

    const names= [
        {
            name: 'Login',
            href: <Login setLogged={setLogged} setCurrentComponent={setCurrentComponent} setUser={setUser}/>
        },
        {
            name: 'Announcements',
            href: <AnnouncementsArray />
        },
        {
            name: 'Profil',
            href: <Profil setCurrentComponent={setCurrentComponent}/>
        },
        {
            name: 'Create Announcement',
            href: <CreateAnnouncement from={user?.username} />
        },
        {
            name: 'Home',
            href: <Home />
        },
    ]

    const handleClick = ({ name, href} : { name: string, href: React.ReactNode}) =>{
        //@ts-ignore
        setComponentName(name)
        setCurrentComponent(href)
    }

    const MapNames = () =>{
        const mapNames = () => names.map(name =>{
            switch(name.name) {
                case 'Login':
                    if(user !== undefined){
                        return <></>
                    } else {
                        return (
                            <button 
                                className={componentName !== name.name
                                                ? 'nav-link' 
                                                : 'nav-link active'}
                                onClick={() => handleClick(name)}
                                key={name.name}>
                                { name.name }
                            </button>
                        )
                    }
                case 'Profil':
                    if(user === undefined){
                        return <></>
                    } else {
                        return (
                            <button 
                                className={componentName !== name.name
                                                ? 'nav-link' 
                                                : 'nav-link active'}
                                onClick={() => handleClick(name)}
                                key={name.name}>
                                { name.name }
                            </button>
                        )
                    }
                case 'Create Announcement':
                    if(user === undefined){
                        return <></>
                    } else {
                        return (
                            <button 
                                className={componentName !== name.name
                                                ? 'nav-link' 
                                                : 'nav-link active'}
                                onClick={() => handleClick(name)}
                                key={name.name}>
                                { name.name }
                            </button>
                        )
                    }
                default:
                    return (
                    <button 
                        className={componentName !== name.name
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