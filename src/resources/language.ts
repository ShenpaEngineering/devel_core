import { EnvironmentModelMessage, LanguageModelMessage } from "../types";

export function addLanguage(envObj: EnvironmentModelMessage, langObj: LanguageModelMessage){
    envObj.language = langObj
    return envObj
}