<?php
//header('content-type: application/json; charset=utf-8');
//header("acces-control-allow-origin:*");
header("Access-Control-Allow-Origin: *");
require_once "nusoap-0.9.5/lib/nusoap.php";

include("Conexion_BD/open_conexion_sql.php");

$server = new soap_server();
$ns="urn:MommyService";
$server ->configureWSDL("MommyService",$ns);
$server ->schemaTargetNamespace=$ns;
$server->xml_encoding = "utf-8";
$server->soap_defencoding = "utf-8";

include("ComplexityTypes/complexityTypes.php");
include("Registers/wsdl_registers.php");



function ValidarLogin($id,$pass)
{
	$respuesa="";
	if ($id=="mommy" && $pass=="123")
	{
		$respuesa="ok";
	}
	else
	{
		$respuesa="no";
	}
	return $respuesa;
}

function EjecutarSQL($comando)
{
	$comando="SELECT id_pais,nombre FROM dbo.Paises";
	$resultado=mssql_query($comando) or die ("ERROR CONSULTA SQL");
	$i=0;

		while ($row=mssql_fetch_array($resultado)) {
			$html[$i]['id_pais'] =$row[0];
			$html[$i]['nombre'] =$row[1];
			//$row2=echo $row[1];
			$i++;
		}
		
		//return 'prueba';
		return $html;
}


//Función que inserta un valor nuevo en la tabla dbo.Paises
//Creation Date: 21-01-2016
function InsPais($sPais)
{

	$sResultado = '';
	
	$sp = mssql_init('INSPAISES');//SP
	//Parámetros SP
	mssql_bind($sp, '@sNombre', $sPais, SQLVARCHAR, false, false, 50);
	mssql_bind($sp, '@sResultado', $sResultado, SQLVARCHAR,true,false,200);
	mssql_execute($sp);//Ejecución SP
	mssql_free_statement($sp);//Liberación del recurso

	return $sResultado;

}

//Función que devuelve uno o varios valores específicos de la tabla dbo.Paises
//Creation Date: 22-01-2016
function ReaPaises($nIdPais)
{
	$sp = mssql_init('REAPAISES');//SP
	//Parámetros SP
	mssql_bind($sp, '@nIdPais', $nIdPais, SQLINT4);
	$resultado = mssql_execute($sp);//Ejecución SP

	$i=0;
		while ($row=mssql_fetch_array($resultado)) {
			$html[$i]['id_pais'] =$row[0];
			$html[$i]['nombre'] =$row[1];
			$i++;
		}
		
	return $html;
	
	mssql_free_result($resultado);//Liberación del recurso		
	mssql_free_statement($sp);//Liberación del recurso	
}

//$HTTP_RAW_POST_DATA=isset($HTTP_RAW_POST_DATA) ? $HTTP_RAW_POST_DATA : "";
//$server->service($HTTP_RAW_POST_DATA);

$httpPost = file_get_contents( 'php://input' ); 
$server->service($httpPost);
?>