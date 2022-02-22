import React, { useState, useEffect } from "react";
import { API, Auth } from 'aws-amplify';

export interface MinecraftProps {
    user: any
}

export type RunningServer = {
    serverName: "string"
}

export type StoppedServer = {
    serverName: "string"
}

export type TServers = {
    stopped: StoppedServer[],
    running: RunningServer[]
}

const Minecraft = () => {
    const [servers, setServers] = useState<TServers | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser();

                const apiName = 'team_casual';
                const path = '/minecraft/servers';
                const init = {
                    headers: {
                        Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`, // get jwtToken
                    },
                };

                const response = await API.get(apiName, path, init);

                setServers(JSON.parse(response.body));
            }
            catch (e) {
                console.error(e);
            }
        }

        getData();
    }, []);

    return (
        <>
            {servers  &&
                <>
                    {servers.stopped.map(s => s.serverName)}
                </>
            }
        </>
    );
}

export default Minecraft