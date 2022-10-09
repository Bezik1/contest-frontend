import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { URLS } from '../../constans/constans'
import './index.css'
import Login from '../Login'

const City = ({ setCurrentComponent } : { setCurrentComponent: React.Dispatch<React.SetStateAction<React.ReactNode>> }) =>{
    return (
        <div className='city-container'>
            <Canvas className='city-canvas'>
                <pointLight intensity={0.2} color={'pink'} position={[10, 2, 0]} />
                <pointLight intensity={0.2} color={'pink'} position={[-10, 2, 0]} />
                <pointLight intensity={0.2} color={'pink'} position={[2, 0.5, 0]} />
                <pointLight intensity={0.2} color={'blue'} position={[-3, 1, -3]} />
                <pointLight intensity={0.2} color={'blue'} position={[0, 1, -10]} />
                <pointLight intensity={0.2} color={'blue'} position={[-1, 0.5, 10]} />
                <Scene />
                <Text
                    onClick={() => setCurrentComponent(<Login />)}
                    scale={[3, 3, 3]}
                    rotation={[0, 0.6, 0]}
                    position={[-1.5, -1.2, -1.5]}
                    color="lightgreen"
                    anchorX="center" // default
                    anchorY="middle" // default
                >
                    Login
                </Text>
            </Canvas>
        </div>
    )
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
            <OrbitControls target={gltf.scene.position} />
        </>
    )
}

export default City