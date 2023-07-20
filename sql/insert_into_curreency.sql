USE TK;
DELETE FROM currency;
INSERT INTO currency(currencyFrom, currencyTo, factor) VALUES ('SEK', 'DKK', 1.3408);
INSERT INTO currency(currencyFrom, currencyTo, factor) VALUES ('SEK','NOK', 0.9856);
INSERT INTO currency(currencyFrom, currencyTo, factor) VALUES ('SEK','EUR', 9.9780);
INSERT INTO currency(currencyFrom, currencyTo, factor) VALUES ('SEK','USD', 8,4328);

