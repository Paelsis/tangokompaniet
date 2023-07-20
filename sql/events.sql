INSERT IGNORE into tbl_registration_history 
(firstName, lastName, email, phone, leader, 
firstNamePartner, lastNamePartner, emailPartner, phonePartner, status,
productType, 
productId, 
orderId, 
danceSite,
creaTimestamp,
nameSV, nameEN, nameES,
scheduleNameSV,scheduleNameEN,scheduleNameES,
teacher1, teacher2)
SELECT re.firstName, re.lastName, re.email, re.phone, re.leader, 
re.firstNamePartner, re.lastNamePartner, re.emailPartner, re.phonePartner, re.status,
re.productType, 
re.productId, 
re.orderId, 
re.danceSite,
re.creaTimestamp,
df.nameSV, df.nameEN, df.nameES, 
sc.nameSV, sc.nameEN, sc.nameES, 
te1.shortName as teacher1,te2.shortName as teacher2
from tbl_registration as re  
left outer join tbl_course as co on co.productId = re.productId
left outer join tbl_course_def as df on df.courseId = co.courseId
left outer join tbl_schedule_def as sc on sc.scheduleId = co.scheduleId
left outer join tbl_teacher as te1 on te1.shortName = co.teacher1
left outer join tbl_teacher as te2 on te2.shortName = co.teacher2
where productType != 'social'
and DATE(SUBSTR(re.productId, 1,6)) < DATE_SUB(NOW(), INTERVAL 26 WEEK)



UPDATE tbl_registration_history set danceSite = IF (SUBSTR(re.productId,11,2) = 'ON', 'ONLINE') 