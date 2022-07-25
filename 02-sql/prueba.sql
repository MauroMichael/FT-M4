
// ej3: 
    SELECT * FROM actors where last_name like '%stack%'

// ej4
SELECT first_name as 'Nombre', last_name as 'Apellido', COUNT(last_name) AS 'Cantidad' FROM actors GROUP BY first_name, last_name ORDER BY COUNT(last_name) DESC LIMIT 10;

// ej5
SELECT actors.first_name as 'Nombre', actors.last_name as 'Apellido', count(roles.movie_id) as 'Peliculas',  count (roles.role) as 'roles' FROM actors INNER JOIN roles ON roles.actor_id = actors.id GROUP BY actors.id ORDER BY count (roles.role) DESC LIMIT 100;

columnas, tablas,agrupacion, orden, Varios

SELECT actor_id as 'actor', 
COUNT(role) AS 'Cant_roles' FROM roles 
GROUP BY actor_id ORDER BY COUNT(actor_id) DESC LIMIT 100;

select movies.name as 'nombre de pelicula', roles.role as 'role' from movies inner join roles on roles.movie_id = movies.id where roles.actor_id = 335657;








SELECT nombre, apellido, COUNT(nombre) as "count_personas" FROM personas GROUP BY nombre, apellido ORDER BY nombre, apellido;

SELECT first_name as 'Nombre', last_name as 'Apellido', 
COUNT(first_name) AS 'Cant_Nombre', COUNT(last_name) AS 'Cant_Apellido' FROM actors 
GROUP BY last_name ORDER BY COUNT(last_name) DESC LIMIT 10;

select first_name, last_name FROM actors WHERE  last_name = 'MacDonald' GROUP BY first_name, last_name LIMIT 30 ;

SELECT first_name as 'Nombre', 
COUNT(first_name) AS 'Cant_Nombre' FROM actors 
GROUP BY first_name 
UNION
SELECT last_name as 'Apellido',
COUNT(last_name) AS 'Cant_Apellido' FROM actors 
GROUP BY last_name ORDER BY COUNT(last_name) DESC LIMIT 10;

SELECT Orders.OrderID, Customers.CustomerName, delivey.id
FROM Orders
INNER JOIN Customers ON Orders.CustomerID=Customers.CustomerID;
INNER JOIN delivey ON delivey.ID=Customers.CustomerID;