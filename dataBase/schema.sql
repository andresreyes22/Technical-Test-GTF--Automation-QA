-- PostgreSQL 15

DROP TABLE IF EXISTS Visitan;
DROP TABLE IF EXISTS Disponibilidad;
DROP TABLE IF EXISTS Inscripcion;
DROP TABLE IF EXISTS Producto;
DROP TABLE IF EXISTS Sucursal;
DROP TABLE IF EXISTS Cliente;

CREATE TABLE Cliente (
  id INT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  ciudad VARCHAR(100) NOT NULL
);

CREATE TABLE Sucursal (
  id INT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  ciudad VARCHAR(100) NOT NULL
);

CREATE TABLE Producto (
  id INT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  tipoProducto VARCHAR(80) NOT NULL
);

CREATE TABLE Inscripcion (
  idProducto INT NOT NULL REFERENCES Producto(id),
  idCliente INT NOT NULL REFERENCES Cliente(id),
  PRIMARY KEY (idProducto, idCliente)
);

CREATE TABLE Disponibilidad (
  idSucursal INT NOT NULL REFERENCES Sucursal(id),
  idProducto INT NOT NULL REFERENCES Producto(id),
  PRIMARY KEY (idSucursal, idProducto)
);

CREATE TABLE Visitan (
  idSucursal INT NOT NULL REFERENCES Sucursal(id),
  idCliente INT NOT NULL REFERENCES Cliente(id),
  fechaVisita DATE NOT NULL,
  PRIMARY KEY (idSucursal, idCliente, fechaVisita)
);
