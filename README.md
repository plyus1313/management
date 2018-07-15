# Front - end

- Clone this repo
- Run npm install
- Run npm start

This App supports following commands:

1) “Add” command is used to record purchasing in to database.

  Format of “Add” command:
  
  add [date] [amount] [currency] [article]
  
  - [date] should be in the YYYY-MM-DD format only;  
  - [amount] is the cost of purchasing in decimal format with “.” (dot symbol) separator;
  - [currency] is abbreviated currency name (USD, UAH, EUR, PLN etc.);
  - [article] is purchased item (beer, potato, glass etc.).


2) “List” command is used to display purchased from database.

  Format of “List” command:
  
  list
  

3) “Clear” command is used for delete all buying on specified date.

    Format of “Clear” command:
  
    clear [date]
  
  - [date] should be in the YYYY-MM-DD format only.
  

4) “Total” command is used to display total amount of money for purchase.

    Format of “Total” command:
  
    total [currency]
    
  - [currency] is abbreviated currency name (USD, UAH, EUR, PLN etc.).

5) Button “Clear Screen” clear data from the webpage.

Link to deployed web application on heroku: https://management-vs.herokuapp.com/
