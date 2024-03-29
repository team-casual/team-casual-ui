import React, { useState, useEffect } from "react";
import { API, Auth } from 'aws-amplify';
import { Row, Col, Table, Container, Button } from "react-bootstrap";
import { Link, Route } from "react-router-dom";

import Server from "./Server/MinecraftServer";

import Api from "../../models/Api/Api";
import { MinecraftServer, RunningServer } from "../../models/Minecraft/MinecraftServer";

export interface MinecraftProps {
    baseUrl: "/Minecraft"
}

export type ListServersResponse = {
    stopped: MinecraftServer[],
    running: RunningServer[]
}

const Minecraft = (props: MinecraftProps) => {
    const [servers, setServers] = useState<ListServersResponse>({stopped: [], running: []});

    const getData = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();

            const apiName = Api.Name;
            const path = Api.Minecraft.ListServersEndpoint;
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

    const startServer = async (serverId: string) => {
        try {
            const user = await Auth.currentAuthenticatedUser();

            const apiName = "team_casual";
            const path = `/minecraft/servers/start?instanceId=${serverId}`;
            const init = {
                headers: {
                    Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`, // get jwtToken
                }
            };

            const stoppedServers = servers.stopped;
            stoppedServers.forEach(s => {
                if (s.instanceId === serverId) {
                    s.instanceState = "pending";
                }
            });

            setServers({
                running: [...servers.running],
                stopped: [...stoppedServers]
            });

            const response = await API.get(apiName, path, init);
            console.log(response);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            await getData();
        }
    };

    const stopServer = async (serverId: string) => {
        try {
            const user = await Auth.currentAuthenticatedUser();

            const apiName = "team_casual";
            const path = `/minecraft/servers/stop?instanceId=${serverId}`;
            const init = {
                headers: {
                    Authorization: `Bearer ${user.signInUserSession.idToken.jwtToken}`, // get jwtToken
                }
            };

            const runningServers = servers.running;
            runningServers.forEach(s => {
                if (s.instanceId === serverId) {
                    s.instanceState = "stopping";
                }
            });

            setServers({
                running: [...runningServers],
                stopped: [...servers.stopped]
            });

            const response = await API.get(apiName, path, init);
            console.log(response);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            await getData();
        }
    };

    useEffect(() => {
        const onLoad = async () => {
            await getData();
        }

        onLoad();
    }, []);

    return (
        <>
            {servers &&
                <Container>
                    {servers.stopped.map(s => {
                        return (
                            <Route path={`${props.baseUrl}/${s.serverName.replaceAll(" ", "")}`}>
                                <Server server={s} />
                            </Route>
                        );
                    })}

                    <Route exact path="/Minecraft">
                        <Row>
                            <Col>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Server Name</th>
                                            <th>Type</th>
                                            <th>Minecraft Version</th>
                                            <th>Region</th>
                                            <th>State</th>
                                            <th>DNS</th>
                                            <th>IP Addr</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {servers.running.map(s => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <Link to={`/minecraft/${s.serverName.replaceAll(" ", "")}`}>
                                                            <p>{s.serverName}</p>
                                                        </Link>
                                                    </td>
                                                    <td>{s.serverType}</td>
                                                    <td>{s.minecraftVersion}</td>
                                                    <td>{s.availabilityZone}</td>
                                                    <td>{s.instanceState}</td>
                                                    <td>{s.publicDnsName}</td>
                                                    <td>{s.publicIpAddress}</td>
                                                    <td><Button onClick={() => stopServer(s.instanceId)}>Stop</Button></td>
                                                </tr>
                                            );
                                        })}

                                        {servers.stopped.map(s => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <Link to={`/Minecraft/${s.serverName.replaceAll(" ", "")}`}>
                                                            <p>{s.serverName}</p>
                                                        </Link>
                                                    </td>
                                                    <td>{s.serverType}</td>
                                                    <td>{s.minecraftVersion}</td>
                                                    <td>{s.availabilityZone}</td>
                                                    <td>{s.instanceState}</td>
                                                    <td></td>
                                                    <td></td>
                                                    <td><Button onClick={() => startServer(s.instanceId)}>Start</Button></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Route>

                </Container>
            }
        </>
    );
}

export default Minecraft