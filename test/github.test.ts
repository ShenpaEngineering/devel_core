import { Client } from '../src'
import { GithubClient} from '../src/types'
const fsExtra = require('fs-extra')

describe('github module functions', () => {
    it('should return a Github Client class when getClient is called', () => {
        let result = Client.github.getClient('examplekey')
        expect(result instanceof GithubClient).toBe(true)
        result = Client.github.getClient()
        expect(result instanceof GithubClient).toBe(true)
    }) 
})

describe('GithubClient class', () => {
    describe('downloadRepo method',() => {
        afterEach(()=>{
            fsExtra.emptyDirSync(__dirname + "/gitreposrc")
        })
        it('should download the repo into the specified folder', (done) => {
            fsExtra.ensureDirSync(__dirname + "/gitreposrc")
            let gitClient = Client.github.getClient('example_key')
            gitClient.events.on("downloadFinished", (stdout, stderr) => {
                expect(stderr).toMatch("")
                expect(stdout).toMatch("")
                done()
            })
            gitClient.downloadRepo("https://github.com/ShenpaEngineering/develor_node_app.git", __dirname + "/gitreposrc")           
        })
        it('should throw an error if either the folder is not found', (done) => {
            fsExtra.ensureDirSync(__dirname + "/gitreposrc")
            let gitClient = Client.github.getClient('example_key')
            gitClient.events.on("error", (error) => {
                expect(error).not.toEqual(null)
                done()
            })
            gitClient.downloadRepo("https://github.com/ShenpaEngineering/develor_node_app.git", __dirname + "/gitreposrc/foobar")           
        })
    })
    
})