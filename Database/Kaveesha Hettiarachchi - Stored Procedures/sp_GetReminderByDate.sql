USE [PlantCareDB]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetRemindersByDate]    Script Date: 5/14/2025 11:55:11 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_GetRemindersByDate]
    @UserId INT,
    @Date DATE
AS
BEGIN
    SELECT *
    FROM plant
    WHERE user_id = @UserId
      AND (
            DATEADD(DAY, watering_frequency, last_watered) = @Date
         OR DATEADD(DAY, fertilizing_frequency, last_fertilized) = @Date
      )
END
