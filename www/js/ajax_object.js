// JavaScript Document
function objetoAjax(){
  var xmlhttp=false;

  try {
  xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
  try {
  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

  } catch (E) {
  xmlhttp = false;
  }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {

  xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}

function formato_numero(numero, decimales, separador_decimal, separador_miles){ // v2007-08-06
    numero=parseFloat(numero);
    if(isNaN(numero)){
        return "";
    }

    if(decimales!==undefined){
        // Redondeamos
        numero=numero.toFixed(decimales);
    }

    // Convertimos el punto en separador_decimal
    numero=numero.toString().replace(".", separador_decimal!==undefined ? separador_decimal : ",");

    if(separador_miles){
        // Añadimos los separadores de miles
        var miles=new RegExp("(-?[0-9]+)([0-9]{3})");
        while(miles.test(numero)) {
            numero=numero.replace(miles, "$1" + separador_miles + "$2");
        }
    }

    return numero;
}
function cargar_datos(layer, url, method){
	
	var str, conv_array;	
	var aux_total=0;
	Divlayer = document.getElementById(layer);
	//uso del medotod GET
	ajax=objetoAjax();
	ajax.open(method, url,true);
	ajax.onreadystatechange=function() {
		switch (ajax.readyState)
		{
			case 0:
				Divlayer.innerHTML = "<img src='img/cargando.gif' width='80' height='80'/>";//Connecting...
			break;
			case 1:
				Divlayer.innerHTML = "Loading...";
			break;
			case 2:
				Divlayer.innerHTML = "Charged...";
			break;
			case 3:
				Divlayer.innerHTML = "";//Interacting...<img src='img/cargando.gif' width='80' height='80'/>Interacting...
			break;
			case 4:
				//if (ajax.readyState==4) {
				  //alert(ajax.responseText);
				str= ajax.responseText;
				conv_array = str.split("#");
				
				
				/*long_layer = layer.length-;
				
				capa= layer.substring(0,long_layer);
				
				alert(capa);*/
				var i=1;
				var x=1;
				var almac="";
				switch(layer)
				{
					/*case 'div_empresas':
						document.getElementById('nombre').value = conv_array[0];
						document.getElementById('apellido').value = conv_array[1];
						document.getElementById('telefono').value = conv_array[2];
						document.getElementById('email').value = conv_array[3];
						document.getElementById('direccion').value = conv_array[4];
						document.getElementById('observacion').value = conv_array[5];
						document.getElementById('div_area_interes').innerHTML = conv_array[6];
						document.getElementById('div_curso').innerHTML = conv_array[7];
					break;*/
					case 'cuadro_fraccion5':
						Divlayer.innerHTML = ajax.responseText
					break;
					
					case 'subtotal':
						document.getElementById('mon_plan').value = conv_array[0]
						document.getElementById('monto_plan').value = formato_numero(conv_array[1],2,',','.')
						document.getElementById('sub').value=conv_array[1]
						document.getElementById('subtotal').value = formato_numero(conv_array[1],2,',','.')
						aux_total= Number(document.getElementById('sub').value)+Number(document.getElementById('sub2').value)+Number(document.getElementById('sub3').value);
						document.getElementById('tot').value=formato_numero(aux_total,2,".")
						document.getElementById('total').value=formato_numero(aux_total,2,",",'.');
					break;
					case 'subtotal2':
						document.getElementById('mon_plan2').value = conv_array[0]
						document.getElementById('monto_plan2').value = formato_numero(conv_array[1],2,',','.')
						document.getElementById('sub2').value=conv_array[1]
						document.getElementById('subtotal2').value = formato_numero(conv_array[1],2,',','.')
						/*aux_total= Number(document.getElementById('total').value)+Number(document.getElementById('subtotal2').value);*/
						aux_total= Number(document.getElementById('sub').value)+Number(document.getElementById('sub2').value)+Number(document.getElementById('sub3').value);
						document.getElementById('tot').value=formato_numero(aux_total,2,".")
						document.getElementById('total').value=formato_numero(aux_total,2,",",'.');
					break;
					case 'subtotal3':
						document.getElementById('mon_plan3').value = conv_array[0]
						document.getElementById('monto_plan3').value = formato_numero(conv_array[1],2,',','.')
						document.getElementById('sub3').value=conv_array[1]
						document.getElementById('subtotal3').value = formato_numero(conv_array[1],2,',','.')
						aux_total= Number(document.getElementById('sub').value)+Number(document.getElementById('sub2').value)+Number(document.getElementById('sub3').value);
						document.getElementById('tot').value=formato_numero(aux_total,2,".")
						document.getElementById('total').value= formato_numero(aux_total,2,",",'.');
					break;
					case 'inicial':
						
						document.getElementById('ini').value = ajax.responseText
						document.getElementById('inicial').value = formato_numero(ajax.responseText,2,',','.');
						cargar_datos('num_cuota','http://unisajupiter.dtdns.net/servicios/ajax/select_ajax/monto.php?porc='+document.getElementById('monto').value+'&total='+document.getElementById('ini').value+'&total2='+document.getElementById('tot').value,'GET')
					break;
					
					case 'num_cuota':
						Divlayer.innerHTML = ajax.responseText
					break;
					
					case 'municipio':
						document.getElementById('municipio').innerHTML = ajax.responseText
						
					break;
					
					case 'municipio_ben'+conv_array[1]:
						document.getElementById("municipio_ben"+conv_array[1]).innerHTML = conv_array[0];
					break;
					
					case 'parent_ben'+conv_array[1]:
						document.getElementById("parent_ben"+conv_array[1]).innerHTML = conv_array[0];
					break;
					
					case 'plan_ben'+conv_array[1]:
						Number(conv_array[2])
						document.getElementById("plan_ben"+conv_array[1]).innerHTML = conv_array[0];
						document.getElementById('tot'+conv_array[1]).value=conv_array[2];
						document.getElementById('monto_ben'+conv_array[1]).value=formato_numero(conv_array[2],2,',','.');
					break;
					
					case 'total_t':
						Number(conv_array[0]);
						formato_numero(conv_array[0],2,',','.')
						document.getElementById("total_t").value = formato_numero(conv_array[0],2,',','.');
						document.getElementById('tot').value=conv_array[0];
						document.getElementById("con").value = conv_array[1];
						
					break;
					
					case 'ced_tit':
					
					
					if (conv_array[19]== true)
					{
					if (ajax.readyState==4){
						document.getElementById('estado').value=conv_array[12]
						almac=conv_array[12];
						cargar_datos('municipio','http://unisajupiter.dtdns.net/servicios/ajax/select_ajax/municipios.php?id_estado='+document.getElementById('estado').value,'GET')
						x=0;
						}
						if (x==0)
						{
					
					
					document.getElementById('cedula_alm').disabled=false;
					document.getElementById('cedula').value=conv_array[0]
					document.getElementById('cedula_alm').value=conv_array[0]
					document.getElementById('cedula').disabled=true;
					document.getElementById('ced_tit').value=conv_array[1]
					document.getElementById('ced_tit').readOnly=true;
					document.getElementById('nombre_tit').value=conv_array[2]
					document.getElementById('nombre_tit').readOnly=true;
					document.getElementById('apellido_tit').value=conv_array[3]
					document.getElementById('apellido_tit').readOnly=true;
					document.getElementById('ocupacion_tit').value=conv_array[4]
					document.getElementById('ocupacion_tit').readOnly=true;
					document.getElementById('dia').value=conv_array[5]
					document.getElementById('dia').readOnly=true;
					document.getElementById('mes').value=conv_array[6]
					document.getElementById('mes').readOnly=true;
					document.getElementById('ano').value=conv_array[7]
					document.getElementById('ano').readOnly=true;
					document.getElementById('lugar_nac').value=conv_array[8]
					document.getElementById('lugar_nac').readOnly=true;
					document.getElementById('sexo').value=conv_array[9]
					document.getElementById('sexo_alm').disabled=false;
					document.getElementById('sexo_alm').value=conv_array[9]
					document.getElementById('sexo').disabled=true;
					document.getElementById('est_civil').value=conv_array[10]
					document.getElementById('est_civil_alm').disabled=false;
					document.getElementById('est_civil_alm').value=conv_array[10]
					document.getElementById('est_civil').disabled=true;
					document.getElementById('direccion').value=conv_array[11]
					document.getElementById('direccion').readOnly=true;
					document.getElementById('estado').value=almac
					document.getElementById('estado_alm').disabled=false;
					document.getElementById('estado_alm').value=almac
					document.getElementById('estado').disabled=true;
					document.getElementById('municipio').value=conv_array[13]
					document.getElementById('municipio_alm').disabled=false;
					document.getElementById('municipio_alm').value=conv_array[13]
					document.getElementById('municipio').disabled=true;
					document.getElementById('cuidad').value=conv_array[14]
					document.getElementById('cuidad').readOnly=true;
					document.getElementById('correo').value=conv_array[15]
					document.getElementById('correo').readOnly=true;
					document.getElementById('fijo').value=conv_array[16]
					document.getElementById('fijo').readOnly=true;
					document.getElementById('movil').value=conv_array[17]
					document.getElementById('movil').readOnly=true;
					document.getElementById('fax').value=conv_array[18]
					document.getElementById('fax').readOnly=true;
					
					validar_fecha();
						}
				
					}
					break;
					
					case 'ced_ben'+conv_array[20]:
					
					if (conv_array[19]== true)
					{
					if (ajax.readyState==4){
						document.getElementById('estado_ben'+conv_array[20]).value=conv_array[12]
						almac=conv_array[12];
						cargar_datos('municipio_ben'+conv_array[20],'http://unisajupiter.dtdns.net/servicios/ajax/select_ajax/mun_ben.php?id_estado='+document.getElementById('estado_ben'+conv_array[20]).value+'&i='+conv_array[20],'GET')
						document.getElementById('sexo-ben'+conv_array[20]).value=conv_array[9]
						cargar_datos('parent_ben'+conv_array[20],'http://unisajupiter.dtdns.net/servicios/ajax/select_ajax/parentesco.php?id_sexo='+document.getElementById('sexo-ben'+conv_array[20]).value+'&i='+conv_array[20],'GET')
						x=0;
						}
						if (x==0)
						{
					
					document.getElementById('cedula_ben'+conv_array[20]).value=conv_array[0]
					document.getElementById('cedula_ben_alm'+conv_array[20]).disabled=false;
					document.getElementById('cedula_ben_alm'+conv_array[20]).value=conv_array[0]
					document.getElementById('cedula_ben'+conv_array[20]).disabled=true;
					document.getElementById('ced_ben'+conv_array[20]).value=conv_array[1]
					document.getElementById('ced_ben'+conv_array[20]).readOnly=true;
					document.getElementById('nombre_ben'+conv_array[20]).value=conv_array[2]
					document.getElementById('nombre_ben'+conv_array[20]).readOnly=true;
					document.getElementById('apellido_ben'+conv_array[20]).value=conv_array[3]
					document.getElementById('apellido_ben'+conv_array[20]).readOnly=true;
					document.getElementById('ocupacion_ben'+conv_array[20]).value=conv_array[4]
					document.getElementById('ocupacion_ben'+conv_array[20]).readOnly=true;
					document.getElementById('dia_ben'+conv_array[20]).value=conv_array[5]
					document.getElementById('dia_ben'+conv_array[20]).readOnly=true;
					document.getElementById('mes_ben'+conv_array[20]).value=conv_array[6]
					document.getElementById('mes_ben'+conv_array[20]).readOnly=true;
					document.getElementById('ano_ben'+conv_array[20]).value=conv_array[7]
					document.getElementById('ano_ben'+conv_array[20]).readOnly=true;
					document.getElementById('lugar_nac_ben'+conv_array[20]).value=conv_array[8]
					document.getElementById('lugar_nac_ben'+conv_array[20]).readOnly=true;
					document.getElementById('sexo-ben'+conv_array[20]).value=conv_array[9]
					document.getElementById('sexo-ben-alm'+conv_array[20]).disabled=false;
					document.getElementById('sexo-ben-alm'+conv_array[20]).value=conv_array[9]
					document.getElementById('sexo-ben'+conv_array[20]).disabled=true;
					document.getElementById('est_civil_ben'+conv_array[20]).value=conv_array[10]
					document.getElementById('est_civil_ben_alm'+conv_array[20]).disabled=false;
					document.getElementById('est_civil_ben_alm'+conv_array[20]).value=conv_array[10]
					document.getElementById('est_civil_ben'+conv_array[20]).disabled=true;
					document.getElementById('dir_ben'+conv_array[20]).value=conv_array[11]
					document.getElementById('dir_ben'+conv_array[20]).readOnly=true;
					document.getElementById('estado_ben'+conv_array[20]).value=almac
					document.getElementById('estado_ben_alm'+conv_array[20]).disabled=false;
					document.getElementById('estado_ben_alm'+conv_array[20]).value=almac
					document.getElementById('estado_ben'+conv_array[20]).disabled=true;
					document.getElementById('municipio_ben'+conv_array[20]).value=conv_array[13]
					document.getElementById('municipio_ben_alm'+conv_array[20]).disabled=false;
					document.getElementById('municipio_ben_alm'+conv_array[20]).value=conv_array[13]
					document.getElementById('municipio_ben'+conv_array[20]).disabled=true;
					document.getElementById('ciudad_ben'+conv_array[20]).value=conv_array[14]
					document.getElementById('ciudad_ben'+conv_array[20]).readOnly=true;
					document.getElementById('correo_ben'+conv_array[20]).value=conv_array[15]
					document.getElementById('correo_ben'+conv_array[20]).readOnly=true;
					document.getElementById('fijo_ben'+conv_array[20]).value=conv_array[16]
					document.getElementById('fijo_ben'+conv_array[20]).readOnly=true;
					document.getElementById('movil_ben'+conv_array[20]).value=conv_array[17]
					document.getElementById('movil_ben'+conv_array[20]).readOnly=true;
					document.getElementById('fax_ben'+conv_array[20]).value=conv_array[18]
					document.getElementById('fax_ben'+conv_array[20]).readOnly=true;
					
					validar_fecha(conv_array[20]);
						}
				
					}
					break;
					
					case 'plan_tit':
					Number(conv_array[1]);
						document.getElementById('plan_tit').innerHTML= conv_array[0];
						document.getElementById('tot').value=conv_array[1];
						document.getElementById('monto').value=formato_numero(conv_array[1],2,',','.');
					break;

					case 'sPaises':
						document.getElementById('sPaises').innerHTML=conv_array[0];
					break;
				}
				 //Divlayer.innerHTML = ajax.responseText
			  	//}
			break;
		}
	}
	  ajax.send(null)
}
