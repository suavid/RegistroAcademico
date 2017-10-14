using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class ObtenerPeriodosPorClase : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            var IdClase = Request["IdClase"];

            RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

            var Results = db.ObtenerPeriodosPorClase(Int32.Parse(IdClase));


            List<object> Result = new List<object>();

            foreach (RegistroAcademico.ObtenerPeriodosPorClaseResult res in Results)
            {
                Result.Add(new
                {
                    IdPeriodo = res.IdPeriodo,
                    Porcentaje = res.Porcentaje
                });
            }

            string respuesta = serializer.Serialize(Result);

            Response.Write(respuesta);
        }
    }
}