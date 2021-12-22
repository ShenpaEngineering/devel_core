import { JsonDB } from 'node-json-db';
import { ProjectModelMessage } from '../types';
import { transformJSONtoModelMessage, transformModelMessageToJSON } from '../utils/adapters';


export function createProject(name: string, hostname: string) {
    return {
        metadata: { type: "project" },
        hostname: hostname,
        name: name,
        environment: undefined
    }
}

export function listProjects(filePath:string){
    const db = new JsonDB(filePath, true, true)
    let result = db.getData("/projects")
    let transformedResult = []
    for (let i = 0; i < result.length; i++) {
        transformedResult.push(transformJSONtoModelMessage(result[i], "project"))
    }
    return transformedResult
}

export function saveProject(project:ProjectModelMessage, filePath:string){
    try{
        const db = new JsonDB(filePath, true, true)
        db.push("projects[]", transformModelMessageToJSON(project), true)
        db.save()
        return true
    }catch(e){
        return false
    }
}


