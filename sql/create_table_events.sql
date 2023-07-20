use TK;
drop table IF EXISTS EVENTS;
create table EVENTS 
    (id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id), 
    eventName VARCHAR(20) NOT NULL, 
    start DATETIME, 
    end DATETIME, 
    location VARCHAR(80), 
    title VARCHAR(80) NOT NULL,
    subTitle VARCHAR(80),
    cardTitle VARCHAR(80),
    cardSubtitle VARCHAR(80),
    description TEXT);


