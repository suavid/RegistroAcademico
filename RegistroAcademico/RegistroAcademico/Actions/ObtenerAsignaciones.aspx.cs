using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class ObtenerAsignaciones : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            string IdPeriodo = Request["IdPeriodo"];

            string formato = "dd/MM/yyyy";

            RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

            var Results = db.ObtenerAsignacionesPorPeriodo(Int32.Parse(IdPeriodo));

            List<object> Result = new List<object>();

            foreach (RegistroAcademico.ObtenerAsignacionesPorPeriodoResult res in Results)
            {
                Result.Add(new
                {
                    IdPeriodoDetalle = res.IdPeriodoDetalle,
                    IdPeriodo = res.IdPeriodo,
                    TipoEvaluacion = res.TipoEvaluacion,
                    Porcentaje = res.Porcentaje,
                    TituloDeAsignacion = res.TituloDeAsignacion,
                    DescripcionDeAsignacion = res.DescripcionDeAsignacion,
                    FechaLimite = ((DateTime)res.FechaLimite).ToString(formato)
                });
            }

            string respuesta = serializer.Serialize(Result);

            Response.Write(respuesta);
        }
    }
}