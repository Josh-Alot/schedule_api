const AttendanceDAO = require('../daos/attendance-dao');

module.exports = app => {
	// create
	app.post('/attendances', (req, res) => {
		const attendance = req.body;
		console.log(attendance);

		AttendanceDAO.create(attendance, res);
		console.log('Attendance succesfully created');
	});

	// read
	app.get('/attendances', (req, res) => {
		AttendanceDAO.read(res);
	});

	// update
	app.patch('/attendances/:id', (req, res) => {
		const id = parseInt(req.params.id);
		const values = req.body;

		AttendanceDAO.update(id, values, res);
	});

	// delete
	app.delete('/attendances/:id', (req, res) => {
		const id = parseInt(req.params.id);

		AttendanceDAO.delete(id, res);
	});

	// search
	app.get('/attendances/:id', (req, res) => {
		const id = parseInt(req.params.id);
		AttendanceDAO.search(id, res);
	});
};