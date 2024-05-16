USE [master]
GO

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'SampleDB')
BEGIN
CREATE DATABASE [SampleDB]
END
GO
USE [SampleDB]
GO
----------------------
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Items]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Items]
(
	[ItemID] [varchar](15) NOT NULL,
	[ItemName] [varchar](50) NOT NULL,
	[Quantity] [int] NOT NULL,
	CONSTRAINT [PK_Item] PRIMARY KEY CLUSTERED 
	(
		[ItemID] ASC
	)
)
END

Select * from Items

INSERT INTO Items(ItemID, ItemName, Quantity) VALUES
('001', 'Coffee', 100),
('002', 'Milk',	  200),
('003', 'Cake',   300);
-------------------
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Registration]	') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Registration]
(
	[UserName] [varchar](30) NOT NULL,
	[Password] [varchar](30) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[isAdmin] [bit] NOT NULL,
	CONSTRAINT [PK_Registration] PRIMARY KEY CLUSTERED 
	(
		[UserName] ASC
	)
)
END

Select * from Registration

INSERT INTO Registration(UserName, Password, LastName, isAdmin) VALUES
('U001', '123', 'Tom', 1),
('U002', '456', 'David', 0),
('U003', '789', 'John', 0),
('U004', '012', 'Mark', 1),
('U005', '134', 'Kate', 0)
