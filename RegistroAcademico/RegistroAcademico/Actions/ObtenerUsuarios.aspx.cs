using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class ObtenerUsuarios : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

            var Results = db.ObtenerUsuarios();

            List<object> Result = new List<object>();

            foreach (RegistroAcademico.ObtenerUsuariosResult res in Results)
            {
                Result.Add(new
                {
                    IdUsuario = res.IdUsuario,
                    IdDatos = res.IdDatos,
                    NombreUsuario = res.NombreUsuario,
                    EsDocente = res.EsDocente,
                    EsAdministrador = res.EsAdministrador,
                    UltimaFechaInicioSesion = ((DateTime)res.UltimaFechaInicioSesion).ToString("dd/MM/yyyy"),
                    Bloqueado = res.Bloqueado,
                    Nombre = res.Nombre
                });
            }

            string respuesta = serializer.Serialize(Result);

            Response.Write(respuesta);
        }
    }
}