import { Client } from '../src'
const mock = require('mock-fs');

describe('Environment resource functions', () => {
    

    it('should return environment Object with application when addApplication is called', () => {
        let environmentObj = {
            metadata: { type: "environment" },
            docker_env_file: "//path/to/file",
            source_folder: "//path/to/folder",
            variables: "",
            language: undefined,
            database: undefined,
            application: undefined
        }
        let appObj = {
            metadata: { "type": "application" },
            name: "Express",
            version: "1.0x"
        }
        let result = Client.environments.addApplication(environmentObj, appObj)
        expect(result.application).not.toBe(undefined)
        expect(result.application?.metadata.type).toMatch('application')
        expect(result.application?.version).toEqual("1.0x")
    })

    it('should return environment Object with database when addDatabase is called', () => {
        let environmentObj = {
            metadata: { type: "environment" },
            docker_env_file: "//path/to/file",
            source_folder: "//path/to/folder",
            variables: "",
            language: undefined,
            database: undefined,
            application: undefined
        }
        let dbObj = {
            metadata: { "type": "database" },
            name: "Redis",
            version: "6"
        }
        let result = Client.environments.addDatabase(environmentObj, dbObj)
        expect(result.database).not.toBe(undefined)
        expect(result.database?.metadata.type).toMatch('database')
        expect(result.database?.version).toEqual("6")
    })

    it('should return environment Object with language when addLanguage is called', () => {
        let environmentObj = {
            metadata: { type: "environment" },
            docker_env_file: "//path/to/file",
            source_folder: "//path/to/folder",
            variables: "",
            language: undefined,
            database: undefined,
            application: undefined
        }
        let langObj = {
            metadata: { "type": "language" },
            name: "Node",
            version: "14.3"
        }
        let result = Client.environments.addLanguage(environmentObj, langObj)
        expect(result.language).not.toBe(undefined)
        expect(result.language?.metadata.type).toMatch('language')
        expect(result.language?.version).toEqual("14.3")
        expect(result.language?.name).toEqual("Node")
    })

    it('should create a new folder for app files when createSourceFolder is called', async () => {
        mock({ '/some': {'test.txt': 'hello'}})

        let path = '/some/path'
        const result = Client.environments.createSourcePath(path)
        expect(result).toBe(true)
    })

    it('should throw an error when the source directory does not exist', () => {
        mock({ '/some': {'test.txt': 'hello'}})
        let path = '/does/not/exist'
        const result = Client.environments.createSourcePath(path)
        expect(result).toBe(false)
    })
})