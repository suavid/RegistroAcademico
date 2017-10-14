using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class ObtenerFiliales : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

            var Results = db.ObtenerFiliales();

            List<object> Result = new List<object>();

            foreach (RegistroAcademico.ObtenerFilialesResult res in Results)
            {
                Result.Add(new { 
                    IdFilial = res.IdFilial,
                    Nombre = res.Nombre,
                    RazonSocial = res.RazonSocial,
                    Direccion = res.Direccion,
                    NumeroTelefono = res.NumeroTelefono
                });
            }

            string respuesta = serializer.Serialize(Result);

            Response.Write(respuesta);
        }
    }
}