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
    public class ItemListButtonsQuery
    {
        public class Query : IRequest<List<object>>
        {

            public Query(string itemtype, string itemsubtype, string pagetype, bool shouldshowinsert, bool shouldshowsearch)
            {
                ItemType = itemtype;
                ItemsSubType = itemsubtype;
                PageType = pagetype;
                ShouldShowInsertButton = shouldshowinsert;
                ShouldShowSearchButton = shouldshowsearch;

            }

            public string ItemType;
            public string ItemsSubType;
            public string PageType;
            private bool ShouldShowSearchButton;
            private bool ShouldShowInsertButton;


        }


        public class QueryHandler : IRequestHandler<Query, List<object>>
        {
            private IItemRepository _repository;

            public QueryHandler(IItemRepository repository)
            {
                _repository = repository;
            }

            //TODO: this shouled eventually come from request params bucket
            private void addSearchButton(string itemtype, string subtype, bool shouldShowSearchButton, List<dynamic> buttons)
            {
              
                if (shouldShowSearchButton)
                {
                  
                    var Emailbutton = new
                    {
                         ITEMTYPECD = itemtype,
                         SUBTYPECD  =  subtype,
                         IMAGEURL   = "search icon",
                         TOOLTIP    =  "Search Items",
                         EVENTHANDLER = "goToSearch",
                         ACTION      = "GOTOSEARCH"
                    };
                    buttons.Add(Emailbutton);
                }
            }

            private  void addInsertButton(string userid, string itemtype, string subtype, List<dynamic> buttons)
            {
                string editright = itemtype + subtype + "_edit";
                Hashtable rightslist = _repository.getUserRightsList(userid);
                if (rightslist.ContainsKey(editright))
                {
                    var Editbutton = new
                    {
                        ITEMTYPECD = itemtype,
                        SUBTYPECD = subtype,
                        IMAGEURL = "level up clockwise rotated icon",
                        TOOLTIP = "Insert New Item",
                        EVENTHANDLER = "goToInsert",
                        ACTION = "GOTOINSERT"
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
                this.addSearchButton( message.ItemType, message.ItemsSubType, message.shouldShowSearchButton, itemButtons);
                this.addInsertButton( message.ItemType, message.ItemsSubType, itemButtons);

                return itemButtons;
            }

        }
    }
}
