use TK;
drop table IF EXISTS EVENT_ACTIVITIES;
create table EVENT_ACTIVITIES 
    (id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id),
    eventName VARCHAR(20) NOT NULL,
    start DATETIME, 
    end DATETIME, 
    activityName VARCHAR(20) NOT NULL,
    location VARCHAR(80), 
    price VARCHAR(80), 
    description TEXT);
COMMIT;

