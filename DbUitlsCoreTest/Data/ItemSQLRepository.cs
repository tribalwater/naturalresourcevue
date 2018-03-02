using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DbUitlsCoreTest.Data
{
    public class ItemSQLRepository : IItemRepository
    {
        private IDapperHelper _dapperHelper;

        public ItemSQLRepository(IDapperHelper dapperHelper)
        {
            _dapperHelper = dapperHelper;
        }

        public object AddItem(object item, string itemtype, string subtype = null)
        {
            JObject ItemTypeJson = JObject.FromObject(item);

            string[] keys = ItemTypeJson.Properties().Select(p => p.Name.ToString()).ToArray();
            string[] vals = ItemTypeJson.Properties().Select(p => p.Value.ToString()).ToArray();
          
            return _dapperHelper.Insert($"{itemtype}_PROPERTIES", keys, vals);
        }

        public object UpdateItem(string itemtype, string itemsubtype, string id,  object updateObject)
        {
            JObject ItemTypeJson                  = JObject.FromObject(updateObject);
            Dictionary<string,string> updateDict  = ItemTypeJson.ToObject<Dictionary<string, string>>();
            Dictionary<string, string> whereDict  = new Dictionary<string, string>();

            whereDict.Add(itemtype + "type", itemsubtype);
            whereDict.Add("itemid", id);

           var result = _dapperHelper.Update($"{itemtype}_PROPERTIES", updateDict, whereDict);

            return result;
           
        }

        public object GetItem(string itemtype, string itemsubtype)
        {
            Dictionary<string, string> whereDict = new Dictionary<string, string>();
            whereDict.Add(itemtype + "type", itemsubtype);
            
            var res = _dapperHelper.Get(itemtype + "_properties", null, whereDict);
            return res;
        }

        public object GetAllItems(string itemtype, string itemsubtype)
        {
            Dictionary<string, string> whereDict = new Dictionary<string, string>();
            whereDict.Add(itemtype + "type", itemsubtype);

            var res = _dapperHelper.GetList(itemtype + "_properties", null, whereDict);
            return res;
        }

        public int DeleteItem(string itemtype, string itemsubtype, string id)
        {
            Dictionary<string, string> whereDict = new Dictionary<string, string>();
            whereDict.Add(itemtype + "type", itemsubtype);
            whereDict.Add("itemid", id);

            return _dapperHelper.Delete(itemtype + "_properties", whereDict);

        }

        public object AddItemRelation(object item)
        {
            return null;
        }

        public object UpdateItemRelation(object item)
        {
            return null;
        }

        public object GetItemRelation(object item)
        {
            return null;
        }

        public object GetAllItemRelations(object item)
        {
            return null;
        }

        public object DeleteItemRelation(object item)
        {
            return null;
        }


        public object InsertItemDispaly(object item)
        {
            return null;
        }


        public object UpdateItemDispaly(object item)
        {
            return null;
        }


        public object GetItemDispaly(object item)
        {
            return null;
        }

        public object DeleteItemDispaly(object item)
        {
            return null;
        }

        public object GetItemDispaly(string itemtype, string subtype)
        {
            Dictionary<string, string> whereDict = new Dictionary<string, string>();
            whereDict.Add("itemtypecd", itemtype);
            whereDict.Add("subtypecd", subtype);
            var res = _dapperHelper.GetList("itemdisplay", null, whereDict).ToList();
            return res;
        }

        public object GetItemButtons(string itemtype, string subtype)
        {
            throw new NotImplementedException();
        }
    }
}
