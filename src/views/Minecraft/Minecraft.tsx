import React, { useEffect } from "react";
import API from "@aws-amplify/api";

export interface MinecraftProps {
    user: any
}

const Minecraft = () => {

    useEffect(() => {
        const getData = async () => {
            try {
                const apiName = 'minecraftApi';
                const path = '/minecraft/servers';
                const init = {
                    headers: {}
                };

                const response = await API.post(apiName, path, init);

                return response.json();
            }
            catch (e) {
                console.error(e);
            }
        }

        getData();
    }, []);

    return (
        <>
            Minecraft
        </>
    );
}

export default Minecraft