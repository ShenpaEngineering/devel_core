import { TypedEmitter } from 'tiny-typed-emitter';
// import { Octokit } from '@octokit/rest';
const exec = require('child_process').exec;

export interface ModelMessage {
    type: string
}

export interface ProjectModelMessage {
    name: string,
    environment: EnvironmentModelMessage | undefined,
    metadata: ModelMessage
}

export interface EnvironmentModelMessage {
    language: undefined | LanguageModelMessage
    application: undefined | ApplicationModelMessage,
    metadata: ModelMessage
}

export interface ApplicationModelMessage {
    name: string,
    version: string,
    metadata: ModelMessage
}

export interface LanguageModelMessage {
    name: string,
    version: string,
    metadata: ModelMessage
}

export type availableTypes = "project" | "application" | "language" | "environment"

export interface GithubClientEvents {
    "downloadFinished": (stdout:string, stderr:string) => void,
    "error": (err:Error) => void
}

export class GithubClient extends TypedEmitter<GithubClientEvents> {
    private devKey?: string
    public events: TypedEmitter<GithubClientEvents>
    constructor(key?: string) {
        super()
        this.devKey = key
        this.events = new TypedEmitter<GithubClientEvents>()
        
    }

    public getDevKey(){
        return this.devKey
    }

    public downloadRepo(url:string, path:string){
        exec(`cd ${path} && git init && git pull ${url}`, (err:Error, stdout:string, stderr:string) => {
            if (err) {
                this.events.emit("error", err)
                return
            }
            
            this.events.emit("downloadFinished", stdout, stderr)
        })
    }
}