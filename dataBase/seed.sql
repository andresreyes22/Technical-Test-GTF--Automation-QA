-- PostgreSQL 15

INSERT INTO Cliente (id, nombre, apellidos, ciudad) VALUES
(1, 'Juan', 'Perez', 'Bogotá'),
(2, 'Ana', 'Gomez', 'Medellín'),
(3, 'Luis', 'Ramirez', 'Cali'),
(4, 'Marta', 'Lopez', 'Bogotá'),
(5, 'Carlos', 'Diaz', 'Medellín'),
(6, 'Paula', 'Torres', 'Barranquilla'),
(7, 'Jorge', 'Santos', 'Bogotá'),
(8, 'Laura', 'Rios', 'Cali'),
(9, 'Andres', 'Reyes', 'Medellín'),
(10, 'Sofia', 'Martinez', 'Bucaramanga');

INSERT INTO Sucursal (id, nombre, ciudad) VALUES
(1, 'Sucursal Norte', 'Bogotá'),
(2, 'Sucursal Centro', 'Medellín'),
(3, 'Sucursal Sur', 'Cali'),
(4, 'Sucursal Este', 'Bogotá'),
(5, 'Sucursal Oeste', 'Medellín');

INSERT INTO Producto (id, nombre, tipoProducto) VALUES
(1, 'Membresía Gold', 'Membresía'),
(2, 'Membresía Silver', 'Membresía'),
(3, 'Yoga Funcional', 'Clase'),
(4, 'Pilates', 'Clase'),
(5, 'Masaje Relajante', 'Servicio'),
(6, 'Spa Premium', 'Servicio'),
(7, 'Crossfit', 'Clase'),
(8, 'Nutrición', 'Servicio'),
(9, 'Zumba', 'Clase'),
(10, 'Membresía Corporativa', 'Membresía');

INSERT INTO Inscripcion (idProducto, idCliente) VALUES
(1, 1), (3, 1), (5, 1),
(2, 2), (4, 2), (6, 2),
(1, 3), (7, 3),
(2, 4), (3, 4), (8, 4), (9, 4),
(10, 5), (6, 5),
(5, 6), (8, 6), (9, 6),
(1, 7), (2, 7), (3, 7), (4, 7),
(7, 8),
(6, 9), (8, 9), (10, 9),
(2, 10), (9, 10);

INSERT INTO Disponibilidad (idSucursal, idProducto) VALUES
(1, 1), (1, 2), (1, 3), (1, 5), (1, 7),
(2, 1), (2, 3), (2, 4), (2, 6), (2, 8), (2, 9),
(3, 2), (3, 4), (3, 5), (3, 9),
(4, 1), (4, 6), (4, 7), (4, 10),
(5, 3), (5, 4), (5, 6), (5, 8), (5, 10);

INSERT INTO Visitan (idSucursal, idCliente, fechaVisita) VALUES
(1, 1, CURRENT_DATE - INTERVAL '5 days'),
(1, 2, CURRENT_DATE - INTERVAL '15 days'),
(2, 2, CURRENT_DATE - INTERVAL '2 days'),
(2, 3, CURRENT_DATE - INTERVAL '35 days'),
(3, 4, CURRENT_DATE - INTERVAL '8 days'),
(1, 5, CURRENT_DATE - INTERVAL '20 days'),
(4, 6, CURRENT_DATE - INTERVAL '1 days'),
(5, 7, CURRENT_DATE - INTERVAL '40 days'),
(2, 8, CURRENT_DATE - INTERVAL '12 days'),
(1, 9, CURRENT_DATE - INTERVAL '3 days'),
(3, 10, CURRENT_DATE - INTERVAL '18 days'),
(5, 2, CURRENT_DATE - INTERVAL '7 days'),
(4, 1, CURRENT_DATE - INTERVAL '22 days');
