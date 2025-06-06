USE [PlantCareDB]
GO
/****** Object:  StoredProcedure [dbo].[sp_AddReminder]    Script Date: 5/14/2025 11:54:13 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_AddReminder]
@UserId INT,
@PlantId INT,
@ReminderType VARCHAR(1),
@ReminderDate DATE
AS BEGIN
	INSERT INTO reminder(user_id, plant_id, reminder_type, reminder_date)
	VALUES (@UserId, @PlantId, @ReminderType, @ReminderDate)
END