const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');


const app = express();
app.use(cors())
app.use(bodyParser.json());

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'https://c0012a5ad418.ngrok.io',
        clientId: 'f77c043101a3467fa0dd362e55ff1600',
        clientSecret: 'ad189720a65847f395d96bb2a21a89fa',
        refreshToken,
    })

    spotifyApi
        .refreshAccessToken()
        .then(data => {
            console.log(data);
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn,
            })

            // console.log('O acesso foi atualizado');
            // console.log(data.body);

        }).catch(() => {
            res.sendStatus(400)
        })

})

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'https://c0012a5ad418.ngrok.io',
        clientId: 'f77c043101a3467fa0dd362e55ff1600',
        clientSecret: 'ad189720a65847f395d96bb2a21a89fa',
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        console.log(data)
        res.json({
            acessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            experesIn: data.body.experes_in,
        })
    }).catch(() => {
        res.sendStatus(400)
    })
})

app.listen(3001)