using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class ObtenerAsignaturas : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

            var Results = db.ObtenerAsignaturas();

            List<object> Result = new List<object>();

            foreach (RegistroAcademico.ObtenerAsignaturasResult res in Results)
            {
                Result.Add(new
                {
                    IdAsignatura = res.IdAsignatura,
                    Nombre = res.Nombre,
                    Descripcion = res.Descripcion,
                    NotaMinimaDeAprobacion = res.NotaMinimaDeAprobacion
                });
            }

            string respuesta = serializer.Serialize(Result);

            Response.Write(respuesta);
        }
    }
}