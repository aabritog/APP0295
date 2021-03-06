USE [DB_9EF6C2_mommy]
GO
/****** Object:  StoredProcedure [dbo].[INSPAISES]    Script Date: 21/01/2016 21:38:10 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
/*--------------------------------------------------------------------------------- */
/* Nombre    : spInsDelValUsuarioTipoTramite                                        */
/* Objetivo  : Valida e inserta un nuevo registro en la tabla UsuarioTipoTramite y  */
/*			   elimina un registro especifico segun la acción especificada.			*/
/* Parametros:  1- @sNombre: Nombre del país.						                */
/*              2- @sResultado: Resultado de la ejecución del SP	                */
/*    $Author: abrito$                                                              */
/*    $Date: 21/01/16 10:45$                                                        */
/*    $Revision: 1$                                                                 */
/*--------------------------------------------------------------------------------- */ 

ALTER PROCEDURE [dbo].[INSPAISES] 
	@sNombre as varchar(50),
	@sResultado as varchar(200) OUTPUT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @sErrorNum as varchar(200)
	DECLARE @sErrorMessage as varchar(200)

	BEGIN TRY
		INSERT INTO dbo.Paises
					(nombre,activo)
			 VALUES (@sNombre,1)

		SET @sResultado = 'SUCESSFUL EXCECUTION';
	END TRY
	BEGIN CATCH
		SET @sErrorNum = CAST(ERROR_NUMBER() AS char(100));
		SET @sErrorMessage = ERROR_MESSAGE();
		SET @sResultado = 'EXECUTE FAIL. ERROR NUM: ' + @sErrorNum +' - '+@sErrorMessage;
	END CATCH
	
END

