using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using handlelisteApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication;
using handlelisteApp.Models.DTO;
using handlelisteApp.Data;

namespace handlelisteApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShoppingListController : ControllerBase
    {
        private readonly IShoppingListService _shoppingListService;

        public ShoppingListController(IShoppingListService shoppingListService)
        {
            _shoppingListService = shoppingListService;
        }

        [HttpGet]
        public ActionResult<List<ShoppingListReadDTO>> GetAllUserShoppingLists()
        {
            return _shoppingListService.GetAllUserShoppingListsByUserId(GetUserId());
        }

        [HttpGet("{shoppingListId}")]
        public ActionResult<ShoppingListReadDTO> GetShoppingListsById(int shoppingListId)
        {
            return _shoppingListService.GetShoppingListByUserIdAndListId(GetUserId(), shoppingListId);
        }

        [HttpPost]
        public ActionResult<ShoppingListReadDTO> CreateShoppingList([FromBody] ShoppingListCreateUpdateDTO createDTO)
        {
            var newShoppingList = _shoppingListService.CreateShoppingList(GetUserId(), createDTO);
            if (newShoppingList == null)
            {
                return BadRequest();
            };
            return newShoppingList;
        }

        [HttpPut("{shoppingListId}")]
        public ActionResult<ShoppingListReadDTO> UpdateShoppingList(int shoppingListId, [FromBody] ShoppingListCreateUpdateDTO updateDTO)
        {
            var updatedShoppingList = _shoppingListService.UpdateShoppingList(GetUserId(), shoppingListId, updateDTO);
            if (updatedShoppingList == null)
            {
                return BadRequest();
            };
            return updatedShoppingList;
        }

        [HttpDelete("{shoppingListId}")]
        public ActionResult DeleteShoppingList(int shoppingListId)
        {
            _shoppingListService.DeleteShoppingList(GetUserId(), shoppingListId);
            return NoContent();
        }

        private int GetUserId()
        {
            //return Int32.Parse(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            //Here we should normally get userID from context. Now returns static number
            return 1; //GetUserId()
        }
    }
}