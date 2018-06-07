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
            public bool ShouldShowSearchButton;
            public bool ShouldShowInsertButton;


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
                  
                    var SearchButton = new
                    {
                         ITEMTYPECD = itemtype,
                         SUBTYPECD  =  subtype,
                         IMAGEURL   = "search icon",
                         TOOLTIP    =  "Search Items",
                         EVENTHANDLER = "goToSearch",
                         ACTION      = "GOTOSEARCH"
                    };
                    buttons.Add(SearchButton);
                }
            }

            private  void addInsertButton(string itemtype, string subtype, bool shouldsShowInsertButton,  List<dynamic> buttons)
            {
                
                if (shouldsShowInsertButton)
                {
                    var InsertButton = new
                    {
                        ITEMTYPECD = itemtype,
                        SUBTYPECD = subtype,
                        IMAGEURL = "level up clockwise rotated icon",
                        TOOLTIP = "Insert New Item",
                        EVENTHANDLER = "goToInsert",
                        ACTION = "GOTOINSERT"
                    };
                    buttons.Add(InsertButton);
                }
            }
            public async Task<List<object>> Handle(Query message, CancellationToken cancellationToken)
            {
                // Console.WriteLine(message.buttontype);

                await Task.Delay(10);
                List<dynamic> itemButtons = new List<dynamic>();
                this.addSearchButton( message.ItemType, message.ItemsSubType, message.ShouldShowSearchButton, itemButtons);
                this.addInsertButton( message.ItemType, message.ItemsSubType, message.ShouldShowInsertButton, itemButtons);

                return itemButtons;
            }

        }
    }
}
