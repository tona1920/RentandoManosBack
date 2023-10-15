USE rentandomanos ;

CREATE TABLE users(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(180) NOT NULL UNIQUE,
    name VARCHAR(90) NOT NULL,
    lastname VARCHAR(90) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    image VARCHAR(255) NULL,
    password VARCHAR(90) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL
);

--En caso de no poder conectarse a MYSQL ejecutar este comando
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345';