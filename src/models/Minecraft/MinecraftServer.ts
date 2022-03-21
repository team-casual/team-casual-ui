export interface MinecraftServer {
    serverName: string,
    serverType: "vanilla" | "modded",
    minecraftVersion: string,
    availabilityZone: string,
    instanceState: string,
    instanceId: string
}

export interface RunningServer extends MinecraftServer {
    publicDnsName: string,
    publicIpAddress: string,
    launchTime: Date
}