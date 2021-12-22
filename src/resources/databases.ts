import { JsonDB } from "node-json-db";
import { DatabaseModelMessage, EnvironmentModelMessage } from "../types";
import { transformJSONtoModelMessage } from "../utils/adapters";
export function addDatabase(envObj: EnvironmentModelMessage, dbObj: DatabaseModelMessage) {
    envObj.database = dbObj
    return envObj
}

export function getDatabases(filePath:string){
    const db = new JsonDB(filePath, true, true)
    let transformedJson = []
    let results = db.getData("/databases")
    for( let i = 0; i < results.length; i++) {
        transformedJson.push(transformJSONtoModelMessage(results[i], "database"))
    }
    return transformedJson
}