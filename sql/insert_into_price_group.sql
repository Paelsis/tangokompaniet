DELETE FROM price_group;
INSERT INTO price_group(priceGroup, currency, price) VALUES (1,'SEK', 500);

INSERT INTO price_group(priceGroup, currency, price) VALUES (2,'SEK', 600);

INSERT INTO price_group(priceGroup, currency, price) VALUES (3,'SEK', 700);

INSERT INTO price_group(priceGroup, currency, price) VALUES (4,'SEK', 800);

INSERT INTO price_group(priceGroup, currency, price) VALUES (5,'SEK', 900);

INSERT INTO price_group(priceGroup, currency, price) VALUES (6,'SEK', 1000);

INSERT INTO price_group(priceGroup, currency, price) VALUES (6,'SEK', 1100);

INSERT INTO price_group(priceGroup, currency, price) VALUES (8,'SEK', 1200);

INSERT INTO price_group(priceGroup, currency, price) VALUES (9,'SEK', 1300);

INSERT INTO price_group(priceGroup, currency, price) VALUES (10,'SEK', 1400);

INSERT INTO price_group(priceGroup, currency, price) VALUES (11,'SEK', 1500);

INSERT INTO price_group(priceGroup, currency, price) VALUES (12,'SEK', 1600);

INSERT INTO price_group(priceGroup, currency, price) VALUES (13,'SEK', 1700);

SET @count = 0;
UPDATE price_group SET id = @count:= @count + 1;

