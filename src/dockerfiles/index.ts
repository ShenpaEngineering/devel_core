import { EnvironmentModelMessage } from "../types";
import Nunjucks from "nunjucks"
import fs from 'fs'

function NodeEnv (vnum:(string)){
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

export const buildDockerCompose = function(env: EnvironmentModelMessage) {
    let start_command = 'node server.js';
    let has_db = false
    let db_ports = "3306:3306"
    let db_image = "mysql"
    
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

    if (env.database != undefined ){
        has_db = true
        switch(env.database.name) {
            case 'MySQL':
                db_image = 'mysql:' + env.database.version
                db_ports = "3306:3306"
            break; 
            case 'Postgres':
                db_image = 'postgres:' + env.database.version
                db_ports = "5432:5432"
            break;
            case 'MongoDB':
                db_image = 'mongo:' + env.database.version
                db_ports = "27017:27017"
            break;
        }
    }
    let contentInfo = {
        start_command,
        db_ports,
        db_image,
        has_db
    }
    let template = fs.readFileSync(__dirname + "/docker-compose.njk").toString()
    let contents = Nunjucks.renderString(template, contentInfo)

    return contents
}