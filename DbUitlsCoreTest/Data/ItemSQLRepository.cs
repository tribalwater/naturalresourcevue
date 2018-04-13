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

namespace DbUitlsCoreTest.Data
{
    public class ItemSQLRepository : IItemRepository
    {
        private IDapperHelper _dapperHelper;
        private int _dbtype;

        public ItemSQLRepository(IDapperHelper dapperHelper, int dbtype = 2)
        {
            _dapperHelper = dapperHelper;
            _dbtype       = dbtype;
   
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
        public object GetItemDispaly(string itemtype, string subtype)
        {
            string[] selectArr = new string[]
            {
                 "fieldname", "itemtypecd", "displayname", "fieldlength", "maxlength", "required", "listeditem",
                 "fieldtype", "itemvaluegroup", "subtypecd", "parenttable", "parentcolumn", "parentfieldname",
                 "parentsubtype", "defaultvalue", "linkfield", "linktype", "tooltip", "keyfield",
                 "sortorder", "ISNULL(sortposition, 0) sortposition", "ISNULL(sortdirection, 'asc') sortdirection",
                 "childfieldname", "childxmldoc", "customsql", "exportcol", "importcol", "onblur", "onchange"
            };
            
            Dictionary<string, string> whereDict = new Dictionary<string, string>();
            whereDict.Add("itemtypecd", itemtype);
            whereDict.Add("subtypecd", subtype);
            var res = _dapperHelper.GetList("itemdisplay", selectArr, whereDict).ToList();
            Console.WriteLine(res.ToString());
            int rlcount = 0;
            foreach (var item in res)
            {
                if(item.fieldname == null || item.fieldname.Length == 0)
                {
                    item.fieldname = "rlc" + rlcount;
                    rlcount++;
                }
                Console.WriteLine(item);

            } 
            // need to update this to include actualy id 
             this.GetItemProperties(res.ToList(), itemtype, subtype, "1401", "");
;            return res;
        }

        public object GetItemCustomButtons(string itemtype, string subtype)
        {
            Dictionary<string, string> whereDict = new Dictionary<string, string>();
            whereDict.Add("itemtypecd", itemtype);
            whereDict.Add("subtypecd", subtype);

            var res = _dapperHelper.GetList("itembuttons", null, whereDict);
                
               

            return res;

        }

        public object GetItemProperties(List<dynamic> itemdisp, string itemtype, string subtype, string itemid, string whereorder)
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
                                        
                                  

            return new { };
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

        private object BuildSqlFromItemDisp(
                                            List<dynamic> itemdisp, string itemtype, string subtype, string itemtable,
                                            Func<dynamic, bool > filterfunc,  string whereorder, ref string whereclause,
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
            Console.WriteLine("p tables");
            foreach (DictionaryEntry item in parentTables)
            {
                Console.WriteLine(item.Key);
                Console.WriteLine(item.Value);
            }
            //i => i.parenttable != '' && i.fieldtype != 'itemid')
            var filteredDispNodes = itemdisp.Where(item => filterfunc(item));
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
                Console.WriteLine(sortPos);
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
                            Console.WriteLine(" --- partent field name has dot ---");
                            Console.WriteLine(item);
                            Console.WriteLine(parentTables[item.fieldname]);
                            columns += itemtable + "." + item.fieldname + " " + item.fieldname + "_val, ";
                            columns += parentTables[item.fieldname] + "." +
                                       item.Replace("parent_table_", parentTables[item.fieldname].ToString() + ".").Replace("tblstub.", parentTables[item.fieldname].ToString() + ".") +
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
                                                       item.parentfieldname +
                                                       ") = convert(varchar, " + itemtable + "." + item.fieldname + ")";
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
                            if (item.linkfield.Length > 0)
                            {
                                columns += ", " + parentTables[item.fieldname].ToString() +
                                               "." + item.linkfield.Value +
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
                    if (item.parenttable.Length > 0)
                    {
                        columns += itemtable + "." +  item.fieldname + " " +  item.fieldname + "_val, ";
                    }
                    columns += itemtable + "." +  item.fieldname;
                    if (item.linkfield.Length > 0)
                    {
                        columns += ", " + itemtable +
                                   "." + item.linkfield +
                                   " " +  item.fieldname + "link";
                    }
                }
            }

            return new { };
        }

        /// <summary>
        /// Check field type for table and column specified
        /// </summary>
        /// <param name="tablename">Name of desired table</param>
        /// <param name="columnname">Name of desired column</param>
        /// <returns>True if column in table is a numeric type, otherwise false</returns>
        private bool isFieldNumeric(string tablename, string columnname)
        {
            Console.WriteLine("--- col name -----");
            Console.WriteLine(columnname);
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
    }

}

