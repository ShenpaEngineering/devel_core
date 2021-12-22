import { Client } from "../src";

describe('database resouce functions', () => {
    describe('getDatabases function', () => {
        it('should return a list of databases', () => {
            let result = Client.db.getDatabases(__dirname + "/db/test_db.json")
            expect(result.length).toEqual(1)
            expect(result[0].metadata.type).toMatch('database')
        })
    })
})