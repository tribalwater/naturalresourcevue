using FastMember;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using DbUitlsCoreTest.Data;
using System.Data.SqlClient;
using System.Web;

namespace DbUitlsCoreTest.Data
{
    public class ItemSQLRepository : IItemRepository
    {
        private IDapperHelper _dapperHelper;
        private int _dbtype;
        private bool _DLSOverride;
        private bool _flattenRecord;
        private bool _mixedCaseTags;
        private string userId;
        private readonly string STR_NA = "-N/A-";

        public Predicate<dynamic> nodeFilterOverride { get; set; }

        /// <summary>
        /// Stores the ID for the current user
        /// </summary>
        public string UserId
        {
            get
            {
                return this.userId;
            }
            set
            {
                this.userId = value;
            }
        }

        public ItemSQLRepository(IDapperHelper dapperHelper, int dbtype = 2, bool DLSOverride = false)
        {
            _dapperHelper       = dapperHelper;
            _dbtype             = dbtype;
            _DLSOverride        = DLSOverride;
            _flattenRecord      = false;
            _mixedCaseTags      = false;

            userId              = "5327";
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
                                $"and itemid1 = '{itemid}' ";

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
        //TODO:
        // Need to check if subtype is null
        // need to handle when fieldlist list is passed as param
        // need to handle when urlendcoding is set?
        // need to handle sort order 
       

        public List<dynamic> GetItemDisplay(string itemtype, string subtype, string fieldlist = "")
        {
            string[] selectArr = new string[]
            {
                 "fieldname", "itemtypecd", "displayname", "fieldlength", "maxlength", "required", "listeditem",
                 "fieldtype", "itemvaluegroup", "subtypecd", "parenttable", "parentcolumn", "parentfieldname",
                 "parentsubtype", "defaultvalue", "linkfield", "linktype", "tooltip", "keyfield",
                 "sortorder", "ISNULL(sortposition, 0) sortposition", "ISNULL(sortdirection, 'asc') sortdirection",
                 "childfieldname", "childxmldoc", "customsql", "exportcol", "importcol", "onblur", "onchange"
            };

            //Check for cdrlschedule itemtypecd, which is an exception to standard naming convention
            if (itemtype == "cdrlschedule")
            {
                itemtype = "cdrldeliveryschedule";
            }

            //Store list of fields in a hashtable
            Hashtable listoffields = new Hashtable();
            if (fieldlist != null && fieldlist.Length > 0)
            {
                foreach (string xfield in fieldlist.Split(','))
                {
                    if (!listoffields.ContainsKey(xfield))
                    {
                        listoffields.Add(xfield, null);
                    }
                }
            }

            string sql = $@" select  {String.Join(",", selectArr)} from itemdisplay where itemtypecd = '{itemtype}'";
            if (fieldlist != null && fieldlist.Length > 0)
            {
                sql += "and (fieldname in ('" + fieldlist.Replace(",", "','") + "') or fieldname = 'itemid' or fieldname is null) ";
            }
            if (subtype != null && subtype.Length > 0)
            {
                sql += "and subtypecd = '" +
                   subtype + "'";
            }
            else
            {
                sql += " and subtypecd is null";
            }
            sql += " order by sortorder, displayname";

            Console.WriteLine(sql);
            //If using SQL Server, convert query before running it
            if (this._dbtype.Equals(2))
            {
                sql = DataUtils.sqlConvert(sql);
            }

            var res = _dapperHelper.RawQuery(sql).ToList();
      
            int rlcount = 0;
            foreach (var item in res)
            {
                if(item.fieldname == null || item.fieldname.Length == 0)
                {
                    item.fieldname = "rlc" + rlcount;
                    rlcount++;
                }
                //Make sure special characters are not used in the fieldname
                item.fieldname = item.fieldname.Replace("[", "").Replace("]", "");

                //If fieldname is not in the fieldlist, don't add it
                if (item.fieldname != "itemid" && listoffields.Count > 0 && !listoffields.ContainsKey(item.fieldname))
                {
                    continue;
                }
              

            } 
            // need to update this to include actualy id 
            
;           return res.ToList();
            //return this.GetItemProperties(res.ToList(), itemtype, subtype, "48924", "");
        }

        public object GetItemCustomButtons(string itemtype, string subtype)
        {
            Dictionary<string, string> whereDict = new Dictionary<string, string>();
            whereDict.Add("itemtypecd", itemtype);
            whereDict.Add("subtypecd", subtype);

            var res = _dapperHelper.GetList("itembuttons", null, whereDict);
                
               

            return res;

        }
        public object GetItemList(string itemtype, string subtype, string fieldlist = "", string whereorder = "")
        {
            Console.WriteLine("get list ------*******_--");
            var itemDisp = this.GetItemDisplay(itemtype, subtype);
            var itemDict = itemDisp.ToDictionary(x => x.fieldname, x => x);
            var itemRecs = this.BuildItemList(itemDisp, itemtype, subtype, "", "");
            foreach (var hsm in itemRecs)
            {
               
                foreach (var item in hsm)
                {
                    Console.WriteLine(item);
                    //item.Value["displayname"] = "fuck";
                }
            }
            Hashtable recordset = new Hashtable();
            recordset.Add("display", itemDict);
            recordset.Add("records", itemRecs);

            return recordset;
        }

        public object GetItemProperties(string itemtype, string subtype, string itemid, string fieldlist = "", string whereorder = "")
        {
            Console.WriteLine("---- itemid for props ----");
            Console.WriteLine(itemid);
            var itemDisp = this.GetItemDisplay(itemtype, subtype);
            var itemRecs = this.BuildItemProperties(itemDisp, itemtype, subtype, itemid, whereorder);
            var itemProps = this.FormatItemProperties(itemRecs, itemDisp);
            var itemDispDict = itemDisp.ToDictionary(i => i.fieldname, i => i);
            Hashtable recordset = new Hashtable();
            recordset.Add("display", itemDispDict);
            recordset.Add("records", itemProps);
           
            return recordset;
        }

        public object FormatItemProperties(List<dynamic> itemprops, List<dynamic> itemdisp)
        {
            if(itemprops.Count < 1 || itemdisp.Count < 1)
            {
                return new { };
            }
            var dispDict = itemdisp.ToDictionary(x => x.fieldname, x => x);
            var propDict = itemprops[0];
            List<dynamic> fieldList = new List<dynamic>();

            foreach (var item in propDict.Values)
            {
                if (item.ContainsKey("fieldname") == true) {
                    Console.WriteLine("contains field name ");
                    fieldList.Add(item);  
                }

               // Console.WriteLine("---- item ------");
               Console.WriteLine(item.ContainsKey("fieldname").ToString());
            }


            foreach (var item in itemdisp)
            {
                if (item.parenttable != null)
                {
                    Console.WriteLine(item.parenttable.ToString());

                }
                else {
                    Console.WriteLine(" no parent table --------");
                }
            }


            Console.WriteLine("--- item props ------------------------");

            foreach (var field in fieldList) 
            {
                string fieldName  = field["fieldname"];
                string fieldValue = field["fieldvalue"];
                string fieldType  = field["fieldtype"];

                string dispLinkType      = dispDict[fieldName].linktype;
                string dispParentTable   = dispDict[fieldName].parenttable;
                string dispParentSubtype = dispDict[fieldName].parentsubtype;

                if (dispDict[fieldName].tooltip != null) field["tooltip"] = dispDict[fieldName].tooltip;
           
                bool isUrl = fieldType == "url" && ( fieldValue.ToLower().StartsWith("http") || fieldValue.ToLower().IndexOf("a") > 0 );
                bool islinked = ( dispDict[fieldName].linkfield != null && propDict[fieldName + "link"] != null && propDict[fieldName + "link"]["fieldvalue"].Length > 0) ;

                if (isUrl || islinked)
                {
                   // field.Add("linkTo", "");
                   // field.Add("linkToType", "");

                    switch (dispLinkType)
                    {
                        case "email":
                            //TODO: need to implement emailing in system 
                            break;
                        case "drilldown":
                            if (dispParentTable.IndexOf("rmrtemplate") >= 0)
                            {
                                //TODO: needt to handle routing tempaltes ??? 

                            }
                            else
                            {
                                Console.WriteLine("--- drill down error ");
                                Console.WriteLine(dispDict[fieldName]);
                                Hashtable linkToParams = new Hashtable();
                                linkToParams.Add("ltype", dispParentTable.Substring( 0, dispParentTable.IndexOf("_") ) );
                                linkToParams.Add("lsubtype", dispParentSubtype);
                                linkToParams.Add("link", propDict[fieldName + "link"]);
                                
                                field["linkTo"]     = linkToParams;
                                field["linkToType"] = "tabNavigate";
                                field.Add("isLinkType", true);

                            }
                            break;
                        case "newtab":
                            if (!String.IsNullOrEmpty(dispParentTable))
                            {
                                Hashtable linkToParams = new Hashtable();
                                linkToParams.Add("ltype", dispParentTable.Substring(0, dispParentTable.IndexOf("_")));
                                linkToParams.Add("lsubtype", dispParentSubtype);
                                linkToParams.Add("link", propDict[fieldName + "link"]);

                                field["linkTo"] = linkToParams;
                                field["linkToType"] = "tabAddNew";
                                field.Add("isLinkType", true);

                            }
                            else
                            {
                                Hashtable linkToParams = new Hashtable();

                                linkToParams.Add("link", propDict[fieldName + "link"]);
                                field["linkTo"] = linkToParams;
                                field["linkToType"] = "tabAddMisc";
                                field.Add("isLinkType", true);


                            }
                            break;
                        case "popup":
                            if (dispParentTable.IndexOf("rmrtemplate") >= 0)
                            {
                                //TODO: needt to handle routing tempaltes ??? 
                            }
                            else if(!String.IsNullOrEmpty(dispParentTable))
                            {
                                Hashtable linkToParams = new Hashtable();
                                linkToParams.Add("ltype", dispParentTable.Substring(0, dispParentTable.IndexOf("_")));
                                linkToParams.Add("lsubtype", dispParentSubtype);
                                linkToParams.Add("link", propDict[fieldName + "link"]);

                                field["linkTo"] = linkToParams;
                                field["linkToType"] = "propPopup";

                            }
                            else
                            {
                                Hashtable linkToParams = new Hashtable();
                                linkToParams.Add("link", propDict[fieldName + "link"]);

                                field["linkTo"] = linkToParams;
                                field["linkToType"]= "genericPopup";
                                field.Add("isLinkType", true);

                            }

                            break;
                        case "validation":
                            Hashtable linkTo = new Hashtable();
                            linkTo.Add("link", dispParentSubtype);

                            field["linkTo"] = linkTo;
                            field["linkToType"] = "genericPopup";
                            field.Add("isLinkType", true);

                            break;
                        default:
                            if(fieldType == "url")
                            {
                                if (fieldName.IndexOf("@") > 0)
                                {
                                    Hashtable linkToUrl = new Hashtable();
                                    linkToUrl.Add("link", fieldValue);
                                    field["linkTo"] = linkToUrl;
                                    field["linkToType"] = "mailTo";

                                }
                                else
                                {
                                    Hashtable linkToUrl = new Hashtable();
                                    linkToUrl.Add("link", fieldValue +  "," + fieldName );
                                    field["linkTo"] = linkToUrl;
                                    field["linkToType"] = "newWindow";

                                }
                            }
                            else
                            {
                                Console.WriteLine("--- default ----");
                                Console.WriteLine(dispDict[fieldName]);
                                Hashtable linkSimple = new Hashtable();
                                linkSimple.Add("link", fieldValue);
                                field["linkTo"] = linkSimple;
                                field["linkToType"] = "simple";
                            }
                            break;
                    }

                }
                else
                {
                    switch (fieldType)
                    {
                        case "formattedtext":
                            // need to handle formated text on the client 
                           // output += "<span style=\"margin: 0; padding: 0; border: 0; outline: 0; line-height: 1.3; text-decoration: none; font-size: 100%; list-style: none;\">" + fielddata + "</span>";
                            break;
                        case "readonlycurrency":
                            goto case "currency";
                        case "currency":
                            string formattedVal=  DataUtils.formatCurrency(fieldValue)
                                                    .Replace("\r\n", "\r")
                                                    .Replace("\r", "<br />")
                                                    .Replace("\n", "<br />");

                            field["fieldvalue"] = formattedVal;
                           
                            break;
                        case "grid":
                            // need to figure how to handle this if needed on the client 
                            //Hashtable gridParams = new Hashtable();

                            //gridParams.Add("isGrid", true);
                            //gridParams.Add("itemtypecd", dispDict[fieldName].);
                            //gridParams.Add("isGrid", true);
                            //gridParams.Add("isGrid", true);
                            //gridParams.Add("isGrid", true);
                            //gridParams.Add("isGrid", true);
                            //gridParams.Add("isGrid", true);


                            field["isGrid"] = true;
                            
                               //string.Format(
                               //    "<iframe src=\"tvgridview.aspx?view=readonly&itemtypecd={0}&subtype={1}&relitemtypecd={2}&relsubtype={3}&relcolumn={4}&maxlength={5}&parentfield={9}&fieldlist={6}&itemid={8}{7}\" height=\"200\" width=\"100%\"></iframe>",
                               //    column.Attributes["itemtypecd"].Value,
                               //    column.Attributes["subtypecd"].Value,
                               //    column.Attributes["parenttable"].Value,
                               //    column.Attributes["parentsubtype"].Value,
                               //    column.Attributes["parentcolumn"].Value,
                               //    column.Attributes["maxlength"].Value,
                               //    column.Attributes["defaultvalue"].Value,
                               //    column.Attributes["customsql"].Value,
                               //    itemidString,
                               //    column.Attributes["parentfieldname"].Value
                               //);
                            break;
                        default:
                           field["fieldvalue"] = fieldValue.Replace("\r\n", "\r").Replace("\r", "<br />").Replace("\n", "<br />");
                            break;
                    }


                }
                propDict[fieldName] = field;
            }

            itemprops[0] = propDict;
            return itemprops;
        }
        public List<dynamic> BuildItemProperties(List<dynamic> itemdisp, string itemtype, string subtype, string itemid, string whereorder)
        {
            string columns = "";
            string idname = "itemid";
            string itemtable = itemtype + "_properties";
            if (itemtype == "cdrldeliveryschedule")
            {
                itemtable = "cdrlschedule_properties";
            }
            string linktables = "";
            int linktablecount = 0;
            string whereclause = "";
            //string whereorder = "";
            string relationlink = "";
            string orderbyclause = "";
     
         
            this.BuildSqlFromItemDisp(
                                      itemdisp, itemtype, subtype, itemtable,
                                      item => (item.fieldtype != "relation search" && item.fieldtype != "label"), 
                                      whereorder, ref whereclause, ref orderbyclause, ref columns, ref linktables,
                                      ref idname,  ref relationlink, ref linktablecount, false
                                     );

            string firstcol = columns.Substring(0, columns.IndexOf(","));
            if (whereclause.IndexOf("where ") >= 0)
            {
                whereclause += " and ";
            }
            else
            {
                whereclause = " where ";
            }

            //Cannot use distinct on this query since "long" type columns may be included in the results
            string sql = "select " + columns +
               " from " + itemtable + relationlink + linktables +
               " " + whereclause + itemtable + "." + idname + " = " + itemid;

           
            //If using SQL Server, convert query before running it
            if (this._dbtype.Equals(2))
            {
                sql = DataUtils.sqlConvert(sql);
            }

            var recs = this.buildItemRecord(itemdisp, sql);

            return recs;
        }

        public object GetItemTabs(string itemtype, string subtype)
        {
            Dictionary<string, string> whereDict = new Dictionary<string, string>();
            whereDict.Add("itemtypecd", itemtype);

            if (subtype == null)
            {
                whereDict.Add("subtypecd", null);
            }
            else
            {
                whereDict.Add("subtypecd", subtype);
            }

            var res = _dapperHelper.GetList("itemtabs", null, whereDict);

            return res;

        }

        private  List<dynamic> BuildItemList(List<dynamic> itemDisp, string itemtype, string subtype, string fieldlist = "", string whereorder = "", Predicate<dynamic> filterfunc = null)
        {
            Console.WriteLine("get item list -----");
            string columns = "";
            string idname = "itemid";
            // TODO: need to inplment getTopVueParameter
            //string ShowLockedRecordsExceptions = getTopVueParameter("ShowLockedRecordsExceptions");
            if (this.nodeFilterOverride != null)
            {
                filterfunc = this.nodeFilterOverride;
            }

            string objitemtype = "";
            string objsubtype = "";
            string ShowLockedRecordsExceptions = getTopVueParameter("ShowLockedRecordsExceptions");



            //Check for cdrldeliveryschedule itemtype, which is an exception to standard naming convention
            if (itemtype == "cdrldeliveryschedule")
            {
                itemtype = "cdrlschedule";
            }

            string itemtable     = itemtype + "_properties";
            string linktables    = "";
            int linktablecount   = 0;
            string whereclause   = "";
            string relationlink  = "";
            string orderbyclause = "";
            if (whereorder == null)
            {
                whereorder = "";
            }

            //Replace new_time function with adjusted date/time
            while (whereorder.IndexOf("new_time(") >= 0)
            {
                whereorder = newTimeAdjust(whereorder);
            }
            


            //Build clauses for SQL statement
            this.BuildSqlFromItemDisp( itemDisp, itemtype, subtype, itemtable, filterfunc, whereorder, 
                                       ref whereclause, ref orderbyclause, ref columns, ref linktables,
                                       ref idname, ref relationlink, ref linktablecount, true
                                     );

            string firstcol = columns.Substring(0, columns.IndexOf(","));
            string sql = "";

           

            //If searching by related file, add display node to indicate hits
            if (whereorder.IndexOf("artifact.filename") >= 0 && columns.IndexOf("fbartifact") >= 0)
            {

                Hashtable filehit = new Hashtable();
                filehit.Add("fieldname", "fbartifact");
                filehit.Add("displayname", "Found in file");
                filehit.Add("listeditem", "Y");
                filehit.Add("fieldtype", "text");

                itemDisp.Add(filehit);
            }

            //Get count of total records matching criteria
            Hashtable xAttr = new Hashtable();
            xAttr.Add("fieldname", "totalrecs");

            //Create alltables variable to support SQL Server conversion if needed
            string alltables = itemtable + relationlink + linktables;

            //set subytpe variable
            bool hassubtype = false;
            //Check if table has a subtype column and return null records
            string stsql = "select count(*) from user_tab_columns " +
               "where table_name = '" + itemtype.ToUpper() + "_PROPERTIES' " +
               "and column_name = '" + itemtype.ToUpper() + "TYPE'";

            if (getItemIDList(stsql) != "0")
            {
                hassubtype = true;
            }
          
            //If no criteria was specified, just get simple count from properties
            if (whereorder.Length == 0)
            {
                int ir2pos = linktables.IndexOf("itemrights2.itemid");
                sql = "select count(*) from (select distinct " + itemtable + "." + idname + ", ";
                if (this._DLSOverride)
                {
                    sql += "'N' xcontrolled, 'Y' xallowed";
                }
                else
                {
                    sql += "case when itemrights.itemid is null then 'N' else 'Y' end xcontrolled, " +
                    "case when itemrights2.itemid is null then 'N' else 'Y' end xallowed ";
                }
              
                sql += " from " + itemtable + linktables.Substring(0, ir2pos + 28 + itemtable.Length);
               
                //Determine how to filter by subtype
                if (itemtable == "user_properties" && subtype == "contact")
                {
                    //For item display lists of contacts, show all users (both users and contacts)
                    sql += " where user_properties.itemid > 0 ";
                }
                else if (subtype != null && subtype.Length > 0)
                {
                    sql += " where " + itemtable + "." + itemtype +
                       "type = '" + subtype + "' ";
                }
                else
                {
                    sql += " where ";
                    if (hassubtype)
                    {
                        sql += itemtable + "." + itemtype +
                           "type is null ";
                        hassubtype = true;
                    }
                }
                //Limit count based on data level security
                /*
                sql += "itemrights.itemid(+ ) = " + itemtable + "." + idname +
                   " and itemrights2.itemid(+ ) = " + itemtable + "." + idname;
                */
                if (getTopVueParameter("ShowLockedRecords") != "true" && !this._DLSOverride)
                {
                    if (sql.ToLower().Trim().EndsWith("where"))
                    {
                        sql += " (itemrights.itemid is null or itemrights2.itemid is not null) ";
                    }
                    else
                    {
                        sql += " and (itemrights.itemid is null or itemrights2.itemid is not null) ";
                    }
                }
                else
                {
                    if (ShowLockedRecordsExceptions != "null" && ShowLockedRecordsExceptions != "-N/A-" && ShowLockedRecordsExceptions != "")
                    {
                        foreach (string objecttype in ShowLockedRecordsExceptions.Split(','))
                        {
                            objitemtype = objecttype.Substring(0, objecttype.IndexOf("_"));
                            objsubtype = objecttype.Substring(objecttype.IndexOf("_")).Replace("_", "");
                            if (objsubtype.Equals("null") || objsubtype.Equals(""))
                            {
                                objsubtype = null;
                            }
                            if (objitemtype == itemtype && subtype == objsubtype && !this._DLSOverride)
                            {
                                if (sql.ToLower().Trim().EndsWith("where"))
                                {
                                    sql += " (itemrights.itemid is null or itemrights2.itemid is  not null) ";
                                }
                                else
                                {
                                    sql += " and (itemrights.itemid is null or itemrights2.itemid is  not null) ";
                                }
                            }
                        }
                    }
                }
              
                sql += ") tvtmptble ";
                if (getTopVueParameter("ShowLockedRecords") != "true")
                {
                    sql += "where xcontrolled = 'N' or xallowed = 'Y'";
                }
                else
                {
                    if (ShowLockedRecordsExceptions != "null" && ShowLockedRecordsExceptions != "-N/A-" && ShowLockedRecordsExceptions != "")
                    {
                        foreach (string objecttype in ShowLockedRecordsExceptions.Split(','))
                        {
                            objitemtype = objecttype.Substring(0, objecttype.IndexOf("_"));
                            objsubtype = objecttype.Substring(objecttype.IndexOf("_")).Replace("_", "");
                            if (objsubtype.Equals("null") || objsubtype.Equals(""))
                            {
                                objsubtype = null;
                            }
                            if (objitemtype == itemtype && subtype == objsubtype)
                            {
                                sql += "where xcontrolled = 'N' or xallowed = 'Y'";
                            }
                        }
                    }
                }

            }

     
            else
            {
                //If a whereorder was specified, build the full query
                sql = "select distinct " + itemtable + "." + idname + ", ";
                if (this._DLSOverride)
                {
                    sql += "'N' xcontrolled, 'Y' xallowed ";
                }
                else
                {
                    sql += "case when itemrights.itemid is null then 'N' else 'Y' end xcontrolled, " +
                    "case when itemrights2.itemid is null then 'N' else 'Y' end xallowed ";
                }
                sql += " from " + alltables + " " +
                   whereclause;
                //Determine how to filter by subtype
                if (itemtable == "user_properties" && subtype == "contact")
                {
                    //For item display lists of contacts, show all users (both users and contacts)
                    if (whereclause.IndexOf(" where ") < 0)
                    {
                        sql += " where ";
                    }
                    else
                    {
                        sql += " and ";
                    }
                    sql += " user_properties.itemid > 0 ";
                }
                else if (subtype != null && subtype.Length > 0)
                {
                    if (whereclause.IndexOf(" where ") < 0)
                    {
                        sql += " where ";
                    }
                    else
                    {
                        sql += " and ";
                    }
                    sql += itemtable + "." + itemtype +
                       "type = '" + subtype + "'";
                }
                else
                {
                    if (hassubtype)
                    {
                        if (whereclause.IndexOf(" where ") < 0)
                        {
                            sql += " where ";
                        }
                        else
                        {
                            sql += " and ";
                        }
                        sql += itemtable + "." + itemtype +
                           "type is null";
                        hassubtype = true;
                    }
                }
                if (relationlink.Length > 0)
                {
                    string sql2 = sql.Replace("itemid1", "itemid0");
                    sql2 = sql2.Replace("itemid2", "itemid1");
                    sql2 = sql2.Replace("itemid0", "itemid2");
                    sql2 = sql2.Replace("itemtypecd1", "itemtypecd0");
                    sql2 = sql2.Replace("itemtypecd2", "itemtypecd1");
                    sql2 = sql2.Replace("itemtypecd0", "itemtypecd2");
                    sql += " union " + sql2;
                }
                sql = "select count(*) from (" + sql +
                   ") tvtmptble ";
                if (getTopVueParameter("ShowLockedRecords") != "true")
                {
                    sql += "where xcontrolled = 'N' or xallowed = 'Y'";
                }
                else
                {
                    if (ShowLockedRecordsExceptions != "null" && ShowLockedRecordsExceptions != "-N/A-" && ShowLockedRecordsExceptions != "")
                    {
                        foreach (string objecttype in ShowLockedRecordsExceptions.Split(','))
                        {
                            objitemtype = objecttype.Substring(0, objecttype.IndexOf("_"));
                            objsubtype = objecttype.Substring(objecttype.IndexOf("_")).Replace("_", "");
                            if (objsubtype.Equals("null") || objsubtype.Equals(""))
                            {
                                objsubtype = null;
                            }
                            if (objitemtype == itemtype && subtype == objsubtype)
                            {
                                sql += "where xcontrolled = 'N' or xallowed = 'Y'";
                            }
                        }
                    }
                }
            }
            //If using SQL Server, convert query before running it
            if (this._dbtype.Equals(2))
            {
                sql = DataUtils.sqlConvert(sql);
            }
            Console.WriteLine("--- building item list  1-----");
            Console.WriteLine(sql);
            var res = this._dapperHelper.RawQuery(sql);
            if(res != null)
            {
                //if (this.LastRec > int.Parse(xAttr.Value))
                //{
                //    this.LastRec = int.Parse(xAttr.Value) - 1;
                //}
                xAttr.Add("totalrecs", res.ToString());

            }
            else
            {
                xAttr.Add("totalrecs", "unknown");

            }
         

            //Get recordset to return to user, attempt to use distinct keyword initially
            //(Use funky case to more easily keep track of it) - cannot use distinct keyword if any long type fields are being returned - track DiStIncT keyword so it can be removed if the query fails when DiStIncT is included
            sql = string.Format("select {0} {1} from {2} {3}", (alltables.IndexOf("itemlongvalues") > -1) ? "" : "DiStIncT", columns, alltables, whereclause);

            //Determine how to filter by subtype
            if (itemtable == "user_properties" && subtype == "contact")
            {
                //For item display lists of contacts, show all users (both users and contacts)
                if (whereclause.IndexOf(" where ") < 0)
                {
                    sql += " where ";
                }
                else
                {
                    sql += " and ";
                }
                sql += " user_properties.itemid > 0 ";
            }
            else if (subtype != null && subtype.Length > 0)
            {
                if (whereclause.IndexOf("where") < 0)
                {
                    sql += " where ";
                }
                else
                {
                    sql += " and ";
                }
                sql += itemtable + "." + itemtype +
                   "type = '" + subtype + "'";
            }
            else
            {
                if (hassubtype)
                {
                    if (whereclause.IndexOf(" where ") < 0)
                    {
                        sql += " where ";
                    }
                    else
                    {
                        sql += " and ";
                    }
                    sql += itemtable + "." + itemtype+
                       "type is null";
                    hassubtype = true;
                }
            }
            if (relationlink.Length > 0)
            {
                string sql2 = sql.Replace("itemid1", "itemid0");
                sql2 = sql2.Replace("itemid2", "itemid1");
                sql2 = sql2.Replace("itemid0", "itemid2");
                sql2 = sql2.Replace("itemtypecd1", "itemtypecd0");
                sql2 = sql2.Replace("itemtypecd2", "itemtypecd1");
                sql2 = sql2.Replace("itemtypecd0", "itemtypecd2");
                sql += " union " + sql2;
            }
            sql += " " + orderbyclause;
            sql = "select * from (" + sql +
               ") tvtmptble ";
            if (getTopVueParameter("ShowLockedRecords") != "true")
            {
                sql += "where xcontrolled = 'N' or xallowed = 'Y'";
            }
            else
            {
                if (ShowLockedRecordsExceptions != "null" && ShowLockedRecordsExceptions != "-N/A-" && ShowLockedRecordsExceptions != "")
                {
                    foreach (string objecttype in ShowLockedRecordsExceptions.Split(','))
                    {
                        objitemtype = objecttype.Substring(0, objecttype.IndexOf("_"));
                        objsubtype = objecttype.Substring(objecttype.IndexOf("_")).Replace("_", "");
                        if (objsubtype.Equals("null") || objsubtype.Equals(""))
                        {
                            objsubtype = null;
                        }
                        if (objitemtype == itemtype && subtype == objsubtype)
                        {
                            sql += "where xcontrolled = 'N' or xallowed = 'Y'";
                        }
                    }
                }

            }
            //Append order by clause to outer query if applicable
            if (orderbyclause != null && orderbyclause.Length > 0)
            {
                if (orderbyclause.IndexOf(".") >= 0)
                {
                    //Loop through fields in order by clause and replace any child fields with label names
                    foreach (string obf in orderbyclause.Split(','))
                    {
                        string obfieldname = obf.Replace("asc", "").Replace("desc", "").Replace("order by", "").Trim();
                        if (obfieldname.IndexOf(".") > 0 && obfieldname.IndexOf(itemtable + ".") < 0)
                        {
                            string[] obfdetails = obfieldname.Split('.');
                            //Removed link count if needed
                            if (obfdetails[0].LastIndexOf("_") > obfdetails[0].IndexOf("_"))
                            {
                                obfdetails[0] = obfdetails[0].Substring(0, obfdetails[0].LastIndexOf("_"));
                            }

                            var colItem = itemDisp.Where(item => item.parenttable == obfdetails[0] && item.parentcolumn == obfdetails[1]).First();
                          
                            if (colItem != null)
                            {
                                orderbyclause = orderbyclause.Replace(obfieldname, colItem.fieldname);
                            }
                        }
                    }
                    //Remove any table name references
                    string tablelist = itemtable + linktables;
                    foreach (string table in tablelist.Split('\r'))
                    {
                        string tblname = table.Trim();
                        if (tblname.IndexOf(" on ") > 0)
                        {
                            tblname = tblname.Substring(0, tblname.LastIndexOf(" on "));
                        }
                        if (tblname.Trim().IndexOf(" ") > 0)
                        {
                            tblname = tblname.Trim().Substring(tblname.Trim().LastIndexOf(" ")).Trim();
                        }
                        if (tblname == null || tblname.Length == 0)
                        {
                            continue;
                        }
                        orderbyclause = orderbyclause.Replace(tblname + ".", "");
                    }
                }
                sql += " " + orderbyclause;
            }
            //If using SQL Server, convert query before running it
            if (this._dbtype.Equals(2))
            {
                sql = sql.Replace("select * from (select", "select * from (select top 100 percent").Replace("top 100 percent DISTINCT", "DISTINCT top 100 percent");
                sql = DataUtils.sqlConvert(sql);
            }


            IEnumerable<dynamic> listRes;

            try
            {
                listRes = this._dapperHelper.GetList(sql);
            }
            catch (Exception)
            {
                //If query fails, attempt to remove distinct keyword and try again
                sql = sql.Replace("select DiStIncT", "select ");
                sql = sql.Replace("select top 100 percent DiStIncT", "select top 100 percent ");

                listRes = this._dapperHelper.RawQuery(sql);

            }

            //If paging through records, update record paging attributes
            Hashtable recids = new Hashtable();

            foreach (var item in listRes)
            {
                string cid = item.itemid.ToString();
                if (!recids.ContainsKey(cid))
                {
                    recids.Add(cid, null);
                }
            }


           var recs = this.buildItemRecord(itemDisp, sql, true);
            foreach (var rec in recs)
            {
                Console.WriteLine(rec);
            }

            return recs;


        }
        // TODO :
        // Need to implent join with item rights

        private object BuildSqlFromItemDisp(
                                            List<dynamic> itemdisp, string itemtype, string subtype, string itemtable,
                                            Predicate<dynamic> filterfunc,  string whereorder, ref string whereclause,
                                            ref string orderbyclause, ref string columns,  ref string linktables, 
                                            ref string idname, ref string relationlink, ref int linktablecount, bool isListPage
                                          )
        {

            if (itemtype == "cdrlschedule")
            {
                itemtype = "cdrldeliveryschedule";
            }
            bool buildorderby = false;
            ArrayList orderinfo = new ArrayList();
            //Facilitate any existing where or order by clauses
            if (whereorder != null && whereorder.IndexOf("order by") >= 0)
            {
                whereclause = whereorder.Substring(0, whereorder.IndexOf("order by")).Trim();
                orderbyclause = whereorder.Substring(whereorder.IndexOf("order by"), whereorder.Length - whereorder.IndexOf("order by")).Trim();
            }
            else
            {
                whereclause += whereorder;
                orderbyclause = "";
                buildorderby = true;
            }

            //Create hashtable for parent tables and load all parent tables into it
            Hashtable parentTables = new Hashtable();
            linktablecount = 0;

            // filters out items that dont have a parent table and have a fieldttyep of itemid
            var fullDisp = itemdisp.Where(item => ( (item.parenttable != "" || item.parenttable != null) && item.fieldtype != "itemid" ));
            foreach (var item in fullDisp)
            {
                string parentTableName = item.parenttable;
                if (!parentTables.ContainsKey(item.fieldname))
                {
                    string linktablelabel = parentTableName + "_" + linktablecount.ToString();
                    if (linktablelabel.Length > 30)
                    {
                        string origname = linktablelabel;
                        linktablelabel = linktablelabel.Substring(linktablelabel.Length - 30);
                        whereclause = whereclause.Replace(origname + " ", linktablelabel + " ");
                        whereclause = whereclause.Replace(origname + ".", linktablelabel + ".");

                    }
                    parentTables.Add(item.fieldname, linktablelabel);
                    linktablecount++;
                }


            }

            //i => i.parenttable != '' && i.fieldtype != 'itemid')
            IEnumerable<dynamic> filteredDispNodes;
            if (filterfunc != null) {
                 filteredDispNodes = itemdisp.Where(item => filterfunc(item));
            }
            else
            {
                filteredDispNodes = itemdisp;
            }            
            foreach (var item in filteredDispNodes)
            {
                item.l = "rarar";
                if(item.fieldtype == "label")
                {
                    continue;
                }
                //debug based on specific field name
                if (item.fieldname == "ccbdid")
                {
                    string foundfield = "true";
                }

                // This is only relevant when database is Oracle
                if (item.fieldtype == "formattedtext" && this._dbtype == 1)
                {
                    item.parenttable = item.fieldname;
                    item.parentcolumn = "itemid";
                    item.parentfieldname = "itemid";
                    item.defaultvalue = $"select itemid, largeval val from itemlongvalues where itemtypecd = '{itemtype}' " +
                                           $"and fieldname = '{item.fieldname}' order by sortorder, itemid";
                }

                //build default order by if none was specified
                // added ternary because the itemid column could possibly not have a sortposition attribute and be included
                
                string sortPos = (item.sortposition.ToString() == null ? "0" : item.sortposition.ToString());
              
                if (buildorderby && int.Parse(sortPos) > 0)
                {
                    string obyfld = item.fieldname;
                    if (obyfld.IndexOf(".") < 0 && item.parenttable.Length == 0)
                    {
                        obyfld = itemtype + "_properties." + obyfld;
                    }
                    orderinfo.Add(item.sortposition + "-" +  obyfld + " " +item.sortdirection);
                }

                if (item.fieldtype == "itemid")
                {
                    idname = item.fieldname;
                }

                if (columns.Length > 0)
                {
                    columns += ", ";
                }
                //Perform specified math function on fields specified
                if (item.fieldtype == "fielddelta")
                {
                    columns += item.customsql + " " + item.fieldname;
                    //Get related model information through modelitems
                }
                else if (item.fieldtype == "models")
                {
                    columns += "mxp.modelname " + item.fieldname;
                    linktables += "\r left join modelitems mxi on mxi.itemid = " + itemtable +
                               "." + idname + " and mxi.itemtypecd = '" + itemtype + "' " +
                               "left join model_properties mxp on " +
                               "mxp.itemid = mxi.modelid ";
                    
                }
                else if (item.fieldtype == "inlinequery" || (item.fieldtype == "formattedtext" && this._dbtype == 1))
                {
                    columns += item.parenttable + ".val " + item.fieldname;
                                linktables += "\r left join (" + item.defaultvalue  +
                               ") " + item.parenttable + " on " +
                               item.parenttable + "." + item.parentcolumn + " = " +
                               itemtable + "." + item.parentfieldname;
                    
                }
                //Look up data from specified parent table
                else if (item.parenttable != null && item.parenttable.Length > 0 && item.parentfieldname != item.parentcolumn)
                {
                    if(item.fieldtype.IndexOf("relation search") == 0 )
                    {
                        linktables += $@"\r\n left join itemrelation on ((itemrelation.itemid1 = {itemtable} .  {idname} 
                                      and itemrelation.itemtypecd1 = '{itemtype}') or 
                                      (itemrelation.itemid2 = {itemtable }.{idname}
                                      and itemrelation.itemtypecd2 = '{itemtype}'))";

                        columns += item.parenttable + "." + item.parentcolumn;

                        if (linktables.IndexOf(item.parenttable + " " + item.parenttable + " ") < 0)
                        {
                            linktables += $@"\r\n left join {item.parenttable}' '{item.parenttable} 
                                             on ((itemrelation.itemid1 ={item.parenttable}
                                             .itemid and itemrelation.itemtypecd1 = 
                                             {item.parenttable}.Value +
                                             .itemtypecd and itemrelation.itemid2 = 
                                             {itemtable}.itemid and itemrelation.itemtypecd2 = 
                                             {itemtable}.itemtypecd) or (itemrelation.itemid2 = 
                                             {item.parenttable}.itemid and itemrelation.itemtypecd2 = 
                                             {item.parenttable}.itemtypecd and itemrelation.itemid1 = 
                                             {itemtable}.itemid and itemrelation.itemtypecd1 = 
                                             {itemtable}.itemtypecd))";
                        }

                    }
                    else
                    {

                        if (item.parentcolumn != null && item.parentcolumn.IndexOf(",") > 0)
                        {
                            columns += itemtable + "." + item.fieldname + " " + item.fieldname + "_val, ";
                            string[] pclist = item.parentcolumn.Split(',');
                            bool pcmore = false;
                            foreach (string pcol in pclist)
                            {
                                if (pcmore)
                                {
                                    columns += " || ' ' || ";
                                }
                                else
                                {
                                    pcmore = true;
                                }
                                columns += parentTables[item.fieldname].ToString() + "." + pcol;
                            }
                            linktables += "\r left join " + item.parentttabl + " " + parentTables[item.fieldname].ToString();

                            if (this._dbtype.Equals(2))
                            {

                                //If only one and just one of the fields in the join is numeric, then convert both to varchar
                                if ((isFieldNumeric(parentTables[item.fieldname].ToString(), item.parentfieldname) ^
                                     isFieldNumeric(itemtable, item.fieldname))
                                   //|| getTopVueParameter("AlwaysToCharJoins") == "true"
                                   )
                                {
                                    linktables += " on convert(varchar, " + parentTables[item.fieldname].ToString() + "." +
                                              item.parentfieldname + ") = convert(varchar, " + itemtable + "." + item.fieldname + ")";
                                }
                                else
                                {
                                    linktables += " on " + parentTables[item.fieldname].ToString() + "." +
                                               item.parentfieldname + " = " + itemtable + "." + item.fieldname;
                                }
                            }
                            else
                            {
                                if ((isFieldNumeric(parentTables[item.fieldname].ToString(), item.parentfieldname) ^
                                     isFieldNumeric(itemtable, item.fieldname))
                                   //|| getTopVueParameter("AlwaysToCharJoins") == "true"
                                   )
                                {
                                    linktables += "  on to_char(" + parentTables[item.fieldname].ToString() + "." +
                                              item.parentfieldname + ") = to_char( " + itemtable + "." + item.fieldname + ")";
                                }
                                else
                                {
                                    linktables += " on " + parentTables[item.fieldname].ToString() + "." +
                                               item.parentfieldname + " = " + itemtable + "." + item.fieldname;
                                }
                            }
                            if (subtype != null && subtype.Length > 0)
                            {
                                linktables += " and " + itemtable + "." + itemtype + "type = '" + subtype + "'";
                            }
                            columns += " " + item.fieldname;

                            item.lc = parentTables[item.fieldname].ToString().Substring(parentTables[item.fieldname].ToString().LastIndexOf("_"));

                        }
                        else if (item.parentfieldname.IndexOf(".") > 0)
                        {

                            string prntablename = item.parenttable;
                            string prnlabelname = item.parenttable;
                            if (prntablename.IndexOf(" ") > 0)
                            {
                                prntablename = prntablename.Substring(0, prntablename.IndexOf(" "));
                                prnlabelname = prnlabelname.Substring(prnlabelname.IndexOf(" ") + 1);
                            }
                            columns += prnlabelname +
                                        "." + item.parentcolumn.Replace("tblstub.", prnlabelname + ".") +
                                        " " + item.fieldname;
                            if (linktables.IndexOf(prntablename + " " + prnlabelname + " ") < 0)
                            {
                                linktables += "\r left join " + prntablename + " " +
                                   prnlabelname + " ";
                                if (this._dbtype.Equals(2))
                                {
                                    //If only one and just one of the fields in the join is numeric, then convert both to varchar
                                    if ((isFieldNumeric(parentTables[item.fieldname].ToString(), item.parentfieldname) ^
                                       isFieldNumeric(itemtable, item.fieldname))
                                       //|| getTopVueParameter("AlwaysToCharJoins") == "true"
                                       )
                                    {
                                        linktables += " on convert(varchar, " + prnlabelname +
                                                   "." + item.parentfieldname.Split('.')[1] +
                                                   ") = convert(varchar, " + itemtable + "." +
                                                   item.parentfieldname.Split('.')[0] + ")";
                                    }
                                    else
                                    {
                                        linktables += " on " + prnlabelname +
                                                   "." + item.parentfieldname.Split('.')[1] +
                                                   " = " + itemtable + "." +
                                                   item.parentfieldname.Split('.')[0];
                                    }
                                }
                                else
                                {
                                    //If only one and just one of the fields in the join is numeric, then convert both to varchar
                                    if ((isFieldNumeric(parentTables[item.fieldname].ToString(), item.parentfieldname.Split('.')[1]) ^
                                       isFieldNumeric(itemtable, item.parentfieldname.Split('.')[0])) 
                                       //|| getTopVueParameter("AlwaysToCharJoins") == "true"
                                       )
                                    {
                                        linktables += " on to_char(" + prnlabelname +
                                                   "." + item.parentfieldname.Split('.')[1] +
                                                   ") = to_char(" + itemtable + "." +
                                                   item.parentfieldname.Split('.')[0] + ")";
                                    }
                                    else
                                    {
                                        linktables += " on " + prnlabelname +
                                                   "." + item.parentfieldname.Split('.')[1] +
                                                   " = " + itemtable + "." +
                                                  item.parentfieldname.Split('.')[0];
                                    }
                                }
                                if (subtype != null && subtype.Length > 0)
                                {
                                    linktables += " and " + itemtable + "." + itemtype + "type = '" + subtype + "'";
                                }
                            }
                            if (item.linkfield != null && item.linkfield.Length > 0)
                            {
                                columns += ", " + prnlabelname +
                                   "." + item.linkfield.Replace("tblstub.", prnlabelname + ".") +
                                   " " + item.fieldname + "link";
                            }
                        }
                        else
                        {
                         
                            columns += itemtable + "." + item.fieldname + " " + item.fieldname + "_val, ";
                            columns += parentTables[item.fieldname].ToString() + "." +
                                       item.parentcolumn.Replace("parent_table_", parentTables[item.fieldname].ToString() + ".").Replace("tblstub.", parentTables[item.fieldname].ToString() + ".") +
                                        " " + item.fieldname;

                            linktables += "\r left join " + item.parenttable;
                            if (item.parenttable.IndexOf(" ") < 0)
                            {
                                linktables += " " + parentTables[item.fieldname].ToString();
                            }
                            string newlinktabledata = "";
                            if (this._dbtype.Equals(2))
                            {
                                if (item.fieldtype == "multiselectpickwindow")
                                {
                                    newlinktabledata = " on (" + itemtable + "." + item.fieldname + " = convert(varchar, " + parentTables[item.fieldname].ToString() + "." +
                                               item.parentfieldname + ") or " + itemtable + "." + item.fieldname +
                                               " like convert(varchar, " + parentTables[item.fieldname].ToString() + "." +
                                                item.parentfieldname + ") + ',%' or " + itemtable + "." + item.fieldname +
                                               " like '%,' + convert(varchar, " + parentTables[item.fieldname].ToString() + "." +
                                               item.parentfieldname + ") + ',%' or " + itemtable + "." + item.fieldname +
                                               " like '%,' + convert(varchar, " + parentTables[item.fieldname].ToString() + "." +
                                               item.parentfieldname + "))";
                                }
                                else if ((isFieldNumeric(parentTables[item.fieldname].ToString(), item.parentfieldname) ^
                                   isFieldNumeric(itemtable, item.fieldname)) 
                                   // || getTopVueParameter("AlwaysToCharJoins") == "true"
                                   )
                                {
                                    newlinktabledata = " on convert(varchar, " + parentTables[item.fieldname].ToString() + "." +
                                                       item.parentfieldname + ") = convert(varchar, " + itemtable + "." + item.fieldname + ")";
                                }
                                else
                                {
                                    newlinktabledata = " on " + parentTables[item.fieldname].ToString() + "." +
                                                       item.parentfieldname + " = " + itemtable + "." + item.fieldname;
                                 }
                            }
                            else
                            {
                                if (item.fieldtype == "multiselectpickwindow")
                                {
                                    newlinktabledata = " on (" + itemtable + "." + item.fieldname + " = to_char(" + parentTables[item.fieldname].ToString() + "." +
                                                       item.parentfieldname + ") or " + itemtable + "." + item.fieldname +
                                                       " like to_char(" + parentTables[item.fieldname].ToString() + "." +
                                                       item.parentfieldname + ") || ',%' or " + itemtable + "." + item.fieldname +
                                                       " like '%,' || to_char(" + parentTables[item.fieldname].ToString() + "." +
                                                       item.parentfieldname + ") || ',%' or " + itemtable + "." + item.fieldname +
                                                       " like '%,' || to_char(" + parentTables[item.fieldname].ToString() + "." +
                                                       item.parentfieldname + "))";
                                }
                                else if ((isFieldNumeric(parentTables[item.fieldname].ToString(),item.parentfieldname) ^
                                   isFieldNumeric(itemtable, item.fieldname))
                                   // || getTopVueParameter("AlwaysToCharJoins") == "true"
                                   )
                                {
                                    newlinktabledata = " on to_char(" + parentTables[item.fieldname].ToString() + "." +
                                                       item.parentfieldname + ") = to_char(" + itemtable + "." + item.fieldname + ")";
                                }
                                else
                                {
                                    newlinktabledata = " on " + parentTables[item.fieldname].ToString() + "." +
                                                           item.parentfieldname + " = " + itemtable + "." + item.fieldname;
                                }
                            }
                            //Add latest linktable data to linktables
                            linktables += newlinktabledata;
                            if (subtype != null && subtype.Length > 0)
                            {
                                linktables += " and " + itemtable + "." + itemtype + "type = '" + subtype + "'";
                            }
                            if (item.linkfield != null && !String.IsNullOrEmpty(item.linkfield))
                            {
                                columns += ", " + parentTables[item.fieldname].ToString() +
                                               "." + item.linkfield +
                                               " " + item.fieldname + "link";
                            }
                           
                            if (parentTables[item.fieldname].ToString().IndexOf("_") > 0)
                            {
                                item.lc = parentTables[item.fieldname].ToString().Substring(parentTables[item.fieldname].ToString().LastIndexOf("_"));
                            }
                            else
                            {
                                item.lc = "";
                            }
                           
                        }

                    }
                }
                else if (item.fieldtype == "checkbox" && isListPage)
                {
                    columns += "replace(" + itemtable + "." + item.fieldname + ", ',', ', ') " + item.fieldname;
                }
                else
                {
                    if ( item.parenttable != null && !String.IsNullOrEmpty(item.parenttable) )
                    {
                        columns += itemtable + "." +  item.fieldname + " " +  item.fieldname + "_val, ";
                    }
                    columns += itemtable + "." +  item.fieldname;
                    if ( item.linkfield != null && !String.IsNullOrEmpty(item.linkfield) )
                    {
                        columns += ", " + itemtable +
                                   "." + item.linkfield +
                                   " " +  item.fieldname + "link";
                    }
                }
            }
            //Add columns for join to itemrights
            if (this._DLSOverride)
            {
                if (columns.Length > 0)
                {
                    columns += ", 'N' xcontrolled, 'Y' xallowed";
                }
                else
                {
                    columns = "'N' xcontrolled, 'Y' xallowed";
                }
            }
            else
            {
                if (columns.Length > 0)
                {
                    columns += ", case when itemrights.itemid is null then 'N' else 'Y' end xcontrolled, " +
                       "case when itemrights2.itemid is null then 'N' else 'Y' end xallowed";
                }
                else
                {
                    columns = "case when itemrights.itemid is null then 'N' else 'Y' end xcontrolled, " +
                       "case when itemrights2.itemid is null then 'N' else 'Y' end xallowed";
                }
            }

