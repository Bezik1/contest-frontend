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

const City = ({ setCurrentComponent, setUser, logged, setLogged } : CityProps) =>{
    const [hover, setHover] = useState([false, ''])
    const setComponentName = useContext(CurrentComponentContext)
    
    const handleClick = (clickType: string) =>{
        switch(clickType){
            case 'Announcements':
                setCurrentComponent(<AnnouncementsArray />)
                //@ts-ignore
                setComponentName('Announcements')
                break
            case 'Login':
                if(logged){
                    setUser(undefined)
                    setLogged(false)
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
                    setCurrentComponent(<Profil setCurrentComponent={setCurrentComponent} />)
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
                    color={hover[0] && hover[1] === 'Profile' ? "lightblue" : "blue"}
                    anchorX="center" // default
                    anchorY="middle" // default
                >
                    Profile
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
                    scale={[3, 3, 3]}
                    rotation={[0, 0.6, 0]}
                    position={[-1.5, -1.45, -1.78]}
                    color={hover[0] && hover[1] === 'Login' ? "lightgreen" : "green"}
                    anchorX="center" // default
                    anchorY="middle" // default
                >
                    { logged ? 'Logout' : 'Login' }
                </Text>
                <Text
                    onPointerOver={() => setHover([true, 'Announcements'])}
                    onPointerOut={() => setHover([false, 'Announcements'])}
                    onClick={() => handleClick('Announcements')}
                    scale={[3, 3, 3]}
                    rotation={[0, -1, 0]}
                    position={[1.45, -0.4, -0.75]}
                    color={hover[0] && hover[1] === 'Announcements' ? "lightpink" : "hotpink"}
                    anchorX="center" // default
                    anchorY="middle" // default
                >
                    Announcements
                </Text>
                <IfLogged />
            </Canvas>
        </div>
    )
}

export default City