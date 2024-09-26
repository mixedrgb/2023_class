using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace webapi_01
{
    public class Department
    {
        public int DepartmentId { get; set; }
        public string? DepartmentName { get; set; }

        public int DepartmentCount { get; set; }

        public Department()
        {
        }

        public Department(string departmentName)
        {
            DepartmentName = departmentName;
        }

        public Department(int departmentId, string departmentName)
        {
            DepartmentId = departmentId;
            DepartmentName = departmentName;
        }


        public static List<Department> GetDepartments(SqlConnection sqlConnection)
        {
            List<Department> departments = new List<Department>();

            string sql = "select DepartmentId, DepartmentName, count(*) over () AS [Count] from db01.dbo.Department";

            SqlCommand sqlCommand = new SqlCommand(sql, sqlConnection);
            sqlCommand.CommandType = System.Data.CommandType.Text;

            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                Department department = new Department();

                department.DepartmentId = Convert.ToInt32(sqlDataReader["DepartmentId"].ToString());
                department.DepartmentName = sqlDataReader["DepartmentName"].ToString();
                department.DepartmentCount = Convert.ToInt32(sqlDataReader["Count"].ToString());

                departments.Add(department);
            }

            return departments;
        }
    }
}