using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DbUitlsCoreTest.Data;
using MediatR;

namespace DbUitlsCoreTest.Features
{
    public class ItemButtonListQuery
    {
        public class Query : IRequest<List<object>>
        {

            public Query(string itemtype, string itemsubtype, string pagetype, string itemid = null)
            {
                ItemType = itemtype;
                ItemSubType = itemsubtype;
                PageType = pagetype;
                Itemid = itemid;

            }

            public string ItemType;
            public string ItemSubType;
            public string PageType;
            public string Itemid;


        }


        public class QueryHandler : IRequestHandler<Query, List<object> >
        {
            
            private IItemRepository _respository;

            public QueryHandler(IItemRepository repository)
            {
                _respository = repository;
            }

            public async Task<List<object>> Handle(Query message, CancellationToken cancellationToken)
            {
                // Console.WriteLine(message.buttontype);
                Console.WriteLine("--- query message Recieved ----");

                // need a service or a redist store to get current user rigths, id and other info 
                string userID = "5327";

                Hashtable rightslist = _respository.getUserRightsList(userID);
                List<dynamic> buttons = new List<dynamic>();
                List<dynamic> buttonsRaw =  _respository.GetItemCustomButtons(message.ItemType, message.ItemSubType, message.PageType).ToList();
               
                foreach ( var button in buttonsRaw)
                {
                    string btnSql;
                   
                

                    //check for display condition of button if specified
                    bool displaycustbutton = true;

                    //check display condition if specified
                    //if (button.DISPLAYCONDITION.length > 0)
                
                    //}


                    //only build the button if the display condition is null or has been satisfied
                    if (displaycustbutton)
                    {

                        //if buttton has a rightcode on it, make sure active user has that right assigned
                        if (button.RIGHTCODE != null && button.RIGHTCODE.Length > 0)
                        {
                            //for the lock icon for data level security, display unlock if record is public
                            if (button.IMAGEURL == "images/lock.gif")
                            {
                                //&& idbrecord.selectsinglenode("rightcode").innertext == "admin_lockitem") {
                                //get count of number of itemrights records for this item
                               btnSql = "select count(*) from itemrights " +
                                              "where itemtypecd = '" + message.ItemType + "' " +
                                              "and itemid = '" + message.Itemid + "'";
                                //if no itemrights data exists for this record, show the unlock icon instead of the lock icon
                                if (_respository.getItemIDList(btnSql) == "0")
                                {
                                    button.IMAGEURL= "images/unlock.gif";
                                    button.TOOLTIP += " (currently public)";
                                }
                                else
                                {
                                    button.TOOLTIP += " (currently locked)";
                                }
                            }

                            if (rightslist.ContainsKey(button.RIGHTCODE))
                            {
                                buttons.Add(button);
                            }

                        }
                        else
                           //for bookmark button, see if item is already bookmarked
                           if (button.IMAGEURL == "images/bookmark.gif")
                        {
                            btnSql = "select itemid2 " +
                                          "from itemrelation " +
                                          "where itemtypecd1 = '" + message.ItemType + "' " +
                                          "and itemid1 = '" + message.Itemid + "' " +
                                          "and itemtypecd2 = 'user' " +
                                          // again need a way of getting user info 
                                          "and itemid2 = " + userID +
                                          " and (comments = '' or comments is null) " +
                                          " union " +
                                          "select itemid1 " +
                                          "from itemrelation " +
                                          "where itemtypecd2 = '" + message.ItemType + "' " +
                                          "and itemid2 = '" + message.Itemid + "' " +
                                          "and itemtypecd1 = 'user' " +
                                          "and itemid1 = " + userID +
                                                 " and (comments = '' or comments is null) ";
                            if (_respository.getItemIDList(btnSql) != "0")
                            {
                                string tooltip = "already bookmarked";
                                string eventhandler = "javascript::alert('already bookmarked')";

                               
                                if (_respository.getTopVueParameter("enablebkmrkrembtn") == "true")
                                {
                                    tooltip = "remove bookmark";
                                    eventhandler = button.EVENTHANDLER.insert(button.EVENTHANDLER.lastindexof(")") + 1, "&removebkmk=true");
                                }

                                button.IMAGEURL = "images/bookmark_added.gif";
                                button.TOOLTIP = tooltip;
                                button.EVENTHANDLER = eventhandler;
                            }

                            // need to find a solution here for id buttons 

                            //response.write(tvutils.buildidbutton(idbrecord.selectsinglenode("eventhandler").innertext,
                            //idbrecord.selectsinglenode("imageurl").innertext,
                            //idbrecord.selectsinglenode("tooltip").innertext) + "&nbsp;\r");

                            buttons.Add(button);

                        }
                        else
                           //for subscription button, see if item is already subscribed
                           if (button.IMAGEURL == "images/subscribe.gif")
                        {
                            btnSql = "select itemid2 " +
                                          "from itemrelation " +
                                          "where itemtypecd1 = '" + message.ItemType + "' " +
                                          "and itemid1 = '" + message.Itemid + "' " +
                                          "and itemtypecd2 = 'user' " +
                                          "and itemid2 = " + userID + " " +
                                          "and comments='subscription' " +
                                          " union " +
                                          "select itemid1 " +
                                          "from itemrelation " +
                                          "where itemtypecd2 = '" + message.ItemType + "' " +
                                          "and itemid2 = '" + message.Itemid + "' " +
                                          "and itemtypecd1 = 'user' " +
                                          "and itemid1 = " + userID + " " +
                                          "and comments='subscription' ";
                            if (_respository.getItemIDList(btnSql) != "0")
                            {
                                button.IMAGEURL = "images/unsubscribe.gif";
                                button.TOOLTIP = "un subscribe/update subscription";
                                button.EVENTHANDLER = "subscribe.aspx?itemid=request.params.get(\"itemid\")&itemtypecd=request.params.get(\"itemtypecd\")&subtype=request.params.get(\"subtype\")&subscribe=false	updatesubscription";
                            }

                            //response.write(tvutils.buildidbutton(idbrecord.selectsinglenode("eventhandler").innertext,
                            //  idbrecord.selectsinglenode("imageurl").innertext,
                            //  idbrecord.selectsinglenode("tooltip").innertext) + "&nbsp;\r");

                            buttons.Add(button);

                        }
                        else
                        {
                            buttons.Add(button);

                           // response.write(tvutils.builddividbutton(idbrecord.selectsinglenode("eventhandler").innertext,
                           //idbrecord.selectsinglenode("imageurl").innertext,
                           //idbrecord.selectsinglenode("tooltip").innertext) + "&nbsp;\r");
                        }

                    } //end of check for display condition
                }

                return buttons;


            }

          

              
            

        }

    }
}

