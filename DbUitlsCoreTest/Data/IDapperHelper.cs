using System.Collections.Generic;

namespace DbUitlsCoreTest.Data
{
    public interface IDapperHelper
    {
        IEnumerable<dynamic> GetList(string tableName, string[] selectConditions = null, Dictionary<string, string> whereConditions = null);
        object Insert(string tableName, string[] Columns, string[] Values);
        IEnumerable<dynamic> RawQuery(string sql);
        int Update(string tableName, Dictionary<string, string> UpdateDict, Dictionary<string, string> whereConditions);
        object Get(string tableName, string[] selectConditions = null, Dictionary<string, string> whereConditions = null);
        int Delete(string tableName, Dictionary<string, string> whereConditions);
    }
}