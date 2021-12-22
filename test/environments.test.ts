import { Client } from '../src'
const mock = require('mock-fs');
const fsExtra = require('fs-extra')
import fs from 'fs'

describe('Environment resource functions', () => {
    afterEach(() => {
        mock.restore()
        fsExtra.emptyDirSync(__dirname + "/env")
    })
    describe('addApplication function', () => {
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
    
    })

    describe('addDatabase function',() => {
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
    })
    
    
    describe('addLanguage function', () => {
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
    })
    
    describe('createSourceFolder function', () => {
        it('should create a new folder for app files when createSourceFolder is called', async () => {
            mock({ '/some': {'test.txt': 'hello'}})
    
            let path = '/some/path'
            const result = Client.environments.createSourcePath(path)
            expect(result).toBe(true)
            mock.restore();

        })
    
        it('should throw an error when the source directory does not exist', () => {
            mock({ '/some': {'test.txt': 'hello'}})
            let path = '/does/not/exist'
            const result = Client.environments.createSourcePath(path)
            expect(result).toBe(false)
            mock.restore();
        })
    })

    describe('createDockerCompose function', () => {
        let env = {
            "metadata": { "type": "environmnent"},

            "application": {
                "metadata": { "type": "application"},
                "name": "Express",
                "version": "1.0x"
            },
            "language": {
                "metadata": { "type": "language"},
                "name": "Node",
                "version": "14.3"
            },
            "database": undefined,
            "docker_env_file": "//path/to/file",
            "source_folder": "//path/to/folder",
            "variables": ""
        }
        it('should return a string with compose file contents', () => {
            let result = Client.environments.createDockerCompose(env)
            expect(result).toMatch(/version\: \'3.7\'/)
            expect(result).toEqual(expect.not.stringMatching(/db\:/))
        })
        it('should return node server.js when the language is Node', () => {
            let result = Client.environments.createDockerCompose(env)
            expect(result).toMatch(/node server\.js/)
        })
        it('should return gunicorn server.py when the language is Python', () => {
            let env = {
                "metadata": { "type": "environmnent"},
    
                "application": {
                    "metadata": { "type": "application"},
                    "name": "Express",
                    "version": "1.0x"
                },
                "language": {
                    "metadata": { "type": "language"},
                    "name": "Python",
                    "version": "3.6"
                },
                "database": undefined,
                "docker_env_file": "//path/to/file",
                "source_folder": "//path/to/folder",
                "variables": ""
            }
            let result = Client.environments.createDockerCompose(env)
            expect(result).toMatch(/gunicorn server\.py/)
        })
        it('should return go run server.go when the language is Go', () => {
            let env = {
                "metadata": { "type": "environmnent"},
    
                "application": {
                    "metadata": { "type": "application"},
                    "name": "Express",
                    "version": "1.0x"
                },
                "language": {
                    "metadata": { "type": "language"},
                    "name": "Go",
                    "version": "3.6"
                },
                "database": undefined,
                "docker_env_file": "//path/to/file",
                "source_folder": "//path/to/folder",
                "variables": ""
            }
            let result = Client.environments.createDockerCompose(env)
            expect(result).toMatch(/go run server\.go/)
        })

        it('should return contents with a db key', () => {
            let env = {
                "metadata": { "type": "environmnent"},
    
                "application": {
                    "metadata": { "type": "application"},
                    "name": "Express",
                    "version": "1.0x"
                },
                "language": {
                    "metadata": { "type": "language"},
                    "name": "Go",
                    "version": "3.6"
                },
                "database": {
                    "metadata": { "type": "database"},
                    "name": "Redis",
                    "version": "6"
                },
                "docker_env_file": "//path/to/file",
                "source_folder": "//path/to/folder",
                "variables": ""
            }
            let result = Client.environments.createDockerCompose(env)
            expect(result).toMatch(/db\:/)
        })

        it('should return contents with MySQL db key info if database is MySQL', () => {
            let env = {
                "metadata": { "type": "environmnent"},
    
                "application": {
                    "metadata": { "type": "application"},
                    "name": "Express",
                    "version": "1.0x"
                },
                "language": {
                    "metadata": { "type": "language"},
                    "name": "Go",
                    "version": "3.6"
                },
                "database": {
                    "metadata": { "type": "database"},
                    "name": "MySQL",
                    "version": "6"
                },
                "docker_env_file": "//path/to/file",
                "source_folder": "//path/to/folder",
                "variables": ""
            }
            let result = Client.environments.createDockerCompose(env)
            expect(result).toMatch(/image\: mysql\:6/)
            expect(result).toMatch(/3306\:3306/)
        })

        it('should return contents with Postgres db key info if database is MySQL', () => {
            let env = {
                "metadata": { "type": "environmnent"},
    
                "application": {
                    "metadata": { "type": "application"},
                    "name": "Express",
                    "version": "1.0x"
                },
                "language": {
                    "metadata": { "type": "language"},
                    "name": "Go",
                    "version": "3.6"
                },
                "database": {
                    "metadata": { "type": "database"},
                    "name": "Postgres",
                    "version": "6"
                },
                "docker_env_file": "//path/to/file",
                "source_folder": "//path/to/folder",
                "variables": ""
            }
            let result = Client.environments.createDockerCompose(env)
            expect(result).toMatch(/image\: postgres\:6/)
            expect(result).toMatch(/5432\:5432/)
        })

        it('should return contents with Mongodb db key info if database is MySQL', () => {
            let env = {
                "metadata": { "type": "environmnent"},
    
                "application": {
                    "metadata": { "type": "application"},
                    "name": "Express",
                    "version": "1.0x"
                },
                "language": {
                    "metadata": { "type": "language"},
                    "name": "Go",
                    "version": "3.6"
                },
                "database": {
                    "metadata": { "type": "database"},
                    "name": "MongoDB",
                    "version": "6"
                },
                "docker_env_file": "//path/to/file",
                "source_folder": "//path/to/folder",
                "variables": ""
            }
            let result = Client.environments.createDockerCompose(env)
            expect(result).toMatch(/image\: mongo\:6/)
            expect(result).toMatch(/27017\:27017/)
        })
    })

    describe('createDockerFile function', () => {
        it('should return the text that will make up a DockerFile contents', () => {
            let env = {
                "metadata": { "type": "environmnent"},

                "application": {
                    "metadata": { "type": "application"},
                    "name": "Express",
                    "version": "1.0x"
                },
                "language": {
                    "metadata": { "type": "language"},
                    "name": "Node",
                    "version": "14.3"
                },
                "database": {
                    "metadata": { "type": "database"},
                    "name": "Redis",
                    "version": "6"
                },
                "docker_env_file": "//path/to/file",
                "source_folder": "//path/to/folder",
                "variables": ""
            }
            let result = Client.environments.createDockerfile(env)
            expect(result).toMatch(/FROM node:14.3/)
        })
        it('should return an error when it passes in an supported language', () => {
            let env = {
                "metadata": { "type": "environmnent"},

                "application": {
                    "metadata": { "type": "application"},
                    "name": "Express",
                    "version": "1.0x"
                },
                "language": {
                    "metadata": { "type": "language"},
                    "name": "Foobar",
                    "version": "14.3"
                },
                "database": {
                    "metadata": { "type": "database"},
                    "name": "Redis",
                    "version": "6"
                },
                "docker_env_file": "//path/to/file",
                "source_folder": "//path/to/folder",
                "variables": ""
            }
            let result = Client.environments.createDockerfile(env)
            expect(result instanceof Error).toBe(true)
        })
    })

    describe('buildEnvironmentFolder function', () => {
        it('should create a denv.rc file', () => {
            let env = {
                "metadata": { "type": "environmnent"},

                "application": {
                    "metadata": { "type": "application"},
                    "name": "Express",
                    "version": "1.0x"
                },
                "language": {
                    "metadata": { "type": "language"},
                    "name": "Foobar",
                    "version": "14.3"
                },
                "database": {
                    "metadata": { "type": "database"},
                    "name": "Redis",
                    "version": "6"
                },
                "docker_env_file": "//path/to/file",
                "source_folder": "//path/to/folder",
                "variables": ""
            }
            let result = Client.environments.buildEnvironmentFolder('test dockerfile contents', 'test docker compose contents', 'github.com/repo/example', __dirname + "/env", env)
            expect(result).toEqual(true)
            expect(fs.lstatSync(__dirname + "/env/denv.rc", { throwIfNoEntry: false})).not.toBe(undefined)
        })

        it('should create a image folder with the Dockerfile inside', () => {
            let env = {
                "metadata": { "type": "environmnent"},

                "application": {
                    "metadata": { "type": "application"},
                    "name": "Express",
                    "version": "1.0x"
                },
                "language": {
                    "metadata": { "type": "language"},
                    "name": "Foobar",
                    "version": "14.3"
                },
                "database": {
                    "metadata": { "type": "database"},
                    "name": "Redis",
                    "version": "6"
                },
                "docker_env_file": "//path/to/file",
                "source_folder": "//path/to/folder",
                "variables": ""
            }
            let result = Client.environments.buildEnvironmentFolder('test dockerfile contents', 'test docker compose contents', 'github.com/repo/example', __dirname + "/env", env)
            expect(result).toEqual(true)
            expect(fs.lstatSync(__dirname + "/env/images/Dockerfile", {throwIfNoEntry: false})).not.toBe(undefined)     
        })
    })
    

})