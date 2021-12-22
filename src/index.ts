

import {createProject, listProjects, saveProject } from './resources/projects'
import { getEnvironments, addEnvironment, createSourcePath, createDockerCompose, createDockerfile, buildEnvironmentFolder } from './resources/environments';
import { getApps, addApplication } from './resources/apps'
import { addDatabase, getDatabases } from './resources/databases';
import { addLanguage } from './resources/language';
import { GithubClientFactory } from './providers/github';
export const Client = {
    projects: {
        createProject,
        listProjects,
        addEnvironment,
        saveProject
    },
    environments: {
        addEnvironment,
        getEnvironments,
        addApplication,
        addDatabase,
        addLanguage,
        createSourcePath,
        createDockerCompose,
        createDockerfile,
        buildEnvironmentFolder
    },
    github: {
        "getClient": GithubClientFactory
    },
    apps:{
        getApps
    },
    db:{
        getDatabases
    }
}
