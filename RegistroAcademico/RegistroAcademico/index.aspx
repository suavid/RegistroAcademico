<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="RegistroAcademico.index" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet"/> 
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
    <link href="Content/Css/normalize.css" rel="stylesheet" type="text/css" />
    <link href="Content/Css/skeleton.css" rel="stylesheet" type="text/css" />
    <link href="Content/ui/jquery-ui.css" rel="stylesheet"/>
    <link href="Content/Css/main.css" rel="stylesheet" type="text/css"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Panel principal</title>
</head>
<body>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.2/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.2/angular-route.js"></script>
    <script src="Content/ui/jquery-ui.js"></script>
    <script type="text/javascript" src="Content/Js/main.js"></script>
    <script type="text/javascript" src="Content/Js/sistema.js"></script>
    <script type="text/javascript">
        var patron_dui = new Array(8, 1);
        var patron_nit = new Array(4, 6, 3, 1);
        var patron_telefono = new Array(4, 4);
        var patron_fecha = new Array(4, 2, 2);
        function mascara(d, sep, pat, nums) {
            if (d.valant != d.value) {
                val = d.value
                largo = val.length
                val = val.split(sep)
                val2 = ''
                for (r = 0; r < val.length; r++) {
                    val2 += val[r]
                }
                if (nums) {
                    for (z = 0; z < val2.length; z++) {
                        if (isNaN(val2.charAt(z))) {
                            letra = new RegExp(val2.charAt(z), "g")
                            val2 = val2.replace(letra, "")
                        }
                    }
                }
                val = ''
                val3 = new Array()
                for (s = 0; s < pat.length; s++) {
                    val3[s] = val2.substring(0, pat[s])
                    val2 = val2.substr(pat[s])
                }
                for (q = 0; q < val3.length; q++) {
                    if (q == 0) {
                        val = val3[q]
                    }
                    else {
                        if (val3[q] != "") {
                            val += sep + val3[q]
                        }
                    }
                }
            
                d.value = val
                d.valant = val
            }
        }

        function VerificarEntero(d) {
            if (isNaN(d.value)) {
                d.value = "0";
            }
        }
    </script>
    <div id="container" ng-app="RegistroAcademico" ng-controller="SistemaController as vm" style="margin: 0px; padding: 0px;">
        <div style="padding: 20px; background:  #0097a7; color: white; margin: 0px;"> 
            <p class="h1" style="margin: 0px;"><i class="material-icons">settings</i> Panel administrativo</p>
        </div>
        <div style="background:#fff;margin: 0px; padding: 10px;border-bottom: solid 1px #d3d3d3;">
            <div class="menu">

                <div ng-if="vm.Usuario.EsAdministrador == 1">
                    <a href="#!/filiales">
                        <i class="material-icons">place</i>
                        <br />
                        Filiales
                    </a>
                </div>
                <div ng-if="vm.Usuario.EsAdministrador == 1">
                    <a href="#!/alumnos">
                        <i class="material-icons">group</i>
                        <br />
                        Alumnos
                    </a>
                </div>
                <div ng-if="vm.Usuario.EsAdministrador == 1">
                    <a href="#!/docentes">
                        <i class="material-icons">account_box</i>
                        <br />
                        Docentes
                    </a>
                </div>
                <div ng-if="vm.Usuario.EsAdministrador == 1">
                    <a href="#!/usuarios">
                        <i class="material-icons">person</i>
                        <br />
                        Usuarios
                    </a>
                </div>
                <div ng-if="vm.Usuario.EsAdministrador == 1">
                    <a href="#!/materias">
                        <i class="material-icons">assignment</i>
                        <br />
                        Asignaturas
                    </a>
                </div>

                <div ng-if="vm.Usuario.EsAdministrador == 1">
                    <a href="#!/horarios">
                        <i class="material-icons">schedule</i>
                        <br />
                        Horarios
                    </a>
                </div>
                <div ng-if="vm.Usuario.EsAdministrador == 1">
                    <a href="#!/clases">
                        <i class="material-icons">web_asset</i>
                        <br />
                        Clases
                    </a>
                </div>
                <div ng-if="vm.Usuario.EsAdministrador == 1">
                    <a href="#!/inscripciones">
                        <i class="material-icons">book</i>
                        <br />
                        Inscripciones
                    </a>
                </div>
                <div ng-if="vm.Usuario.EsDocente == 1">
                    <a href="#!/evaluacion">
                        <i class="material-icons">done</i>
                        <br />
                        Evaluaciones
                    </a>
                </div>
                <div ng-if="vm.Usuario.EsDocente == 0 &&  vm.Usuario.EsAdministrador == 0">
                    <a href="#!/reportenotas">
                        <i class="material-icons">school</i>
                        <br />
                        Reporte de notas
                    </a>
                </div>
                <div ng-if="vm.Usuario.EsDocente == 0 &&  vm.Usuario.EsAdministrador == 0">
                    <a href="#!/misasignaturas">
                        <i class="material-icons">assignment</i>
                        <br />
                        Mis asignaturas
                    </a>
                </div>
                <div ng-if="vm.Usuario.EsDocente == 1 || vm.Usuario.EsAdministrador == 1">
                    <a href="#!/reportenotas2">
                        <i class="material-icons">school</i>
                        <br />
                        Reporte de notas
                    </a>
                </div>
                <div ng-if="vm.Usuario.EsDocente == 1 ||  vm.Usuario.EsAdministrador == 1">
                    <a href="#!/misasignaturas2">
                        <i class="material-icons">assignment</i>
                        <br />
                        Estado de asignaturas
                    </a>
                </div>
                <div>
                    <a href="#!/cuenta">
                        <i class="material-icons">build</i>
                        <br />
                        Administrar cuenta
                    </a>
                </div>
                <div style="color:#0097a7;">
                    <a href="javascript: void(0);" ng-click="vm.Logout();">
                        <i class="material-icons">power_settings_new</i>
                        <br />
                        Cerrar sesión ({{vm.Usuario.NombreUsuario}})
                    </a>
                </div>
            </div>
            <div style="clear:both;"></div>
        </div>
        <div ng-view style="padding: 10px;">

        </div>
    </div>
</body>
</html>