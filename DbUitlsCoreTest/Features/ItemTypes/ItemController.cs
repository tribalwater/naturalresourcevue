using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DbUitlsCoreTest.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using MediatR;
using DbUitlsCoreTest.Features;
using DbUitlsCoreTest.Features.ItemTypes;
using System.Collections;

namespace DbUitlsCoreTest.Controllers
{
    [Produces("application/json")]
    [Route("api/item/{itemtype}/{subtype}")]
    public class ItemController : Controller
    {
        private IItemRepository _respository;
        private readonly IMediator _mediator;


        public ItemController(IItemRepository repository, IMediator mediator)
        {
            _respository = repository;
            _mediator = mediator;

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

        [HttpGet("list/viewmodel")]
        public async Task<object> GetItemTypeListViewModel(string itemtype, string subtype)
        {
            List<dynamic> buttons =  await _mediator.Send(new ItemListButtonsQuery.Query(itemtype, subtype, "list", true, true));
            dynamic itemlist = _respository.GetItemList(itemtype, subtype);
            Hashtable viewmodel = new Hashtable();

            viewmodel.Add("records", itemlist["records"]);
            viewmodel.Add("display", itemlist["display"]);
            viewmodel.Add("buttons", buttons);

            return Ok(viewmodel);
        }

        [HttpGet("properties/{id}")]
        public IActionResult GetItemTypeProperties(string itemtype, string subtype, string id)
        {
            Console.WriteLine("----- get item props -----");
            Console.WriteLine(itemtype);

            return Ok(_respository.GetItemProperties(itemtype, subtype, id));
        }

        [HttpGet("properties/viewmodel/{id}")]
        public async Task<object> GetItemTypePropertiesViewModel(string itemtype, string subtype, string id)
        {
            Console.WriteLine("----- get item props -----");
            Console.WriteLine(itemtype);
            
            List<dynamic> buttons = await _mediator.Send(new ItemPropertiesButtonsQuery.Query(itemtype, subtype, "properties"));
            dynamic itemproperties = _respository.GetItemProperties(itemtype, subtype, id);
            dynamic itemtabs = _respository.GetItemTabs(itemtype, subtype);
            Hashtable viewmodel = new Hashtable();

            viewmodel.Add("records", itemproperties["records"]);
            viewmodel.Add("display", itemproperties["display"]);
            viewmodel.Add("buttons", buttons);
            viewmodel.Add("tabs",itemtabs);
            
            return Ok(viewmodel);
        }

        [HttpGet("tabs")]
        public IActionResult GetItemTypeTabs(string itemtype, string subtype)
        {
            Console.WriteLine("----- tiem type -----");
            Console.WriteLine(itemtype);

            return Ok(_respository.GetItemTabs(itemtype, subtype));
        }

        [HttpGet("buttons/{pagetype}")]
        public async Task<object> GetItemProeprtiesCustomButtons(string itemtype, string subtype, string pagetype)
        {
           
            if (subtype == "null") {
                subtype = null; 
            }

            var customButtons = await _mediator.Send(new ItemButtonListQuery.Query(itemtype, subtype, pagetype));
            var customTabs = await _mediator.Send(new ItemPropertiesTabsQuery.Query(itemtype, subtype, pagetype));

            var standardButtons = new List<object>();
            if (pagetype == "properties") {
                standardButtons = await _mediator.Send(new ItemPropertiesButtonsQuery.Query(itemtype, subtype, pagetype));
            }
            else if (pagetype == "list")
            {
                // shouldShowSearch and shouldShowInsert should come from request params 
                standardButtons = await _mediator.Send(new ItemListButtonsQuery.Query(itemtype, subtype, pagetype, true, true));
            }


            var res = customButtons.Concat(standardButtons);
            Console.WriteLine("----- res for item buttons ----- ");
            Console.WriteLine(res);
            //_respository.GetItemCustomButtons(itemtype, subtype, pagetype)
            return Ok(res);
        }

        [HttpPost("buttons/{pagetype}")]
        public async Task<object>  AddItemProeprtiesCustomButtons(string itemtype, string subtype, string pagetype)
        {
            Console.WriteLine("----- get it -----");
            Console.WriteLine(itemtype);
           // var result = 
            return await _mediator.Send(new ItemButtonCQ.AddButtonCommand { name = "rar", buttontype = "fuck" }); 
           
           // return Ok(_respository.GetItemCustomButtons(itemtype, subtype, pagetype));
        }

       

        [HttpGet("formfields")]
        public async Task<object> GetItemFormFields(string itemtype, string subtype)
        {

            var customTabs = _respository.GetItemFormFields(itemtype, subtype);
                //await _mediator.Send(new ItemPropertiesTabsQuery.Query(itemtype, subtype, pagetype));
            return Ok(customTabs);
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
