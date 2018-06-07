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
                ItemSubType = itemsubtype;
                PageType = pagetype;
                


            }

            public string ItemType;
            public string ItemSubType;
            public string PageType;

        }


        public class QueryHandler : IRequestHandler<Query, List<object>>
        {
            private IItemRepository _repository;
            private Hashtable _rightslist;


            public QueryHandler(IItemRepository repository)
            {
                 string userid = "5327";
                _repository = repository;
                _rightslist = _repository.getUserRightsList(userid);
            }

            private bool checkDisplayCondition(string dispCondition)
            {
                //  TODO implment logic for checking display condition 

                return true;
               
            }

            private  bool checkTabRight(string rightCode)
            {
                if (string.IsNullOrWhiteSpace(rightCode))
                {
                    return true;
                }
                else
                {
                    if (_rightslist.ContainsKey(rightCode))
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                
            }
            public async Task<List<object>> Handle(Query message, CancellationToken cancellationToken)
            {

                List<dynamic> rawTabs = _repository.GetItemTabs(message.ItemType, message.ItemSubType);
                List<dynamic> itemTabs = new List<dynamic>();

                foreach (var tab in rawTabs)
                {

                    string rCode = tab.rightcode;
                    string dispCon = tab.displaycondition;

                    bool hasRight = this.checkTabRight(rCode);
                    bool passedDispCon = this.checkDisplayCondition(dispCon);

                    if (hasRight && passedDispCon) {
                        itemTabs.Add(tab);
                    }
                }   
               
                return itemTabs;
            }

        }
    }
}
