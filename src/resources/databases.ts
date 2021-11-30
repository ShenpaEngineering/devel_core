import { DatabaseModelMessage, EnvironmentModelMessage } from "../types";

export function addDatabase(envObj: EnvironmentModelMessage, dbObj: DatabaseModelMessage) {
    envObj.database = dbObj
    return envObj
}