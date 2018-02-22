using Dapper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;


namespace DbUitlsCoreTest.Data
{
    public class DapperHelper : IDapperHelper
    {
        protected string _connectionString { get; set; }
        private IDbConnection _db;
        private string _databaseType;

        public DapperHelper(string  connectionString)
        {
            _connectionString = connectionString;
        }

        public DapperHelper(string connectionString, string databaseType = "SQLSEVER" )
        {
            _connectionString = connectionString;
            _databaseType = databaseType;
        }


        private IDbConnection GetConnection()
        {
                if(this._databaseType == "SQLSEVER") {
                return this.GetSqlServerOpenConnection();
                }else  {
                // implemnnet other db adaptor types
                return null;
               }
        }

        private SqlConnection GetSqlServerOpenConnection()
        {
            SqlConnection connection = new SqlConnection(_connectionString);

            if (connection.State != ConnectionState.Open) connection.Open();
            return connection;
        }

        public IEnumerable<dynamic> RawQuery(string sql)
        {
            using (var connection = this.GetSqlServerOpenConnection())
            {
                IEnumerable<dynamic> result = connection.Query(sql);
                return result;
            }
        }

        public IEnumerable<dynamic> GetList(
            string tableName,
            string[] selectConditions = null,
            Dictionary<string, string>  whereConditions = null
        )
        {
            var builder = new SqlBuilder();

            if (selectConditions != null && selectConditions.Length > 0)
            {
                BuildSelect(builder, selectConditions);
            }
            else
            {
                builder.Select("*");
            }

            if (whereConditions != null && whereConditions.Count > 0)
            {
                BuildWhere(builder, whereConditions);
            }
            else
            {
                builder.Where("1=1");
            }

            using (var connection = this.GetSqlServerOpenConnection())
            {
                var queryTemplate = builder.AddTemplate($"Select /**select**/ from {tableName} /**where**/");
                IEnumerable<dynamic> result = connection.Query(queryTemplate.RawSql, queryTemplate.Parameters).ToList();

                return result;
            }



        }

      
        private static void BuildWhere(SqlBuilder builder, Dictionary<string, string> whereConditions)
        {
            foreach (var condition in whereConditions)
            {
                var dynamicObject = new ExpandoObject();
                AddProperty(dynamicObject, condition.Key, condition.Value);
                builder.Where($"{condition.Key} = @{condition.Key}", dynamicObject);
            }

        }

        private static void BuildSelect(SqlBuilder builder,string[] selectConditions)
        {
            foreach (var field in selectConditions)
            {
                builder.Select(field);
            }

        }

        private static void AddProperty(ExpandoObject expando, string propertyName, object propertyValue)
        {
            // ExpandoObject supports IDictionary so we can extend it like this
            var expandoDict = expando as IDictionary<string, object>;
            if (expandoDict.ContainsKey(propertyName))
                expandoDict[propertyName] = propertyValue;
            else
                expandoDict.Add(propertyName, propertyValue);
        }


    }
}
