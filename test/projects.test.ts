import { Client } from '../src'




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
})