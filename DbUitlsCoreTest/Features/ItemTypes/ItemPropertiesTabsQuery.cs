using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DbUitlsCoreTest.Data;
using MediatR;


namespace DbUitlsCoreTest.Features.ItemTypes
{
    public class ItemPropertiesTabsQuery
    {
        public class Query : IRequest<List<object>>
        {

            public Query(string itemtype, string itemsubtype, string pagetype)
            {
                ItemType = itemtype;
                ItemsSubType = itemsubtype;
                PageType = pagetype;

            }

            public string ItemType;
            public string ItemsSubType;
            public string PageType;

        }


        public class QueryHandler : IRequestHandler<Query, List<object>>
        {
            private IItemRepository _repository;

            public QueryHandler(IItemRepository repository)
            {
                _repository = repository;
            }

            private void addEmailButton(string userid, string itemtype, string subtype,  List<dynamic> buttons)
            {
                //Build email button if active user has an email address
                string sql = $"select email from users where userid = {userid}";
                string useremail = _repository.getItemIDList(sql);
                Console.WriteLine(" ------ useremail ---- ");

                Console.WriteLine(useremail);
                bool test = useremail.Length > 1;
                Console.WriteLine(useremail.Length);
                Console.WriteLine(" ------ useremail length ---- ");
                bool shouldHideEmail = _repository.getTopVueParameter("HideAllEmailIcon").ToLower() != "true";
                if (useremail.Length > 1 
                    //&& !shouldHideEmail
                 )
                {
                    Console.WriteLine("gogo email ");
                    //Build email button if it was not overridden by custom buttons
                    // if (idbuttonxml == null || idbuttonxml.SelectSingleNode("/xmldoc/recordset/record[imageurl='images/email.gif']") == null)
                    //{

                    //    Response.Write("<a class=\"ui mini labeled icon button\" onMouseOver=\"window.status='';return true;\" href=\"JavaScript:openIDSendMessage()\" title=\"Send Email\">" +
                    //                  "<i class=\"mail icon\"></i>Send Email</a>&nbsp;");
                    //}
                    var Emailbutton = new
                    {
                         ITEMTYPECD = itemtype,
                         SUBTYPECD  =  subtype,
                         IMAGEURL   = "file text outline icon",
                         TOOLTIP    =  "New Well Site Report",
                         EVENTHANDLER = "sendItemEmail",
                         ACTION      = "sendItemEmail"
                    };
                    buttons.Add(Emailbutton);
                }
            }

            private  void addEditButton(string userid, string itemtype, string subtype, List<dynamic> buttons)
            {
                string editright = itemtype + subtype + "_edit";
                Hashtable rightslist = _repository.getUserRightsList(userid);
                if (rightslist.ContainsKey(editright))
                {
                    var Editbutton = new
                    {
                        ITEMTYPECD = itemtype,
                        SUBTYPECD = subtype,
                        IMAGEURL = "edit icon",
                        TOOLTIP = "edit item",
                        EVENTHANDLER = "editItem",
                        ACTION = "editItem"
                    };
                    buttons.Add(Editbutton);
                }
            }
            public async Task<List<object>> Handle(Query message, CancellationToken cancellationToken)
            {
                // Console.WriteLine(message.buttontype);

                await Task.Delay(10);
                string userID = "5327";
                List<dynamic> itemButtons = new List<dynamic>();
                this.addEmailButton(userID, message.ItemType, message.ItemsSubType, itemButtons);
                this.addEditButton(userID, message.ItemType, message.ItemsSubType, itemButtons);

                return itemButtons;
            }

        }
    }
}
