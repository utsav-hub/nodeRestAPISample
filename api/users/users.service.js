const pool = require("../../config/database");

module.exports = {
    create: (data,callback) => {
        pool.query(
            `insert into auth_user(password,is_superuser,
                username,first_name,last_name,email,is_staff,is_active) values
                (?,?,?,?,?,?,?,?)`,
                [
                    data.password,
                    data.is_superuser,
                    data.username,
                    data.first_name,
                    data.last_name,
                    data.email,
                    data.is_staff,
                    data.is_active
                ],
                (error, results, fields) => {
                    if(error){
                        return callback(error);
                    }
                    return callback(null,results)
                }
        );
    },
    getusers: callback => {
        pool.query (
            `select id,first_name,last_name,username,email from auth_user`,
            [],
            (error,results,fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null,results);
            }
        );
    },
    getuserbyId : (id,callback) =>{
        pool.query(
            `select id,first_name,last_name,username,email from auth_user where id = ?`,
            [id],
            (error,results,fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null,results[0]);
            }
        );
    },
    updateuser: (data, callBack) => {
        pool.query(
          `update auth_user set first_name=?, last_name=?, username=?, email=?, password=? where id = ?`,
          [
            data.first_name,
            data.last_name,
            data.username,
            data.email,
            data.password,
            data.id
          ],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      deleteuser: (data, callBack) => {
        pool.query(
          `delete from auth_user where id = ?`,
          [data.id],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      getuserbyemail: (email, callback) => {
          pool.query(
            `Select * from auth_user where email = ?`,
            [email],
            (error,results,fields) => {
                if(error){
                    return callback(error);
                }
                return callback(null,results[0]);
            } 
          );
      },
};