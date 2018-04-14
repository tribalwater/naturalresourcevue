namespace DbUitlsCoreTest.Data
{
    public interface IItemRepository
    {
        object AddItem(object item, string itemtype, string subtype = null);
        object AddItemRelation(object item);
        object buildItemRecord(System.Collections.Generic.List<dynamic> itemDsip, string sql);
        int DeleteItem(string itemtype, string itemsubtype, string id);
        object DeleteItemDispaly(object item);
        object DeleteItemRelation(object item);
        object GetAllItemRelations(string itemtype, string itemsubtype, string itemid);
        object GetAllItems(string itemtype, string itemsubtype);
        object GetItem(string itemtype, string itemsubtype, string itemid);
        object GetItemCustomButtons(string itemtype, string subtype);
        object GetItemDispaly(object item);
        object GetItemDispaly(string itemtype, string subtype);
        object GetItemProperties(System.Collections.Generic.List<dynamic> itemdisp, string itemtype, string subtype, string itemid, string whereorder);
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