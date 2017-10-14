using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class ActualizarPorcentajesAsignatura : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            string IdAsignaturaOrigen = (string)Request["IdAsignacionOrigen"];
            string IdAsignaturaDestino = (string)Request["IdAsignacionDestino"];
            string Porcentaje = Request["Porcentaje"];

            bool resultado = false;

            try
            {
                RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

                var Results = db.ActualizarAsignacion(Int32.Parse(IdAsignaturaOrigen), Int32.Parse(IdAsignaturaDestino), Decimal.Parse(Porcentaje));

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