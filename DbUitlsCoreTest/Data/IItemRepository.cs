namespace DbUitlsCoreTest.Data
{
    public interface IItemRepository
    {
        object AddItem(object item);
        object AddItemRelation(object item);
        object DeleteItem(object item);
        object DeleteItemDispaly(object item);
        object DeleteItemRelation(object item);
        object GetAllItemRelations(object item);
        object GetAllItems(object item);
        object GetItem(string itemtype, string itemsubtype);
        object GetItemDispaly(string itemtype, string subtype);
        object GetItemRelation(object item);
        object InsertItemDispaly(object item);
        object UpdateItem(object item);
        object UpdateItemDispaly(object item);
        object UpdateItemRelation(object item);
    }
}