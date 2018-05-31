using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DbUitlsCoreTest.Data;
using MediatR;
namespace DbUitlsCoreTest.Controllers
{
    public class ItemButtonCQ
    {
        public class AddButtonCommand : IRequest<object>
        {
            public string name;
            public string buttontype;
        }

        //public class AddButtonHandler : IRequestHandler<AddButtonCommand>
        //{
        //    public Task Handle(AddButtonCommand cmd, CancellationToken cancellationToken)
        //    {
        //        // should use await here 
        //        Console.WriteLine("got the caommand");
        //        //await Task.Delay(10);
        //        var ob = new { name = "blah", b= "b" };


        //        return Task.FromResult(ob);


        //    }
        //}

        public class Handler : IRequestHandler<AddButtonCommand, object>
        {
            private readonly IItemRepository _context;
            //private readonly ICurrentUserAccessor _currentUserAccessor;

            public Handler(IItemRepository repository)
            {
                _context = repository;
               
            }

            public async Task<object> Handle(AddButtonCommand message, CancellationToken cancellationToken)
            {
                Console.WriteLine(message.buttontype);

                await Task.Delay(10);

                return new { name = "rar", buttontype = "fuck" };
            }
        }

    }



}
