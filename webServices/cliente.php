<?php
//header('content-type: application/json; charset=utf-8');
//header("acces-control-allow-origin:*");
header("Access-Control-Allow-Origin: *");
require_once "nusoap-0.9.5/lib/nusoap.php";
//$cliente = new nusoap_client("http://localhost/site1/servidor.php?wsdl",true);
$cliente = new nusoap_client("http://mommyapp-001-site1.btempurl.com/servidor.php?wsdl",true);
$proxy=$cliente->getProxy();
//$cliente = new nusoap_client("http://ingenieria.site90.net/servidor_.php?wsdl",true);
$error = $cliente->getError();
    if ($error) {
        echo "<h2>Constructor error</h2>" . $error;
    }

//$id="mommy";
//$pass="123";
if ($_GET["method"]=="ValidarLogin")
{
    $id=$_GET["usuario"];
    $pass=$_GET["password"];

    $parametros=array("id"=>$id,"pass"=>$pass);
    $respuesta=array();

    $respuesta["validacion"]=$cliente->call("ValidarLogin",$parametros);
    if ($cliente->fault) {
            echo "<h2>Fault</h2>";
            print_r($result);
            
        }
    $error = $cliente->geterror();
    if ($error)
    {
    	echo "<h2>".$error."</h2>";
    }
    else
    {
    	$resultadosJson = json_encode($respuesta);
    /*muestra el resultado en un formato que no da problemas de seguridad en browsers */
    	echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';
    	//echo "La respuesta es: ".$respuesta;
    	//print_r($respuesta);
    }
}
if($_GET["method"]=="EjecutarSql")
{
    $comando='SELECT id_pais,nombre FROM dbo.Paises';
    $parametros=array("comando"=>$comando);

    //$result=$cliente->call("EjecutarSql",$parametros);
    $result=$proxy->EjecutarSql($comando);
    foreach ($result as $row) {
        $contenido.='<option value="'.$row['id_pais'].'"> '.$row['nombre'].'</option>';
    }
    //echo $result;
    echo $contenido."#";



}

?>