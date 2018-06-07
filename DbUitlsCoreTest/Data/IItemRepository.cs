using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;

namespace DbUitlsCoreTest.Data
{
    public interface IItemRepository
    {
        Predicate<dynamic> nodeFilterOverride { get; set; }
        string UserId { get; set; }

        object AddItem(object item, string itemtype, string subtype = null);
        object AddItemRelation(object item);
        System.Collections.Generic.List<dynamic> BuildItemProperties(System.Collections.Generic.List<dynamic> itemdisp, string itemtype, string subtype, string itemid, string whereorder);
        System.Collections.Generic.List<dynamic> buildItemRecord(System.Collections.Generic.List<dynamic> itemDsip, string sql, bool isList = false);
        int DeleteItem(string itemtype, string itemsubtype, string id);
        object DeleteItemDispaly(object item);
        object DeleteItemRelation(object item);
        List<Hashtable> GetItemFormFields(string itemtype, string subtype);
        object FormatItemProperties(System.Collections.Generic.List<dynamic> itemprops, System.Collections.Generic.List<dynamic> itemdisp);
        string formatOraDateTime(string xdate);
        string formatOraDateTime(string xdate, bool adjusttime);
        string formatStringDate(DateTime xdate);
        string formatStringDate(string xdate);
        object GetAllItemRelations(string itemtype, string itemsubtype, string itemid);
        object GetAllItems(string itemtype, string itemsubtype);
        IDbDataParameter getDBParameter(string name, string value);
        object GetItem(string itemtype, string itemsubtype, string itemid);
        List<dynamic> GetItemCustomButtons(string itemtype, string subtype, string pagetype);
        object GetItemDispaly(object item);
        System.Collections.Generic.List<dynamic> GetItemDisplay(string itemtype, string subtype, string fieldlist = "");
        string getItemIDList(string sql);
        string getItemIDList(string sql, bool logerror);
        string getItemIDList(string sql, bool logerror, string[] boundNames, string[] boundValues);
        string getItemIdListFromDataTable(DataTable dtSource);
        string getItemIdListFromDataTable(DataTable dtSource, string columnName);
        object GetItemList(string itemtype, string subtype, string fieldlist = "", string whereorder = "");
        object GetItemProperties(string itemtype, string subtype, string itemid, string fieldlist = "", string whereorder = "");
        object GetItemRelation(object item);
        List<dynamic> GetItemTabs(string itemtype, string subtype);
        string getTopVueParameter(string param);
        Hashtable getUserRightsList(string userid);
        string getValueFromSQL(string sql);
        string getValueFromSQL(string sql, bool logerror);
        string getValueFromSQL(string sql, bool logerror, string[] boundNames, string[] boundValues);
        string getValueFromSQL(string sql, bool logerror, string[] boundNames, string[] boundValues, bool multivals);
        string getValuesFromSQL(string sql);
        object InsertItemDispaly(object item);
        object UpdateItem(string itemtype, string itemsubtype, string id, object updateObject);
        object UpdateItemDispaly(object item);
        object UpdateItemRelation(object item);
    }
}