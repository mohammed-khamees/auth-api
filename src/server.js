'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/routes.js');

const logger = require('./middleware/logger.js');

const v1Routes = require('./api/routes/v1.js');
const v2Routes = require('./api/routes/v2.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

// Routes
app.use(authRoutes);
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

app.use('/bad', (req, res) => {
	throw new Error();
});

// Catchalls
app.use('*', notFound);
app.use(errorHandler);

module.exports = {
	server: app,
	start: (port) => {
		if (!port) {
			throw new Error('Missing Port');
		}
		app.listen(port, () => console.log(`Listening on ${port}`));
	},
};
