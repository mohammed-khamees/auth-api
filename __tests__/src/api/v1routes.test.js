'use strict';

require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const { server } = require('../../../src/server.js');
const request = supergoose(server);
let id;

describe('V1 Api', () => {
	it('GET /food ', async () => {
		const response = await request.get('/api/v1/food');
		expect(response.status).toEqual(200);
		expect(response.body).toEqual([]);
	});
	it('POST /food', async () => {
		const response = await request.post('/api/v1/food').send({
			name: 'pizza',
			calories: '25',
			type: 'VEGETABLE',
		});
		expect(response.status).toEqual(201);
		expect(response.body.name).toEqual('pizza');
		id = response.body._id;
	});
	it('GET /food/:id', async () => {
		const response = await request.get(`/api/v1/food/${id}`);
		expect(response.status).toEqual(200);
		expect(response.body.name).toEqual('pizza');
	});
	it('GET /food', async () => {
		const response = await request.get('/api/v1/food');
		expect(response.status).toEqual(200);
	});
	it('PUT /food', async () => {
		const response = await request.put(`/api/v1/food/${id}`).send({
			name: 'pizza',
			calories: '25',
			type: 'PROTIEN',
		});
		expect(response.status).toEqual(200);
		expect(response.body.type).toEqual('PROTIEN');
	});
	it('DELETE /food', async () => {
		const response = await request.delete(`/api/v1/food/${id}`);
		expect(response.status).toEqual(200);
	});
	it('invalid model', async () => {
		const response = await request.get('/api/v1/anyModels');
		expect(response.status).toEqual(500);
	});
});
