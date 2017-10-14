var RegistroAcademicoApp = angular.module('RegistroAcademico');

RegistroAcademicoApp.controller('LoginController', LoginController);

function LoginController() {
    var vm = this;

    vm.Login = Login;

    function Login() {
        alert('TODO: define login function');
    }
}