            //Add tables for join to itemrights
            if (!this._DLSOverride)
            {
                linktables = "\r left join (select distinct itemid from itemrights where itemtypecd = '" +
                   itemtype + "') itemrights on itemrights.itemid = " + itemtable + "." + idname +
                   "\r left join (select ir.itemid " +
                   "from itemrights ir " +
                   "where ir.userid = " + this.userId +
                   " and ir.itemtypecd = '" + itemtype + "' " +
                   " union " +
                   "select ir.itemid " +
                   "from itemrights ir, roleusers ru " +
                   "where ir.roleid = ru.roleid " +
                   "and ir.itemtypecd = '" + itemtype + "' " +
                   "and ru.userid = " + this.userId +
                   " union " +
                   "select ir.itemid " +
                   "from itemrights ir, groupmembership gu " +
                   "where ir.groupid = gu.groupid " +
                   "and ir.itemtypecd = '" + itemtype + "' " +
                   "and gu.userid = " + this.userId +
                   ") itemrights2 on itemrights2.itemid = " + itemtable + "." + idname + " " + linktables;
            }

            //Make sure where keyword exists in proper location
            if (whereclause.Length > 5 && whereclause.ToLower().IndexOf(" where ") < 0)
            {
                //make sure we don't have "where and" in the criteria
                if (!string.IsNullOrEmpty(whereclause) && whereclause.ToLower().Trim().StartsWith("and "))
                {
                    whereclause = whereclause.Substring(whereclause.ToLower().IndexOf("and") + 3);
                }
                whereclause = " where " + whereclause;
            }

