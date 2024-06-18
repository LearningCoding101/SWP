

create database BadCourts
use  BadCourts


CREATE TABLE [User]
(	
	UserID VARCHAR(10) NOT NULL PRIMARY KEY,
	Email VARCHAR(50) NOT NULL,
	Password VARCHAR(50) NOT NULL
);
CREATE TABLE CourtOwner
(
  CourtOwnerID VARCHAR(10) NOT NULL,
  CourtOwnerName VARCHAR(50) NOT NULL,
  
  FOREIGN KEY (CourtOwnerID) REFERENCES [User](UserID),
  CONSTRAINT con_courtOwnerID UNIQUE (CourtOwnerID),

);
CREATE TABLE Club
(
  ClubID VARCHAR(10) NOT NULL Primary key,
  Name NVARCHAR(20) NOT NULL,
  Address NVARCHAR(100) NOT NULL,
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
  Name VARCHAR(50) NOT NULL,
  Price INT NOT NULL,
  ClubID VARCHAR(10) NOT NULL,
  PRIMARY KEY (CourtID),
  FOREIGN KEY (ClubID) REFERENCES Club(ClubID)
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
CREATE TABLE PaymentMethod
(
  PaymentMethodID VARCHAR(10) not null PRIMARY KEY,
  PaymentInfo varchar (50),
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

CREATE TABLE TimeSlot
(
  TimeSlotID VARCHAR(10) NOT NULL,
  StartTime INT NOT NULL,
  EndTime INT NOT NULL,
  Status NVARCHAR(10) NOT NULL,
  
  PRIMARY KEY (TimeSlotID),
  
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



CREATE TABLE Courts_TS
(
  
  
  
  court_TS_ID VARCHAR(10) NOT NULL primary key,
  TimeSlotID VARCHAR(10) NOT NULL,
  CourtID VARCHAR(10) NOT NULL,
  FOREIGN KEY (TimeSlotID) REFERENCES TimeSlot(TimeSlotID),
  FOREIGN KEY (CourtID) REFERENCES Court(CourtID),
);

CREATE TABLE Booking_Detail
(
  Booking_Detail_ID INT NOT NULL Primary key,
  court_TS_ID VARCHAR(10) Not null,
  BookingID VARCHAR(10) NOT NULL,
  TimeSlotID VARCHAR(10) NOT NULL,
  date date not null,
  Booking_Month Int not null, 
  FOREIGN KEY (BookingID) REFERENCES Booking(BookingID),
  FOREIGN KEY (court_TS_ID) REFERENCES Courts_TS(court_TS_ID),
  
);







-- Insert Tennis Court
INSERT INTO Court (CourtID, Name, Price, ClubID)
VALUES ('TC001', 'Tennis Court', 20, 'CLB001');

-- Insert Badminton Court
INSERT INTO Court (CourtID, Name, Price, ClubID)
VALUES ('BC002', 'BadmintonCourt', 15, 'CLB001');

-- Insert Squash Court
INSERT INTO Court (CourtID, Name, Price, ClubID)
VALUES ('SC003', 'Squash Court', 25, 'CLB002');

-- Insert Basketball Court
INSERT INTO Court (CourtID, Name, Price, ClubID)
VALUES ('BC004', 'Basketball Court', 10, 'CLB003');

-- Insert Volleyball Court
INSERT INTO Court (CourtID, Name, Price, ClubID)
VALUES ('VC005', 'Volleyball Court', 12, 'CLB003');

-- Insert RMIT Tennis Club
INSERT INTO Club (ClubID, Name, Address, OpenHour, CloseHour, ClubPicture, CourtOwnerID, StaffID)
VALUES ('CLB001', 'RMIT Tennis Club', '702 Nguyen Van Linh Blvd, Tan Phong Ward, District 7, Ho Chi Minh City', 9, 22, 'tennis_club.jpg', 'CO001', 'ST001');

-- Insert Da Nang Tennis Club
INSERT INTO Club (ClubID, Name, Address, OpenHour, CloseHour, ClubPicture, CourtOwnerID, StaffID)
VALUES ('CLB002', 'Da Nang Tennis Club', '123 Main Street, Da Nang', 8, 21, 'da_nang_tennis_club.jpg', 'CO002', 'ST002');

-- Insert Hanoi Badminton Club
INSERT INTO Club (ClubID, Name, Address, OpenHour, CloseHour, ClubPicture, CourtOwnerID, StaffID)
VALUES ('CLB003', 'Hanoi Badminton Club', '456 Elm Avenue, Hanoi', 9, 21, 'badminton_club.jpg', 'CO003', 'ST003');



-- Insert John Smith as a court owner
INSERT INTO [User] (UserID, Email, Password)
VALUES ('CO001', 'john.smith@example.com', 'securepassword');

-- Associate John Smith with RMIT Tennis Club
INSERT INTO CourtOwner (CourtOwnerID, CourtOwnerName)
VALUES ('CO001', 'John Smith');

-- Insert Nguyen Thi as a court owner
INSERT INTO [User] (UserID, Email, Password)
VALUES ('CO002', 'nguyen.thi@example.com', 'strongpassword');

-- Associate Nguyen Thi with Da Nang Tennis Club
INSERT INTO CourtOwner (CourtOwnerID, CourtOwnerName)
VALUES ('CO002', 'Nguyen Thi');

-- Insert Tran Van as a court owner
INSERT INTO [User] (UserID, Email, Password)
VALUES ('CO003', 'tran.van@example.com', 'safeandsecure');

-- Associate Tran Van with Hanoi Badminton Club
INSERT INTO CourtOwner (CourtOwnerID, CourtOwnerName)
VALUES ('CO003', 'Tran Van');
