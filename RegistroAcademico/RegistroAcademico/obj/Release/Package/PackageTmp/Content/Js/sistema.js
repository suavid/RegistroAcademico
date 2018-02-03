// Inicialización del módulo
var RegistroAcademicoApp = angular.module('RegistroAcademico');

// Creación del controlador principal de la aplicación
RegistroAcademicoApp.controller('SistemaController', SistemaController);

// Configuración del routing del sitio, esto cargará el html necesario para cada sección de la aplicación
RegistroAcademicoApp.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "Html/start.html"
    })
    .when("/filiales", {
        templateUrl: "Html/filiales.html"
    })
    .when("/alumnos", {
        templateUrl: "Html/alumnos.html"
    })
    .when("/usuarios", {
        templateUrl: "Html/usuarios.html"
    })
    .when("/materias", {
        templateUrl: "Html/materias.html"
    })
    .when("/horarios", {
        templateUrl: "Html/horarios.html"
    })
    .when("/notas", {
        templateUrl: "Html/notas.html"
    })
    .when("/reportenotas", {
        templateUrl: "Html/reportenotas.html"
    })
    .when("/reportenotas2", {
            templateUrl: "Html/reportenotas2.html"
    })
    .when("/docentes", {
        templateUrl: "Html/docentes.html"
    })
    .when("/cuenta", {
        templateUrl: "Html/cuenta.html"
    })
    .when("/clases", {
        templateUrl: "Html/clases.html"
    })
    .when("/inscripciones", {
        templateUrl: "Html/inscripciones.html"
    })
    .when("/evaluacion", {
        templateUrl: "Html/evaluacion.html"
    })
    .when("/asignaciones", {
        templateUrl: "Html/asignaciones.html"
    })
    .when("/calificaciones", {
        templateUrl: "Html/calificaciones.html"
    })
    .when("/misasignaturas", {
        templateUrl: "Html/misasignaturas.html"
    })
    .when("/misasignaturas2", {
        templateUrl: "Html/misasignaturas2.html"
    });


});

