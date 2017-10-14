using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class GuardarClase : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            string IdClase = Request["IdClase"];
            string FechaInicio = Request["FechaInicio"];
            string FechaFin = Request["FechaFin"];
            string NumeroSesiones = Request["NumeroSesiones"];
            string DuracionDeSesion = Request["DuracionDeSesion"];
            string ImpartidaPor = Request["ImpartidaPor"];
            string AsignaturaImpartida = Request["AsignaturaImpartida"];
            string Local = Request["Local"];
            string Horario = Request["Horario"];

            bool resultado = false;

            try
            {
                RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

                if (IdClase == "")
                {
                    var Results = db.RegistrarClase(DateTime.Parse(FechaInicio),DateTime.Parse(FechaFin),Int32.Parse(NumeroSesiones),Int32.Parse(DuracionDeSesion),Int32.Parse(ImpartidaPor),Int32.Parse(AsignaturaImpartida),Local, Int32.Parse(Horario),1);
                }
                else
                {
                    var Results = db.ActualizarClase(Int32.Parse(IdClase),DateTime.Parse(FechaInicio), DateTime.Parse(FechaFin), Int32.Parse(NumeroSesiones), Int32.Parse(DuracionDeSesion), Int32.Parse(ImpartidaPor), Int32.Parse(AsignaturaImpartida), Local, Int32.Parse(Horario), 1);
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