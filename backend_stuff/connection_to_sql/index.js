
const { faker } = require('@faker-js/faker');
const mysql = require("mysql2");

const connection= mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"ocs_app",
    password:"12345"

});

q="INSERT INTO temp (id, username, email, password) VALUES (?,?,?,? )";
let user=["123","atuldemond","atuldemond@gmail.com","radha1234"]

try{

    connection.query(q ,user,(err,result)=>{

        if(err)throw err;
        console.log(result)

    })

}catch(err){
    console.log(err)
}

  

connection.end();



// let data = ()=>{
//     return {
//       userId: faker.string.uuid(),
//       username: faker.internet.userName(),
//       email: faker.internet.email(),
//       avatar: faker.image.avatar(),
//       password: faker.internet.password(),
//       birthdate: faker.date.birthdate(),
//       registeredAt: faker.date.past(),
//     };
//   }
