var RegistroAcademicoApp = angular.module('RegistroAcademico');

RegistroAcademicoApp.controller('SistemaController', SistemaController);

function SistemaController() {
    var vm = this;

    vm.Usuario = {
        NombreUsuario: 'admin',
        EsDocente: 0,
        EsAdministrador: 1
    }
    //alert('TODO: define controller');
}