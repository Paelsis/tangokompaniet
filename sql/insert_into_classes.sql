USE TK;
DELETE FROM CLASSES;
INSERT INTO CLASSES(id, name, day , addressId, city, startTime, startDate, length, teachers, comment) VALUES (1,'Grundkurs 1', 'Söndag', 'ST', 'Malmö','16:00', '2017-07-17','4v 7v', 'D&A', null);
INSERT INTO CLASSES(id, name, day , addressId, city, startTime, startDate, length, teachers, comment) VALUES (2,'Grundkurs 1', 'Söndag', 'ST', 'Malmö','16:00', '2017-05-02', '7v', 'A', null);
INSERT INTO CLASSES(id, name, day , addressId, city, startTime, startDate, length, teachers, comment) VALUES (3,'Grundkurs 1', 'Måndag', 'ST', 'Malmö','20:00', '2017-06-03', '7v', 'T&N', null);
INSERT INTO CLASSES(id, name, day , addressId, city, startTime, startDate, length, teachers, comment) VALUES (4,'Grundkurs 1', 'Måndag', 'VG', 'Lund','17:30', '2017-04-06', '7v', 'A', null);
INSERT INTO CLASSES(id, name, day , addressId, city, startTime, startDate, length, teachers, comment) VALUES (5,'Grundkurs 1', 'Tisdag', 'VG', 'Lund','16:00', '2017-04-06', '4v 7v', 'S&C', null);
INSERT INTO CLASSES(id, name, day , addressId, city, startTime, startDate, length, teachers, comment) VALUES (6,'Grundkurs 1', 'Onsdag', 'ST', 'Malmö','16:00', '2017-07-17', '4v 7v', 'D&A', null);
INSERT INTO CLASSES(id, name, day , addressId, city, startTime, startDate, length, teachers, comment) VALUES (7,'Tango Tools', 'Varannan Söndag', 'ST', 'Malmö','16:00', '2017-07-17', '4v 7v', 'D&A', null);
INSERT INTO CLASSES(id, name, day , addressId, city, startTime, startDate, length, teachers, comment) VALUES (8,'Steg & Dansglädje', 'Måndag', 'VG', 'Lund','19:00', '2017-01-23', '19v', 'A', null);
INSERT INTO CLASSES(id, name, day , addressId, city, startTime, startDate, length, teachers, comment) VALUES (9,'Steg & Dansglädje', 'Torsdag', 'ST', 'Malmö','20:30', '2017-07-26', '19v', 'A', null);
INSERT INTO CLASSES(id, name, day , addressId, city, startTime, startDate, length, teachers, comment) VALUES (10,'Kram & Hållning', 'Onsdag', 'ST', 'Malmö','17:40', '2017-01-23', '19v', 'D&A', null);
INSERT INTO CLASSES(id, name, day , addressId, city, startTime, startDate, length, teachers, comment) VALUES (11,'Dynamic', 'Måndag', 'VG', 'Lund','20:00', '2017-01-23', '19v', 'D&A', null);
INSERT INTO CLASSES(id, name, day , addressId, city, startTime, startDate, length, teachers, comment) VALUES (12,'Dynamik på Djupet', 'Torsdag', 'ST', 'Malmö','19:00', '2017-01-26', '19v', 'D&A', null);
INSERT INTO CLASSES(id, name, day , addressId, city, startTime, startDate, length, teachers, comment) VALUES (13,'Följarteknik', 'Söndag', 'ST', 'Malmö','19:00', '2017-01-26', 'Always', 'D&A', null);
COMMIT;
/*
Grundkurs 1
Söndag	16:00	Malmö	4/6	4v 7v	D&A	
Söndag	16:00	Malmö	5/2		A	
Måndag	20:00	Malmö	6/3	7v	T&N	
Måndag	17:30	Lund	6/2	7v	A	
Tisdag	16:00	Lund	4/6	4v 7v	S&C	
Onsdag	16:00	Malmö	4/6	4v 7v	D&A	
Tango Tools
Varannan Söndag	16:00	Malmö	4/6	4v 7v	D&A	
Steg & Dansglädje
Måndag	19:00	Lund	23/1	19v	A	
Torsdag	20:30	Malmö	26/1	19v	A	
Kram & Hållning
Onsdag	17:40	Malmö	23/1	19v	A	
Dynamik
Måndag	20:30	Lund	23/1	19v	D&A	
Dynamik på Djupet
Torsdag	19:00	Malmö	26/1	19v	D&A	
Följarteknik
Onsdag	19:00	Malmö	26/1	Always	D&A
*/