delimiter #
create or replace trigger TabellServiceTrigger after insert on tbl_order
for each row
begin
 	insert into tbl_service(id) values (new.id);
end#