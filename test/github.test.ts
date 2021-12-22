import { Client } from '../src'
import { GithubClient} from '../src/types'

describe('github module functions', () => {
    it('should return a Github Client class when getClient is called', () => {
        let result = Client.github.getClient('examplekey')
        expect(result instanceof GithubClient).toBe(true)
    })
})