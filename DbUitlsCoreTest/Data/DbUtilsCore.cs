using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace DbUitlsCoreTest.Data
{
    delegate TResult Func<T, TResult>(T input);
    //*****************************Interfaces*****************************************
    /// <summary>
    /// Interface for data sources to be accessed by TopVue
    /// </summary>
    public interface ISourceUtils
    {
        /// <summary>
        /// Get TopVue JSON doc 1.0 formatted recordset
        /// </summary>
        /// <param name="SqlStmt">SQL Statement used to get the data</param>
        /// <returns>TopVue 1.0 formatted JSON document</returns>
        string getJSONRecordset(string SqlStmt);

        /// <summary>
        /// Get TopVue JSON doc 1.0 formatted recordset
        /// </summary>
        /// <param name="SqlStmt">SQL Statement used to get the data</param>
        /// <param name="displaynode">Display node to use for JSON document</param>
        /// <returns>TopVue 1.0 formatted JSON document</returns>
        string getJSONrecordset(string SqlStmt, string displaynode);

        /// <summary>
        /// Get TopVue JSON doc 1.0 formatted recordset
        /// </summary>
        /// <param name="SqlStmt">SQL Statement used to get the data</param>
        /// <param name="RowStart">First row in query to return</param>
        /// <param name="NumRows">Number of rows to return</param>
        /// <returns>TopVue 1.0 formatted JSON document</returns>
        string getJSONRecordset(string SqlStmt, int RowStart, int NumRows);

        /// <summary>
        /// Get TopVue JSON doc 1.0 formatted recordset
        /// </summary>
        /// <param name="SqlStmt">SQL Statement used to get the data</param>
        /// <param name="RowStart">First row in query to return</param>
        /// <param name="NumRows">Number of rows to return</param>
        /// <returns>TopVue 1.0 formatted JSON document</returns>
         JObject getJSONDocument(string SqlStmt, int RowStart, int NumRows);

        /// <summary>
        /// Get JSON document representing properties record
        /// </summary>
        /// <param name="itemid">ID of desired item</param>
        /// <param name="itemtypecd">itemtypecd of desired item</param>
        /// <param name="subtype">subtype of desired item</param>
        /// <param name="fieldlist">list of fields to include in document</param>
        /// <returns>JSON document representing specified item</returns>
        JObject getItemPropertiesJSON(string itemid, string itemtypecd, string subtype, string fieldlist);

        /// <summary>
        /// Get JSON document representing edit record
        /// </summary>
        /// <param name="itemid">ID of desired item</param>
        /// <param name="itemtypecd">itemtypecd of desired item</param>
        /// <param name="subtype">subtype of desired item</param>
        /// <param name="fieldlist">list of fields to include in document</param>
        /// <returns>JSON document representing specified item</returns>
        JObject getItemPropertiesEditJSON(string itemid, string itemtypecd, string subtype, string fieldlist);

        /// <summary>
        /// Update record based on JSON document
        /// </summary>
        /// <param name="oJSON">JSON structure representing record to be udpated</param>
        /// <returns>true if record was updated, otherwise false</returns>
        bool updateRecord(JObject oJSON);

        /// <summary>
        /// Delete record based on JSON document
        /// </summary>
        /// <param name="oJSON">JSON structure representing record to be deleted</param>
        /// <returns>true if record was deleted, otherwise false</returns>
        bool deleteRecord(JObject oJSON);

        /// <summary>
        /// Insert record based on JSON document
        /// </summary>
        /// <param name="oJSON">JSON structure representing record to be inserted</param>
        /// <returns>true if record was inserted, otherwise false</returns>
        string insertRecord(JObject oJSON);

        /// <summary>
        /// Get contents of specified file
        /// </summary>
        /// <param name="identifier">identifier for desired file</param>
        /// <returns>binary contents of the specified file</returns>
        byte[] getArtifactContents(string identifier);
    }

    public class DbUtilsCore : SqlServerAccessBase, ISourceUtils
    {
        public DbUtilsCore(string connectionString) : base(connectionString)
        {

        }

        

        public bool deleteRecord(JObject oJSON)
        {
            throw new NotImplementedException();
        }

        public byte[] getArtifactContents(string identifier)
        {
            throw new NotImplementedException();
        }

        public JObject getItemPropertiesEditJSON(string itemid, string itemtypecd, string subtype, string fieldlist)
        {
            throw new NotImplementedException();
        }

        public JObject getItemPropertiesJSON(string itemid, string itemtypecd, string subtype, string fieldlist)
        {
            throw new NotImplementedException();
        }

        public JObject getJSONDocument(string SqlStmt, int RowStart, int NumRows)
        {
            throw new NotImplementedException();
        }

        public string getJSONRecordset(string SqlStmt)
        {
            throw new NotImplementedException();
        }

        public string getJSONrecordset(string SqlStmt, string displaynode)
        {
            throw new NotImplementedException();
        }

        public string getJSONRecordset(string SqlStmt, int RowStart, int NumRows)
        {
            throw new NotImplementedException();
        }

        public string insertRecord(JObject oJSON)
        {
            throw new NotImplementedException();
        }

        public bool updateRecord(JObject oJSON)
        {
            throw new NotImplementedException();
        }
    }
}


