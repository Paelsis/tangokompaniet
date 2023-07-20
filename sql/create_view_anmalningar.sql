create or replace view v_fest_signup_basic as 
select *
from tangoma_web.tbl_fest_signup_basic
order by signup_time desc;

create or replace view v_intresseanmalningar as 
select *
from tangoma_web.tbl_intresseanmalningar
order by regdatum desc;

create or replace view v_nyhetsbrev_medlemmar as 
select *
from tangoma_web.tbl_nyhetsbrev_medlemmar
order by datum desc;

create or replace view v_kurser as 
select *
from tangoma_web.tbl_kurser
order by ID desc;


