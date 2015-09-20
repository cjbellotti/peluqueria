use peluqueria;

create table USUARIOS (
	USER_ID varchar(15) not null primary key,
	USER_PASSWORD varchar(15) not null,
	NOMBRE VARCHAR (50)
);

insert into USUARIOS (USER_ID, USER_PASSWORD, NOMBRE) VALUES ('rbalcaza', 'biologia', 'Rodrigo');