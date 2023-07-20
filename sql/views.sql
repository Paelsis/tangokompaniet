



create or replace view v_courses as select * from tbl_courses order by id;
create or replace view v_currency as select * from tbl_currency order by id;
create or replace view v_customer as select * from tbl_customer order by id;
create or replace view v_events as select * from tbl_events order by id;
create or replace view v_event_activities as select * from tbl_event_activities order by id;
create or replace view v_intrested as select * from tbl_intrested order by id;
create or replace view v_price_group as select * from tbl_price_group order by id;
create or replace view v_newsletters as select * from tbl_newsletters order by id;
create or replace view v_products as select * from tbl_products order by id;
create or replace view v_registration as select * from tbl_registration order by id;
create or replace view v_sites as select * from tbl_sites order by id;
create or replace view v_teachers as select * from tbl_teachers order by id;
create or replace view v_tk_page as select * from tbl_tk_page order by id;
create or replace view v_price_group_currency as select a.priceGroup, b.currencyFrom, b.currencyTo, b.factor, a.price SEK, CEIL(a.price/(b.factor)) convertedPrice from tbl_price_group a, tbl_currency b where a.currency = b.currencyFrom;
create or replace view v_product_inventory as select a.productId, a.productName, b.size, a.price, a.priceGroup, b.quantity, b.incoming 
from tbl_products a, tbl_inventory b where a.productId = b.productId order by productId, size;

create or replace view v_schedule_id as
SELECT distinct scheduleId as scheduleId from `tbl_schedule`
UNION
SELECT distinct scheduleId as scheduleId from `tbl_schedule_marathon`
UNION
SELECT distinct scheduleId as scheduleId from `tbl_schedule_workshop`
UNION
SELECT distinct scheduleId as scheduleId from `tbl_marathon`
UNION
SELECT distinct scheduleId as scheduleId from `tbl_course`
UNION
SELECT distinct scheduleId as scheduleId from `tbl_workshop`
order by scheduleId

create or replace view v_course as
SELECT 
                productId, 
                CONCAT(
                    C.nameSV, ' ',
                    S.city, ' ',
                    A.teacher1, ' & ' , A.teacher2, ' ', 
                    DATE_FORMAT(A.startDate, '%e/%c-%y'), ' ',
                    TIME_FORMAT(A.startTime, '%H:%i'), 
                    '  (',  A.productId , ')'
                ) as schedule,
                A.startDate, 
                TIME_FORMAT(A.startTime, '%H:%i') as startTime, 
                A.teacher1,
                A.teacher2,
                A.siteId,
                A.courseId
                FROM tbl_course A 
                left outer join tbl_site S on A.siteId=S.siteId,
                tbl_course_def C 
                where A.active = 1 
                and C.courseId = A.courseId 
                order by C.sequenceNumber, S.city, A.startDate asc, A.startTime asc


create or replace view v_ref_teacher as select shortName as shortName, 
concat(firstName,' ',lastName) AS name 
from tbl_teacher where active = 1

create or replace view v_presence_history AS
SELECT  
p.id, p.firstName, p.lastName, p.email, p.courseDate, p.productId, p.present, 
DATE_FORMAT(STR_TO_DATE(SUBSTR(p.productId, 1,6), '%y%m%d'), '%d/%m-%Y') as startDate, 
DATE_FORMAT(STR_TO_DATE(SUBSTR(p.productId, 7,4), '%H%i'), '%H:%i') as startTime,
DAYNAME(STR_TO_DATE(SUBSTR(p.productId, 1,6), '%y%m%d')) as dayname,
SUBSTR(p.productId, 13) as courseId,
IFNULL(d.nameSV,p.courseName) as courseName,
IFNULL(d.nameSV,p.courseName) as courseNameSV,
IFNULL(d.nameEN,p.courseName) as courseNameEN,
IFNULL(d.nameES,p.courseName) as courseNameES,
IFNULL(p.scheduleName,'No schedule') as scheduleName,
IFNULL(si.siteName, SUBSTR(p.productId, 11, 2)) as siteName,
IFNULL(si.city, '') as city 
FROM `tbl_presence` p
left outer join tbl_course_def as d on d.courseId = SUBSTR(p.productId, 13)
left outer join tbl_site as si on si.siteId = SUBSTR(p.productId, 11, 2)


create or replace view v_ref_schedule_event as
SELECT sd.*, 
CONCAT(DATE_FORMAT(sd.startDate, "%d%b%y"),'-', 
DATE_FORMAT(endDate,"%d%b%y")) as `dateRange`,
IF (now() < CAST(CONCAT(openRegDate, ' ', openRegTime) as datetime), 'NOT_OPEN_YET', 
    IF (now() > CAST(CONCAT(endDate, ' ', endTime) as datetime), 'FINISHED', 'OPEN')
) as status, 
DATE_FORMAT(startDate, '%Y') as year,
ed.nameEN as name, ed.nameEN as nameEN, ed.nameSV as nameSV, ed.nameES as nameES, ed.replyImage, ed.banner, ed.colorLight, ed.colorDark
FROM `tbl_schedule_def` as sd
LEFT OUTER JOIN tbl_event_def as ed on ed.eventType = sd.eventType
order by sd.startDate


create or replace view v_ref_event as select eventType, productType, nameSV, nameEN, nameES from tbl_event_def
create or replace view v_ref_event_course as select eventType, nameSV, nameEN, nameES from tbl_event_def where productType='course'



// Counters for marathon
create or replace view v_marathon_count as SELECT daterange, role, count(role) as cnt FROM `tbl_registration_marathon` group by dateRange, role

### Active views
create or replace view v_inventory as select * from tbl_inventory order by id;

create or replace view v_ref_marathon as
SELECT CONCAT(DATE_FORMAT(startDate, "%d%b%y"),'-', DATE_FORMAT(endDate,"%d%b%y")) as `dateRange`, `startDate`,`startTime`, `openRegDate`, `openRegTime`,
IF (now() < CAST(CONCAT(openRegDate, ' ', openRegTime) as datetime), 'NOT_OPEN_YET', 
    IF (now() > CAST(CONCAT(endDate, ' ', endTime) as datetime), 'FINISHED', 'OPEN')
) as status, 
emailResponsible,
DATE_FORMAT(startDate, '%Y') as year
FROM `tbl_schedule_def` 
where eventType = 'MARATHON' 
order by startDate

create or replace view v_marathon_names as SELECT firstName, lastName, count(*)
from
(
	SELECT firstName, lastName from tbl_registration_marathon as B
    UNION 
    SELECT firstNamePartner as firstName, lastNamePartner as lastName from tbl_registration_marathon as C where firstName is not null
) AS A
group by firstName, lastName order by firstName, lastName
