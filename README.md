**Front - end**

- Clone this repo
- Run npm install
- Run npm start

 
 This App supports following commands:

1) *Add* command is used to record purchasing in to database.
     Format of "Add" command:
     add [date] [amount] [currency] [article]
     [date] should be in the YYYY-MM-DD format only;
     [amount] is the cost of purchasing in decimal format with "." (dot symbol) separator;
     [currency] is abbreviated currency name (USD, UAH, EUR, PLN etc.);
     [article] is purchased item (beer, potato, glass etc.).

2) *List* command is used to display purchased from database
     Format of "List" command:
     list

3) *Clear* command is used for delete all buying on specified date
    Format of "Clear" command:
    Clear [date] 
    [date] should be in the YYYY-MM-DD format only;

4) *Total* command is used to display total amount of money for purchase.
    Format of "Total" command:
    Total [currency]
     [currency] is abbreviated currency name (USD, UAH, EUR, PLN etc.).

5) Button **Clear Screen** clear data from the webpage.

To make the code working, firstly used database setup has to be structured.
Use following SQL Statements :

- CREATE USER "postgres";
- CREATE PASSWORD "pass123";
- CREATE DATABASE "management" ;
- CREATE TABLE "person";
- CREATE colums name,  money, currency  and  expense.


To run *unit tests*, you should do the following:

- Mocha framework and chai library for node were used;
- In back-end in cmd wite a command: mocha tests/tsuite.js;
- To get data in file with name, for example logs.dat,  write next command: mocha tests/tsuite.js > logs.dat
