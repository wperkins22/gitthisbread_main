CREATE TABLE IF NOT EXISTS Employees (
  employeeId SERIAL PRIMARY KEY,
  password VARCHAR(45) NOT NULL,
  firstName VARCHAR(45) NOT NULL,
  lastName VARCHAR(45) NOT NULL,
  birthDate DATE NOT NULL,
  employeePhone CHAR(10) NOT NULL,
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
  customerPhone CHAR(10) NOT NULL,
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
  restaurantPhone CHAR(10) NOT NULL,
  restaurantAddress VARCHAR(200) NOT NULL,
  restaurantCity VARCHAR(45) NOT NULL,
  restaurantState VARCHAR(2) NOT NULL,
  restaurantZip VARCHAR(5) NOT NULL,
  restaurantDescription VARCHAR(200) NOT NULL,
  restaurantManagerId INT REFERENCES Employees(employeeId) NOT NULL
);

CREATE TABLE IF NOT EXISTS Orders (
  orderNumber SERIAL PRIMARY KEY,
  orderDate DATE NOT NULL,
  orderTime VARCHAR(5) NOT NULL,
  orderStatus VARCHAR(1) NOT NULL DEFAULT 'P',
  tipAmount NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  tax NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  orderTotal NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  serverId INT REFERENCES Employees(employeeId) NOT NULL,
  tableNumber INT REFERENCES Tables(tableNumber) NOT NULL,
  customerId INT REFERENCES Customers(customerId)
);

CREATE TABLE IF NOT EXISTS OrderProduct (
  orderNumber INT REFERENCES Orders(orderNumber),
  productId INT REFERENCES Products(productId),
  quantityOrdered VARCHAR(2) NOT NULL,
  totalPrice NUMERIC(5, 2) NOT NULL,
  PRIMARY KEY(orderNumber, productId)
);

CREATE TABLE IF NOT EXISTS Reservations (
  reservationNumber SERIAL PRIMARY KEY,
  reservationDate DATE NOT NULL,
  reservationTime VARCHAR(5) NOT NULL,
  partySize INT NOT NULL,
  customerId INT REFERENCES Employees(employeeId),
  tableNumber INT REFERENCES Tables(tableNumber)
);
