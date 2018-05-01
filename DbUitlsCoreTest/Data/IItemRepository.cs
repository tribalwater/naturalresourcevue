using System.Collections.Generic;

namespace DbUitlsCoreTest.Data
{
    public interface IItemRepository
    {
        object AddItem(object item, string itemtype, string subtype = null);
        object AddItemRelation(object item);
      
        int DeleteItem(string itemtype, string itemsubtype, string id);
        object DeleteItemDispaly(object item);
        object DeleteItemRelation(object item);
        object GetAllItemRelations(string itemtype, string itemsubtype, string itemid);
        object GetAllItems(string itemtype, string itemsubtype);
        object GetItem(string itemtype, string itemsubtype, string itemid);
        object GetItemCustomButtons(string itemtype, string subtype);
        object GetItemDispaly(object item);
        List<dynamic> GetItemDisplay(string itemtype, string subtype, string fieldlist);
        object GetItemList(string itemtype, string subtype, string fieldlist = "", string whereorder = "");
        object GetItemProperties(string itemtype, string subtype, string itemid, string fieldlist = "", string whereorder= "");
        object FormatItemProperties(List<dynamic> itemprops, List<dynamic> itemdisp);
        List<dynamic> BuildItemProperties(List<dynamic> itemdisp, string itemtype, string subtype, string itemid, string whereorder);
        object GetItemRelation(object item);
        object GetItemTabs(string itemtype, string subtype);
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