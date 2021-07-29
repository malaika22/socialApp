import React, { useContext } from 'react'
import ReactJkMusicPlayer, {ReactJkMusicPlayerAudioInfo}  from 'react-jinke-music-player'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/src/styles.scss';
import { MusicContext } from '../../contexts/MusicContext';
import './styles.scss'

const MusicComponent = () =>{
    const {musicData} = useContext(MusicContext)
    return(
        <div className="music-section">
            <div className="music-container">
                {musicData.map(data=>
                <a href={data.url} target="_blank" rel="noreferrer">
                    <div className="music-div">
                        <div className="music-info-div">
                            <div className="song-title">
                                {data.title}
                            </div>
                            <div className="artist-name">
                                {data.subtitle}
                            </div>
                        </div>
                        <div className="audio-div">
                            <AudioPlayer />
                        </div>
                    </div>
                </a>    
                )}
            </div>
        </div>
    )
}

export default MusicComponent