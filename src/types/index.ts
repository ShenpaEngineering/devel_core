
export interface ModelMessage {
    type: string
}

export interface ProjectModelMessage {
    hostname: string,
    name: string,
    environment: EnvironmentModelMessage | undefined,
    metadata: ModelMessage
}

export interface EnvironmentModelMessage {
    variables: string,
    docker_env_file: string,
    source_folder: string,
    language: undefined | LanguageModelMessage
    database: undefined | DatabaseModelMessage,
    application: undefined | ApplicationModelMessage,
    metadata: ModelMessage
}

export interface ApplicationModelMessage {
    name: string,
    version: string,
    metadata: ModelMessage
}

export interface DatabaseModelMessage {
    name: string,
    version: string,
    metadata: ModelMessage
}

export interface LanguageModelMessage {
    name: string,
    version: string,
    metadata: ModelMessage
}

export type availableTypes = "project" | "application" | "database" | "language" | "environment"

export class GithubClient {
    private devKey: string
    constructor(key: string) {
        this.devKey = key
    }

    public getDevKey(){
        return this.devKey
    }
}