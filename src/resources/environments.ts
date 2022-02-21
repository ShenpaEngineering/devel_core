import { ProjectModelMessage, EnvironmentModelMessage } from "../types"
import { buildDockerCompose, buildDockerfile, buildPostinstallScript, buildQEMUConfig } from "../dockerfiles"
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

export function createEnvironment(){
    return { "metadata": { "type": "environment"}}
}

export function createDockerCompose(env: EnvironmentModelMessage){
    return buildDockerCompose(env)
}

export function createDockerfile(env: EnvironmentModelMessage){
    return buildDockerfile(env)
}


export function buildEnvironmentFolder(dockerFileContents:string, dockerComposeContents:string, sourcePath:string, env: ProjectModelMessage) {
    try {
        let qemuFileName = `${env.name}.yml`
        fsExtra.ensureFileSync(sourcePath + "/denv.rc")
        fsExtra.ensureFileSync(sourcePath + "/images/Dockerfile")
        fsExtra.ensureFileSync(sourcePath + "/docker-compose.yml")
        fsExtra.ensureFileSync(sourcePath + "/postinstall.sh")
        fsExtra.ensureFileSync(sourcePath + "/"  + qemuFileName)
        fsExtra.ensureDirSync(sourcePath + "/src")
        fs.writeFileSync(sourcePath + "/denv.rc", JSON.stringify(env))
        fs.writeFileSync(sourcePath + "/" + qemuFileName, buildQEMUConfig(sourcePath))
        fs.writeFileSync(sourcePath + "/postinstall.sh", buildPostinstallScript(env.environment!))
        fs.writeFileSync(sourcePath + "/images/Dockerfile", dockerFileContents)
        fs.writeFileSync(sourcePath + "/docker-compose.yml", dockerComposeContents)

        return true
    } catch (err){
        console.log(err)
        return false
    }
}