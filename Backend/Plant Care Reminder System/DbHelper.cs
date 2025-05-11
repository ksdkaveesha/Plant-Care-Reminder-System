using System.Data;
using System.Data.SqlClient;
using Microsoft.Data.SqlClient;

namespace PlantCareAPI.Data
{
    public class DbHelper
    {
        private readonly string _connectionString;

        public DbHelper(string connectionString)
        {
            _connectionString = connectionString;
        }

        public SqlConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }
    }
}
