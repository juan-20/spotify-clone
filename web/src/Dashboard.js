import React from 'react';
import useAuth from './useAuth';


function Dashboard({ code }) {

    const acessToken = useAuth(code)

    return (
        <>
            {code}
        </>
    );
}

export default Dashboard;