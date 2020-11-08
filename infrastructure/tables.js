class Tables {
    init(connection) {
        this.connection = connection
        console.log('Calling tables on database');
        this.createAttendances();
    }

    createAttendances() {
        const sql = `create table if not exists attendances(
                        id int NOT NULL AUTO_INCREMENT,
                        client varchar(50) NOT NULL,
                        pet varchar(20),
                        service varchar(20) NOT NULL,
                        attendanceDate datetime NOT NULL,
                        creationDate datetime NOT NULL,
                        status varchar(20) NOT NULL,
                        observations text,
                        PRIMARY KEY(id)
                    )`;

        this.connection.query(sql , (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);
            }
        })
    }
}

module.exports = new Tables;