const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'actvanzarecom.ipagemysql.com',
    user: 'alberto_bautista',
    password: 'a0712930',
    database: 'club_valle_real_website'
});


let userModel = {};

userModel.getUsers = (callback) => {
    if (connection) {
        connection.query('SELECT * FROM users', (error, result) => {
            if (error) {
                throw error
            } else {
                callback(null, result)
            }
        });
    }
}

userModel.insertUser = (userData, callback) => {
    if (connection) {
        connection.query('INSERT INTO users SET?', userData, (error, result) => {
            if (error) {
                throw error
            } else {
                callback(null, {
                    'InsertID': result.insertId
                })
            }
        })
    }
}

userModel.updateUser = (userData, callback) => {
    if (connection) {
        const sql = `UPDATE users SET 
        name = ${connection.escape(userData.name)},
        lastname = ${connection.escape(userData.lastname)}
        WHERE iduser = ${connection.escape(userData.iduser)}
        `;

        connection.query(sql, (error, result) => {
            if (error) {
                throw error
            } else {
                callback(null, {
                    "message": "succes"
                })
            }
        })
    }
}

userModel.deleteuser = (userToDelete, callback) => {
    if (connection) {
        let sql = `SELECT * FROM users WHERE iduser=${userToDelete}`;
        connection.query(sql, (error, row) => {
            console.log('object');
            console.log(row);
            if (row.length > 0) {
                let sql = `DELETE FROM users WHERE iduser=${userToDelete}`;
                connection.query(sql, (error, result) => {
                    if (error) {
                        throw error
                    } else {
                        callback(null, {
                            "message": "Eliminado correctamente",
                            code:'deleted'
                        })
                    }
                })
            }else{
                callback(null,{
                    'message':'No existe el usuario',
                    code:'notexists'
                })
            }
        })
    }
}
    module.exports = userModel;