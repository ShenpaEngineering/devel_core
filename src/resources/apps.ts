import { JsonDB } from "node-json-db"
import { ApplicationModelMessage, EnvironmentModelMessage } from "../types"
import { transformJSONtoModelMessage } from "../utils/adapters"

export function getApps(filePath: string) {
    const db = new JsonDB(filePath, true, true)
    let result = db.getData("/applications")
    let transformedJson = []
    for( let i = 0; i < result.length; i++) {
        transformedJson.push(transformJSONtoModelMessage(result[i], "application"))
    }
    return transformedJson
}



export function addApplication(envObj: EnvironmentModelMessage, appObj: ApplicationModelMessage) {
    envObj.application = appObj
    return envObj
}