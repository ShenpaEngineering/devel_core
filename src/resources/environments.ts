import { ProjectModelMessage, EnvironmentModelMessage } from "../types"
import fs from 'fs'

export function getEnvironments() {
    return true
}

export function addEnvironment(projectModel: ProjectModelMessage, environmentModel: EnvironmentModelMessage) {
    projectModel.environment = environmentModel
    return projectModel
}

export function createSourcePath(path: string) {
    console.log(path)
    
    try {
        fs.mkdirSync(path)
        return true
    }catch(e){
        return false
    }
    
    
}
