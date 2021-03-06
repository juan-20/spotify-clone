import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResults from '../../components/Songs/TrackSearchResults';
import Player from '../../Player';
import useAuth from '../../useAuth';
import './dashboard.scss';


const spotifyApi = new SpotifyWebApi({
    clientId: 'f77c043101a3467fa0dd362e55ff1600',
});

function Dashboard({ code }) {
    const acessToken = useAuth(code)
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    // pega a musica que clicar
    const [playingTrack, setPlayingTrack] = useState([]);
    console.log(searchResults);

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('');
    }

    // seta o id sempre
    useEffect(() => {
        if (!acessToken) return
        spotifyApi.setAccessToken(acessToken)
    }, [acessToken])

    useEffect(() => {
        if (!search) return setSearchResults([])
        if (!acessToken) return

        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
            if (cancel) return
            // console.log(res.body.tracks.items)
            setSearchResults(
                res.body.tracks.items.map(track => {
                    // pega a menor imagem do album: 
                    const smallestAlbum = track.album.images
                        .reduce((smallest, image) => {
                            //  dentro tem a propriedade height a menor vai ficar como smallest
                            if (image.height < smallest.height) return image
                            return smallest
                        }, track.album.images[0])

                    return {
                        // interface que vai aparecer
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbum.url,
                    }
                }
                ))
        })

        // para de fazer request
        return () => cancel = true
    }, [search, acessToken])

    return (
        <div className="dashboard">
            <div className="dashboard-search">
                <input
                    type="text"
                    placeholder={"Pesquisar Musica/Artistas"}
                    value={search}
                    onChange={e => setSearch(e.target.value)}>
                </input>
            </div>

            <div className="dashboard-body">
                <div className="dashboard-body-music">
                    {searchResults.map(track => (
                        <TrackSearchResults
                            track={track}
                            key={track.uri}
                            chooseTrack={chooseTrack}
                        />
                    ))}
                </div>

                <div className="dashboard-body-player">
                    <Player
                        acessToken={acessToken}
                        trackUri={playingTrack?.uri}
                    ></Player>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;