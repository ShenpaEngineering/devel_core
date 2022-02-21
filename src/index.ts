

import {createProject} from './resources/projects'
import { getEnvironments, addEnvironment, createSourcePath, createDockerCompose, createDockerfile, buildEnvironmentFolder, createEnvironment } from './resources/environments';
import { addApplication } from './resources/apps'
import { addLanguage } from './resources/language';
import { GithubClientFactory } from './providers/github';
export const Client = {
    projects: {
        createProject,
        addEnvironment,
    },
    environments: {
        addEnvironment,
        getEnvironments,
        addApplication,
        addLanguage,
        createSourcePath,
        createDockerCompose,
        createDockerfile,
        buildEnvironmentFolder,
        createEnvironment
    },
    github: {
        "getClient": GithubClientFactory
    }
}
