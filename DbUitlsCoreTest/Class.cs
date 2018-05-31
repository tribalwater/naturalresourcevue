//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace DbUitlsCoreTest
//{
//    public class Class
//    {
//        public string test() {
//            ////Retrieve custom button data based on itemtype, subtype and pagetype
//            //string idbuttonsql = "select imageurl, tooltip, rightcode, eventhandler, displaycondition " +
//            //                     "from itembuttons " +
//            //                     "where itemtypecd = '" + itemtype + "' " +
//            //                     "and pagetype = '" + pagetype + "'";

//            //if (subtype == null || subtype.Length == 0)
//            //{
//            //    idbuttonsql += " and subtypecd is null";
//            //}
//            //else
//            //{
//            //    idbuttonsql += " and subtypecd = '" + subtype + "'";
//            //}
//            //idbuttonsql += " order by sortorder";
//            //XmlDocument idbuttonxml = dbutils.getXMLDocument(idbuttonsql, 0, 0);
//            //string icbitemid = Request.Params.Get("itemid");
//            //if (icbitemid == null)
//            //{
//            //    icbitemid = Request.Params.Get("currentid");
//            //}

//            //if (Session["icbitemid"] != null)
//            //{
//            //    icbitemid = Session["icbitemid"].ToString();
//            //}


//            //TVItem tvitem = null;
//            //try
//            //{
//            //    tvitem = new TVItem(oXML);
//            //}
//            //catch (Exception)
//            //{
//            //    try { tvitem = new TVItem(int.Parse(icbitemid), itemtype); }
//            //    catch (Exception e)
//            //    {
//            //        //do nothing there is not item to create on insert pages
//            //    }
//            //}

//            //loop through each record and add buttons to page
//            foreach (xmlnode idbrecord in idbuttonxml.selectnodes("/xmldoc/recordset/record"))
//            {

//                //check for display condition of button if specified
//                bool displaycustbutton = true;

//                //check display condition if specified
//                if (idbrecord.selectsinglenode("displaycondition").innertext.length > 0)
//                {
//                    string displaycondition = idbrecord.selectsinglenode("displaycondition").innertext;
//                    displaycondition = tvutils.substituteobjectvalues(displaycondition);
//                    try
//                    {
//                        while (displaycondition.indexof("${") >= 0)
//                        {
//                            int ind = displaycondition.indexof("${");
//                            int endind = displaycondition.indexof("}", ind);
//                            if (ind > -1 && endind > -1 && endind > ind)
//                            {
//                                string itemattrib = tvitem.getattribute(displaycondition.substring(ind + 2, endind - ind - 2));
//                                displaycondition = displaycondition.substring(0, ind) + itemattrib + displaycondition.substring(endind + 1);
//                            }
//                        }
//                    }
//                    catch (exception)
//                    {
//                        //
//                    }
//                    //check for multiple conditions based on ampersand
//                    string[] conditions = displaycondition.split('&');
//                    foreach (string conditionset in conditions)
//                    {
//                        string[] condition = conditionset.split('=');
//                        string checkval = condition[0];
//                        string checkfor = condition[1];
//                        //support for select statements requires use ' eqs ' in queries rather than ' = '
//                        if (checkfor.startswith("select "))
//                        {
//                            checkfor = checkfor.replace(" eqs ", " = ");
//                        }
//                        else
//                        {
//                            if (checkfor.indexof(",") > 0)
//                            {
//                                checkfor = "'" + checkfor.trim().replace(",", "','") + "'";
//                            }
//                            else
//                            {
//                                checkfor = "'" + checkfor.trim() + "'";
//                            }
//                        }
//                        idbuttonsql = "select count(1) from ";
//                        if (checkval.startswith("application"))
//                        {
//                            idbuttonsql += "application where applicationid = " + session["appid"] + " and appname";
//                        }
//                        else
//                        {
//                            idbuttonsql += itemtype + "_properties where itemid = " + icbitemid + " and " + checkval.replace("!", "");
//                        }
//                        if (checkval.indexof("!") > 0)
//                        {
//                            idbuttonsql += " not";
//                        }
//                        if (checkfor.replace("'", "") == "null")
//                        {
//                            idbuttonsql += " is null";
//                            idbuttonsql = idbuttonsql.replace("not is null", "is not null");
//                        }
//                        else
//                        {
//                            idbuttonsql += " in (" + checkfor + ")";
//                        }
//                        //tvutils.logdebug(idbuttonsql);
//                        if (dbutils.getitemidlist(idbuttonsql, false) == "0")
//                        {
//                            displaycustbutton = false;
//                            break;
//                        }
//                    }
//                    idbuttonsql = "select count(*) from " + itemtype + "_properties where itemid = " + icbitemid + " and (" + displaycondition + ")";
//                    if (dbutils.getitemidlist(idbuttonsql, false) != "0")
//                    {
//                        displaycustbutton = true;
//                    }
//                }


//                //only build the button if the display condition is null or has been satisfied
//                if (displaycustbutton)
//                {

