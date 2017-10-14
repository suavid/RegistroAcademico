<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Reset.aspx.cs" Inherits="RegistroAcademico.Reset" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet"> 
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link href="Content/Css/normalize.css" rel="stylesheet" type="text/css" />
    <link href="Content/Css/skeleton.css" rel="stylesheet" type="text/css" />
    <link href="Content/Css/main.css" rel="stylesheet" type="text/css"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Panel principal</title>
</head>
<body>
    <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.2/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.2/angular-route.js"></script>

    <script type="text/javascript" src="Content/Js/main.js"></script>
    <script type="text/javascript" src="Content/Js/reset.js"></script>
    <div id="container" ng-app="RegistroAcademico" ng-controller="ResetController as vm" style="margin: 0px; padding: 0px;">
        <div style="width: 400px; margin: 200px auto;">
            <form>
                <h5>Actualizar contraseña</h5>
                <label for="NuevaClave">Nueva clave</label>
                <input class="u-full-width" id="NuevaClave" ng-model="vm.Datos.Clave" type="password" />
                <label for="NuevaClave2">Respita su clave</label>
                <input class="u-full-width" id="NuevaClave2" ng-model="vm.Datos.Clave2" type="password" />
                <div style="text-align: right;">
                    <br />
                    <button ng-click="vm.Actualizar();" class="button-primary">Actualizar clave</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>