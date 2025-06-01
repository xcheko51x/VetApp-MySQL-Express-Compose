create database db_sys_vet;

create table propietarios(
    id_propietario int primary key,
    nombre varchar(100) not null,
    telefono varchar(15) null,
    email varchar(50) null
);

create table mascotas(
    id_mascota int primary key,
    nombre varchar(50) not null,
    especie varchar(50) null,
    sexo enum('m','h'),
    id_propietario int not null
);

create table veterinarios(
    usuario varchar(50) primary key,
    contrasena varchar(10) not null,
    nombre varchar(100) not null
);

create table expedientes(
    id_expediente int primary key,
    id_mascota int not null,
    id_propietario int not null,
    usuario_veterinario varchar(50) not null,
    fecha_atencion date not null,
    padecimiento text,
    tratamiento text,
    observaciones text
);

INSERT INTO veterinarios (usuario, contrasena, nombre) VALUES
('jlopez', '1234', 'Juan López'),
('mgarcia', '1234', 'María García'),
('rcastro', '1234', 'Ricardo Castro'),
('afernandez', '1234', 'Ana Fernández'),
('lmorales', '1234', 'Luis Morales');


INSERT INTO propietarios (id_propietario, nombre, telefono, email) VALUES
(1, 'Carlos Ramírez', '5551234567', 'carlos.ramirez@example.com'),
(2, 'Laura Mendoza', '5559876543', 'laura.mendoza@example.com'),
(3, 'Pedro Torres', NULL, 'pedro.torres@example.com'),
(4, 'Ana Beltrán', '5552223344', NULL),
(5, 'Sofía Herrera', NULL, NULL);

INSERT INTO mascotas (id_mascota, nombre, especie, sexo, id_propietario) VALUES
(1, 'Firulais', 'Perro', 'm', 1),
(2, 'Michi', 'Gato', 'h', 2),
(3, 'Max', 'Perro', 'm', 3);

INSERT INTO expedientes (
    id_expediente,
    id_mascota,
    id_propietario,
    usuario_veterinario,
    fecha_atencion,
    padecimiento,
    tratamiento,
    observaciones
) VALUES
(1, 1, 1, 'jlopez', '2025-05-20', 'Fiebre y letargo', 'Antibióticos por 5 días', 'Control en una semana'),
(2, 2, 2, 'lmorales', '2025-05-22', 'Herida en pata derecha', 'Curación y vendaje', 'Revisar en 3 días'),
(3, 3, 3, 'jlopez', '2025-05-25', 'Pérdida de apetito', 'Vitaminas y dieta especial', 'Monitorear por 1 semana');
