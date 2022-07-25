
-- //imbd_test.sqlite.db//
CREATE TABLE MOVIES
(
    id type INTEGER primary key,
    Name type TEXT default value NULL,
    Year type INTEGER default value NULL,
    Rank type REAL default value NULL
)

CREATE TABLE ACTORS
(
    id type INTEGER primary key,
    First_Name type TEXT default value NULL,
    Last_Name type TEXT default value NULL,
    Gender type TEXT default value NULL
)

CREATE TABLE ROLES
(
    Actor_id type INTEGER,
    Movie_id type INTEGER,
    Role_Name type TEXT default value NULL
);

-- imdb-large.sqlite3.db
1_
SELECT *
FROM MOVIES
WHERE year = 1974;

2_
SELECT COUNT(*) AS total FROM MOVIES
WHERE year = 1982;

3_
SELECT *
FROM ACTORS
WHERE last_name LIKE '%stack%';

4_
SELECT first_name, last_name,
COUNT(*) AS Total
FROM actors
GROUP BY LOWER(first_name), LOWER(last_name)
ORDER BY Total DESC
LIMIT 10;

5_
SELECT a.first_name, a.last_name, 
COUNT(*) AS Total
FROM actors AS a
JOIN roles AS r
ON a.id = r.actor_id
GROUP BY a.id
ORDER BY Total DESC
LIMIT 100;

6_
SELECT genre, 
COUNT(*) as Total
FROM movies_genres
GROUP BY genre
ORDER BY Total ASC;

7_
SELECT first_name AS Nombre, last_name AS Apellido
FROM actors
JOIN roles as r
ON actors.id = r.actor_id
JOIN movies as m
ON r.movie_id = m.id
WHERE m.name = 'Braveheart' AND m.year = 1995
ORDER BY first_name, last_name;

8_
SELECT d.first_name, d.last_name, m.name, m.year 
FROM directors as d
JOIN movies_directors as md 
ON d.id = md.director_id
JOIN movies as m 
ON m.id = md.movie_id
JOIN movies_genres as mg 
ON m.id = mg.movie_id
WHERE mg.genre = 'Film-Noir' AND m.year % 4 = 0
ORDER BY m.name;

9_
SELECT a.first_name, a.last_name
FROM actors as a 
JOIN roles as r ON r.actor_id = a.id
JOIN movies as m ON m.id = r.movie_id
JOIN movies_genres as mg ON mg.movie_id = m.id
WHERE mg.genre = 'Drama' AND m.id IN (
	SELECT r.movie_id
	FROM roles as r
	JOIN actors as a ON r.actor_id = a.id
	WHERE first_name = 'Kevin' AND last_name = 'Bacon'
	)
AND (a.first_name || ' ' || a.last_name != 'Kevin Bacon');

10_
SELECT *
FROM actors
WHERE id IN (
	SELECT r.actor_id
	FROM roles AS r
	JOIN movies AS m ON r.movie_id = m.id
	WHERE m.year < 1900
	)
AND id IN (
	SELECT r.actor_id
	FROM roles AS r
	JOIN movies AS m ON r.movie_id = m.id
	WHERE m.year > 2000
	);

11_
SELECT a.first_name, a.last_name, 
COUNT(DISTINCT(role)) AS Total
FROM actors AS a
JOIN roles AS r ON a.id = r.actor_id
JOIN movies AS m ON m.id = r.movie_id
WHERE m.year > 1990
GROUP BY r.movie_id, r.actor_id
HAVING Total > 5;

12_
SELECT year, 
COUNT(DISTINCT id)
FROM movies
WHERE id NOT IN(
	SELECT r.movie_id
	FROM roles AS r
	JOIN actors AS a ON r.actor_id = a.id
	WHERE a.gender = 'M'
	)
GROUP BY year;


