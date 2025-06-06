USE [PlantCareDB]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateLastWatered]    Script Date: 5/14/2025 11:56:02 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_UpdateLastWatered]
    @PlantId INT,
    @LastWatered DATE
AS
BEGIN
    UPDATE plant
    SET last_watered = @LastWatered
    WHERE plant_id = @PlantId
END
