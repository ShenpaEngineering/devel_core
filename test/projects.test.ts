import { Client } from '../src'
import { JsonDB } from 'node-json-db';


afterEach(function(){
    const db = new JsonDB(__dirname + "/db/test_db_write.json")
    db.push("/", {"projects":[]}, true)
    db.save()
})

describe('project resource functions', () => {
    describe('createProject functions', ()  => {
        it('should return a ProjectModelMessage', () => {
            let result = Client.projects.createProject("Example Project", "myhost.develop");
            expect(result).toHaveProperty('metadata')
            expect(result.metadata.type).toMatch('project')
            expect(result.hostname).toMatch('myhost.develop')
            expect(result.name).toMatch('Example Project')
            expect(result).toHaveProperty('environment')
            expect(result.environment).toBe(undefined)
        })
    })

    describe('addEnvironments function', () => {    
        it('should return a ProjectModelMessage with environment added', () => {
            let projectObj = Client.projects.createProject("Example Project", "example.dev")
            expect(projectObj).toHaveProperty('environment')
            expect(projectObj.environment).toBe(undefined)
            let environmentObj = {
                metadata: { type: "environment" },
                docker_env_file: "//path/to/file",
                source_folder: "//path/to/folder",
                variables: "",
                language: undefined,
                database: undefined,
                application: undefined
            }
            let result = Client.projects.addEnvironment(projectObj, environmentObj)
            expect(result.environment).toHaveProperty('variables')
            expect(result.environment).toHaveProperty('docker_env_file')
            expect(result.environment).toHaveProperty('metadata')
            expect(result.environment?.metadata).toEqual({'type': 'environment'})
            expect(result.environment?.metadata.type).toMatch("environment")

        })
    })

    describe('the database functions for projects', () => {
        describe('Client.projects.listProjects function', () => {
            it('should return an array of ProjectModelMessages', () => {
                let results = Client.projects.listProjects(__dirname + "/db/test_db.json")
                expect(results.length).toEqual(1)
                expect(results[0].metadata.type).toMatch("project")
                expect(results[0].environment).toBe(undefined)
            })
        })

        describe('Client.projects.saveProject function', () => {
            it('should return true when a save is complete', () => {
                let project = Client.projects.createProject("Example", "example.dev")
                let result = Client.projects.saveProject(project, __dirname + "/db/test_db_write.json")
                expect(result).toBe(true)
            })

            it('should return false when a save is not completed', () => {
                let project = Client.projects.createProject("Example", "example.dev")
                let result = Client.projects.saveProject(project, "//not/found/nofile.json")
                expect(result).toBe(false)
            })
        })
    })        
})