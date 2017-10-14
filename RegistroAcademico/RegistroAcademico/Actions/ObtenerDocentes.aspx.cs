using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class ObtenerDocentes : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            string formato = "dd/MM/yyyy";

            RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

            var Results = db.ObtenerDocentes();

            List<object> Result = new List<object>();

            foreach (RegistroAcademico.ObtenerDocentesResult res in Results)
            {
                Result.Add(new
                {
                    IdDocente = res.IdDocente,
                    PrimerNombre = res.PrimerNombre,
                    SegundoNombre = res.SegundoNombre,
                    PrimerApellido = res.PrimerApellido,
                    SegundoApellido = res.SegundoApellido,
                    FechaNacimiento = ((DateTime)res.FechaNacimiento).ToString(formato),
                    CorreoElectronico = res.CorreoElectronico,
                    NumeroTelefono = res.NumeroTelefono,
                    NumeroTelefonoSecundario = res.NumeroTelefonoSecundario,
                    Direccion = res.Direccion,
                    TieneUsuario = res.TieneUsuario

                });
            }

            string respuesta = serializer.Serialize(Result);

            Response.Write(respuesta);
        }
    }
}