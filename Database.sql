drop database   testing
create database testing
use  testing


CREATE TABLE [User]
(	
	UserID VARCHAR(10) NOT NULL PRIMARY KEY,
	Email VARCHAR NOT NULL,
	Password VARCHAR NOT NULL
);
CREATE TABLE CourtOwner
(
  CourtOwnerID VARCHAR(10) NOT NULL,
  CourtOwnerName VARCHAR NOT NULL,
  FOREIGN KEY (CourtOwnerID) REFERENCES [User](UserID),
  CONSTRAINT con_courtOwnerID UNIQUE (CourtOwnerID),

);



CREATE TABLE Club
(
  ClubID VARCHAR(10) NOT NULL Primary key,
  Name NVARCHAR(20) NOT NULL,
  Address NVARCHAR(50) NOT NULL,
  OpenHour INT NOT NULL,
  CloseHour INT NOT NULL,
  ClubPicture VARCHAR(50) NOT NULL,
  CourtOwnerID VARCHAR(10) NOT NULL,
  StaffID VARCHAR(10) NOT NULL,
  
  FOREIGN KEY (CourtOwnerID) REFERENCES CourtOwner(CourtOwnerID),
  
);
CREATE TABLE Staff
(
  StaffID VARCHAR(10) NOT NULL PRIMARY KEY,
  StaffName VARCHAR NOT NULL,
  ClubID VARCHAR(10) NOT NULL,
	FOREIGN KEY (StaffID) REFERENCES [User](UserID),
	CONSTRAINT con_staffID UNIQUE (StaffID),
	FOREIGN KEY (ClubID) REFERENCES [Club](ClubID),
);
CREATE TABLE Customer
(
	
	CustomerID VARCHAR(10) NOT NULL,
	CustomerName VARCHAR NOT NULL,
	PRIMARY KEY (CustomerID),
	FOREIGN KEY (CustomerID) REFERENCES [User](UserID),
	CONSTRAINT con_customerID UNIQUE (CustomerID)
);

CREATE TABLE Court
(
  CourtID VARCHAR(10) NOT NULL,
  Name INT NOT NULL,
  Price INT NOT NULL,
  ClubID VARCHAR(10) NOT NULL,
  PRIMARY KEY (CourtID),
  FOREIGN KEY (ClubID) REFERENCES Club(ClubID)
);
CREATE TABLE TimeSlot
(
  TimeSlotID VARCHAR(10) NOT NULL,
  StartTime INT NOT NULL,
  EndTime INT NOT NULL,
  Status NVARCHAR(10) NOT NULL,
  CourtID varchar(10) NOT NULL,
  PRIMARY KEY (TimeSlotID),
  FOREIGN KEY (CourtID) REFERENCES Court(CourtID)
);

CREATE TABLE Booking
(
  BookingID VARCHAR(10) NOT NULL,
  BookingDate DATE NOT NULL,
  Status NVARCHAR(10) NOT NULL,

  CourtID VARCHAR(10) NOT NULL,
  StaffID VARCHAR(10) NOT NULL,
  CustomerID VARCHAR(10) NOT NULL,
  PRIMARY KEY (BookingID),

  FOREIGN KEY (CourtID) REFERENCES Court(CourtID),
  FOREIGN KEY (StaffID) REFERENCES Staff(StaffID),
  FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);
CREATE TABLE Feedback
(
  FeedbackID VARCHAR NOT NULL,
  FeedbackText VARCHAR NOT NULL,
  Rating VARCHAR NOT NULL,
  BookingID VARCHAR(10) NOT NULL,
  CustomerID VARCHAR(10) NOT NULL,
  FOREIGN KEY (BookingID) REFERENCES Booking(BookingID),
  FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);
CREATE TABLE PaymentMethod
(
  PaymentMethodID VARCHAR(10) not null PRIMARY KEY,
  PaymentInfo varchar (50),
);

CREATE TABLE [Transaction]
(
  DepositAmount INT NOT NULL,
  PaymentDate DATE NOT NULL,
  TotalAmount INT NOT NULL,
  TransactionID VARCHAR(10) NOT NULL,
  Status NVARCHAR(10) NOT NULL,
  BookingID VARCHAR(10) NOT NULL,
  PaymentMethodID VARCHAR(10) NOT NULL,
  PRIMARY KEY (TransactionID),
  FOREIGN KEY (BookingID) REFERENCES Booking(BookingID),
  FOREIGN KEY (PaymentMethodID) REFERENCES PaymentMethod(PaymentMethodID)
);

CREATE TABLE BookingMonth
(
  
  TimeBegin Time NOT NULL,
  TimeEnd Time NOT NULL,
  Weekday_Time  Int NOT NULL,
  TotalTime Time NOT NULL,
  BookingID VARCHAR(10) NOT NULL,
  TimeSlotID VARCHAR(10) NOT NULL,
  FOREIGN KEY (BookingID) REFERENCES Booking(BookingID),
  
);

CREATE TABLE Booking_1Time
(
  
  
  Date DATE NOT NULL,
  BookingID VARCHAR(10) NOT NULL,
  TimeSlotID VARCHAR(10) NOT NULL,
  FOREIGN KEY (BookingID) REFERENCES Booking(BookingID),
  
);

CREATE TABLE Booking_ByHours
(
  BookingTypeByHoursID INT NOT NULL,
  TotalTime TIME NOT NULL,
  BookingID VARCHAR(10) NOT NULL,
  TimeSlotID VARCHAR(10) NOT NULL,
  FOREIGN KEY (BookingID) REFERENCES Booking(BookingID),
  
);







