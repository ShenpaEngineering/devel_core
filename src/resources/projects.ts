export function createProject(name: string, hostname: string) {
    return {
        metadata: { type: "project" },
        hostname: hostname,
        name: name,
        environment: undefined
    }
}

export function listProjects(){
    return true
}

