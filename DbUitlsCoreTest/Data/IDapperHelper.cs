﻿using System.Collections.Generic;
using System.Data;

namespace DbUitlsCoreTest.Data
{
    public interface IDapperHelper
    {
        int Delete(string tableName, Dictionary<string, string> whereConditions);
        IDataReader ExecuteReaderFromQuery(string sql);
        object Get(string tableName, string[] selectConditions = null, Dictionary<string, string> whereConditions = null);
        IEnumerable<dynamic> GetList(string tableName, string[] selectConditions = null, Dictionary<string, string> whereConditions = null);
        object Insert(string tableName, string[] Columns, string[] Values);
        IEnumerable<dynamic> RawQuery(string sql);
        int Update(string tableName, Dictionary<string, string> updateDict, Dictionary<string, string> whereConditions);
    }
}