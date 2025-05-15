USE [PlantCareDB]
GO

/****** Object:  StoredProcedure [dbo].[AddUser]    Script Date: 5/14/2025 11:48:26 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[AddUser]
@Username varchar(20),
@Email varchar(50),
@Password varchar(255)
AS
BEGIN
    INSERT INTO [user] (user_name, email, password)
    VALUES (@Username, @Email, @Password)
END
GO