            //If artifact and itemartifact tables were included, add them to linktables and found column
            if (whereclause.IndexOf("artifact.") >= 0 && linktables.IndexOf("artifact,") < 0)
            {

                linktables += "\r left join itemartifact on itemartifact.itemtypecd = '" + itemtype + "' " +
                   "and itemartifact.itemid = " + itemtable + "." + idname +
                   "\r left join artifact on artifact.artifactid = itemartifact.artifactid ";

                if (columns.Length > 0)
                {
                    columns += ", ";
                }
                columns += "case when artifact.filename is null then 'No' else 'Yes' end fbartifact";

                //Add logic to search indexes if specified
                if (whereclause.IndexOf("/* FileSearchStart */") >= 0)
                {
                    string artindexquery = "select a.artifactid, count(ad.keyword) score " +
                       "from artifact a left join itemartifact ia on ia.artifactid = a.artifactid " +
                       "left join artifactindexdata ad on ad.artifactid = a.artifactid " +
                       "where 1 < 2 and (**FileCriteria**) " +
                       "group by a.artifactid ";
                    string filecriteria = whereclause.Substring(whereclause.IndexOf("/* FileSearchStart */") + 21);
                    filecriteria = filecriteria.Substring(0, filecriteria.IndexOf("/* FileSearchEnd */"));
                    string orifiltercrit = filecriteria;
                    whereclause = whereclause.Replace(orifiltercrit, orifiltercrit + " or (artflindx.artifactid is not null) ");
                    filecriteria = filecriteria.Replace("artifact.filename", "ad.keyword");

                    //Figure out if "contains all" logic was selected and count number of keywords
                    int kwcount = 0;
                    if (filecriteria.IndexOf(" and ") >= 0)
                    {
                        kwcount = filecriteria.Replace("~", "").Replace(" and ", "~").Split('~').Length;
                    }

                    //update artifact index criteria to always use "or" and "equals"
                    filecriteria = filecriteria.Replace("ad.keyword) like", "ad.keyword) =").Replace("'%", "'").Replace("%'", "'").Replace(" and ", " or ");

                    artindexquery = artindexquery.Replace("**FileCriteria**", filecriteria);

                    linktables += "\r left join (" + artindexquery +
                       ") artflindx on artifact.artifactid = artflindx.artifactid";

                    //If using "contains all" type compare and more than one word was used, filter based on score
                    if (kwcount > 1)
                    {
                        linktables += " and artflindx.score >= " + kwcount;
                    }

                    columns = columns.Replace("decode(artifact.filename, null, 'No', 'Yes') fbartifact", "decode(artflindx.artifactid, null, 'No', 'Yes') fbartifact");
                }

            }
            if (whereclause.IndexOf("itemartifact.") >= 0 && linktables.IndexOf("itemartifact ") < 0)
            {
                linktables += "\r left join itemartifact on itemartifact.itemtypecd = '" + itemtype + "' " +
                           "and itemartifact.itemid = " + itemtable + "." + idname +
                           " left join artifact on artifact.artifactid = itemartifact.artifactid ";
            }
            //Remove old style join syntax from whereclause if applicable
            if (whereclause.IndexOf("itemartifact.itemid(+)") >= 0)
            {
                whereclause = whereclause.Replace("(itemartifact.itemid(+) = " + itemtype +
                   "_properties.itemid and (itemartifact.itemtypecd(+) = " +
                   itemtype + "_properties.itemtypecd) " +
                   "and (itemartifact.artifactid = artifact.artifactid(+))) and", "");
            }

