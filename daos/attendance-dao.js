const connection = require('../infrastructure/connection');
const moment = require('moment');

class AttendanceDAO {
    create(attendance, res) {
        const creationDate = moment().format('YYYY-MM-DD HH:mm:ss');
        const attendanceDate = moment(attendance.attendanceDate, 'DD/MM/YYYY')
                                .format('YYYY-MM-DD HH:mm:ss');
        
        // ******** VALIDATIONS ******** //
        const isDateValid = moment(attendanceDate).isSameOrAfter(creationDate);
        const isClientValid = attendance.client.length >= 5;
        
        const validations = [
            { 
                name: 'attendanceDate',
                valid: isDateValid,
                message: 'Attendance date must be equal or higher than actual date'
            },
            {
                name: 'client',
                valid: isClientValid,
                message: 'Client name must have 5 or more characters'
            }
        ];

        const validationsErrors = validations.filter(field => !field.valid);
        const hasErrors = validationsErrors.length;
        // ******** VALIDATIONS END ******** //

        if(hasErrors) {
            res.status(400).json(validationsErrors);
        } else {
            const datedAttendance = {...attendance, creationDate, attendanceDate};

            const sql = 'insert into attendances set ?';

            connection.query(sql, datedAttendance, (error, results) => {
                if(error)
                    res.status(400).json(error); // bad request
                else
                    res.status(201).json(attendance); // created
            });
        }
    }

    read(res) {
        const sql = "select * from attendances";

        connection.query(sql, (error, results) => {
            if(error) 
                res.status(400).json();
            else
                res.status(200).json(results);
        });
    }

    update(id, values, res) {
        if(values.attendanceDate) {
            values.attendanceDate = moment(values.attendanceDate, 'DD/MM/YYYY')
                                        .format('YYYY-MM-DD HH:mm:ss');
        }

        const sql = `update attendances set ? where id = ?`;

        connection.query(sql, [values, id], (error, results) => {
            if(error)
                res.status(400).json(error);
            else
                res.status(500).json({ ...values, id });
        });
    }

    delete(id, res) {
        const sql = `delete from attendances where id = ?`;

        connection.query(sql, id, (error, results) => {
            if(error)
                res.status(400).json(error);
            else
                res.status(200).json({id});
        });
    }

    search(id, res) {
        const sql = `select * from attendances where id = ${id}`;

        connection.query(sql, id, (error, results) => {
            const attendance = results[0];

            if(error)
                res.status(400).json(error);
            else
                res.status(200).json(attendance);
        });
    }
}

module.exports = new AttendanceDAO;