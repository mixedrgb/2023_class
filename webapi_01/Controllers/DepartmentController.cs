using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace webapi_01.Controllers;

[ApiController]
[Route("[controller]")]
public class DepartmentController : ControllerBase
{
    private readonly ILogger<WeatherForecastController> _logger;

    public DepartmentController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Route("/GetDepartments")]
    public Response GetDepartments()
    {
        Response response = new Response();
        try
        {
            List<Department> departments = new List<Department>();

            string connectionString = GetConnectionString();
            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                departments = Department.GetDepartments(sqlConnection);
            }

            string message = "";

            if (departments.Count() > 0)
            {
                int departmentCount = departments[0].DepartmentCount;
                message = $"Found {departmentCount} departments!";
            }
            else
            {
                message = "No departments met your search criteria.";
            }

            response.Result = "success";
            response.Message = message;
            response.Departments = departments;
        }
        catch (Exception e)
        {
            response.Result = "failure";
            response.Message = e.Message;
        }
        return response;
    }

    static string GetConnectionString()
    {
        string serverName = @"LAPTOP-T24FIB73\SQLEXPRESS"; //Change to the "Server Name" you see when you launch SQL Server Management Studio.
        string databaseName = "db01"; //Change to the database where you created your Employee table.
        string connectionString = $"data source={serverName}; database={databaseName}; Integrated Security=true;";
        return connectionString;
    }
}