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
/* Nombre    : REAPAISES					                                        */
/* Objetivo  : Valida e inserta un nuevo registro en la tabla UsuarioTipoTramite y  */
/*			   elimina un registro especifico segun la acción especificada.			*/
/* Parametros:  1- @sNombre: Nombre del país.						                */
/*              2- @sResultado: Resultado de la ejecución del SP	                */
/*    $Author: abrito$                                                              */
/*    $Date: 21/01/16 10:45$                                                        */
/*    $Revision: 1$                                                                 */
/*--------------------------------------------------------------------------------- */ 
ALTER PROCEDURE [dbo].[REAPAISES] 
	@nIdPais as int = NULL  
AS
BEGIN
	SET NOCOUNT ON;

	SELECT id_pais, nombre 
	  FROM dbo.Paises
	 WHERE id_pais = ISNULL(@nIdPais,id_pais)

END
GO
