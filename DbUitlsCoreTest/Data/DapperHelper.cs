﻿using Dapper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Dynamic;
using System.Linq;
using System.Text;
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

        public object Get(
            string tableName, 
            string[] selectConditions = null, 
            Dictionary<string, string> whereConditions = null
        )
        {
            var builder = new SqlBuilder();
            BuildGet(builder, selectConditions, whereConditions);

            using (var connection = this.GetSqlServerOpenConnection())
            {
                var queryTemplate = builder.AddTemplate($"Select /**select**/ from {tableName} /**where**/");
                IEnumerable<dynamic> result = connection.Query(queryTemplate.RawSql, queryTemplate.Parameters).FirstOrDefault();

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
            BuildGet(builder, selectConditions, whereConditions);

            using (var connection = this.GetSqlServerOpenConnection())
            {
                var queryTemplate = builder.AddTemplate($"Select /**select**/ from {tableName} /**where**/");
                IEnumerable<dynamic> result = connection.Query(queryTemplate.RawSql, queryTemplate.Parameters).ToList();

                return result;
            }

        }

        public object Insert(
            string tableName,
            string[] Columns,
            string[] Values
        )
        {
            if (Columns.Length != Values.Length)
            {
                throw new ArgumentException("Insert Failed Columns Lenght must Match Values Length");
            }

            var sb = new StringBuilder();
            sb.AppendFormat("insert into {0}", tableName);
            sb.Append(" (");
            foreach (var col in Columns)
            {
                sb.Append($"{col},");
            }
            sb.Length--;
            sb.Append(") values (");
            foreach (var col in Columns)
            {
                sb.Append($"@{col},");
            }
            sb.Length--;
            sb.Append(") "); 

           var ParamExpandoObj = new ExpandoObject();


            for (int i = 0; i < Values.Length; i++)
            {
                AddExpandoProperty(ParamExpandoObj, Columns[i], Values[i]);
            }

            Console.WriteLine("sb builder sql string ======");
            Console.Write(sb.ToString());
            using (var connection = this.GetSqlServerOpenConnection())
            {
                return connection.Execute(sb.ToString(), ParamExpandoObj);
            }
        }

        public int Update(string tableName, Dictionary<string, string> updateDict, Dictionary<string, string> whereConditions)
        {
            var sb = new StringBuilder();
            BuildUpdate(sb, tableName, updateDict);

            var builder = new SqlBuilder();
            BuildWhere(builder, whereConditions);
            var queryTemplate = builder.AddTemplate($"{sb.ToString()}/**where**/");

            using (var connection = this.GetSqlServerOpenConnection())
            {
                int result = connection.Execute(queryTemplate.RawSql, queryTemplate.Parameters);
                return result;
            }  
            
        }

        public int Delete(string tableName, Dictionary<string, string> whereConditions)
        {
            throw new NotImplementedException();
        }

        private static void BuildGet(
            SqlBuilder builder,
            string[] selectConditions = null,
            Dictionary<string, string> whereConditions = null
        )
        {
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
        }

        private static void BuildWhere(SqlBuilder builder, Dictionary<string, string> whereConditions)
        {
            foreach (var condition in whereConditions)
            {
                var dynamicObject = new ExpandoObject();
                AddExpandoProperty(dynamicObject, condition.Key, condition.Value);
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

        private static void BuildUpdate(StringBuilder sb,  string tableName, Dictionary<string, string> updateDict )
        {
            sb.AppendFormat("Update {0}", tableName);
            sb.Append(" SET");

            foreach(var updatePair in updateDict)
            {
                sb.Append($"{updatePair.Key} = {updatePair.Value},");
            }
           
        }


        private static void AddExpandoProperty(ExpandoObject expando, string propertyName, object propertyValue)
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