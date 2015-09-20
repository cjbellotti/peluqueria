use peluqueria;

create table PROFESIONAL_TRABAJO (
	ID_PROFESIONAL INT(5) NOT NULL,
	ID_TRABAJO INT(5) NOT NULL,
	FOREIGN KEY(ID_PROFESIONAL) REFERENCES PROFESIONALES(id) ON DELETE CASCADE,
	FOREIGN KEY(ID_TRABAJO) REFERENCES TRABAJOS(id) ON DELETE CASCADE
);