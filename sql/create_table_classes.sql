drop table IF EXISTS CLASSES;
create table CLASSES 
    (id INT(4),
    name VARCHAR(20), 
    day VARCHAR(10), 
    addressId VARCHAR(2), 
    city VARCHAR(20), 
    startTime VARCHAR(5),
    startDate DATE,
    length VARCHAR(29), 
    teachers VARCHAR(10), 
    comment VARCHAR(80));
COMMIT;