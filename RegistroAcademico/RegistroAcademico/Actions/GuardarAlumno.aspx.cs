using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class GuardarAlumnos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            string IdAlumno = Request["IdAlumno"];
            string PrimerNombre = Request["PrimerNombre"];
            string SegundoNombre = Request["SegundoNombre"];
            string PrimerApellido = Request["PrimerApellido"];
            string SegundoApellido = Request["SegundoApellido"];
            string FechaNacimiento = Request["FechaNacimiento"];
            string CorreoElectronico = Request["CorreoElectronico"];
            string NumeroTelefono = Request["NumeroTelefono"];
            string NumeroTelefonoSecundario = Request["NumeroTelefonoSecundario"];
            string IdFilial = Request["IdFilial"];
            string Direccion = Request["Direccion"];

            bool resultado = false;

            try
            {
                RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

                if (IdAlumno == "")
                {
                    var Results = db.RegistrarAlumno(PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, DateTime.Parse(FechaNacimiento),CorreoElectronico, NumeroTelefono,NumeroTelefonoSecundario, Int32.Parse(IdFilial), Direccion);
                }
                else
                {
                    var Results = db.ActualizarAlumno(Int32.Parse(IdAlumno), PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, DateTime.Parse(FechaNacimiento), CorreoElectronico, NumeroTelefono, NumeroTelefonoSecundario, Int32.Parse(IdFilial), Direccion);
                }

                resultado = true;
            }
            catch (Exception ex)
            {
                resultado = false;
            }


            var JSON = new { success = resultado };

            string respuesta = serializer.Serialize(JSON);

            Response.Write(respuesta);
        }
    }
}