use peluqueria;clientes

create table clientes (
		ID INT(5) NOT NULL AUTO_INCREMENT,
		NOMBRE VARCHAR(30),
		APELLIDO VARCHAR(30),
		EMAIL VARCHAR(50),
		TELEFONO VARCHAR(20),
		DIRECCION VARCHAR(140),
		FECHA_NACIMIENTO DATE,
		DESCRIPCION VARCHAR(140),
		PRIMARY KEY(ID)
);