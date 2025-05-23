USE [PlantCareDB]
GO
/****** Object:  StoredProcedure [dbo].[sp_AddPlant]    Script Date: 5/14/2025 11:52:55 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_AddPlant]
    @UserId INT,
    @PlantName VARCHAR(50),
    @Species VARCHAR(100),
    @WateringFrequency INT,
    @FertilizingFrequency INT,
	@CareInstructions TEXT
AS
BEGIN
    INSERT INTO plant(user_id, plant_name, species, watering_frequency, fertilizing_frequency, core_instructions )
    VALUES (@UserId, @PlantName, @Species, @WateringFrequency, @FertilizingFrequency, @CareInstructions)
END
