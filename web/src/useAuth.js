import axios from 'axios';
import { useEffect, useState } from "react";

export default function useAuth(code) {
    const [acessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        // pega a api
        axios.post(" https://d5a6b36fc739.ngrok.io/login", {
            code,
        }).then(res => {
            // console.log(res.data)
            setAccessToken(res.data.acessToken)
            //  faz com q o codigo do usuario seja atualizado toda hora
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            // limpa a rota
            window.history.pushState({}, null, '/inside')
        }).catch(() => {
            window.location = '/';
        })
    }, [code])


    // faz com q o usuario n seja deslogado quando o token expirar
    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const timeout = setTimeout(() => {


            // quando os doi mudar ele faz
            axios.post(" https://d5a6b36fc739.ngrok.io/refresh", {
                refreshToken,
            }).then(res => {
                setAccessToken(res.data.acessToken)
                setExpiresIn(res.data.expiresIn)

                // window.history.pushState({}, null, '/inside')
            }).catch(() => {
                window.location = '/';
            }, (expiresIn - 60) * 1000)
            return () => {
                clearTimeout(timeout);
            }

        })
    }, [refreshToken, expiresIn])

    return acessToken
}

