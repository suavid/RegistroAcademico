<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="login.aspx.cs" Inherits="RegistroAcademico.login" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet"> 
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link href="Content/Css/normalize.css" rel="stylesheet" type="text/css" />
    <link href="Content/Css/skeleton.css" rel="stylesheet" type="text/css" />
    <link href="Content/Css/main.css" rel="stylesheet" type="text/css"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Iniciar sesión</title>
</head>
<body style="background: #f3f3f3;">
    <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.2/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.2/angular-route.js"></script>
    <script type="text/javascript" src="Content/Js/main.js"></script>
    <script type="text/javascript" src="Content/Js/login.js"></script>
    <div id="container" ng-app="RegistroAcademico" ng-controller="LoginController as vm">
        <p class="h1" style="text-align:center;margin-top:20px;">Registro académico</p>
        <div class="formpane">
            <form>
                <p class="h3">Ingreso al sistema</p>
                <p>
                    <i class="material-icons" style="font-size: 120px; color: #a3a3a3;">account_circle</i>
                </p>
                <div>
                    <input type="text" name="usuario" placeholder="Introduce tu usuario" ng-model="vm.LoginData.Usuario"/>
                </div>
                <div>
                    <input type="password" name="clave" placeholder="Introduce tu clave" ng-model="vm.LoginData.Clave" />
                </div>
                <div>
                    <button class="primary button-primary" ng-click="vm.Login();" type="button">Ingresar</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>