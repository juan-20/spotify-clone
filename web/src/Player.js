import React, { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

export default function Player({ acessToken, trackUri }) {
    const [play, setPlay] = useState(false)

    useEffect(() =>
        // sempre que mudar o trackuri o setplay vai ser true pra começar a tocar a música
        setPlay(true), [trackUri]
    )

    if (!acessToken) return null

    return <SpotifyPlayer
        token={acessToken}
        showSaveIcon

        callback={state => {
            // quando a musica acabar ele seta falso e para de tocar
            if (!state.isPlaying) setPlay(false)
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
    />
}