var RegistroAcademicoApp = angular.module('RegistroAcademico');

RegistroAcademicoApp.controller('LoginController', LoginController);

function LoginController($http) {
    var vm = this;

    vm.LoginData = {
        Usuario: "",
        Clave: ""
    }

    vm.Login = Login;

    ValidateSession();

    function Login() {
        $http.post('Actions/LoginUser.aspx', vm.LoginData, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            if (response.data.success == true) {
                location.href = 'index.aspx'
            } else {
                alert("Usuario o clave incorrectos");
            }
        });
    }

    function ValidateSession() {
        $http.post('Actions/ValidateSession.aspx', {}, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            if (response.data.success == true) {
                location.href = 'index.aspx'
            }
        });
    }
}