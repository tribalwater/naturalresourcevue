namespace DbUitlsCoreTest.Data
{
    public interface IItemRepository
    {
        object AddItem(object item, string itemtype, string subtype = null);
        object AddItemRelation(object item);
        int DeleteItem(string itemtype, string itemsubtype, string id);
        object DeleteItemDispaly(object item);
        object DeleteItemRelation(object item);
        object GetAllItemRelations(object item);
        object GetAllItems(string itemtype, string itemsubtype);
        object GetItem(string itemtype, string itemsubtype, string id );
        object GetItemButtons(string itemtype, string subtype);
        object GetItemDispaly(object item);
        object GetItemDispaly(string itemtype, string subtype);
        object GetItemRelation(object item);
        object InsertItemDispaly(object item);
        object UpdateItem(string itemtype, string itemsubtype, string id, object updateObject);
        object UpdateItemDispaly(object item);
        object UpdateItemRelation(object item);
    }
}