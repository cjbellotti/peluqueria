use peluqueria;

create table TURNOS (
		ID INT(7) NOT NULL AUTO_INCREMENT PRIMARY KEY,
		FECHA DATE NOT NULL,
		HORA_INI TIME NOT NULL,
		HORA_FIN TIME NOT NULL,
		ID_CLIENTE INT(5),
		ID_PROFESIONAL INT(5),
		DESCRIPCION VARCHAR (140),
		IMPORTE DECIMAL(9,2),
		PAGO DECIMAL(9,2),
		FOREIGN KEY (ID_CLIENTE) REFERENCES CLIENTES(ID) ON DELETE SET NULL,
		FOREIGN KEY (ID_PROFESIONAL) REFERENCES PROFESIONALES(ID) ON DELETE SET NULL
);