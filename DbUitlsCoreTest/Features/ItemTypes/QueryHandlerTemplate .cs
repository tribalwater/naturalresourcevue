using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DbUitlsCoreTest.Data;
using MediatR;

namespace DbUitlsCoreTest.Features
{
    public class QueryHandlerTemplate
    {
        public class Query : IRequest<object>
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


        public class QueryHandler : IRequestHandler<Query, object>
        {
            private IItemRepository _repository;

            public QueryHandler(IItemRepository repository)
            {
                _repository = repository;
            }
            public async Task<object> Handle(Query message, CancellationToken cancellationToken)
            {
                // Console.WriteLine(message.buttontype);

                await Task.Delay(10);

                return new { name = "rar", buttontype = "fuck" };
            }

        }

    }
}
