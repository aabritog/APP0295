<?php
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
?>