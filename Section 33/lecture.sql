-- PRIMARY TABLE --
CREATE TABLE student (
	id SERIAL PRIMARY KEY,
	first_name TEXT,
	last_name TEXT
);

-- SECONDARY TABLE EXTENDING THE PRIMARY TABLE --
CREATE TABLE contact_detail (
	id INTEGER REFERENCES student(id) UNIQUE,
	tel TEXT,
	address TEXT
);

-- POPULATE THE TABLE WITH DATA --
INSERT INTO student (first_name, last_name)
VALUES ('Angela', 'Yu');
INSERT INTO contact_detail (id, tel, address)
VALUES (1, '+123456789', '123 App Brewery Road');

-- HOW DO WE USE ONE TO ONE RELATIONSHIP --
-- INNER JOIN --
SELECT *
FROM student
JOIN contact_detail
ON student.id = contact_detail.id

-- MANY TO ONE RELATIONSHIP --
CREATE TABLE homework_submission (
	id SERIAL PRIMARY KEY,
	mark INTEGER,
	student_id INTEGER REFERENCES student(id)
);


-- POPULATE HOMEWORK SUBMISSION TABLE --
INSERT INTO homework_submission (mark, student_id)
VALUES (98, 1), (87, 1), (88, 1);

-- JOIN THE STUDENT AND HOMEWORK_SUBMISSION TABLE --
SELECT *
FROM student
JOIN homework_submission
ON student.id = homework_submission.student_id;

-- SELECT PARTICULAR COLUMNS TO BE DISPLAYED IN THE RESULT --
SELECT student_id, first_name, last_name, mark
FROM student
JOIN homework_submission
ON student.id = student_id
GROUP BY student_id, first_name, last_name, mark;

-- MANY TO MANY RELATIONSHIPS --
CREATE TABLE class (
	id SERIAL PRIMARY KEY,
	title VARCHAR(45)
);

CREATE TABLE enrollment (
	student_id INTEGER REFERENCES student(id),
	class_id INTEGER REFERENCES class(id),
	PRIMARY KEY (student_id, class_id)
);

-- POPULATE BOTH NEWLY CREATED TABLES --
INSERT INTO student (first_name, last_name)
VALUES ('Jack', 'Bauer');

INSERT INTO class (title)
VALUES ('English Literature'), ('Maths'), ('Physics');

INSERT INTO enrollment (student_id, class_id ) VALUES (1, 1), (1, 2);
INSERT INTO enrollment (student_id ,class_id) VALUES (2, 2), (2, 3);

-- JOIN BOTH TABLES WITH STUDENT TABLE FOR MANY TO MANY--
-- AS FOR ALIASES IS OPTIONAL TO A SPACE --
SELECT student_id stud, first_name, last_name, title AS subject
FROM enrollment e
JOIN student s ON s.id = e.student_id
JOIN class c ON c.id = e.class_id;