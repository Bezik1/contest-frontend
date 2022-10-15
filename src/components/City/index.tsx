import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { URLS } from '../../constans/constans'
import './index.css'
import Login from '../Login'
import { CityProps } from '../../interfaces/interfaces'
import { useState, useContext } from 'react'
import AnnouncementsArray from '../Announcements'
import Profil from '../Profil'
import { CurrentComponentContext } from '../../contexts/currentComponent.context'
import Register from '../Register'
import Home from '../Home'
import CreateAnnouncement from '../CreateAnnouncement'
import { UserContext } from '../../contexts/user.context'
import Users from '../Users'
import CreateComment from '../CreateComment'

const City = ({ setCurrentComponent, setUser, logged, setLogged } : CityProps) =>{
    const [hover, setHover] = useState([false, ''])
    const setComponentName = useContext(CurrentComponentContext)

    const user = useContext(UserContext)
    
    const handleClick = (clickType: string) =>{
        switch(clickType){
            case 'Create Comment':
                setCurrentComponent(<CreateComment />)
                //@ts-ignore
                setComponentName('Create Comment')
                break
            case 'Users':
                setCurrentComponent(<Users />)
                //@ts-ignore
                setComponentName('Users')
                break
            case 'Home':
                setCurrentComponent(<Home />)
                //@ts-ignore
                setComponentName('Home')
                break
            case 'Create Announcement':
                setCurrentComponent(<CreateAnnouncement from={user?.username}/>)
                //@ts-ignore
                setComponentName('Create Announcement')
                break
            case 'Register':
                setCurrentComponent(<Register setCurrentComponent={setCurrentComponent} />)
                //@ts-ignore
                setComponentName('Register')
                break
            case 'Announcements':
                setCurrentComponent(<AnnouncementsArray />)
                //@ts-ignore
                setComponentName('Announcements')
                break
            case 'Login':
                if(logged){
                    setUser(undefined)
                    setLogged(false)
                    setCurrentComponent(<Home />)
                    //@ts-ignore
                    setComponentName('Home')
                } else {
                    setCurrentComponent(<Login
                        setUser={setUser} 
                        setCurrentComponent={setCurrentComponent}
                        setLogged={setLogged}
                    />)
                    //@ts-ignore
                    setComponentName('Login')
                }
                break
            case 'Profil':
                if(logged){
                    setCurrentComponent(<Profil />)
                    //@ts-ignore
                    setComponentName('Profil')
                }
                break
        }
    }

    const Scene = () =>{
        const { CITY_URL } = URLS
        const gltf = useLoader(GLTFLoader, CITY_URL)

        gltf.scene.rotation.y = 0.6
        return (
            <>
                <primitive
                    object={gltf.scene} 
                    scale={[0.45, 0.45, 0.45]}
                    position={[-0.1, -2.5, -1.5]}
                />
                <OrbitControls /*autoRotateSpeed={0.2} autoRotate={true}*/ target={gltf.scene.position} />
            </>
        )
    }

    const IfLogged = () =>{
        if(logged){
            return (
                <Text
                    onPointerOver={() => setHover([true, 'Profil'])}
                    onPointerOut={() => setHover([false, 'Profil'])}
                    onClick={() => handleClick('Profil')}
                    scale={[3, 3, 3]}
                    rotation={[-Math.PI/2, 0, 0]}
                    position={[-0.5, -2.5, 1]}
                    color={hover[0] && hover[1] === 'Profil' ? "lightpink" : "hotpink"}
                    anchorX="center" // default
                    anchorY="middle" // default
                >
                    Profil
                </Text>
            )
        } else {
            return <></>
        }
    }

    return (
        <div className='city-container'>
            <Canvas className={`city-canvas ${hover[0] ? 'city-hover' : null}`}>
                <pointLight intensity={0.2} color={'pink'} position={[10, 2, 0]} />
                <pointLight intensity={0.2} color={'pink'} position={[-10, 2, 0]} />
                <pointLight intensity={0.2} color={'pink'} position={[2, 0.5, 0]} />
                <pointLight intensity={0.2} color={'blue'} position={[-3, 1, -3]} />
                <pointLight intensity={0.2} color={'blue'} position={[0, 1, -10]} />
                <pointLight intensity={0.2} color={'blue'} position={[-1, 0.5, 10]} />
                <Scene />
                <Text
                    onPointerOver={() => setHover([true, 'Login'])}
                    onPointerOut={() => setHover([false, 'Login'])}
                    onClick={() => handleClick('Login')}
                    scale={[2.5, 2.5, 2.5]}
                    rotation={[0, 0.6, 0]}
                    position={[-1.7, -1.45, -1.6]}
                    color={hover[0] && hover[1] === 'Login' ? "lightpink" : "hotpink"}
                    anchorX="center" // default
                    anchorY="middle" // default
                >
                    { logged ? 'Logout' : 'Login' }
                </Text>
                <Text
                    onPointerOver={() => setHover([true, 'Users'])}
                    onPointerOut={() => setHover([false, 'Users'])}
                    onClick={() => handleClick('Users')}
                    scale={[2.5, 2.5, 2.5]}
                    rotation={[0, 0.6, 0]}
                    position={[-0.85, -1.45, -2.2]}
                    color={hover[0] && hover[1] === 'Users' ? "white" : "aqua"}
                    anchorX="center" // default
                    anchorY="middle" // default
                >
                    { logged ? 'Users' : null }
                </Text>
                <Text
                    onPointerOver={() => setHover([true, 'Register'])}
                    onPointerOut={() => setHover([false, 'Register'])}
                    onClick={() => handleClick('Register')}
                    scale={[2.5, 2.5, 2.5]}
                    rotation={[0, 0.6, 0]}
                    position={[-0.85, -1.45, -2.2]}
                    color={hover[0] && hover[1] === 'Register' ? "white" : "aqua"}
                    anchorX="center" // default
                    anchorY="middle" // default
                >
                    { logged ? null : 'Register' }
                </Text>
                <Text
                    onPointerOver={() => setHover([true, 'Home'])}
                    onPointerOut={() => setHover([false, 'Home'])}
                    onClick={() => handleClick('Home')}
                    scale={[2.5, 2.5, 2.5]}
                    rotation={[0, 0.6, 0]}
                    position={[-0.85, -0.15, -2.2]}
                    color={hover[0] && hover[1] === 'Home' ? "lightpink" : "hotpink"}
                    anchorX="center" // default
                    anchorY="middle" // default
                >
                    Home
                </Text>
                <Text
                    onPointerOver={() => setHover([true, 'Announcements'])}
                    onPointerOut={() => setHover([false, 'Announcements'])}
                    onClick={() => handleClick('Announcements')}
                    scale={[2.5, 2.5, 2.5]}
                    rotation={[0, -1, 0]}
                    position={[1.45, -0.4, -0.75]}
                    color={hover[0] && hover[1] === 'Announcements' ? "lightpink" : "hotpink"}
                    anchorX="center" // default
                    anchorY="middle" // default
                >
                    { logged ? 'Announcements' : null }
                </Text>
                <Text
                    onPointerOver={() => setHover([true, 'Create Comment'])}
                    onPointerOut={() => setHover([false, 'Create Comment'])}
                    onClick={() => handleClick('Create Comment')}
                    scale={[2.5, 2.5, 2.5]}
                    rotation={[0, -1, 0]}
                    position={[2, -1.55, -1.25]}
                    color={hover[0] && hover[1] === 'Create Comment' ? "white" : "aqua"}
                    anchorX="center" // default
                    anchorY="middle" // default
                >
                    { logged ? 'Create Comment' : null }
                </Text>
                <Text
                    onPointerOver={() => setHover([true, 'Create Announcement'])}
                    onPointerOut={() => setHover([false, 'Create Announcement'])}
                    onClick={() => handleClick('Create Announcement')}
                    scale={[3, 3, 3]}
                    rotation={[-Math.PI/2, 0, Math.PI - 2.55]}
                    position={[-0.8, -2.5, -0.8]}
                    color={hover[0] && hover[1] === 'Create Announcement' ? "white" : "aqua"}
                    anchorX="center" // default
                    anchorY="middle" // default
                >
                    { logged ? 'Create Announcement' : null }
                </Text>
                { IfLogged() }
            </Canvas>
        </div>
    )
}

export default City