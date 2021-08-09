import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const MusicContext = createContext()

export const MusicContextProvider = ({children}) =>{
    const [musicData, setMusicData] = useState()

    useEffect(()=>{
        getMusicData()
    },[])

    const getMusicData = async()=>{
       try{
            const res = await axios('https://shazam.p.rapidapi.com/songs/list-artist-top-tracks',{
                method: 'GET',
                params: {id: '40170654', locale: 'en-US'},
                headers: {
                    'x-rapidapi-key': '9825573f27msh48f39cbb36594c7p1fac99jsn101bb726d849',
                    'x-rapidapi-host': 'shazam.p.rapidapi.com'
                }
            })

            console.log('music res', res.data.tracks)
            setMusicData(res.data.tracks)
       } catch(err){
            console.log(err)
       }
        
    }

   return( 
        <MusicContext.Provider
        value={{
            musicData:musicData
        }}>
                {children}
        </MusicContext.Provider>
    )
}