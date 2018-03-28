using FastMember;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
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

        private IEnumerable<dynamic> GetItemRelatonTypeAndSubTypes(string itemtype, string itemsubtype, string itemid)
        {
            string sql = "select distinct(r.itemtypecd2) + '_' + isNull(r.subtype2, ' ') typesubtype " +
            " from itemrelationflat r inner join itemsubtypes s on s.itemtypecd = r.itemtypecd2 " +
            $"  where r.itemtypecd1 = '{itemtype}' " +
            $" and r.itemid1 = '{itemid}' " +
            $" and r.subtype1 = '{itemsubtype}' " +
            " and s.itemrelationflag = 'Y' " +
            " and(s.subtype = r.subtype2 or s.subtype is null OR r.subtype2 IS NULL) ";

            return _dapperHelper.RawQuery(sql);
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

        public object GetItem(string itemtype, string itemsubtype, string itemid )
        {
            Dictionary<string, string> whereDict = new Dictionary<string, string>();
            whereDict.Add(itemtype + "type", itemsubtype);
            whereDict.Add("itemid", itemid);
            
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
            foreach (var item in whereDict)
            {
                Console.WriteLine(item.Key);
                Console.WriteLine(item.Value);
            }

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



        public object GetAllItemRelations(string itemtype, string itemsubtype, string itemid)
        {
            Dictionary<string, List<dynamic>> RelatedItemListDict = new Dictionary<string, List<dynamic>>();
            var RelatedItemTypes =  this.GetItemRelatonTypeAndSubTypes(itemtype, itemsubtype, itemid).ToList();
            Console.WriteLine("--- get related itme types -----");
           
            foreach (var item in RelatedItemTypes)
            {
                string[] TypeSubTypeArr = item.typesubtype.Split("_");
                String Reltype = TypeSubTypeArr[0];
                String RelSubType = TypeSubTypeArr[1];

                String RelationItemDispNameSql = "Select displayname From itemdisplay" +
                                              $" where itemtypecd = '{Reltype}' " +
                                              $" and subtypecd =  '{RelSubType}' " +
                                              " and fieldname = 'itemid' ";

                var disname = this._dapperHelper.RawQuery(RelationItemDispNameSql).FirstOrDefault();

                Console.WriteLine("---- dis name -----");
                Console.WriteLine(disname);

                String subSql = "select itemid2 FROM ITEMRELATIONFLAT " +
                                $"where itemtypecd1 = '{itemtype}' " +
                                $"and subtype2 = '{RelSubType}' " +
                                 "and itemid1 = '239106' ";

                String sql = $"select * from {Reltype}_PROPERTIES " +
                             $" where {Reltype}type = '{RelSubType}' " +
                             $" and itemid in ({subSql}) ";

                Console.WriteLine(sql);

                var data= this._dapperHelper.RawQuery(sql).ToList();
                RelatedItemListDict.Add(disname.displayname, data);
        
            }

            return RelatedItemListDict;
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
