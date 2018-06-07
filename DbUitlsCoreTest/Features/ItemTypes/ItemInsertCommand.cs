using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DbUitlsCoreTest.Data;
using MediatR;

namespace DbUitlsCoreTest.Features
{
    public class ItemInsertCommand
    {
        public class Command : IRequest<object>
        {

            public Command(string itemtype, string itemsubtype, string pagetype)
            {
                ItemType = itemtype;
                ItemsSubType = itemsubtype;
                PageType = pagetype;

            }

            public string ItemType;
            public string ItemsSubType;
            public string PageType;

        }


        public class ComandHandler : IRequestHandler<Command, object>
        {
            private IItemRepository _repository;

            public ComandHandler(IItemRepository repository)
            {
                _repository = repository;
            }
            public async Task<object> Handle(Command message, CancellationToken cancellationToken)
            {
                // Console.WriteLine(message.buttontype);

                await Task.Delay(10);

                return new { name = "rar", buttontype = "fuck" };
            }

        }

    }
}
