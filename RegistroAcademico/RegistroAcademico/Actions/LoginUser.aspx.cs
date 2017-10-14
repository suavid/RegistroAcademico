using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class LoginUser : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            string Usuario = Request["Usuario"];
            string Clave = Request["Clave"];

            bool resultado = false;

            RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

            var Results = db.ValidarUsuario(Usuario, Clave);

            foreach (RegistroAcademico.ValidarUsuarioResult res in Results)
            {
                Session["Usuario"] = res.NombreUsuario.ToString();
            }

            if (Session["Usuario"] != null)
            {
                resultado = true;
            }

            var JSON = new { success = resultado };

            string respuesta = serializer.Serialize(JSON);

            Response.Write(respuesta);
        }
    }
}