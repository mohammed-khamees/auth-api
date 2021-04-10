'use strict';

require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const { server } = require('./../src/server');
const request = supergoose(server);

describe('Server Test', () => {
	it('handle server errors', async () => {
		const response = await request.get('/bad');
		expect(response.status).toEqual(500);
	});
	it('handle invalid routes', async () => {
		const response = await request.get('/foo');
		expect(response.status).toEqual(404);
	});
});
