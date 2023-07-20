INSERT INTO tbl_courses (schemaId, internkod, title, weekday, dayOfWeek, siteId, courseLength, teachersShort, teachers, startTime, startDate, active, priceGroup, price) 
                 SELECT 'SPRING_2022', internkod, title, weekday, dayOfWeek, siteId, courseLength, teachersShort, teachers, '00:00', curdate(), 0, priceGroup, price FROM tbl_courses where schemaId='SPRING_2018';
