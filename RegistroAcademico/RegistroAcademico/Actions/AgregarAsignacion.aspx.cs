﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class AgregarAsignacion : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            string IdPeriodo = Request["IdPeriodo"];
            string TipoEvaluacion = Request["TipoEvaluacion"];
            string TituloDeAsignacion = Request["TituloDeAsignacion"];
            string DescripcionDeAsignacion = Request["DescripcionDeAsignacion"];
            string FechaLimite = Request["FechaLimite"];

            bool resultado = false;

            try
            {
                RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

                var Results = db.AgregarAsignacion(Int32.Parse(IdPeriodo),TipoEvaluacion,TituloDeAsignacion,DescripcionDeAsignacion,DateTime.Parse(FechaLimite));

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