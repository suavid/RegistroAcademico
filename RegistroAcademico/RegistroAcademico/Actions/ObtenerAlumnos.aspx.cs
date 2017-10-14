using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class ObtenerAlumnos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            string formato = "dd/MM/yyyy";

            RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

            var Results = db.ObtenerAlumnos();

            List<object> Result = new List<object>();

            foreach (RegistroAcademico.ObtenerAlumnosResult res in Results)
            {
                Result.Add(new
                {
                    IdAlumno = res.IdAlumno,
                    PrimerNombre = res.PrimerNombre,
                    SegundoNombre = res.SegundoNombre,
                    PrimerApellido = res.PrimerApellido,
                    SegundoApellido = res.SegundoApellido,
                    FechaNacimiento = ((DateTime)res.FechaNacimiento).ToString(formato),
                    CorreoElectronico = res.CorreoElectronico,
                    NumeroTelefono = res.NumeroTelefono,
                    NumeroTelefonoSecundario = res.NumeroTelefonoSecundario,
                    Direccion = res.Direccion,
                    Filial =  res.NombreFilial,
                    IdFilial = res.Filial,
                    TieneUsuario = res.TieneUsuario

                });
            }

            string respuesta = serializer.Serialize(Result);

            Response.Write(respuesta);
        }
    }
}