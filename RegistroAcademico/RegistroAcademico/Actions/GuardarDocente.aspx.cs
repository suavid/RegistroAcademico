using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class GuardarDocente : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            string IdDocente = Request["IdDocente"];
            string PrimerNombre = Request["PrimerNombre"];
            string SegundoNombre = Request["SegundoNombre"];
            string PrimerApellido = Request["PrimerApellido"];
            string SegundoApellido = Request["SegundoApellido"];
            string FechaNacimiento = Request["FechaNacimiento"];
            string CorreoElectronico = Request["CorreoElectronico"];
            string NumeroTelefono = Request["NumeroTelefono"];
            string NumeroTelefonoSecundario = Request["NumeroTelefonoSecundario"];
            string Direccion = Request["Direccion"];

            bool resultado = false;

            try
            {
                RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

                if (IdDocente == "")
                {
                    var Results = db.RegistrarDocente(PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, DateTime.Parse(FechaNacimiento), CorreoElectronico, NumeroTelefono, NumeroTelefonoSecundario, Direccion);
                }
                else
                {
                    var Results = db.ActualizarDocente(Int32.Parse(IdDocente), PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, DateTime.Parse(FechaNacimiento), CorreoElectronico, NumeroTelefono, NumeroTelefonoSecundario, Direccion);
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