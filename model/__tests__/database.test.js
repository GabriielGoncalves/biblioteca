const {connectDataBase, client} = require('../database')

describe('database functions', () => {
    it('when database connected data should be: Connected successfully to server', async() => {
        const data = await connectDataBase();
        expect(data).toBe('Connected successfully to server');
        client.close()
    });
})
