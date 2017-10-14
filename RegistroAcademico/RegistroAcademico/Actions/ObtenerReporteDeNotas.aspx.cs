using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class ObtenerReporteDeNotas : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            var IdAlumno = Request["IdAlumno"];

            RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

            var Results = db.ObtenerReporteDeNotas(Int32.Parse(IdAlumno));

            List<object> Result = new List<object>();

            foreach (RegistroAcademico.ObtenerReporteDeNotasResult res in Results)
            {
                Result.Add(new
                {
                    IdAsignatura = res.IdAsignatura,
                    Asignatura = res.Asignatura,
                    NotaMinimaDeAprobacion = res.NotaMinimaDeAprobacion,
                    PorcentajePeriodo = res.PorcentajePeriodo,
                    PorcentajeAsignacion = res.PorcentajeAsignacion,
                    IdPeriodo = res.IdPeriodo,
                    IdPeriodoDetalle = res.IdPeriodoDetalle,
                    TituloDeAsignacion = res.TituloDeAsignacion,
                    Nota = res.Nota
                });
            }

            string respuesta = serializer.Serialize(Result);

            Response.Write(respuesta);
        }
    }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   