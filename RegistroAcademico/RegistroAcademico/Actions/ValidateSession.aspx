<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ValidateSession.aspx.cs" Inherits="RegistroAcademico.Actions.ValidateSession" %>
<%@ Import Namespace="System.Web.Script.Serialization" %>
<%
    var serializer = new JavaScriptSerializer();
    bool resultado = false; 
        
    if (Session["Usuario"] != null)
    {
        resultado = true;    
    }

    var JSON = new { success = resultado };
    
    string respuesta = serializer.Serialize(JSON);

    Response.Write(respuesta);
%>