using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbUitlsCoreTest.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

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
        public IActionResult Get(string itemtype, string subtype)
        {
            Console.WriteLine("----- tiem type -----");
            Console.WriteLine(itemtype);

            return Ok(_respository.GetAllItems(itemtype, subtype));
        }


        // GET: api/itemtype/subtype/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(string itemtype, string subtype, string id)
        {
            return Ok(_respository.GetItem(itemtype, subtype, id));
        }

        // POST: api/itemtype/subtype
        [HttpPost]
        public IActionResult Post(string itemtype, string subtype, [FromBody]object ItemTypeObj)
        {
            var result = (IDictionary<string, object>)_respository.AddItem(ItemTypeObj, itemtype, subtype);
            Console.WriteLine("---- result ----");
            Console.WriteLine(result.ToString());
            Console.WriteLine(result["ITEMID"]);
            ///Console.WriteLine(result.ITEMID);

            return Created($"/api/item/{itemtype}/{subtype}/{result["ITEMID"]}", result["ITEMID"]);
        }

        // PUT: api/itemtype/subtype
        [HttpPut("{id}")]
        public IActionResult Put(string itemtype, string subtype, string id,  [FromBody]object ItemTypeObj)
        {
            Console.WriteLine(ItemTypeObj);
            Console.WriteLine(itemtype);

            return Ok(_respository.UpdateItem(itemtype, subtype, id, ItemTypeObj));
        }

        // DELETE: api/itemtype/subtype/5
        [HttpDelete("{id}")]
        public IActionResult Delete(string itemtype, string subtype, string id)
        {
            var resutlts =  _respository.DeleteItem(itemtype, subtype, id);
            Console.WriteLine(resutlts);
            return NoContent();
        }

        [HttpGet("display")]
        public IActionResult GetItemTypeDisplay(string itemtype, string subtype)
        {
            Console.WriteLine("----- tiem type -----");
            Console.WriteLine(itemtype);

            return Ok( _respository.GetItemDisplay(itemtype, subtype, ""));
        }

        [HttpGet("list")]
        public IActionResult GetItemTypeList(string itemtype, string subtype)
        {
            Console.WriteLine("----- get list -----");
            Console.WriteLine(itemtype);

            return Ok(_respository.GetItemList(itemtype, subtype));
        }


        [HttpGet("properties/{id}")]
        public IActionResult GetItemTypeProperties(string itemtype, string subtype, string id)
        {
            Console.WriteLine("----- get item props -----");
            Console.WriteLine(itemtype);

            return Ok(_respository.GetItemProperties(itemtype, subtype, id));
        }

        [HttpGet("tabs")]
        public IActionResult GetItemTypeTabs(string itemtype, string subtype)
        {
            Console.WriteLine("----- tiem type -----");
            Console.WriteLine(itemtype);

            return Ok(_respository.GetItemTabs(itemtype, subtype));
        }

        [HttpGet("buttons")]
        public IActionResult GetItemCustomButtons(string itemtype, string subtype)
        {
            Console.WriteLine("----- get it -----");
            Console.WriteLine(itemtype);

            return Ok(_respository.GetItemCustomButtons(itemtype, subtype));
        }

        [HttpGet("relations/{id}")]
        public IActionResult GetItemRelation(string itemtype, string subtype, string id)
        {
            Console.WriteLine("----- tiem type -----");
            Console.WriteLine(itemtype);
            Console.WriteLine(id);


            return Ok(_respository.GetAllItemRelations(itemtype, subtype, id));
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
