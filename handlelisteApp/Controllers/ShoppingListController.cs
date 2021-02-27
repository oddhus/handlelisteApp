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

namespace handlelisteApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ShoppingListController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;

        private readonly ShoppingListService _shoppingListService;

        public ShoppingListController(ILogger<WeatherForecastController> logger, ShoppingListService shoppingListService)
        {
            _logger = logger;
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