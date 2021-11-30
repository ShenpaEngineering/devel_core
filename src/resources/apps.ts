import { ApplicationModelMessage, EnvironmentModelMessage } from "../types"
export function getApps() {
    return true
}



export function addApplication(envObj: EnvironmentModelMessage, appObj: ApplicationModelMessage) {
    envObj.application = appObj
    return envObj
}