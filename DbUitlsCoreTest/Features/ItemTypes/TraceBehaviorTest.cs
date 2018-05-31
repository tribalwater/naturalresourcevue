using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using DbUitlsCoreTest.Data;
using MediatR;
using Microsoft.Extensions.Logging;

namespace DbUitlsCoreTest.Features.ItemTypes
{
    public class TraceBehaviorTest
    {
        public class MyRequest : IRequest<string>
        {

        }

        public class MyRequestHandler : IRequestHandler<MyRequest, object>
        {

            public async Task<object> Handle(MyRequest message, CancellationToken cancellationToken)
            {

                return new { };
            }
        }

       
        public class TracingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
        {
            public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
            {
                
                var response = await next();
            
                return response;
            }
        }
    }
   

   
}
