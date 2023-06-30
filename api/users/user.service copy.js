const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into registration(name, email, phone, password,verification_code,is_verified,is_active,token_code) 
                values(?,?,?,?,?,?,?,?)`,
      [
        data.name,
        data.email,
        data.phone,
        data.password,
        data.verification_code,
        data.is_verified,
        data.is_active,
        data.token_code,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `select * from registration where email = ? And is_verified='1'`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  userOtpcheck: (email, otp, callBack) => {
    pool.query(
      `select * from registration where email = ? AND verification_code = ? `,
      [email, otp],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  verificationStatusUpdate: (email, callBack) => {
    pool.query(
      `update registration set is_verified='1'  where email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  otpUpdateforforgotpwd:(data, callBack) =>{
      pool.query(
        `update registration set verification_code = ?  where email = ?`,
        [data.verification_code,data.email],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
  },

  resetPasswordForUser:(data, callBack)  =>{
      pool.query(
        `update registration set password = ?  where email = ?`,
        [data.password, data.email],
        (error, results, fields) => {
          if (error) {
            callBack(error);
          }
          return callBack(null, results[0]);
        }
      );
  },
  

  

  //   getUserByUserId: (id, callBack) => {
  //     pool.query(
  //       `select id,firstName,lastName,gender,email,number from registration where id = ?`,
  //       [id],
  //       (error, results, fields) => {
  //         if (error) {
  //           callBack(error);
  //         }
  //         return callBack(null, results[0]);
  //       }
  //     );
  //   },

  //   getUsers: (callBack) => {
  //     pool.query(
  //       `select id,firstName,lastName,gender,email,number from registration`,
  //       [],
  //       (error, results, fields) => {
  //         if (error) {
  //           callBack(error);
  //         }
  //         return callBack(null, results);
  //       }
  //     );
  //   },

  //   updateUser: (data, callBack) => {
  //     pool.query(
  //       `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id = ?`,
  //       [
  //         data.first_name,
  //         data.last_name,
  //         data.gender,
  //         data.email,
  //         data.password,
  //         data.number,
  //         data.id,
  //       ],
  //       (error, results, fields) => {
  //         if (error) {
  //           callBack(error);
  //         }
  //         return callBack(null, results[0]);
  //       }
  //     );
  //   },

 
};
