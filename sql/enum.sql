ALTER TABLE `tbl_event_def` CHANGE `eventType` `eventType` ENUM('MARATHON','EASTER','SUMMER','FESTIVALITO','SPRING','AUTUMN','WEEKEND','INTENSE') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;
ALTER TABLE `tbl_schedule_def` CHANGE `eventType` `eventType` ENUM('MARATHON','EASTER','SUMMER','FESTIVALITO','WEEKEND','INTENSE') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;
ALTER TABLE `tbl_registration_marathon` CHANGE `eventType` `eventType` ENUM('MARATHON') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;
ALTER TABLE `tbl_registration_festival` CHANGE `eventType` `eventType` ENUM('SUMMER','EASTER','FESTIVALITO','WEEKEND','INTENSE') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;
ALTER TABLE `tbl_package` CHANGE `eventType` `eventType` ENUM('SUMMER','EASTER','FESTIVALITO','WEEKEND','INTENSE') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;
ALTER TABLE `tbl_package_template` CHANGE `eventType` `eventType` ENUM('SUMMER','EASTER','FESTIVALITO','WEEKEND','INTENSE') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;
ALTER TABLE `tbl_workshop` CHANGE `eventType` `eventType` ENUM('SUMMER','EASTER','FESTIVALITO','WEEKEND','INTENSE') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;
ALTER TABLE `tbl_workshop_template` CHANGE `eventType` `eventType` ENUM('SUMMER','EASTER','FESTIVALITO','WEEKEND','INTENSE') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL;
