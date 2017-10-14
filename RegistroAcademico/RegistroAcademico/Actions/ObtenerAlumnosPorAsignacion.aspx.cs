using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class ObtenerAlumnosPorAsignacion : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            string IdPeriodoDetalle = Request["IdPeriodoDetalle"];

            RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

            var Results = db.ObtenerAlumnosPorAsignacion(Int32.Parse(IdPeriodoDetalle));

            List<object> Result = new List<object>();

            foreach (RegistroAcademico.ObtenerAlumnosPorAsignacionResult res in Results)
            {
                Result.Add(new
                {
                    IdAlumno = res.IdAlumno,
                    PrimerNombre = res.PrimerNombre,
                    SegundoNombre = res.SegundoNombre,
                    PrimerApellido = res.PrimerApellido,
                    SegundoApellido = res.SegundoApellido,
                    Asignacion = res.Asignacion,
                    Nota = res.Nota
                });
            }

            string respuesta = serializer.Serialize(Result);

            Response.Write(respuesta);
        }
    }
}