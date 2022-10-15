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
import Register from '../Register'
import Users from '../Users'
import CreateComment from '../CreateComment'

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
            name: 'Register',
            href: <Register setCurrentComponent={setCurrentComponent}/>
        },
        {
            name: 'Profil',
            href: <Profil />
        },
        {
            name: 'Create Announcement',
            href: <CreateAnnouncement from={user?.username} />
        },
        {
            name: 'Home',
            href: <Home />
        },
        {
            name: 'Users',
            href: <Users />
        },
        {
            name: 'Create Comment',
            href: <CreateComment />
        },
        {
            name: 'Logout',
            href: <></>
        }
    ]

    const handleClick = ({ name, href} : { name: string, href: React.ReactNode}) =>{
        //@ts-ignore
        setComponentName(name)
        setCurrentComponent(href)
    }

    const MapNames = () =>{
        const mapNames = () => names.map(name =>{
            switch(name.name) {
                case 'Logout':
                    if(user === undefined){
                        return <></>
                    } else {
                        return (
                            <button 
                                className={componentName !== name.name
                                                ? 'nav-link' 
                                                : 'nav-link active'}
                                onClick={() => window.location.reload()}
                                key={name.name}>
                                { name.name }
                            </button>
                        )
                    }
                case 'Create Comment':
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
                case 'Users':
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
                case 'Register':
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
                case 'Announcements':
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