<?php
$server->register("ValidarLogin",
					array("id" => "xsd:string","pass"=>"xsd:string"),
					array("respuesa"=>"xsd:string"),
					$ns,
					$ns."#ValidarLogin",
					"rpc",
					"encoded",
					"Valida el inicio de sesion de usurarios");




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
?>