//                    //if buttton has a rightcode on it, make sure active user has that right assigned
//                    if (idbrecord.selectsinglenode("rightcode").innertext.length > 0)
//                    {
//                        //for the lock icon for data level security, display unlock if record is public
//                        if (idbrecord.selectsinglenode("imageurl").innertext == "images/lock.gif")
//                        {
//                            //&& idbrecord.selectsinglenode("rightcode").innertext == "admin_lockitem") {
//                            //get count of number of itemrights records for this item
//                            idbuttonsql = "select count(*) from itemrights " +
//                                          "where itemtypecd = '" + itemtype + "' " +
//                                          "and itemid = '" + icbitemid + "'";
//                            //if no itemrights data exists for this record, show the unlock icon instead of the lock icon
//                            if (dbutils.getitemidlist(idbuttonsql) == "0")
//                            {
//                                idbrecord.selectsinglenode("imageurl").innertext = "images/unlock.gif";
//                                idbrecord.selectsinglenode("tooltip").innertext += " (currently public)";
//                            }
//                            else
//                            {
//                                idbrecord.selectsinglenode("tooltip").innertext += " (currently locked)";
//                            }
//                        }

//                        buildbutton(idbrecord.selectsinglenode("rightcode").innertext,
//                           tvutils.builddividbutton(idbrecord.selectsinglenode("eventhandler").innertext,
//                           idbrecord.selectsinglenode("imageurl").innertext,
//                           idbrecord.selectsinglenode("tooltip").innertext));

//                    }
//                    else
//                       //for bookmark button, see if item is already bookmarked
//                       if (idbrecord.selectsinglenode("imageurl").innertext == "images/bookmark.gif")
//                    {
//                        idbuttonsql = "select itemid2 " +
//                                      "from itemrelation " +
//                                      "where itemtypecd1 = '" + itemtype + "' " +
//                                      "and itemid1 = '" + icbitemid + "' " +
//                                      "and itemtypecd2 = 'user' " +
//                                      "and itemid2 = " + session["userid"] +
//                                      " and (comments = '' or comments is null) " +
//                                      " union " +
//                                      "select itemid1 " +
//                                      "from itemrelation " +
//                                      "where itemtypecd2 = '" + itemtype + "' " +
//                                      "and itemid2 = '" + icbitemid + "' " +
//                                      "and itemtypecd1 = 'user' " +
//                                      "and itemid1 = " + session["userid"] +
//                                             " and (comments = '' or comments is null) ";
//                        if (dbutils.getitemidlist(idbuttonsql) != "0")
//                        {
//                            string tooltip = "already bookmarked";
//                            string eventhandler = "javascript:alert('already bookmarked')";

//                            if (dbutils.gettopvueparameter("enablebkmrkrembtn") == "true")
//                            {
//                                tooltip = "remove bookmark";
//                                eventhandler = idbrecord.selectsinglenode("eventhandler").innertext.insert(idbrecord.selectsinglenode("eventhandler").innertext.lastindexof(")") + 1, "&removebkmk=true");
//                            }

//                            idbrecord.selectsinglenode("imageurl").innertext = "images/bookmark_added.gif";
//                            idbrecord.selectsinglenode("tooltip").innertext = tooltip;
//                            idbrecord.selectsinglenode("eventhandler").innertext = eventhandler;
//                        }

//                        response.write(tvutils.buildidbutton(idbrecord.selectsinglenode("eventhandler").innertext,
//                        idbrecord.selectsinglenode("imageurl").innertext,
//                        idbrecord.selectsinglenode("tooltip").innertext) + "&nbsp;\r");

//                    }
//                    else
//                       //for subscription button, see if item is already subscribed
//                       if (idbrecord.selectsinglenode("imageurl").innertext == "images/subscribe.gif")
//                    {
//                        idbuttonsql = "select itemid2 " +
//                                      "from itemrelation " +
//                                      "where itemtypecd1 = '" + itemtype + "' " +
//                                      "and itemid1 = '" + icbitemid + "' " +
//                                      "and itemtypecd2 = 'user' " +
//                                      "and itemid2 = " + session["userid"] + " " +
//                                      "and comments='subscription' " +
//                                      " union " +
//                                      "select itemid1 " +
//                                      "from itemrelation " +
//                                      "where itemtypecd2 = '" + itemtype + "' " +
//                                      "and itemid2 = '" + icbitemid + "' " +
//                                      "and itemtypecd1 = 'user' " +
//                                      "and itemid1 = " + session["userid"] + " " +
//                                      "and comments='subscription' ";
//                        if (dbutils.getitemidlist(idbuttonsql) != "0")
//                        {
//                            idbrecord.selectsinglenode("imageurl").innertext = "images/unsubscribe.gif";
//                            idbrecord.selectsinglenode("tooltip").innertext = "un subscribe/update subscription";
//                            idbrecord.selectsinglenode("eventhandler").innertext = "subscribe.aspx?itemid=request.params.get(\"itemid\")&itemtypecd=request.params.get(\"itemtypecd\")&subtype=request.params.get(\"subtype\")&subscribe=false	updatesubscription";
//                        }

//                        response.write(tvutils.buildidbutton(idbrecord.selectsinglenode("eventhandler").innertext,
//                          idbrecord.selectsinglenode("imageurl").innertext,
//                          idbrecord.selectsinglenode("tooltip").innertext) + "&nbsp;\r");

//                    }
//                    else
//                    {

//                        response.write(tvutils.builddividbutton(idbrecord.selectsinglenode("eventhandler").innertext,
//                       idbrecord.selectsinglenode("imageurl").innertext,
//                       idbrecord.selectsinglenode("tooltip").innertext) + "&nbsp;\r");
//                    }

//                } //end of check for display condition
//            }

//            return "";
//        }
//    }
//}
