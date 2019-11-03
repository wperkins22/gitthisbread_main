CREATE TABLE IF NOT EXISTS Employees (
  employeeId SERIAL PRIMARY KEY,
  password VARCHAR(45) NOT NULL,
  firstName VARCHAR(45) NOT NULL,
  lastName VARCHAR(45) NOT NULL,
  employeePhone INT NOT NULL,
  employeeEmail VARCHAR(45) NOT NULL,
  jobTitle VARCHAR(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS Tables (
  tableNumber SERIAL PRIMARY KEY,
  tableStatus VARCHAR(5) NOT NULL,
  tableLocation INT NOT NULL,
  tableSize INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Customers (
  customerId SERIAL PRIMARY KEY,
  firstName VARCHAR(45) NOT NULL,
  lastName VARCHAR(45) NOT NULL,
  customerPhone INT NOT NULL,
  customerEmail VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS Products (
  productId SERIAL PRIMARY KEY,
  productName VARCHAR(45) NOT NULL,
  productDescription VARCHAR(200) NOT NULL,
  productPrice NUMERIC(5,2)
);

CREATE TABLE IF NOT EXISTS RestaurantInfo (
  restaurantName VARCHAR(45) UNIQUE PRIMARY KEY,
  restaurantAddress VARCHAR(200) NOT NULL,
  restaurantCity VARCHAR(45) NOT NULL,
  restaurantState VARCHAR(2) NOT NULL,
  restaurantZip VARCHAR(5) NOT NULL,
  restaurantDescription VARCHAR(200) NOT NULL,
  restaurantManagerId INT REFERENCES Employees(employeeId) NOT NULL
);

CREATE TABLE IF NOT EXISTS Orders (
  orderNumber SERIAL PRIMARY KEY,
  orderDate DATE,
  orderTime VARCHAR(5) NOT NULL,
  orderStatus VARCHAR(1) NOT NULL,
  tipAmount NUMERIC(5,2),
  tax NUMERIC(5,2) NOT NULL,
  orderTotal NUMERIC(5,2) NOT NULL,
  serverId INT REFERENCES Employees(employeeId) NOT NULL,
  tableNumber INT REFERENCES Tables(tableNumber) NOT NULL,
  customerId INT REFERENCES Customers(customerId)
);

CREATE TABLE IF NOT EXISTS OrderProduct (
  orderNumber INT PRIMARY KEY REFERENCES Orders(orderNumber),
  productId INT REFERENCES Products(productId),
  productSize VARCHAR(4),
  quantityOrdered VARCHAR(2) NOT NULL
);

CREATE TABLE IF NOT EXISTS Reservations (
  reservationNumber SERIAL PRIMARY KEY,
  reservationDate DATE,
  reservationTime VARCHAR(5) NOT NULL,
  partySize INT NOT NULL,
  customerId INT REFERENCES Employees(employeeId),
  tableNumber INT REFERENCES Tables(tableNumber)
);
