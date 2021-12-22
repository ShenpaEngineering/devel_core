import { ProjectModelMessage, EnvironmentModelMessage } from "../types"
import { buildDockerCompose, buildDockerfile } from "../dockerfiles"
import fs from 'fs'

export function getEnvironments() {
    return true
}

export function addEnvironment(projectModel: ProjectModelMessage, environmentModel: EnvironmentModelMessage) {
    projectModel.environment = environmentModel
    return projectModel
}

export function createSourcePath(path: string) {    
    try {
        fs.mkdirSync(path)
        return true
    }catch(e){
        return false
    }
}


export function createDockerCompose(env: EnvironmentModelMessage){
    return buildDockerCompose(env)
}

export function createDockerfile(env: EnvironmentModelMessage){
    return buildDockerfile(env)
}

export function buildEnvironmentFolder(dockerFileContents:string, dockerComposeContents:string, repoURL:string, sourcePath:string, env: EnvironmentModelMessage) {
    console.log(dockerComposeContents)
    console.log(dockerFileContents)
    console.log(repoURL)
    fs.writeFileSync(sourcePath + "/denv.rc", env.toString())
    
    return true
}