            //GCSS keeps getting a problem in the generated SQL that we cannot reproduce, trying to prevent that with the statement below
            if (whereclause.IndexOf("where  and (") >= 0)
            {
                whereclause = whereclause.Replace("where  and (", "where (");
            }

            //Build order by clause
            orderinfo.Sort();
            foreach (string sort in orderinfo)
            {
                if (orderbyclause.Length == 0)
                {
                    orderbyclause = "order by ";
                }
                else
                {
                    orderbyclause += ", ";
                }
                orderbyclause += sort.Substring(sort.IndexOf("-") + 1);
            }

            return new { };
        }

        public List<dynamic> buildItemRecord(List<dynamic> itemDsip, string sql, bool isList = false)
        {
            string currentid = "";
            int currentrec = 0;

            DateTime started = DateTime.Now;
            Hashtable recordids = new Hashtable();

            //Grab parameter once for TBD meeting times
            bool tbdmeetingtimes = false;
            if (getTopVueParameter("TBDMeetingTimes") == "true")
            {
                tbdmeetingtimes = true;
            }
            var dispDict = itemDsip.ToDictionary(x => x.fieldname, x => x);

          

            using (var connection = this._dapperHelper.GetSqlServerOpenConnection())
            {

                List<dynamic> records = new List<dynamic>();
                
                SqlCommand cmd = connection.CreateCommand();
                cmd.CommandText = sql;

                Console.WriteLine("build recs ----- sql");
                Console.WriteLine(sql);
                var recReader = cmd.ExecuteReader();

                while (recReader.Read())
                {
                    Hashtable record = new Hashtable();
                    for (int i = 0; i < recReader.FieldCount; i++)
                    {
                        bool datefield = false;
                        bool timefield = false;
                        bool numericfield = false;
                        bool hiddenfield = false;

                        string fieldType  = recReader.GetFieldType(i).ToString();
                        string fieldValue = recReader.GetValue(i).ToString();
                        string fieldName  = recReader.GetName(i).ToLower();


                        Hashtable recordProps = new Hashtable();
                        string recName;
                        if (recReader.GetName(i) != null)
                        {
                            recName = (this._mixedCaseTags) ? recReader.GetName(i) : recReader.GetName(i).ToLower();
                        }
                        else
                        {
                            recName = "";
                        }
                        record.Add(recName, "");

                        if (dispDict.ContainsKey(recName) && !String.IsNullOrEmpty(dispDict[recName].displayname))
                        {
                            recordProps["displayname"] = dispDict[recName].displayname;
                            recordProps["fieldtype"] = dispDict[recName].fieldtype;
                            recordProps["sortposition"] = dispDict[recName].sortposition;
                            recordProps["sortorder"] = dispDict[recName].sortorder;


                        }

                        if (dispDict.ContainsKey(recName) && !String.IsNullOrEmpty(dispDict[recName].fieldname))
                        {
                            recordProps["fieldname"] = dispDict[recName].fieldname;
                            if (dispDict[recName].fieldtype.IndexOf("date") > 0)
                            {
                                datefield = true;
                                if (dispDict[recName].fieldtype.IndexOf("time") >= 0)
                                {
                                    timefield = true;
                                }
                            }
                            else if (dispDict[recName].fieldtype == "numeric" || dispDict[recName].fieldtype == "autonumber" || dispDict[recName].fieldtype == "currency")
                            {
                                numericfield = true;
                            }
                            else if (dispDict[recName].fieldtype == "hidden")
                            {
                                hiddenfield = true;
                            }
                        }
                        else if (dispDict.ContainsKey(recName) && String.IsNullOrEmpty(dispDict[recName].fieldname))
                        {
                            if (dispDict[recName].EndsWith("_val") || dispDict[recName].EndsWith("link") && !String.IsNullOrEmpty(recName)
                                && dispDict[recName].fieldname.Substring(0, dispDict[recName].fieldname.Length - 4) != null
                                )
                            {
                                hiddenfield = true;
                            }
                        }
                        if (isList)
                        {

                            if (fieldName == "itemid")
                            {
                                currentid = fieldValue;
                            }
                            if (fieldName == "xcontrolled")
                            {
                                recordProps["fieldvalue"] = fieldValue;
                                record["controlled"] = recordProps;

                            }
                            else if (fieldName == "xallowed" )
                            {
                                recordProps["fieldvalue"] = fieldValue;
                                record["allowed"] = recordProps;
                            }
                            else if (fieldName == "System.DateTime" || (datefield))
                            {

                                Hashtable dtProps = new Hashtable();
                                recordProps["hide"] = "";
                                string dtName= fieldName + "dt";
                                                            
                                if (fieldValue.Length > 0 && !DataUtils.hasTime(fieldValue) && fieldName.IndexOf("formatted") < 0)
                                {
                                    recordProps["fieldvalue"] = DataUtils.formatOraDate(fieldValue);
                                    dtProps["fieldvalue"] = formatStringDate(fieldValue);
                                    if (timefield && tbdmeetingtimes)
                                    {
                                        recordProps["fieldvalue"] += " TBD";
                                        dtProps["fieldvalue"] += "000";
                                    }
                                }
                                else if (datefield && !timefield && fieldValue.Length > 0)
                                {
                                    recordProps["fieldvalue"] = DataUtils.formatOraDate(fieldValue);
                                    dtProps["fieldvalue"] = formatStringDate(fieldValue);
                                }
                                else if (fieldValue.Length > 0)
                                {
                                    try
                                    {
                                        //oItemNode.InnerText = clientTimeAdjust(idbReader.GetDateTime(i).ToString("G"));
                                        recordProps["fieldvalue"] = recReader.GetDateTime(i).ToString();
                                        dtProps["fieldvalue"] = formatStringDate(recReader.GetDateTime(i));
                                    }
                                    catch (Exception)
                                    {
                                        DateTime tmpdate = DateTime.Parse(fieldValue);
                                        //oItemNode.InnerText = clientTimeAdjust(tmpdate.ToString("G"));
                                        recordProps["fieldvalue"] = tmpdate.ToString();
                                        dtProps["fieldvalue"] = formatStringDate(tmpdate);
                                    }
                                }
                                else
                                {
                                    recordProps["fieldvalue"] = "";
                                    dtProps["fieldvalue"] = "";
                                }
                                record.Add(dtName, dtProps);
                            }
                            else if (fieldType == "System.Decimal" || (numericfield))
                            {
                                string testing = fieldType;
                                Hashtable dtProps = new Hashtable();
                                recordProps["hide"] = "";
                                string dtName = fieldName + "dt";

                                dtProps["fieldvalue"] = DataUtils.StripUnicodeCharacters(fieldValue.PadLeft(9, '0'));
                                record[dtName] = dtProps;

                                string tempval = fieldValue;

                                try
                                {
                                    if (!String.IsNullOrEmpty(tempval))
                                    {
                                        //Strip decimals if they are just zeros
                                        int tempnumval = (int)Math.Round(double.Parse(tempval));
                                        if (tempnumval == double.Parse(tempval))
                                        {
                                            tempval = tempnumval.ToString();
                                        }
                                    }
                                }
                                catch (Exception)
                                {
                                    //Keep original value if can't get decimal data
                                }
                                recordProps["fieldvalue"] = DataUtils.StripUnicodeCharacters(tempval);
                               // record.Add(dtName, dtProps);
                            }
                            else if (dispDict.ContainsKey(recName) && dispDict[recName].fieldtype  == "password")
                            {
                                recordProps["fieldvalue"] = "- Not Displayed -";
                            }
                            else
                            {
                               if(  dispDict.ContainsKey(recName) && dispDict[recName].encode != null 
                                    && dispDict[recName].encode == "true"
                                   // || this.getTopVueParameter("HandleUnicodeInXML") == "true"
                                 )
                                {
                                    bool isnvarcharfield = false;
                                    if (this._dbtype == 1)
                                    {
                                        // need to account for this if ever we switch to oracle
                                        //OleDbDataReader oledr = (OleDbDataReader)idbReader;
                                        //isnvarcharfield = oledr.GetDataTypeName(i).ToLower() == "nvarchar";
                                    }
                                    else if (this._dbtype == 2)
                                    {
                                        SqlDataReader sqldr = (SqlDataReader)recReader;
                                        isnvarcharfield = recReader.GetDataTypeName(i).ToLower() == "nvarchar";
                                    }

                                    if (isnvarcharfield)
                                    {
                                        recordProps["fieldvalue"] = HttpUtility.HtmlEncode(fieldValue);
                                    }
                                    else
                                    {

                                        try
                                        {
                                            recordProps["fieldvalue"] = DataUtils.StripUnicodeCharacters(fieldValue);
                                        }
                                        catch (Exception e)
                                        {
                                            string badval = fieldValue;
                                            char[] carray = badval.ToCharArray();
                                            foreach (char chr in carray)
                                            {
                                                try
                                                {
                                                    recordProps["fieldvalue"] += chr.ToString();
                                                }
                                                catch (Exception ex)
                                                {
                                                    //ignore invalid characters
                                                    // need to enfoce logging here
                                                    //TVUtils.LogWarning("Unable to add character to XML: " + chr.ToString() + " - code: " + ((int)chr) + "\r\n" + e.ToString());
                                                }
                                            }
                                            
                                        }
                                    }
                                }
                                else
                                {
                                    try
                                    {
                                        recordProps["fieldvalue"] = DataUtils.StripUnicodeCharacters(fieldValue);
                                    }
                                    catch (Exception)
                                    {
                                        string badval = fieldValue;
                                        char[] carray = badval.ToCharArray();
                                        foreach (char chr in carray)
                                        {
                                            try
                                            {
                                                recordProps["fieldvalue"] += chr.ToString();
                                            }
                                            catch (Exception e)
                                            {
                                                //ignore invalid characters
                                                // need to fix loging 
                                                //TVUtils.LogWarning("Unable to add character to XML: " + chr.ToString() + " - code: " + ((int)chr) + "\r\n" + e.ToString());
                                            }
                                        }
                                    }
                                }  

                            }

                            if (recName != "xcontrolled" && recName != "xallowed")
                            {
                                if ( dispDict.ContainsKey(recName) &&  ( dispDict[recName].fieldname == recName || dispDict[recName].parentcolumn == recName) == null)
                                {
                                     recordProps.Add("hide", "");
                                }
                                if (hiddenfield && recordProps["hide"] == null)
                                {
                                    recordProps.Add("hide", "");
                                }
                                record[recName] = recordProps;
                            }
                        }

                        else
                        {   
                            recordProps["fieldvalue"] = (datefield || timefield || (fieldType == "System.DateTime") ?
                                         DataUtils.formatOraDate(fieldValue) : fieldValue);
                            record[recName] = recordProps;

                            if (datefield || timefield || numericfield || fieldType == "System.DateTime" || fieldType == "System.Decimal")
                            {
                                Hashtable dtProps = new Hashtable();
                                string dtnodeval = recReader.GetValue(i).ToString();
                                if (String.IsNullOrEmpty(dtnodeval)) dtnodeval = " ";
                                Console.WriteLine(fieldValue);
                                if (fieldType == "System.DateTime" || datefield || timefield)
                                {
                                    if (recReader.GetValue(i).ToString().Length > 0)
                                    {
                                        dtnodeval = formatStringDate(recReader.GetValue(i).ToString());
                                    }
                                }
                                else if (fieldType == "System.Decimal" || numericfield)
                                {
                                    dtnodeval = DataUtils.StripUnicodeCharacters(fieldValue.PadLeft(9, '0'));
                                }

                                string dtName = recName + "dt";
                                dtProps["fieldvalue"] = dtnodeval;
                                record[dtName] = dtProps;

                            }

                        }


                    }
                  
                    records.Add(record);
                }

                Console.WriteLine(" ------ end records build ------");

                return records;
            }
           
        }
        /// <summary>
        /// Check field type for table and column specified
        /// </summary>
        /// <param name="tablename">Name of desired table</param>
        /// <param name="columnname">Name of desired column</param>
        /// <returns>True if column in table is a numeric type, otherwise false</returns>
        private bool isFieldNumeric(string tablename, string columnname)
        {
            
            if (columnname.IndexOf("||") >= 0)
            {
                return false;
            }
            if ((tablename.LastIndexOf("_") > tablename.IndexOf("_")) ||
               (tablename.IndexOf("_") > 0 && tablename.IndexOf("_properties") < 0))
            {
                tablename = tablename.Substring(0, tablename.LastIndexOf("_"));
            }
            string sql = "select lower(data_type) " +
                      "from user_tab_columns " +
                      "where table_name = '" + tablename.ToUpper() + "' " +
                      "and column_name = '" + columnname.ToUpper() + "'";
            string datatype = getValueFromSQL(sql, true);
            switch (datatype)
            {
                case "number":
                case "int":
                case "smallilnt":
                case "uniqueidentifier":
                case "numeric":
                case "float":
                case "bigint":
                    return true;
            }
            return false;
        }

