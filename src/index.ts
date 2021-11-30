

import {createProject, listProjects} from './resources/projects'
import { getEnvironments, addEnvironment, createSourcePath } from './resources/environments';
import { getApps, addApplication } from './resources/apps'
import { addDatabase } from './resources/databases';
import { addLanguage } from './resources/language';
export const Client = {
    projects: {
        createProject,
        listProjects,
        addEnvironment
    },
    environments: {
        addEnvironment,
        getEnvironments,
        addApplication,
        addDatabase,
        addLanguage,
        createSourcePath

    },
    getApps,
}
