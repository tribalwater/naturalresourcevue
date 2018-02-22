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

        public object AddItem(object item)
        {
            return null;
        }

        public object UpdateItem(object item)
        {
            return null;
        }

        public object GetItem(string itemtype, string itemsubtype)
        {
            Dictionary<string, string> whereDict = new Dictionary<string, string>();
            whereDict.Add(itemtype + "type", itemsubtype);
            whereDict.Add("DOCUMENTNUMBER", "1245-6D");

            
            var res = _dapperHelper.GetList(itemtype + "_properties", null, whereDict).FirstOrDefault();
            return res;

        }

        public object GetAllItems(object item)
        {
            return null;
        }

        public object DeleteItem(object item)
        {
            return null;

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

    }
}
