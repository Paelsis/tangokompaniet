INSERT INTO products(itemType, productId, productName, gender, image, brandId, priceGroup, price, sizes, stockCounters, orderCount) VALUES 
('shoe','SHOE 01', 'Rose', 'F', 'images/TangoShoe.jpg', 'Bandoloero', 5, 1200, ''36','37','38','39','40'', '5,4,3,2,1' , '0,0,0,0,0');
INSERT INTO products(itemType, productId, productName, gender, image, brandId, priceGroup, price, sizes, stockCounters, orderCounters) VALUES
('shoe','SHOE 02', 'Tulip', 'F', 'images/TangoShoe.jpg', 'Bandoloero', 5, 1200, ''39','40','41',42,43', '7,6,5,4,2' , '2,2,2,2,2');
INSERT INTO products(itemType, productId, productName, gender, image, brandId, priceGroup, price, sizes, stockCounters, orderCounters) VALUES
('shoe','SHOE 03', 'Cubumber', 'F', 'images/TangoShoe.jpg', 'Bandoloero', 6, 1'40'0, '34,35,'36','37','38'', '1,1,1,1,1' , '0,0,0,1,1');
INSERT INTO products(itemType, productId, productName, gender, image, brandId, priceGroup, price, sizes, stockCounters, orderCounters) VALUES
('shoe','SHOE 04', 'Blueberry', 'F', 'images/TangoShoe.jpg', 'Bandoloero', 7, 1600, '35,'36','37','38','39'', '2,2,3,3,4' , '2,2,3,1,1');
INSERT INTO products(itemType, productId, productName, gender, image, brandId, priceGroup, price, sizes, stockCounters, orderCounters) VALUES
('hoodie','HOODIE RED', 'TK hoodie red', 'F', 'images/TangoShoe.jpg', 'Fruit Of The Loom', 7, 1600, 'XS,S,M,L,XL,XXL', '10,10,10,10,10,10' , '0,0,0,0,0,0');
INSERT INTO products(itemType, productId, productName, gender, image, brandId, priceGroup, price, sizes, stockCounters, orderCounters) VALUES
('hoodie','HOODIE BLACK', 'TK hoodie black', ' ', 'images/TangoShoe.jpg', 'Fruit Of The Loom', 7, 1600, 'XS,S,M,L,XL,XXL', '10,10,10,10,10,10' , '0,0,0,0,0,0');
INSERT INTO products(itemType, productId, productName, gender, image, brandId, priceGroup, price, sizes, stockCounters, orderCounters) VALUES
('t-shirt','TSHIRT RED', 'TK t-shirt red', ' ', 'images/T-shirt-red.jpg', 'Fruit Of The Loom', 7, 1600, 'XS,S,M,L,XL,XXL', '10,10,10,10,10,10' , '0,0,0,0,0,0');
INSERT INTO products(itemType, productId, productName, gender, image, brandId, priceGroup, price, sizes, stockCounters, orderCounters) VALUES
('t-shirt','TSHIRT BLACK', 'TK t-shirt black', ' ', 'images/T-shirt-red.jpg', 'Fruit Of The Loom', 7, 1600, 'XS,S,M,L,XL,XXL', '10,10,10,10,10,10' , '0,0,0,0,0,0');
INSERT INTO products(itemType, productId, productName, gender, image, brandId, priceGroup, price, sizes, stockCounters, orderCounters) VALUES
('dress','DRESS RED', 'TK dress red', 'F', 'images/T-shirt-red.jpg', 'Kenzo', 10, 3200, 'XS,S,M,L', '1,1,1,1' , '1,1,0,0');
INSERT INTO products(itemType, productId, productName, gender, image, brandId, priceGroup, price, sizes, stockCounters, orderCounters) VALUES
('dress','DRESS BLACK', 'TK dress black', 'F', 'images/T-shirt-red.jpg', 'Dolce Gabbana', 12, 7900, 'S,M,L', '1,1,1' , '1,0,0');



// New table
REPLACE INTO tbl_registration_festival_product (
    		product, 
    		productType,
            eventType,
            dateRange,
            handled,
            firstName,
            lastName,
            email,
    		phone, 
            firstNamePartner,
            lastNamePartner,
            emailPartner,
    		phonePartner
) 
SELECT
        *
    FROM
        (
        SELECT
            IF(
                LENGTH(
                    SUBSTRING_INDEX(
                        SUBSTRING_INDEX(tf.productList, ',', n),
                        ',',
                        -1
                    )
                ) > 0,
                SUBSTRING_INDEX(
                    SUBSTRING_INDEX(tf.productList, ',', n),
                    ',',
                    -1
                ),
                'NO PRODUCTS CHOOSEN'
            ) AS product,
            'workshop',
            tf.eventType,
            tf.dateRange,
            tf.handled,
            tf.firstName,
            tf.lastName,
            tf.email,
            tf.phone,
            tf.firstNamePartner,
            tf.lastNamePartner,
            tf.emailPartner,
            tf.phonePartner
        FROM
            tbl_registration_festival AS tf
        LEFT OUTER JOIN tbl_registration_festival AS tf2
        ON
            tf.dateRange = tf2.daterange AND(
                tf2.email = tf.emailPartner OR(
                    tf.firstNamePartner = tf2.firstName AND tf.lastNamePartner = tf2.lastName AND tf.firstName = tf2.firstNamePartner AND tf.lastName = tf2.lastNamePartner
                )
            )
        JOIN numbers ON CHAR_LENGTH(tf.productList) - CHAR_LENGTH(
        REPLACE
            (tf.productList, ',', '')
        ) >= n - 1
    ) AS A
    ORDER BY
        `A`.`firstName`
    DESC

