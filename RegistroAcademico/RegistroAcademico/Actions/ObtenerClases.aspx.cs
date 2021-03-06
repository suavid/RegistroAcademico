﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;

namespace RegistroAcademico.Actions
{
    public partial class ObtenerClases : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var serializer = new JavaScriptSerializer();

            RegistroAcademico.RegistroAcademicoDBDataContext db = new RegistroAcademico.RegistroAcademicoDBDataContext();

            var Results = db.ObtenerClases();

            string formato = "dd/MM/yyyy";

            List<object> Result = new List<object>();

            foreach (RegistroAcademico.ObtenerClasesResult res in Results)
            {
                Result.Add(new
                {
                    IdClase = res.IdClase,
                    FechaInicio = ((DateTime)res.FechaInicio).ToString(formato),
                    FechaFin = ((DateTime)res.FechaFin).ToString(formato),
                    NumeroSesiones = res.NumeroSesiones,
                    DuracionDeSesion = res.DuracionDeSesion,
                    ImpartidaPor = res.ImpartidaPor,
                    Docente = res.Docente,
                    AsignaturaImpartida = res.AsignaturaImpartida,
                    Asignatura = res.Asignatura,
                    Local = res.Local,
                    Horario = res.Horario,
                    HorarioClase = res.HorarioClase
                });
            }

            string respuesta = serializer.Serialize(Result);

            Response.Write(respuesta);
        }
    }
}