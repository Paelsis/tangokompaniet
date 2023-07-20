USE TK;
DELETE FROM EVENTS;
INSERT INTO EVENTS(eventName, start, end, location, price, description) 
    VALUES ('Festivalito', '2017-10-28 19:40:00','2017-10-31 23:59:00', 'Barnens Scen', '1200 SEK/130 EUR/140 USD', 'Text om festivalito ...');
INSERT INTO EVENTS(eventName, start, end, location, price, description) 
    VALUES ('Vintermaraton', '2018-01-01 19:00:00','2018-05-01 23:59:59', 'Bunkern', '1500 SEK/130 EUR/140 USD', 'Text om Vintermaraton ...');
INSERT INTO EVENTS(eventName, start, end, location, price, description) 
    VALUES ('Påskfestival', '2017-10-28 17:00:00','2017-10-31 23:59:59', 'Casinot', '1200 SEK/130 EUR/140 USD', 'Text om Påskfestivalen bla bla bla ...');
INSERT INTO EVENTS(eventName, start, end, location, price, description) 
VALUES ('Summer', '2018-01-01 12:00:00','2018-12-31 13:00:00', 'Bunkern', '1200 SEK/130 EUR/140 USD', 'Text om Sommar ...');

DELETE FROM EVENT_ACTIVITIES;

INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Festivalito', 'Steg och Glädje', '2018-06-06 15:15','2018-06-06 17:30', 'Tangopalatset', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');
INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Festivalito', 'Steg och Sorg', '2018-06-06 15:15','2018-06-06 17:30', 'Barnens Scen', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');
INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Festivalito', 'Hopp och Förtvivlan', '2018-06-06 15:15','2018-06-06 17:30', 'Bunkern', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');
INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Festivalito', 'Dans baklänges', '2018-06-06 15:15','2018-06-06 17:30', 'Casinot', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');
INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Festivalito', 'Cykla med TK', '2018-06-06 15:15','2018-06-06 17:30', 'VG-s i Lund', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');

INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Easter', 'Steg och Glädje', '2018-04-06 16:00','2018-04-09 23:30', 'Tangopalatset', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');
INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Easter', 'Steg och Sorg', '2018-06-06 15:15','2018-06-06 17:30', 'Barnens Scen', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');
INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Easter', 'Hopp och Förtvivlan', '2018-06-06 15:15','2018-06-06 17:30', 'Bunkern', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');
INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Easter', 'Dans baklänges', '2018-06-06 15:15','2018-06-06 17:30', 'Casinot', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');
INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Easter', 'Cykla med TK', '2018-06-06 15:15','2018-06-06 17:30', 'VG-s i Lund', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');

INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Summer', 'Steg och Glädje', '2018-06-06 15:15','2018-06-06 17:30', 'Tangopalatset', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');
INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Summer', 'Steg och Sorg', '2018-06-06 15:15','2018-06-06 17:30', 'Barnens Scen', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');
INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Summer', 'Hopp och Förtvivlan', '2018-06-06 15:15','2018-06-06 17:30', 'Bunkern', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');
INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Summer', 'Dans baklänges', '2018-06-06 15:15','2018-06-06 17:30', 'Casinot', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');
INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Festivalito', 'Cykla med TK', '2018-06-06 15:15','2018-06-06 17:30', 'VG-s i Lund', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');

INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Vintermaraton', 'Steg och Glädje', '2018-06-06 15:15','2018-06-06 17:30', 'Tangopalatset', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');
INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Vintermaraton', 'Steg och Sorg', '2018-06-06 15:15','2018-06-06 17:30', 'Barnens Scen', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');
INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Vintermaraton', 'Hopp och Förtvivlan', '2018-06-06 15:15','2018-06-06 17:30', 'Bunkern', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');
INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Vintermaraton', 'Dans baklänges', '2018-06-06 15:15','2018-06-06 17:30', 'Casinot', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');
INSERT INTO EVENT_ACTIVITIES(eventName, activityName, start, end, location, price, description) 
    VALUES ('Vintermaraton', 'Cykla med TK', '2018-06-06 15:15','2018-06-06 17:30', 'VG-s i Lund', '250 SEK/25 EUR/30 USD', 'bla bla bla ...');

