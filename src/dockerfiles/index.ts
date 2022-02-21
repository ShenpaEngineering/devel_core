import { EnvironmentModelMessage } from "../types";
import Nunjucks from "nunjucks"
import fs from 'fs'

function NodeEnv(vnum:(string)){
    let contents = fs.readFileSync(__dirname + "/dockerfile-node.njk")
    return Nunjucks.renderString(contents.toString(), {version: vnum})
}


export const buildDockerfile = function(env: EnvironmentModelMessage){
    let fileContents = ''
    switch(env.language?.name){
        case "Node":
            fileContents = NodeEnv(env.language?.version)
        break;
        default:
            return new Error("We don't support that langauge.")
    }
    return fileContents
}

export const buildQEMUConfig = function(sourcePath: string) {
    let contentInfo = {
        sourcePath
    }
    let template = fs.readFileSync(__dirname + "/qemu-config.njk").toString()
    let contents = Nunjucks.renderString(template, contentInfo)
    return contents
}
export const buildPostinstallScript = function(env: EnvironmentModelMessage) {
    let contentInfo = {
        language: env.language?.name
    }
    let template = fs.readFileSync(__dirname + "/postinstall.njk").toString()
    let fileContents = Nunjucks.renderString(template, contentInfo)
    return fileContents
}
export const buildDockerCompose = function(env: EnvironmentModelMessage) {
    let start_command = 'node server.js';
    let ports = "3000:3000"
    switch(env.language?.name) {
        case 'Node':
            start_command = 'node server.js'
        break;
        case 'Python':
            start_command = 'gunicorn server.py'
        break;
        case 'Go':
            start_command = 'go run server.go'
        break;
        default:
            return new Error("We don't suppor that language")
    }

    let contentInfo = {
        start_command,
        ports
    }
    let template = fs.readFileSync(__dirname + "/docker-compose.njk").toString()
    let contents = Nunjucks.renderString(template, contentInfo)

    return contents
}