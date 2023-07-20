#/bin/bash

for table in courses currency customer events  event_activities intrested inventory price_group newsletters products registration sites teachers tk_page
do
    tableName=tbl_$table
    viewName=v_$table
    #echo $tableName $viewName

    echo "create or replace view $viewName as select * from $tableName order by id;" 
done

echo "create or replace view v_price_group_currency as \
select a.priceGroup, b.currencyFrom, b.currencyTo, b.factor, a.price SEK, \
CEIL(a.price/(b.factor)) convertedPrice from tbl_price_group a, tbl_currency b where a.currency = b.currencyFrom;" 

echo "create or replace view v_product_inventory as \
select a.productId, a.productName, b.size, a.price, a.priceGroup, b.quantity, b.incoming from tbl_products a, tbl_inventory b where a.productId = b.productId \
order by productId, size"

