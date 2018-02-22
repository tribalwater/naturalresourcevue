using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbUitlsCoreTest.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DbUitlsCoreTest.Controllers
{
    [Produces("application/json")]
    [Route("api/item/{itemtype}/{subtype}")]
    public class ItemController : Controller
    {
        private IItemRepository _respository;

        public ItemController(IItemRepository repository)
        {
            _respository = repository;

        }
        // GET: api/itemtype/subtype

        [HttpGet]
        public string Get(string itemtype, string subtype)
        {
            Console.WriteLine("----- tiem type -----");
            Console.WriteLine(itemtype);

            return itemtype + subtype;
        }

        [HttpGet]
        public string GetItemsWithQuery(string itemtype, string subtype, [FromQuery] string query)
        {
            Console.WriteLine("----- tiem type -----");
            Console.WriteLine(itemtype);

            return itemtype + subtype + query;
        }

        // GET: api/itemtype/subtype/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(string itemtype, string subtype, string id)
        {
            Console.WriteLine("---- types -------------");
            Console.WriteLine(itemtype);
            Console.WriteLine(subtype);
            return Ok(_respository.GetItem(itemtype, subtype));
            //itemtype + " "  + subtype + " " + id;
        }

        // POST: api/itemtype/subtype
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/itemtype/subtype
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/itemtype/subtype/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpGet("display")]
        public IActionResult GetItemTypeDisplay(string itemtype, string subtype)
        {
            Console.WriteLine("----- tiem type -----");
            Console.WriteLine(itemtype);

            return Ok( _respository.GetItemDispaly(itemtype, subtype));
        }

        // given a query object reuturn resutls 
        [HttpPost("query")]
        public void QueryItemType(string itemtype, string subtype)
        {
        }

        // given a query object reuturn resutls 
        [HttpPost("search")]
        public void SearchItemType(string itemtype, string subtype)
        {
        }
    }
}
