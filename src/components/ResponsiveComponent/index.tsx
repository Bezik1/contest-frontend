import { useState, useEffect } from "react"

const ResponsiveComponent = ({ children } : { children: React.ReactNode; }) =>{
    const [active, setActive] = useState(false)
    const width = 1200

    useEffect(() =>{
        window.addEventListener('resize', () =>{
            if(window.innerWidth <= width){
                setActive(true)
            } else {
                setActive(false)
            }
        })
    })

    if(active){
        return <>{ children }</>
    } else {
        return <></>
    }
}

export default ResponsiveComponent