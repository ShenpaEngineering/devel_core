import { EnvironmentModelMessage } from "../types";
import Nunjucks from "nunjucks"
import fs from 'fs'

function NodeEnv(vnum:(string)){
    let contents = fs.readFileSync(__dirname + "/dockerfile-node.njk")
    return Nunjucks.renderString(contents.toString(), {version: vnum})
}

function RubyEnv(vnum:(string)){
    let contents = fs.readFileSync(__dirname + "/dockerfile-ruby.njk")
    return Nunjucks.renderString(contents.toString(), {version: vnum})
}

function PythonEnv(vnum:(string)){
    let contents = fs.readFileSync(__dirname + "/dockerfile-python.njk")
    return Nunjucks.renderString(contents.toString(), {version: vnum})
}


export const buildDockerfile = function(env: EnvironmentModelMessage){
    let fileContents = ''
    switch(env.language?.name){
        case "Node":
            fileContents = NodeEnv(env.language?.version)
        break;
        case "Ruby":
            fileContents = RubyEnv(env.language?.version)
        break;
        case "Python":
            fileContents = PythonEnv(env.language?.version)
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
export const buildDockerCompose = function() {
    let ports = "3000:3000"
    let contentInfo = {
        ports
    }
    let template = fs.readFileSync(__dirname + "/docker-compose.njk").toString()
    let contents = Nunjucks.renderString(template, contentInfo)

    return contents
}