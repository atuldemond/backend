CREATE TABLE user{
    id  VARCHAR(50) PRIMARY KEY,
    USERNAME VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL

}