using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class GuardarFilial : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            string IdFilial = Request["IdFilial"];
            string Nombre = Request["Nombre"];
            string RazonSocial = Request["RazonSocial"];
            string Direccion = Request["Direccion"];
            string NumeroTelefono = Request["NumeroTelefono"];

            bool resultado = false;
            
            try
            {
                RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

                if (IdFilial == "") { 
                    var Results = db.RegistrarFilial(Nombre, RazonSocial, Direccion, NumeroTelefono);
                }
                else
                {
                    var Results = db.ActualizarFilial(Int32.Parse(IdFilial), Nombre, RazonSocial, Direccion, NumeroTelefono);
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