-- Reset tbl_course_def id with respect to sequence number 
SET @count = 0;
UPDATE `tbl_default` SET `id` = @count:= @count + 1 order by sequenceNumber asc

-- Insert id into table and make it auto-increment
ALTER TABLE `tbl_default` ADD id int NOT NULL AUTO_INCREMENT primary key FIRST

-- Change id column to auto increment primary key
ALTER TABLE `tbl_default` CHANGE id id INT PRIMARY KEY AUTO_INCREMENT;

-- Reset id in table
SET @count = 100;
UPDATE `tbl_default` SET `id` = @count:= @count + 1 order by creaTimestamp

--Reset id in table
SET @count = 0;
UPDATE `tbl_default` SET `id` = @count:= @count + 1;
