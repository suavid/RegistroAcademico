using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class ObtenerResultadoAsignaturas : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            var IdAlumno = Request["IdAlumno"];

            RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

            var Results = db.ObtenerResultadoAsignaturas(Int32.Parse(IdAlumno));

            List<object> Result = new List<object>();

            foreach (RegistroAcademico.ObtenerResultadoAsignaturasResult res in Results)
            {
                Result.Add(new
                {
                    PrimerNombre= res.PrimerNombre
                  ,
                    SegundoNombre = res.SegundoNombre
                  ,
                    PrimerApellido= res.PrimerApellido
                  ,
                    SegundoApellido = res.SegundoApellido
                  ,
                    Nombre = res.Nombre
                  ,
                    Estado = res.Estado
                  ,
                    Matricula = res.Matricula
                });
            }

            string respuesta = serializer.Serialize(Result);

            Response.Write(respuesta);
        }
    }
}