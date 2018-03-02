﻿namespace DbUitlsCoreTest.Data
{
    public interface IItemRepository
    {
        object AddItem(object item, string itemtype, string subtype);
        object AddItemRelation(object item);
        object DeleteItemDispaly(object item);
        object DeleteItemRelation(object item);
        object GetAllItemRelations(object item);
        object GetAllItems(string itemtype, string itemsubtype);
        object GetItem(string itemtype, string itemsubtype);
        object GetItemDispaly(string itemtype, string subtype);
        object GetItemRelation(object item);
        object InsertItemDispaly(object item);
        object UpdateItem(string itemtype, object item, string itemsubtype);
        object UpdateItemDispaly(object item);
        object UpdateItemRelation(object item);
        object GetItemButtons(string itemtype, string subtype);
    }
}