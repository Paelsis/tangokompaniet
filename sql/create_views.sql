create or replace view v_anmalningar as 
select *
from tangoma_web.tbl_anmälningarkurser A, tangoma_web.tbl_anmalningar B 
where A.ID = B.kursID 
order where reg_datum > '2016-01-01' desc;

create or replace v_fest_signup_basic as 
select *
from tangoma_web.tbl_anmälningarkurser A, tangoma_web.tbl_anmalningar B 
where A.ID = B.kursID 
order where reg_datum > '2016-01-01' desc;

create or replace view v_ref_teacher as 
select 
    id ,
    concat(tbl_teacher.firstName,' ', tbl_teacher.lastName) AS name 
from tbl_teacher

create or replace view v_rev_course_def as 
select name, nameSV, nameEN, nameES from tbl_course_def

create or replace view v_schedule as 
select 
    sc.scheduleId,
    concat(sc.teacher1,' & ',sc.teacher2) as teachers,
    sc.startTime,
    sc.startDate,
    concat(substr(sc.teacher1,1,1),' & ',substr(sc.teacher2,1,1)) AS teachersShort,
    si.siteId,
    co.courseTemplateId, 
    from (
        (tbl_schedule sc join tbl_course_def co) 
        left join tbl_site si on((sc.siteName = si.siteName))
    ) 
    where (sc.name = co.name)

create or replace view v_mail_header as 
select firstName, lastName, email, orderId,  
json_extract(jsonString, '$.phone') as phone,
json_extract(jsonString, '$.gender') as gender,
json_extract(jsonString, '$.packageName') as packageName,
json_extract(jsonString, '$.firstNamePartner') as firstNamePartner,
json_extract(jsonString, '$.lastNamePartner') as lastNamePartner,
json_extract(jsonString, '$.emailPartner') as emailPartner,
json_extract(jsonString, '$.phonePartner') as phonePartner
from tbl_reg_event E

create or replace view v_mail_amount as 
select o.orderId, 
IF(o.paidAmount = 0 && o.amount > 0, 
    CONCAT('Amount to pay is ',  o.amount - o.paidAmount, ' SEK'),
    IF(o.amount - o.paidAmount > 0, 
    CONCAT('Remaining amount to pay is ',  o.amount - o.paidAmount, ' SEK'),
        IF (o.amount  != 0, 
            'All paid', 
            'No payment instruction'
            )
    )
) 
as instruction
from tbl_order as o;

create or replace view v_mail_customer as select o.orderId, oc.firstName, oc.lastName, oc.email, oc.phone, oc.role  
from tbl_order as o, tbl_order_customer as oc
where oc.orderId = o.orderId
order by o.orderId desc;

create or replace view v_mail_dance_partner as select o.orderId, pa.firstNamePartner, pa.lastNamePartner, pa.emailPartner, pa.phonePartner, pa.rolePartner
from tbl_order as o, tbl_order_dance_partner as pa
where pa.orderId = o.orderId
order by o.orderId desc;

create or replace view v_mail_workshop as
select o.orderId, ws.nameEN as workshop, ws.teachers, s.city, s.siteName, dayname(ws.startDate) as weekday, ws.startTime, DATE_FoRMAT(ws.startDate, '%d%b%y') as startDate  
from tbl_order as o, tbl_order_product as p
left outer join tbl_workshop ws on ws.productId = p.productId
left outer join tbl_site s on s.siteId = ws.siteId
where p.productType='workshop'
and p.orderId = o.orderId
order by o.orderId desc;

create or replace view v_mail_course as
select o.orderId, cd.nameEN as course, co.teachers, S.city, S.siteName, dayname(co.startDate) as weekday, co.startTime, DATE_FoRMAT(co.startDate, '%d%b%y') as startDate  
from tbl_order as o, tbl_order_product as P  
left outer join tbl_course co on co.productId = P.productId
left outer join tbl_course_def cd on cd.courseId = co.courseId
left outer join tbl_site S on S.siteId = co.siteId
where P.productType='course'
and P.orderId = o.orderId
order by o.orderId desc;

create or replace view v_mail_package as
select o.orderId, IFNULL(nameEN, pa.packageId) AS packageName from tbl_order o, tbl_order_package as pa
left join tbl_package_def as pd on pd.packageId = pa.packageId
where o.orderId = pa.orderId
order by o.orderId desc;

create or replace view v_mail_shoe as 
select productId, os.size
from tbl_order o, tbl_order_shoe os 
where os.orderId = o.orderId
order by o.orderId desc;

