﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;


namespace RegistroAcademico.Actions
{
    public partial class EliminarPeriodo : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            string IdPeriodo = Request["IdPeriodo"];

            bool resultado = false;

            try
            {
                RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

                var Results = db.EliminarPeriodo(Int32.Parse(IdPeriodo));

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