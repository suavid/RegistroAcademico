using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class GuardarAsignatura : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            string IdAsignatura = Request["IdAsignatura"];
            string Nombre = Request["Nombre"];
            string Descripcion = Request["Descripcion"];
            string NotaMinimaDeAprobacion = Request["NotaMinimaDeAprobacion"];

            bool resultado = false;

            try
            {
                RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

                if (IdAsignatura == "")
                {
                    var Results = db.RegistrarAsignatura(Nombre,Descripcion,Int32.Parse(NotaMinimaDeAprobacion));
                }
                else
                {
                    var Results = db.ActualizarAsignatura(Int32.Parse(IdAsignatura), Nombre, Descripcion, Int32.Parse(NotaMinimaDeAprobacion));
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