        /// <summary>
        /// Get value from topvueparameter table by valuename
        /// </summary>
        /// <param name="param">Name of parameter whos value will be returned</param>
        /// <returns>Value of named parameter, or "-N/A-" if parameter does not exist</returns>
        public string getTopVueParameter(string param)
        {
            string tvparam =STR_NA;
            bool resethashtable = false;
            Hashtable TVParams = new Hashtable();
            //if (HttpContext.Current != null)
            //{
            //    if (HttpContext.Current.Application["TVparams"] != null)
            //    {
            //        TVParams = (Hashtable)HttpContext.Current.Application["TVparams"];
            //    }
            //    else
            //    {
            //        TVParams = new Hashtable();
            //    }
            //}
            //Never cache currentseq type params
            if (TVParams != null && TVParams.ContainsKey(param) && !param.EndsWith("currentseq"))
            {
                tvparam = TVParams[param].ToString();
            }
            else
            {
                resethashtable = true;
              
                string[] selectArr = { "value", "encrypted" };
                Dictionary<string, string> whereDict = new Dictionary<string, string>();
                whereDict.Add("valuename", $"'{param}'");
                var paramres = this._dapperHelper.Get("topvueparameters", selectArr, whereDict);

                if (paramres != null && paramres == "y")
                {
                    tvparam = DataUtils.decryptData(tvparam);
                }

                //Never cache currentseq type params
                if (TVParams != null && !TVParams.ContainsKey(param) && !param.EndsWith("currentseq"))
                {
                    try
                    {
                        TVParams.Add(param, tvparam);
                    }
                    catch (Exception) { }
                }
            }
            //if (HttpContext.Current != null && resethashtable)
            //{
            //    HttpContext.Current.Application["TVparams"] = TVParams;
            //}
            return tvparam;
        }
        public IDbDataParameter getDBParameter(string name, string value)
        {
            IDbDataParameter newparm = null;
            switch (this._dbtype)
            {
                case 1:
                    //newparm = new OleDbParameter(name, OleDbType.VarChar);
                    //newparm.Value = value;
                    throw new NotImplementedException("getting db params for oledb type not yet implmented ");

                    break;
                case 2:
                    newparm = new SqlParameter(name, SqlDbType.VarChar);
                    newparm.Value = value;
                    break;
                default:
                    throw new NotImplementedException("That type of connection string is not supported. Perhaps dbType was not set.");
            }
            return newparm;
        }
        /// <summary>
        /// Get values returned by SQL statement (single field, possibly multiple records)
        /// </summary>
        /// <param name="sql">SQL statement to execute</param>
        /// <returns>Value of first column for all rows returned by the query (null if no record was returned)</returns>
        public string getValuesFromSQL(string sql)
        {
            return getValueFromSQL(sql, true, null, null, true);
        }

