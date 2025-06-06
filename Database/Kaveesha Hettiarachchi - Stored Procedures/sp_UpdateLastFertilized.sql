USE [PlantCareDB]
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateLastFertilized]    Script Date: 5/14/2025 11:55:35 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_UpdateLastFertilized]
    @PlantId INT,
    @LastFertilized DATE
AS
BEGIN
    UPDATE plant
    SET last_fertilized = @LastFertilized
    WHERE plant_id = @PlantId
END
