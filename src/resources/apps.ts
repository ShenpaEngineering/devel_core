import { ApplicationModelMessage, EnvironmentModelMessage } from "../types"

export function addApplication(envObj: EnvironmentModelMessage, appObj: ApplicationModelMessage) {
    envObj.application = appObj
    return envObj
}