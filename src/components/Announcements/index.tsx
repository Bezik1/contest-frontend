import { useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { Announcement } from '../../interfaces/interfaces'
import AnnouncementComponent from '../AnnouncementComponent'
import './index.css'

const AnnouncementsArray = () =>{
    const API_LINK = 'http://localhost:3000/announcements'
    const [announcements] = useFetch<Announcement[]>(API_LINK)
    const previousAnnouncements = announcements?.data
    const [data, setData] = useState<Announcement[]>([])

    useEffect(() =>{
        setData(announcements?.data)
    }, [announcements])

    const announcementsMap = () =>{
        return data?.map(announcement => <AnnouncementComponent announcement={announcement} />)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const filterData = data.filter(announcement => announcement.from.includes(e.currentTarget.value))
        if(e.currentTarget.value === ''){
            setData(previousAnnouncements)
        } else {
            setData(filterData)
        }
        console.log(e.currentTarget.value)
    }

    return (
        <div className='announcements-container'>
            <h1> Announcements </h1>
            <label htmlFor='searchbar' className='searchbar-label'>
                Find Announcement 
            </label>
            <input 
                type='text' 
                id='searchbar' 
                onChange={handleChange}/>
            <div className='announcements-array'>
                { announcementsMap() }
            </div>
        </div>
    )
}

export default AnnouncementsArray