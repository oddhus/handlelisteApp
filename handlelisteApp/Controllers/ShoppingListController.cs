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

        [HttpPost]
        public ShoppingListReadDTO CreateShoppingList([FromBody] ShoppingListCreateDTO createDTO)
        {
            //Here we should normally get userID from context
            var userId = 1; //GetUserId()

            return _shoppingListService.CreateShoppingList(userId, createDTO);
        }

        private int GetUserId()
        {
            return Int32.Parse(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
        }
    }
}