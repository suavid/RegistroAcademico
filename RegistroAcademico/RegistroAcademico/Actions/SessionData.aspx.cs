using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class SessionData : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();
            
            RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

            var Results = db.ObtenerUsuario(Session["Usuario"].ToString());

            List<object> Result = new List<object>();

            foreach (RegistroAcademico.ObtenerUsuarioResult res in Results)
            {
                Result.Add(new
                {
                    NombreUsuario = res.NombreUsuario,
                    EsDocente = res.EsDocente,
                    EsAdministrador = res.EsAdministrador,
                    Reset = res.ResetPwd,
                    IdDatos = res.IdDatos
                });
            }

            string respuesta = serializer.Serialize(Result);

            Response.Write(respuesta);
        }
    }
}