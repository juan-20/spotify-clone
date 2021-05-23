import React from 'react';
import './styles.scss';



export default function TrackSearchResults({ track, chooseTrack }) {

    function handlePlay() {
        chooseTrack(track);
    }

    return (
        <div onClick={handlePlay} className="album">

            <div className="album-img">

                <img src={track.albumUrl}></img>

            </div>

            <div className="album-info">

                <h1>{track.title}</h1>

                <p>{track.artist}</p>

            </div>
        </div>
    );
}

;