// Inicialización del módulo
var RegistroAcademicoApp = angular.module('RegistroAcademico');

// Creación del controlador principal de la aplicación
RegistroAcademicoApp.controller('ResetController', ResetController);

// Definición del controlador del sistema
function ResetController($http) {
    var vm = this;

    vm.Datos = {
        Clave: "",
        Clave2: "" 
    }

    vm.Actualizar = Actualizar;

    function Actualizar() {

        if (vm.Datos.Clave != vm.Datos.Clave2) {
            alert('Las claves no coinciden');
        } else {

            if (vm.Datos.Clave.length < 6) {
                alert('La clave debe tener al menos 6 caracteres');
            } else {
                $http.post('Actions/ActualizarUsuario.aspx', vm.Datos, {
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
                        alert('Clave actualizada con éxito');
                        location.href = 'index.aspx'
                    } else {
                        alert('Ocurrió un error inesperado');
                    }
                });
            }
        }
    }
}