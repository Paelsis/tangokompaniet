USE TK;
DELETE FROM TK_TEXT;
INSERT INTO TK_TEXT(NAME, DESCRIPTION) VALUES ('Zero', '<H1>First Text ...</H1>');
INSERT INTO TK_TEXT(NAME, DESCRIPTION) VALUES ('One', '<H2>Second Text ...</H2>');
INSERT INTO TK_TEXT(NAME, DESCRIPTION) VALUES ('Two', '<H3>Third Text...</H3>');
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
*/my