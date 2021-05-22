import React from 'react';

// import { Container } from './styles';

const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=f77c043101a3467fa0dd362e55ff1600&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
    return (
        <>
            <a href={AUTH_URL}>Login With Spotify</a>
        </>
    );
}