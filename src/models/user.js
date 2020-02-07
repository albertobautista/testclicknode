const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'curso_node'
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