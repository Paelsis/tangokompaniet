insert (
into courses SELECT 
null,
internkod,
    title, 
    weekday, 
    siteId, 
    courseLength,
    teachersShort, 
    teachers, 
    startTime, 
    startDate,
    active, 
    priceGroup, 
    price, 
    comments 
 FROM courses_template WHERE active=true;