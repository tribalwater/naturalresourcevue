using System.Collections.Generic;

namespace DbUitlsCoreTest.Data
{
    public interface IDapperHelper
    {
        IEnumerable<dynamic> GetList(string tableName, string[] selectConditions = null, Dictionary<string, string> whereConditions = null);
        IEnumerable<dynamic> RawQuery(string sql);
    }
}