// Definición del controlador del sistema
function SistemaController($http, $scope) {
    var vm = this;

    // Definicion de campos requeridos
    var FilialMV = ['Nombre', 'RazonSocial', 'Direccion'];
    var AlumnoMV = ['PrimerNombre', 'PrimerApellido', 'FechaNacimiento', 'CorreoElectronico', 'NumeroTelefono', 'Direccion', 'IdFilial'];
    var DocenteMV = ['PrimerNombre', 'PrimerApellido', 'FechaNacimiento', 'CorreoElectronico', 'NumeroTelefono', 'Direccion'];
    var UsuarioMV = ['NombreUsuario'];
    var HorarioMV = ['Desc'];
    var AsignaturaMV = ['Nombre', 'NotaMinimaDeAprobacion'];
    var ClaseMV = ['FechaInicio','FechaFin','NumeroSesiones','DuracionDeSesion','ImpartidaPor','AsignaturaImpartida','Horario'];

    // Banderas de control
    vm.ActivePopup = 0; 
    vm.PopupNew = 0;
    vm.PopupEdit = 0;
    vm.PopupUser = 0;

    vm.NPeriodo = 0;
    vm.IdPeriodo = 0;
    vm.IdAsignacionSeleccionada = 0;


    window.onhashchange = function () {
        if (location.href.split("#!/").length > 1) {
            var ResourceName = location.href.split("#!/")[1].split("?")[0];
            if (ResourceName == 'asignaciones') {
                var Params = location.href.split("?")[1];
                var v1 = Params.split('&')[0].split('=')[1];
                var v2 = Params.split('&')[1].split('=')[1];
                vm.IdPeriodo = v1;
                vm.NPeriodo = v2;
                $("#btn1").css('display', 'none');
                vm.ObtenerAsignaciones();
            }

            if (ResourceName == 'calificaciones') {
                var Params = location.href.split("?")[1];
                var v1 = Params.split('&')[0].split('=')[1];
                vm.IdAsignacionSeleccionada = v1;
                vm.ObtenerAlumnosPorAsignacion();
            }
        }
    }


    var ResourceName = "";

    if (location.href.split("#!/").length > 1) {
        ResourceName = location.href.split("#!/")[1].split("?")[0];
    }

    if (ResourceName == 'asignaciones' ) {
        location.href = '#!/evaluacion';
    }

    if (ResourceName == 'calificaciones') {
        location.href = '#!/evaluacion';
    }

    vm.AlumnoSeleccionado = 0;
    vm.ClaseSeleccionada = 0;

    // Variables para formularios
    vm.Filial = {
        idFilial: "",
        Nombre: "",
        RazonSocial: "",
        Direccion: "",
        NumeroTelefono: ""
    };

    vm.Alumno = {
        IdAlumno: "",
        PrimerNombre: "",
        SegundoNombre: "",
        PrimerApellido: "",
        SegundoApellido: "",
        FechaNacimiento: "",
        CorreoElectronico: "",
        NumeroTelefono: "",
        NumeroTelefonoSecundario: "",
        Filial: "",
        Direccion: "",
        IdFilial: ""
    }

    vm.Docente = {
        IdDocente: "",
        PrimerNombre: "",
        SegundoNombre: "",
        PrimerApellido: "",
        SegundoApellido: "",
        FechaNacimiento: "",
        CorreoElectronico: "",
        NumeroTelefono: "",
        NumeroTelefonoSecundario: "",
        Direccion: ""
    }

    vm.Asignatura = {
        IdAsignatura: "",
        Nombre: "",
        Descripcion: "",
        NotaMinimaDeAprobacion: ""
    };

    vm.Horario = {
        IdHorario: "0",
        Desc: "",
        Dia: "LUN",
        HoraInicio: "00:00"
    }

    vm.DatosUsuario = {
        IdDatos: 0,
        NombreUsuario: "",
        EsDocente: 0,
        CorreoUsuario: ""
    }

    vm.Clase = {
        IdClase: "",
        FechaInicio: "",
        FechaFin: "",
        NumeroSesiones: "0",
        DuracionDeSesion: "0",
        ImpartidaPor: "0",
        AsignaturaImpartida: "0",
        Local: "",
        Horario: ""
    }

    vm.Asignacion = {
        TipoEvaluacion: '',
        TituloDeAsignacion: '',
        DescripcionDeAsignacion: '',
        FechaLimite: ''
    };

    vm.CambioPorcentajePeriodo = {
        IdPeriodoOrigen: 0,
        IdPeriodoDestino: 0,
        Porcentaje: 0
    }

    vm.CambioPorcentajeAsignacion = {
        IdAsignacionOrigen: 0,
        IdAsignacionDestino: 0,
        Porcentaje: 0
    }

    // Contenedores de datos para tablas
    vm.Filiales = [];
    vm.Alumnos = [];
    vm.Usuarios = [];
    vm.Asignaturas = [];
    vm.Docentes = [];
    vm.Horarios = [];
    vm.Clases = [];
    vm.Asignaciones = [];
    vm.Calificaciones = [];
    vm.ReporteNotas = [];
    vm.ReporteNotas2 = [];
    vm.MisAsignaturas = [];
    vm.MisAsignaturas2 = [];

    vm.Datos = {
        Clave: "",
        Clave2: ""
    }

    vm.Actualizar = Actualizar;
    vm.Inscribir = Inscribir;

    // Funcionalidad para verificar si el usuario ha iniciado sesión
    vm.ValidateSession = ValidateSession;

    // Funcionalidades para el popup de nuevo registro
    vm.ShowPopupNew = ShowPopupNew;
    vm.HidePopupNew = HidePopupNew;
    vm.Save = Save;

    // Funcionalidades para el popup de actualización de registro
    vm.ShowPopupEdit = ShowPopupEdit;
    vm.HidePopupEdit = HidePopupEdit;

    vm.ShowPopupUser = ShowPopupUser;
    vm.HidePopupUser = HidePopupUser;

    // Funcionalidad para eliminar un registro
    vm.DeleteItem = DeleteItem;

    // Cerrar sesión
    vm.Logout = Logout;

    // Datos del usuario
    vm.Usuario = {
        NombreUsuario: ' Cargando... ',
        EsDocente: 0,
        EsAdministrador: 0,
        Reset: 0,
        IdDatos: 0
    }

    // Funciones para obtener datos
    vm.ObtenerFiliales = ObtenerFiliales;
    vm.ObtenerAlumnos = ObtenerAlumnos;
    vm.ObtenerUsuarios = ObtenerUsuarios;
    vm.ObtenerAsignaturas = ObtenerAsignaturas;
    vm.ObtenerAsignaturasDisponibles = ObtenerAsignaturasDisponibles;
    vm.ObtenerDocentes = ObtenerDocentes;
    vm.ObtenerHorarios = ObtenerHorarios;
    vm.ObtenerClases = ObtenerClases;
    vm.ObtenerPeriodosPorClase = ObtenerPeriodosPorClase;
    vm.AgregarPeriodo = AgregarPeriodo;
    vm.EditarPorcentajesDePeriodo = EditarPorcentajesDePeriodo;
    vm.ActualizarPorcentajesPeriodo = ActualizarPorcentajesPeriodo;
    vm.AgregarNuevaAsignacion = AgregarNuevaAsignacion;
    vm.ObtenerAsignaciones = ObtenerAsignaciones;
    vm.EditarPorcentajesDeAsignacion = EditarPorcentajesDeAsignacion;
    vm.ActualizarPorcentajesAsignacion = ActualizarPorcentajesAsignacion;
    vm.ObtenerAlumnosPorAsignacion = ObtenerAlumnosPorAsignacion;
    vm.Calificar = Calificar;
    vm.ObtenerReporteDeNotas = ObtenerReporteDeNotas;
    vm.ProcesarResultadoDelPeriodo = ProcesarResultadoDelPeriodo;
    vm.ObtenerPorcentajeDelPeriodo = ObtenerPorcentajeDelPeriodo;
    vm.ObtenerNotaFinal = ObtenerNotaFinal;
    vm.ObtenerNotaMinima = ObtenerNotaMinima;
    vm.CerrarClase = CerrarClase;
    vm.ObtenerResultadoAsignaturas = ObtenerResultadoAsignaturas;
    vm.ObtenerResultadoAsignaturas2 = ObtenerResultadoAsignaturas2;
    vm.ObtenerReporteDeNotas2 = ObtenerReporteDeNotas2;

    vm.CreateUser = CreateUser;

    // Llamado a funciones de inicializacion
    vm.ValidateSession();
    vm.ObtenerFiliales();
    vm.ObtenerAlumnos();
    vm.ObtenerUsuarios();
    vm.ObtenerAsignaturas();
    vm.ObtenerDocentes();
    vm.ObtenerHorarios();
    vm.ObtenerClases();

    // Valida la session cada minuto
    setInterval(vm.ValidateSession, 60000);

    ObtenerDatosUsuario();

    // Definición de funciones //

    function ProcesarResultadoDelPeriodo(IdPeriodo, ArregloDenotas) {
        NotaDelPeriodo = 0;

        for (var i = 0; i < ArregloDenotas.length; i++)
        {
            if (ArregloDenotas[i].IdPeriodo == IdPeriodo) {
                NotaDelPeriodo += (ArregloDenotas[i].Nota * ArregloDenotas[i].PorcentajeAsignacion);
            }
        }

        return NotaDelPeriodo;
    }

    function ObtenerPorcentajeDelPeriodo(IdPeriodo, ArregloDenotas) {
        PorcentajeDelPeriodo = 0;

        for (var i = 0; i < ArregloDenotas.length; i++) {
            if (ArregloDenotas[i].IdPeriodo == IdPeriodo) {
                PorcentajeDelPeriodo = ArregloDenotas[i].PorcentajePeriodo;
            }
        }

        return PorcentajeDelPeriodo;
    }

    function ObtenerNotaFinal(Asignatura, ArregloDePeriodos) {
        var NotaFinal = 0;
        var ArrayDeNotas = [];
        var NotasPeriodos = new Object();

        for (var item in ArregloDePeriodos) {
            for (var j = 0; j < ArregloDePeriodos[item].length; j++) {
                ArrayDeNotas.push(ArregloDePeriodos[item][j]);
            }
        }

        for (var i = 0; i < ArrayDeNotas.length; i++) {
            if (ArrayDeNotas[i].Asignatura == Asignatura) {
                NotasPeriodos[ArrayDeNotas[i].IdPeriodo] = vm.ProcesarResultadoDelPeriodo(ArrayDeNotas[i].IdPeriodo, ArrayDeNotas) * ArrayDeNotas[i].PorcentajePeriodo;
            }
        }

        for (var p in NotasPeriodos) {
            NotaFinal += NotasPeriodos[p];
        }

        return NotaFinal;
    }

    function ObtenerNotaMinima(Asignatura, ArregloDePeriodos) {
        var NotaMinima = 0;
        var ArrayDeNotas = [];

        for (var item in ArregloDePeriodos) {
            for (var j = 0; j < ArregloDePeriodos[item].length; j++) {
                ArrayDeNotas.push(ArregloDePeriodos[item][j]);
            }
        }

        for (var i = 0; i < ArrayDeNotas.length; i++) {
            if (ArrayDeNotas[i].Asignatura == Asignatura) {
                NotaMinima = ArrayDeNotas[i].NotaMinimaDeAprobacion;
            }
        }

        return NotaMinima;
    }

    function CerrarClase() {
        if(confirm("ADVERTENCIA!!!!: \n\nEste proceso finalizará la clase y cerrará todos los períodos activos\nesta acción no puede deshacerse y de ser ejecutada antes de tiempo podría reprobar a los estudiantes sin \ntener completas sus calificaciones\n\n Está seguro que desea continuar?")){
            $http.post('Actions/FinalizarClase.aspx', {IdClase: vm.ClaseSeleccionada}, {
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
                    alert("Clase finalizada con éxito");
                } else {
                    alert("Ha ocurrido un error inesperado");
                }
            });
        }
    }

    // Valida si existe una sesion activa
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
            if (response.data.success == false) {
                location.href = 'login.aspx'
            }
        });
    }

    function ObtenerDatosUsuario() {
        $http.post('Actions/SessionData.aspx', {}, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            vm.Usuario = response.data[0];
            vm.ObtenerReporteDeNotas();
            vm.ObtenerResultadoAsignaturas();
            if (vm.Usuario.Reset == 1) {
                location.href = 'Reset.aspx';
            }
        });
    }

    function ObtenerResultadoAsignaturas() {
        $http.post('Actions/ObtenerResultadoAsignaturas.aspx', { IdAlumno: vm.Usuario.IdDatos }, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            vm.MisAsignaturas = response.data;
        });
    }

    function ObtenerResultadoAsignaturas2() {
        $http.post('Actions/ObtenerResultadoAsignaturas.aspx', { IdAlumno: vm.AlumnoSeleccionado }, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            vm.MisAsignaturas2 = response.data;
        });
    }

    function ObtenerReporteDeNotas() {
        $http.post('Actions/ObtenerReporteDeNotas.aspx', {IdAlumno: vm.Usuario.IdDatos}, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {

            var Datos = new Object();

            for (var pos in response.data) {
                var item = response.data[pos];
                Datos[item.Asignatura] = new Object();
            }

            for (var pos in response.data) {
                var item = response.data[pos];
                Datos[item.Asignatura][item.IdPeriodo] = [];
            }

            for (var pos in response.data) {
                var item = response.data[pos];
                Datos[item.Asignatura][item.IdPeriodo].push(item);
            }

            vm.ReporteNotas = Datos;

        });
    }

    function ObtenerReporteDeNotas2() {
        $http.post('Actions/ObtenerReporteDeNotas.aspx', { IdAlumno: vm.AlumnoSeleccionado }, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {

            var Datos = new Object();

            for (var pos in response.data) {
                var item = response.data[pos];
                Datos[item.Asignatura] = new Object();
            }

            for (var pos in response.data) {
                var item = response.data[pos];
                Datos[item.Asignatura][item.IdPeriodo] = [];
            }

            for (var pos in response.data) {
                var item = response.data[pos];
                Datos[item.Asignatura][item.IdPeriodo].push(item);
            }

            vm.ReporteNotas2 = Datos;

        });
    }


    function CreateUser(view) {
        if (view == 'alumno') vm.DatosUsuario.EsDocente = 0; else vm.DatosUsuario.EsDocente = 1;
        if (VerificarCamposRequeridos(vm.DatosUsuario, UsuarioMV)) {
            $http.post('Actions/CrearUsuario.aspx', vm.DatosUsuario, {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
                },
                transformRequest: [function (data) {
                    return angular.isObject(data)
                        ? jQuery.param(data)
                        : data;
                }]
            }).then(function (response) {
                HidePopupUser();
                RestablecerVariables();
                vm.ObtenerAlumnos();
                if (response.data.success = true) {
                    alert("Usuario creado con éxito, la clave de acceso fue enviada al correo del usuario");
                } else {
                    alert("Ha ocurrido un error al crear el usuario");
                }
            });
        }
    }

    function Inscribir(data) {

        var Data = {
            IdAlumno: vm.AlumnoSeleccionado,
            IdClase: data.IdClase,
            IdAsignatura: data.AsignaturaImpartida
        }

        $http.post('Actions/Inscribir.aspx', Data, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            vm.ObtenerAsignaturasDisponibles();
        });

    }

    function AgregarPeriodo() {

        var Data = {
            IdClase: vm.ClaseSeleccionada
        }

        if (vm.ClaseSeleccionada != 0) {

            $http.post('Actions/AgregarPeriodo.aspx', Data, {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
                },
                transformRequest: [function (data) {
                    return angular.isObject(data)
                        ? jQuery.param(data)
                        : data;
                }]
            }).then(function (response) {
                vm.ObtenerPeriodosPorClase();
            });
        }
    }

    // Finaliza la seccion actual
    function Logout() {
        $http.post('Actions/CloseSession.aspx', {}, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            location.href = 'login.aspx'
        });
    }

    // Muestra el formulario para nuevo registro
    function ShowPopupNew() {
        vm.ActivePopup = 1;
        vm.PopupNew = 1;
    }

    // Esconde el formulario para nuevo registro
    function HidePopupNew() {
        vm.ActivePopup = 0;
        vm.PopupNew = 0;
        // Reestablece las variables al ocultar un popup
        RestablecerVariables();
    }

    // Formulario de edicion
    function ShowPopupEdit(view, data) {
        // Dependiendo del tipo de vista asi asigna la fila seleccionada a la variable que contiene los datos a ser enviados
        switch (view) {
            case 'filial':
                vm.Filial = data;
                break;
            case 'alumno':
                vm.Alumno = data;
                break;
            case 'asignatura':
                vm.Asignatura = data;
                break;
            case 'clase':
                vm.Clase = data;
                break;
            case 'docente':
                vm.Docente = data;
                break;
        }
        vm.ActivePopup = 1;
        vm.PopupEdit = 1;
    }

    function EditarPorcentajesDePeriodo() {
        vm.ActivePopup = 1;
        vm.PopupEdit = 1;
    }

    function EditarPorcentajesDeAsignacion() {
        vm.ActivePopup = 1;
        vm.PopupEdit = 1;
    }

    // Esconde el formulario para edicion, reestablece el valor de las variables al cerrar el formulario 
    function HidePopupEdit() {
        vm.ActivePopup = 0;
        vm.PopupEdit = 0;
        RestablecerVariables();
    }

    function ShowPopupUser(data,view) {
        if (view == 'alumno') {
            vm.DatosUsuario.IdDatos = data.IdAlumno;
        } else {
            vm.DatosUsuario.IdDatos = data.IdDocente;
        }
        
        vm.DatosUsuario.CorreoUsuario = data.CorreoElectronico;

        vm.ActivePopup = 1;
        vm.PopupUser = 1;
    }

    function HidePopupUser() {
        vm.ActivePopup = 0;
        vm.PopupUser = 0;
        RestablecerVariables();
    }

    function ActualizarPorcentajesPeriodo() {

        var Data = vm.CambioPorcentajePeriodo;

        Data.Porcentaje = Data.Porcentaje / 100;

        $http.post('Actions/ActualizarPorcentajesPeriodo.aspx', Data, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            // ejecuta el callback
            ObtenerPeriodosPorClase();
            // Reestablece todas las variables
            RestablecerVariables();
            // Esconde todos los popup
            HidePopupEdit();
        });
    }

    function ActualizarPorcentajesAsignacion() {

        var Data = vm.CambioPorcentajeAsignacion;

        Data.Porcentaje = Data.Porcentaje / 100;

        $http.post('Actions/ActualizarPorcentajesAsignatura.aspx', Data, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            // ejecuta el callback
            ObtenerAsignaciones();
            // Reestablece todas las variables
            RestablecerVariables();
            // Esconde todos los popup
            HidePopupEdit();
        });
    }

    function Calificar(Alumno, IdAsignacion){
        var calificacion = $('#nota_' + Alumno).val();

        var Data = {
            IdAlumno: Alumno,
            Asignacion: IdAsignacion,
            nota: calificacion
        }

        $http.post('Actions/Calificar.aspx', Data, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            // ejecuta el callback
            ObtenerAlumnosPorAsignacion();
            // Reestablece todas las variables
            RestablecerVariables();
            // Esconde todos los popup
            HidePopupNew();
            HidePopupEdit();
            alert("Calificación asignada con éxito")
        });
    }

    function AgregarNuevaAsignacion() {
        // Url a la que se enviaran los datos
        var url = '';
        // Funcion que se ejecutara al finalizar el proceso, generalmente recarga de los datos de una tabla
        var callback = null;
        // Datos que seran enviados al servidor
        var Data = {};
        // Campos requeridos para el formulario en cuestion
        var MV = [];

        url = 'Actions/AgregarAsignacion.aspx';

        callback = ObtenerAsignaciones;

        Data = {
            IdPeriodo: 0,
            TipoEvaluacion: '',
            TituloDeAsignacion: '',
            DescripcionDeAsignacion: '',
            FechaLimite:''
        };

        Data.IdPeriodo = vm.IdPeriodo;
        Data.TipoEvaluacion = vm.Asignacion.TipoEvaluacion;
        Data.TituloDeAsignacion = vm.Asignacion.TituloDeAsignacion;
        Data.DescripcionDeAsignacion = vm.Asignacion.DescripcionDeAsignacion;
        Data.FechaLimite = vm.Asignacion.FechaLimite;

        // Envia la peticion al servidor
        if (VerificarCamposRequeridos(Data, MV)) {
            $http.post(url, Data, {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
                },
                transformRequest: [function (data) {
                    return angular.isObject(data)
                        ? jQuery.param(data)
                        : data;
                }]
            }).then(function (response) {
                // ejecuta el callback
                callback();
                // Reestablece todas las variables
                RestablecerVariables();
                // Esconde todos los popup
                HidePopupNew();
                HidePopupEdit();
            });
        } else {
            // Si la validacion de campos requeridos falla envia una alerta al usuario
            alert("Por favor complete todos los campos marcados con '*'");
        }
    }

    // Funcion para guardar datos
    function Save(view, action) {
        // Url a la que se enviaran los datos
        var url = '';
        // Funcion que se ejecutara al finalizar el proceso, generalmente recarga de los datos de una tabla
        var callback = null;
        // Datos que seran enviados al servidor
        var Data = {};
        // Campos requeridos para el formulario en cuestion
        var MV = [];

        // Las variables anteriores se llenan dependiendo de la vista que este siendo procesada
        switch (view) {
            case 'filial':
                // Asigna los datos correspondientes a filial
                Data = vm.Filial;
                MV = FilialMV;
                url = 'Actions/GuardarFilial.aspx';
                callback = ObtenerFiliales;
                break;
            case 'alumno':
                Data = vm.Alumno;
                MV = AlumnoMV;
                url = 'Actions/GuardarAlumno.aspx';
                callback = ObtenerAlumnos;
                break;
            case 'asignatura':
                Data = vm.Asignatura;
                MV = AsignaturaMV;
                url = 'Actions/GuardarAsignatura.aspx';
                callback = ObtenerAsignaturas;
                break;
            case 'docente':
                Data = vm.Docente;
                MV = DocenteMV;
                url = 'Actions/GuardarDocente.aspx';
                callback = ObtenerDocentes;
                break;
            case 'horario':
                Data = vm.Horario;
                MV = HorarioMV;
                url = 'Actions/GuardarHorario.aspx';
                callback = ObtenerHorarios;
                if (vm.Horario.IdHorario != "0") {
                    vm.Horario.Desc = "UPDATE";
                }
                break;
            case 'clase':
                Data = vm.Clase;
                MV = ClaseMV;
                url = 'Actions/GuardarClase.aspx';
                callback = ObtenerClases;
                break;
        }

        // Envia la peticion al servidor
        if (VerificarCamposRequeridos(Data, MV)) {
            $http.post(url, Data, {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
                },
                transformRequest: [function (data) {
                    return angular.isObject(data)
                        ? jQuery.param(data)
                        : data;
                }]
            }).then(function (response) {
                // ejecuta el callback
                callback();
                // Reestablece todas las variables
                RestablecerVariables(); 
                // Esconde todos los popup
                HidePopupNew();
                HidePopupEdit();
            });
        } else {
            // Si la validacion de campos requeridos falla envia una alerta al usuario
            alert("Por favor complete todos los campos marcados con '*'");
        }
    }

    // Elimina un registro de una tabla
    function DeleteItem(view, data) {
        // Requiere confirmacion del usuario
        if (confirm("Esta seguro que desea eliminar/bloquear el registro?")) {
            // Variables necesarias para la eliminacion, dependeran de la vista utilizada
            // Url que atendiende la peticion de eliminacion
            var url = '';
            // Funcion que se ejecutara al terminar el proceso
            var callback = null;
            // Datos que seran enviados al servidor
            var JsData = {};
            // Se llenan los datos dependiendo de la vista
            switch (view) {
                case 'filial':
                    JsData = data;
                    url = 'Actions/EliminarFilial.aspx';
                    callback = ObtenerFiliales;
                case 'alumno':
                    JsData = data;
                    url = 'Actions/EliminarAlumno.aspx';
                    callback = ObtenerAlumnos;
                    break;
                case 'usuario':
                    JsData = data;
                    url = 'Actions/BloquearUsuario.aspx';
                    callback = ObtenerUsuarios;
                    break;
                case 'asignatura':
                    JsData = data;
                    url = 'Actions/EliminarAsignatura.aspx';
                    callback = ObtenerAsignaturas;
                    break;
                case 'docente':
                    JsData = data;
                    url = 'Actions/EliminarDocente.aspx';
                    callback = ObtenerDocentes;
                    break;
                case 'clase':
                    JsData = data;
                    url = 'Actions/EliminarClase.aspx';
                    callback = ObtenerClases;
                    break;
                case 'periodo':
                    JsData = data;
                    url = 'Actions/EliminarPeriodo.aspx';
                    callback = ObtenerPeriodosPorClase;
                    break;
                case 'asignacion':
                    JsData = data;
                    url = 'Actions/EliminarAsignacion.aspx';
                    callback = ObtenerAsignaciones;
                    break;
                case 'horario':
                    JsData = data;
                    url = 'Actions/EliminarHorario.aspx';
                    callback = ObtenerHorarios;
                    break;
            }
            // Se realiza la peticion al servidor
            $http.post(url, JsData, {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
                },
                transformRequest: [function (data) {
                    return angular.isObject(data)
                        ? jQuery.param(data)
                        : data;
                }]
            }).then(function (response) {
                if (response.data.success == false) {
                    // Si el proceso devuelve falso no fue posible eliminar el registro por la relacion de las tablas
                    alert("No es posible eliminar el registro. Posee dependencias. ")
                }
                // Se ejecutan todas las funciones post proceso
                callback();
                RestablecerVariables();
            });
        }
    }

    function ObtenerAsignaciones() {
        $http.post('Actions/ObtenerAsignaciones.aspx', {IdPeriodo: vm.IdPeriodo}, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            vm.Asignaciones = response.data;
        });
    }

    function ObtenerAlumnosPorAsignacion() {
        $http.post('Actions/ObtenerAlumnosPorAsignacion.aspx', { IdPeriodoDetalle: vm.IdAsignacionSeleccionada }, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            vm.Calificaciones = response.data;
        });
    }

    // Permite obtener las filiales
    function ObtenerFiliales() {
        $http.post('Actions/ObtenerFiliales.aspx', {}, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            vm.Filiales = response.data;
        });
    }

    function ObtenerHorarios() {
        $http.post('Actions/ObtenerHorarios.aspx', {}, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            vm.Horarios = response.data;
            vm.Horario.IdHorario = "0";
        });
    }

    function ObtenerClases() {
        $http.post('Actions/ObtenerClases.aspx', {}, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            vm.Clases = response.data;
        });
    }


    // Permite obtener los alumnos
    function ObtenerAlumnos() {
        $http.post('Actions/ObtenerAlumnos.aspx', {}, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            vm.Alumnos = response.data;
        });
    }

    function ObtenerDocentes() {
        $http.post('Actions/ObtenerDocentes.aspx', {}, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            vm.Docentes = response.data;
        });
    }

    // Permite obtener los usuarios
    function ObtenerUsuarios() {
        $http.post('Actions/ObtenerUsuarios.aspx', {}, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            vm.Usuarios = response.data;
        });
    }

    function ObtenerAsignaturas() {
        $http.post('Actions/ObtenerAsignaturas.aspx', {}, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            vm.Asignaturas = response.data;
        });
    }

    function ObtenerPeriodosPorClase() {
        $http.post('Actions/ObtenerPeriodosPorClase.aspx', { IdClase: vm.ClaseSeleccionada }, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            vm.Periodos = response.data;
        });
    }

    function ObtenerAsignaturasDisponibles() {
        $http.post('Actions/ObtenerAsignaturasDisponibles.aspx', {IdAlumno: vm.AlumnoSeleccionado}, {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded;charset=utf-8'
            },
            transformRequest: [function (data) {
                return angular.isObject(data)
                    ? jQuery.param(data)
                    : data;
            }]
        }).then(function (response) {
            vm.AsignaturasDisponibles = response.data;
        });
    }

    // Funcion que verifica que los campos requeridos esten presentes
    function VerificarCamposRequeridos(Data, Campos) {
        for (x in Campos) {
            if (String(Data[Campos[x]]).trim() == "" || String(Data[Campos[x]]).trim() == "0") {
                return false;
            }
        }

        return true;
    }

    // Reestablece las variables contenedoras de datos
    function RestablecerVariables() {
        vm.Filial = {
            idFilial: "",
            Nombre: "",
            RazonSocial: "",
            Direccion: "",
            NumeroTelefono: ""
        };

        vm.Alumno = {
            IdAlumno: "",
            PrimerNombre: "",
            SegundoNombre: "",
            PrimerApellido: "",
            SegundoApellido: "",
            FechaNacimiento: "",
            CorreoElectronico: "",
            NumeroTelefono: "",
            NumeroTelefonoSecundario: "",
            Filial: "",
            Direccion: "",
            IdFilial: ""
        }

        vm.DatosUsuario = {
            IdDatos: 0,
            NombreUsuario: "",
            Clave: "",
            EsDocente: 0
        }

        vm.Asignatura = {
            idAsignatura: "",
            Nombre: "",
            Descripcion: "",
            NotaMinimaDeAprobacion: ""
        };

        vm.Docente = {
            IdDocente: "",
            PrimerNombre: "",
            SegundoNombre: "",
            PrimerApellido: "",
            SegundoApellido: "",
            FechaNacimiento: "",
            CorreoElectronico: "",
            NumeroTelefono: "",
            NumeroTelefonoSecundario: "",
            Direccion: ""
        }

        vm.Horario = {
            IdHorario: "0",
            Desc: "",
            Dia: "LUN",
            HoraInicio: "00:00"
        }

        vm.Clase = {
            IdClase: "",
            FechaInicio: "",
            FechaFin: "",
            NumeroSesiones: "0",
            DuracionDeSesion: "0",
            ImpartidaPor: "0",
            AsignaturaImpartida: "0",
            Local: "",
            Horario: ""
        }

        vm.Asignacion = {
            TipoEvaluacion: '',
            TituloDeAsignacion: '',
            DescripcionDeAsignacion: '',
            FechaLimite: ''
        };
    }

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
                        alert(response.data.errorMessage);
                    }
                });
            }
        }
    }
}