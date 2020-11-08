const customExpress = require('./config/custom-express');
const connection = require('./infrastructure/connection');
const Tables = require("./infrastructure/tables");

connection.connect(error => {
	if(error) {
		console.log(error);
	} else {
		console.log('Successfully connected to the database');
		Tables.init(connection);

		const app = customExpress();
		app.listen(3000, () => {
			console.log('Server running on port 3000');
		});
	}
});
