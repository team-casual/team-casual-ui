import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { MinecraftServer, RunningServer } from "../../../models/Minecraft/MinecraftServer";

export interface MinecraftServerComponentProps {
	server: MinecraftServer | RunningServer
}

const Server = (props: MinecraftServerComponentProps) => {
	return (
		<>
			<Row>
				<Col>
					<Link to="/Minecraft">
						<a href={window.location.href}>Back</a>
					</Link>
				</Col>
			</Row>
			
			<Row className="mt-3">
				<Col>
					<h1>{props.server.serverName}</h1>
				</Col>
			</Row>

			<Row>
				<Col>
					<p>Test</p>
				</Col>
			</Row>
		</>
	);
};

export default Server;