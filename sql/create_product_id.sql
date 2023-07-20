update tbl_course set productId=concat(DATE_FORMAT(startDate, '%y%m%d'),
                        TIME_FORMAT(startTime, '%H%i'),siteId,templateId);

update tbl_workshop set productId=concat(DATE_FORMAT(startDate, '%y%m%d'),
                      TIME_FORMAT(startTime, '%H%i'),siteId,templateId);

update tbl_marathon set productId=concat(DATE_FORMAT(startDate, '%y%m%d'),
                        TIME_FORMAT(startTime, '%H%i'),siteId,templateId);