        /// <summary>
        /// Get value return by SQL statement (single field, single record)
        /// </summary>
        /// <param name="sql">SQL statement to execute</param>
        /// <returns>Value of first column and row returned by the query (null if no record was returned)</returns>
        public string getValueFromSQL(string sql)
        {
            return getValueFromSQL(sql, true);
        }

        /// <summary>
        /// Get value return by SQL statement (single field, single record)
        /// </summary>
        /// <param name="sql">SQL statement to execute</param>
        /// <param name="logerror">True to log any errors, false to skip logging</param>
        /// <returns>Value of first column and row returned by the query (null if no record was returned)</returns>
        public string getValueFromSQL(string sql, bool logerror)
        {
            return getValueFromSQL(sql, logerror, null, null);
        }

        /// <summary>
        /// Get value return by SQL statement (single field, single record)
        /// </summary>
        /// <param name="sql">SQL statement to execute</param>
        /// <param name="logerror">True to log any errors, false to skip logging</param>
        /// <param name="boundNames">A list of parameter names in a string array.</param>
        /// <param name="boundValues">A list of parameter values in a string array. It must correspond to boundNames.</param>
        /// <returns>Value of first column and row returned by the query (null if no record was returned)</returns>
        public string getValueFromSQL(string sql, bool logerror, string[] boundNames, string[] boundValues)
        {
            return getValueFromSQL(sql, logerror, boundNames, boundValues, false);
        }

