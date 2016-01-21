-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*--------------------------------------------------------------------------------- */
/* Nombre    : spInsDelValUsuarioTipoTramite                                        */
/* Objetivo  : Valida e inserta un nuevo registro en la tabla UsuarioTipoTramite y  */
/*			   elimina un registro especifico segun la acción especificada.			*/
/* Parametros:  1- @sNombre: Nombre del país.						                */
/*    $Author: abrito$                                                              */
/*    $Date: 21/01/16 10:45$                                                        */
/*    $Revision: 1$                                                                 */
/*--------------------------------------------------------------------------------- */ 

CREATE PROCEDURE [dbo].[INSPAISES] 
	-- Add the parameters for the stored procedure here
	@sNombre as varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements. aabg
	SET NOCOUNT ON;
	/*DECLARE @nResultado as int*/

	INSERT INTO dbo.Paises
				(Nombre,
				activo)
		VALUES (@sNombre,
				1)
		/*SET @nResultado = 0;
		SELECT @nResultado AS nResult*/
END

