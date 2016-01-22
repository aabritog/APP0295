<?php
//header('content-type: application/json; charset=utf-8');
//header("acces-control-allow-origin:*");
header("Access-Control-Allow-Origin: *");
require_once "nusoap-0.9.5/lib/nusoap.php";
$conexion=mssql_connect('SQL5020.Smarterasp.net', 'DB_9EF6C2_mommy_admin', 'mommy2016');
mssql_select_db('DB_9EF6C2_mommy',$conexion);
$server = new soap_server();
$ns="urn:MommyService";
$server ->configureWSDL("MommyService",$ns);
$server ->schemaTargetNamespace=$ns;
$server->register("ValidarLogin",
					array("id" => "xsd:string","pass"=>"xsd:string"),
					array("respuesa"=>"xsd:string"),
					$ns,
					$ns."#ValidarLogin",
					"rpc",
					"encoded",
					"Valida el inicio de sesion de usurarios");

$server->wsdl->addComplexType('StructPaises','complexType','struct','all','',
               array(
                        'id_pais'            => array('name' => 'id_pais', 'type' => 'xsd:int'),
                        'nombre'            => array('name' => 'nombre', 'type' => 'xsd:string')
                        
                        ));
                        
$server->wsdl->addComplexType('ArrayOfStructPaises','complexType','array','','SOAP-ENC:Array',
                                array(),
                                array(        
                                            array('ref' => 'SOAP-ENC:arrayType',
                                                  'wsdl:arrayType' => 'tns:StructPaises[]'                              
                                                  )                                       
                                    ),
                                'tns:StructPaises');    
$server->xml_encoding = "utf-8";
$server->soap_defencoding = "utf-8";

$server->register("EjecutarSQL",
					array("comando"=>"xsd:string"),
					array("array_resul"=>"tns:ArrayOfStructPaises"),
					$ns,
					$ns."#EjecutarSQL",
					"rpc",
					"encoded",
					"Ejecuta una sentencia SQL"
					);


$server->register("InsPais",
					array("sPais"=>"xsd:string"),
					array("sRespuesta"=>"xsd:string"),
					$ns,
					$ns."#InsPais",
					"rpc",
					"encoded",
					"Carga un valor a la tabla dbo.Paises"
					);

$server->register("ReaPaises",
					array("nIdPais"=>"xsd:int"),
					array("sRespuesta"=>"tns:ArrayOfStructPaises"),
					$ns,
					$ns."#ReaPaises",
					"rpc",
					"encoded",
					"Mostrar los valores de la tabla dbo.Paises"
					);

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