        /// <summary>
        /// Get value return by SQL statement (single field, single record)
        /// </summary>
        /// <param name="sql">SQL statement to execute</param>
        /// <param name="logerror">True to log any errors, false to skip logging</param>
        /// <param name="boundNames">A list of parameter names in a string array.</param>
        /// <param name="boundValues">A list of parameter values in a string array. It must correspond to boundNames.</param>
        /// <param name="multivals">If set to true, returns a comma separated list of values for each row returned (similar to get itemidlist method) other returns just the first value</param>
        /// <returns>Value of first column and row returned by the query (null if no record was returned)</returns>
        public string getValueFromSQL(string sql, bool logerror, string[] boundNames, string[] boundValues, bool multivals)
        {
            if (string.IsNullOrEmpty(sql))
            {
                return null;
            }
           
           // BindParameters(boundNames, boundValues, idbCmd);
            //If using SQL Server, convert query before running it
            if (this._dbtype.Equals(2))
            {
                sql = DataUtils.sqlConvert(sql);
            }
         
            string val = null;

            //Build delimitted list if returning multiple rows
            if (multivals)
            {
                var idbReader = this._dapperHelper.ExecuteReaderFromQuery(sql);
                
                string idlist = "";
                try
                {
                  
                    if (idbReader != null && idbReader.Read())
                    {
                        do
                        {
                            if (idlist.Length > 0)
                            {
                                idlist += ",";
                            }
                            idlist += idbReader.GetValue(0);
                        } while (idbReader.Read());
                    }
                }
                catch (Exception e)
                {
                    if (logerror)
                    {
                        //TVUtils.LogError(sql + "\r" + e.ToString());
                    }
                }
                finally
                {
                    if (idbReader != null && !idbReader.IsClosed)
                    {
                        idbReader.Close();
                    }
                    idbReader.Close();
                }
                val = idlist;

                //Use execute scalar to grab just one value
            }
            else
            {
                object result = this._dapperHelper.ExecuteScalerFromQuery(sql);
                try
                {
                    
                    if (result != null)
                    {
                        val = result.ToString();
                    }
                }
                catch (Exception e)
                {
                    if (logerror && e.ToString().IndexOf("System.NullReferenceException") < 0)
                    {
                        //TVUtils.LogError("Error getting value from SQL statement" +
                        //   "\rSQL: " + sql +
                        //   "\rError: " + e.ToString());
                    }
                }
                finally
                {
                   // result.Close();
                }
            }

            return val;
        }
       
