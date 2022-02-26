import { MinecraftApi } from "../Minecraft/MinecraftApi";

export default class Api {
	static Name = "team_casual";
	static MinecraftPath = "/minecraft"

	static Minecraft: MinecraftApi = {
		ListServersEndpoint: `${this.MinecraftPath}/servers`
	}
}

