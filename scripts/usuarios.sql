use peluqueria;

create table usuarios (
	USER_ID varchar(15) not null primary key,
	USER_PASSWORD varchar(15) not null,
	NOMBRE VARCHAR (50)
);