//{
//    string displaycondition = button.DISPLAYCONDITION;
//    displaycondition = tvutils.substituteobjectvalues(displaycondition);
//    try
//    {
//        while (displaycondition.indexof("${") >= 0)
//        {
//            int ind = displaycondition.indexof("${");
//            int endind = displaycondition.indexof("}", ind);
//            if (ind > -1 && endind > -1 && endind > ind)
//            {
//                string itemattrib = tvitem.getattribute(displaycondition.substring(ind + 2, endind - ind - 2));
//                displaycondition = displaycondition.substring(0, ind) + itemattrib + displaycondition.substring(endind + 1);
//            }
//        }
//    }
//    catch (exception)
//    {
//        //
//    }
//    //check for multiple conditions based on ampersand
//    string[] conditions = displaycondition.split('&');
//    foreach (string conditionset in conditions)
//    {
//        string[] condition = conditionset.split('=');
//        string checkval = condition[0];
//        string checkfor = condition[1];
//        //support for select statements requires use ' eqs ' in queries rather than ' = '
//        if (checkfor.startswith("select "))
//        {
//            checkfor = checkfor.replace(" eqs ", " = ");
//        }
//        else
//        {
//            if (checkfor.indexof(",") > 0)
//            {
//                checkfor = "'" + checkfor.trim().replace(",", "','") + "'";
//            }
//            else
//            {
//                checkfor = "'" + checkfor.trim() + "'";
//            }
//        }
//        idbuttonsql = "select count(1) from ";
//        if (checkval.startswith("application"))
//        {
//            idbuttonsql += "application where applicationid = " + session["appid"] + " and appname";
//        }
//        else
//        {
//            idbuttonsql += itemtype + "_properties where itemid = " + icbitemid + " and " + checkval.replace("!", "");
//        }
//        if (checkval.indexof("!") > 0)
//        {
//            idbuttonsql += " not";
//        }
//        if (checkfor.replace("'", "") == "null")
//        {
//            idbuttonsql += " is null";
//            idbuttonsql = idbuttonsql.replace("not is null", "is not null");
//        }
//        else
//        {
//            idbuttonsql += " in (" + checkfor + ")";
//        }
//        //tvutils.logdebug(idbuttonsql);
//        if (dbutils.getitemidlist(idbuttonsql, false) == "0")
//        {
//            displaycustbutton = false;
//            break;
//        }
//    }
//    idbuttonsql = "select count(*) from " + itemtype + "_properties where itemid = " + icbitemid + " and (" + displaycondition + ")";
//    if (dbutils.getitemidlist(idbuttonsql, false) != "0")
//    {
//        displaycustbutton = true;
//    }