        /// <summary>
        /// Format date into yyyymmddhhmmss format for alphabetic sorting
        /// </summary>
        /// <param name="xdate">date to be formatted</param>
        /// <returns>yyyymmddhhmmss formatted date</returns>
        public string formatStringDate(string xdate)
        {
            try
            {
                DateTime nxdate = DateTime.Parse(xdate);
                return formatStringDate(nxdate);
            }
            catch (Exception)
            {
                return "";
            }
        }

        /// <summary>
        /// Format date into yyyymmddhhmmss format for alphabetic sorting
        /// </summary>
        /// <param name="xdate">date to be formatted</param>
        /// <returns>yyyymmddhhmmss formatted date</returns>
        public string formatStringDate(DateTime xdate)
        {
            string sday = xdate.Day.ToString().PadLeft(2, '0');
            string smonth = xdate.Month.ToString().PadLeft(2, '0');
            string syear = xdate.Year.ToString().PadLeft(4, '0');
            string shour = xdate.Hour.ToString().PadLeft(2, '0');
            string sminute = xdate.Minute.ToString().PadLeft(2, '0');
            string ssecond = xdate.Second.ToString().PadLeft(2, '0');
            return syear + smonth + sday + shour + sminute + ssecond;
        }


        /// <summary>
        /// Replace new_time function with adjusted date/time
        /// </summary>
        /// <param name="whereorder">string containing new_time function to be replaced</param>
        /// <returns>string with new_order replaced with adjusted date/time</returns>
        private string newTimeAdjust(string whereorder)
        {
            //figure out where the new_time function begins
            int start = whereorder.IndexOf("new_time(");
            if (start < 0)
            {
                return whereorder;
            }
            //Figure out where the new_time function ends
            int end = 0;
            int parencount = 0;
            foreach (char chr in whereorder.Substring(start + 9))
            {
                end++;
                if (chr.Equals('('))
                {
                    parencount++;
                }
                else if (chr.Equals(')'))
                {
                    if (parencount.Equals(0))
                    {
                        break;
                    }
                    parencount--;
                }
            }
            //Extract the date value
            string dateval = whereorder.Substring(start + 9, end);
            dateval = dateval.Substring(dateval.IndexOf("'") + 1);
            dateval = dateval.Substring(0, dateval.IndexOf("'"));
            dateval = formatOraDateTime(dateval);
            string part1 = whereorder.Substring(0, start);
            string part2 = whereorder.Substring(start + 9 + end);
            string result = part1 + dateval + part2;
            return result;
        }
        /// <summary>
        /// Format date and time for Oracle SQL statement
        /// </summary>
        /// <param name="xdate">Date to be formatted</param>
        /// <returns>to_date Oracle statement</returns>
        public string formatOraDateTime(string xdate)
        {
            return formatOraDateTime(xdate, true);
        }

        /// <summary>
        /// Format date and time for Oracle SQL statement
        /// </summary>
        /// <param name="xdate">Date to be formatted</param>
        /// <param name="adjusttime">Specify if time should be adjusted from client to server time</param>
        /// <returns>to_date Oracle statement</returns>
        public string formatOraDateTime(string xdate, bool adjusttime)
        {
            if (xdate == null || xdate.Length == 0)
            {
                return "''";
            }
            string tmpdate = xdate;
            try
            {
                // reformat it here in case it is stored differently in the database
                int modulatorIndex = tmpdate.IndexOf("AM");
                if (modulatorIndex == -1)
                {
                    modulatorIndex = tmpdate.IndexOf("PM");
                }
                if (modulatorIndex >= 0 && tmpdate.Length >= modulatorIndex + 2)
                {
                    tmpdate = tmpdate.Substring(0, modulatorIndex + 2);
                    if (tmpdate[modulatorIndex - 1] >= '0' && tmpdate[modulatorIndex - 1] <= '9')
                    {
                        tmpdate = tmpdate.Substring(0, modulatorIndex) + " " + tmpdate.Substring(modulatorIndex, 2);
                    }
                }
                DateTime newDateTime = DateTime.Parse(tmpdate);
                tmpdate = newDateTime.ToString();
            }
            catch (Exception)
            {
                return xdate; // this may be text data.
            }
            if (tmpdate.IndexOf(" (") > 0)
            {
                tmpdate = tmpdate.Substring(0, tmpdate.IndexOf(" ("));
            }
            DateTime ydate = DateTime.Now;
            try
            {
                ydate = Convert.ToDateTime(tmpdate);
            }
            catch (Exception)
            {
                return xdate;
            }
            string sdate = "";
            string smonth = "";
            switch (ydate.Month)
            {
                case 1:
                    smonth = "JAN";
                    break;
                case 2:
                    smonth = "FEB";
                    break;
                case 3:
                    smonth = "MAR";
                    break;
                case 4:
                    smonth = "APR";
                    break;
                case 5:
                    smonth = "MAY";
                    break;
                case 6:
                    smonth = "JUN";
                    break;
                case 7:
                    smonth = "JUL";
                    break;
                case 8:
                    smonth = "AUG";
                    break;
                case 9:
                    smonth = "SEP";
                    break;
                case 10:
                    smonth = "OCT";
                    break;
                case 11:
                    smonth = "NOV";
                    break;
                case 12:
                    smonth = "DEC";
                    break;
            }
            sdate += ydate.Day.ToString().PadLeft(2, '0') + "-" + smonth + "-" + ydate.Year;
            //If using Oracle's OLE DB driver, use yyyy-mm-dd instead of medium date format
            string connString = this._dapperHelper.getConnectionString();
            if (!String.IsNullOrEmpty(connString))
            {
                if (connString.ToLower().IndexOf("oraoledb.oracle") >= 0 || connString.ToLower().IndexOf("msdaora.1") >= 0)
                {
                    sdate = ydate.ToString("dd-MMM-yyyy HH:mm");
                    //sdate = ydate.ToString("dd-MMM-yyyy");
                    //sdate = "'" + sdate + "'";
                }
                else
                {
                    sdate = ydate.ToString("dd-MMM-yyyy HH:mm");
                    return "CONVERT(DATETIME, '" + sdate + "')";

                }

            }
            return "TO_DATE('" + sdate + "', 'DD-MON-RR hh24:mi')";
        }

        /// <summary>
        /// Gets a comma-separated list of ITEMID values from a data table. If there are no values, then 0 is returned.
        /// </summary>
        /// <param name="dtSource">The source of the IDs.</param>
        /// <returns>The comma-separated string of IDs.</returns>
        public string getItemIdListFromDataTable(DataTable dtSource)
        {
            return getItemIdListFromDataTable(dtSource, "itemid");
        }

        /// <summary>
        /// Gets a comma-separated list of ITEMID values from a data table. If there are no values, then 0 is returned.
        /// </summary>
        /// <param name="dtSource">The source of the IDs.</param>
        /// <param name="columnName">The name of the column that has the ITEMID.</param>
        /// <returns>The comma-separated string of IDs.</returns>
        public string getItemIdListFromDataTable(DataTable dtSource, string columnName)
        {
            List<string> resultList = new List<string>();
            foreach (DataRow drow in dtSource.Rows)
            {
                string itemId = drow[columnName] == DBNull.Value ? "0" : Convert.ToString(drow[columnName]);
                if (string.IsNullOrEmpty(itemId))
                {
                    itemId = "0";
                }
                resultList.Add(itemId);
            }
            return string.Join(",", resultList.ToArray());
        }

        /// <summary>
        /// Build coma delimitted list of values
        /// </summary>
        /// <param name="sql">SQL statement used for recordset</param>
        /// <returns>comma delimitted list of values returned by recordset</returns>
        public string getItemIDList(string sql)
        {
            return getItemIDList(sql, true);
        }

        /// <summary>
        /// Build comma delimitted list of values from first field in query
        /// </summary>
        /// <param name="sql">SQL statement used for recordset</param>
        /// <param name="logerror">bool specifying if errors should be logged or not</param>
        /// <returns>Comma delimitted list of values returned by recordset</returns>
        public string getItemIDList(string sql, bool logerror)
        {
            return getItemIDList(sql, logerror, null, null);
        }

        /// <summary>
        /// Build comma delimitted list of values from first field in query
        /// </summary>
        /// <param name="sql">SQL statement used for recordset</param>
        /// <param name="logerror">bool specifying if errors should be logged or not</param>
        /// <param name="boundNames">A list of parameter names in a string array.</param>
        /// <param name="boundValues">A list of parameter values in a string array. It must correspond to boundNames.</param>
        /// <returns>Comma delimitted list of values returned by recordset</returns>
        public string getItemIDList(string sql, bool logerror, string[] boundNames, string[] boundValues)
        {

            using (var connection = this._dapperHelper.GetSqlServerOpenConnection())
            {
                List<Hashtable> records = new List<Hashtable>();

                SqlCommand cmd = connection.CreateCommand();
                //If using SQL Server, convert query before running it
                if (this._dbtype.Equals(2))
                {
                    sql = DataUtils.sqlConvert(sql);
                }
                cmd.CommandText = sql;
                cmd.CommandText = sql;
                BindParameters(boundNames, boundValues, cmd);
                var recReader = cmd.ExecuteReader();

                string idlist = "";

                while (recReader.Read()){

                    if (idlist.Length > 0)
                    {
                        idlist += ",";
                    }
                    idlist += recReader.GetValue(0);

                }

                if (idlist.Length == 0)
                {
                    idlist = "0";
                }

                return idlist;
            }    

           
        }

        private void BindParameters(string[] boundNames, string[] boundValues, IDbCommand idbCmd)
        {
            if ((boundNames != null) && (boundValues != null))
            {
                for (int i = 0; i < boundNames.Length; i++)
                {
                    idbCmd.Parameters.Add(getDBParameter(boundNames[i], boundValues[i]));

                }
            }
        }

       
    }

}

