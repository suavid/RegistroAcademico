using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;
using System.Web.Security;
using System.Net.Mail;
using System.Net;

namespace RegistroAcademico.Actions
{
    public partial class CrearUsuario : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            string IdDatos = Request["IdDatos"];
            string CorreoUsuario = Request["CorreoUsuario"];
            string NombreUsuario = Request["NombreUsuario"];
            string EsDocente = Request["EsDocente"];
            string Clave = Membership.GeneratePassword(8, 1);

            bool resultado = false;

            try
            {
                RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

                var Results = db.RegistrarUsuario(NombreUsuario, Int32.Parse(IdDatos), Clave, Int32.Parse(EsDocente));

                SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
                client.EnableSsl = true;

                NetworkCredential credentials = new NetworkCredential("william.parras.mendez", "wdpmaimm31082012", "");
                client.Credentials = credentials;

                MailMessage message = new MailMessage("william.parras.mendez@gmail.com", CorreoUsuario, "Credenciales de acceso al registro académico", "Usuario: "+NombreUsuario+" \n Clave: " + Clave);
               
                client.Send(message);
            

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