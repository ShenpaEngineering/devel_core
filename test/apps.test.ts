import { Client } from "../src";

describe('application resouce functions', () => {
    describe('getApps function', () => {
        it('should return a list of apps', () => {
            let result = Client.apps.getApps(__dirname + "/db/test_db.json")
            expect(result.length).toEqual(1)
            expect(result[0].metadata.type).toMatch('application')
        })
    })
})