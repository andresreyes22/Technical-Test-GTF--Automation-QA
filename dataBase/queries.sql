-- PostgreSQL 15

-- Query 1:
-- Listar nombre completo de clientes que han visitado "Sucursal Norte" en el último mes.
SELECT
  CONCAT(c.nombre, ' ', c.apellidos) AS nombre_completo
FROM Cliente c
INNER JOIN Visitan v ON v.idCliente = c.id
INNER JOIN Sucursal s ON s.id = v.idSucursal
WHERE s.nombre = 'Sucursal Norte'
  AND v.fechaVisita >= CURRENT_DATE - INTERVAL '1 month'
ORDER BY nombre_completo;

-- Query 2:
-- Mostrar cuántos clientes distintos han visitado cada sucursal, ordenado por cantidad de visitas descendente.
SELECT
    s.id,
    s.nombre,
    COUNT(DISTINCT v.idCliente) AS clientes_distintos,
    COUNT(v.idCliente)          AS total_visitas
FROM Sucursal s
         LEFT JOIN Visitan v ON v.idSucursal = s.id
GROUP BY s.id, s.nombre
ORDER BY total_visitas DESC, s.nombre ASC;

-- Query 3:
-- Productos disponibles en Medellín pero NO en Bogotá.
SELECT p.id, p.nombre, p.tipoProducto
FROM Producto p
INNER JOIN Disponibilidad d_med ON d_med.idProducto = p.id
INNER JOIN Sucursal s_med ON s_med.id = d_med.idSucursal
WHERE s_med.ciudad = 'Medellín'
  AND NOT EXISTS (
    SELECT 1
    FROM Disponibilidad d_bog
    INNER JOIN Sucursal s_bog ON s_bog.id = d_bog.idSucursal
    WHERE d_bog.idProducto = p.id
      AND s_bog.ciudad = 'Bogotá'
  )
ORDER BY p.nombre;

-- Query 4:
-- Clientes inscritos en más de 2 productos.
SELECT
  c.nombre,
  c.apellidos,
  COUNT(i.idProducto) AS cantidad_productos
FROM Cliente c
INNER JOIN Inscripcion i ON i.idCliente = c.id
GROUP BY c.id, c.nombre, c.apellidos
HAVING COUNT(i.idProducto) > 2
ORDER BY cantidad_productos DESC, c.apellidos, c.nombre;

-- Query 5:
-- Última visita por cliente y sucursal. Si no tiene, mostrar "Sin visitas".
SELECT
  c.id AS id_cliente,
  c.nombre,
  c.apellidos,
  COALESCE(TO_CHAR(ult.fechaVisita, 'YYYY-MM-DD'), 'Sin visitas') AS ultima_visita,
  COALESCE(s.nombre, 'Sin visitas') AS sucursal_ultima_visita
FROM Cliente c
LEFT JOIN LATERAL (
  SELECT v.idSucursal, v.fechaVisita
  FROM Visitan v
  WHERE v.idCliente = c.id
  ORDER BY v.fechaVisita DESC
  LIMIT 1
) ult ON TRUE
LEFT JOIN Sucursal s ON s.id = ult.idSucursal
ORDER BY c.id;
