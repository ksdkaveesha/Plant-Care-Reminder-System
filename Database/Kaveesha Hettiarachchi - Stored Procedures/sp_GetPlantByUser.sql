USE [PlantCareDB]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetPlantsbyUser]    Script Date: 5/14/2025 11:54:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[sp_GetPlantsbyUser] 
@UserId INT
AS BEGIN
	SELECT * FROM plant WHERE user_id=@UserId
END