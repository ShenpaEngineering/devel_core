import { TypedEmitter } from 'tiny-typed-emitter';
// import { Octokit } from '@octokit/rest';
const exec = require('child_process').exec;

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

export interface GithubClientEvents {
    "downloadFinished": (stdout:string, stderr:string) => void,
    "error": (err:Error) => void
}

export class GithubClient extends TypedEmitter<GithubClientEvents> {
    private devKey: string
    // private githubOctoClient: Octokit
    public events: TypedEmitter<GithubClientEvents>
    constructor(key: string) {
        super()
        this.devKey = key
        this.events = new TypedEmitter<GithubClientEvents>()
        // this.githubOctoClient = new Octokit({ auth: this.devKey })
        // console.log(this.githubOctoClient)
    }

    public getDevKey(){
        return this.devKey
    }

    public downloadRepo(url:string, path:string){
        exec(`cd ${path} && git clone ${url} .`, (err:Error, stdout:string, stderr:string) => {
            if (err) {
                this.events.emit("error", err)
                return
            } else {
                this.events.emit("downloadFinished", stdout, stderr)
                return
            }
        })
    }
}