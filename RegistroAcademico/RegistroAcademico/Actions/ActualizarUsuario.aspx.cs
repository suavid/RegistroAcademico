using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class ActualizarUsuario : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            string NombreUsuario = (string) Session["Usuario"];
            string Clave = Request["Clave"];

            bool resultado = false;
            string message = "";

            try
            {
                RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

                var Results = db.ActualizarUsuario(NombreUsuario,Clave);

                resultado = true;
            }
            catch (Exception ex)
            {
                resultado = false;
                message = ex.Message;
            }


            var JSON = new { success = resultado, errorMessage = message };

            string respuesta = serializer.Serialize(JSON);

            Response.Write(respuesta);
        }
    }
}