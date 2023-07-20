// Show duplicates
SELECT 
    email, productId, COUNT(*) as cnt
FROM
    tbl_registration
GROUP BY 
    email, productId
HAVING 
    cnt > 1;

// delete duplicates
delete t1 FROM tbl_registration t1
INNER JOIN tbl_registration t2 
WHERE 
    t1.id < t2.id AND 
    t1.email = t2.email AND
    t1.productId = t2.productId    