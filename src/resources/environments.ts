import { ProjectModelMessage, EnvironmentModelMessage } from "../types"
import { buildDockerCompose, buildDockerfile, buildVagrant } from "../dockerfiles"
import fs from 'fs'
const fsExtra = require('fs-extra')

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

function createVagrantfile(hostname: string){
    return buildVagrant(hostname)
}

export function buildEnvironmentFolder(dockerFileContents:string, dockerComposeContents:string, sourcePath:string, env: EnvironmentModelMessage, hostname: string) {
    console.log(dockerComposeContents)
    try {
        const vagrantContents = createVagrantfile(hostname)
        fsExtra.ensureFileSync(sourcePath + "/denv.rc")
        fsExtra.ensureFileSync(sourcePath + "/images/Dockerfile")
        fsExtra.ensureFileSync(sourcePath + "/Vagrantfile")
        fsExtra.ensureFileSync(sourcePath + "/docker-compose.yml")
        fsExtra.ensureDirSync(sourcePath + "/src")
        fs.writeFileSync(sourcePath + "/denv.rc", env.toString())
        fs.writeFileSync(sourcePath + "/images/Dockerfile", dockerFileContents)
        fs.writeFileSync(sourcePath + "/docker-compose.yml", dockerComposeContents)
        fs.writeFileSync(sourcePath + "/Vagrantfile", vagrantContents)
        return true
    } catch (err){
        return false
    }
}