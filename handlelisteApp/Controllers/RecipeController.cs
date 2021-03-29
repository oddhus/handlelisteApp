using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
using handlelisteApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace handlelisteApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecipeController : Controller
    {
        private readonly IRecipeService _recipeService;

        public RecipeController(IRecipeService service)
        {
            _recipeService = service;
        }

        [HttpGet("all")]
        public IEnumerable<RecipeDTO> GetAllRecipes()
        {
            return _recipeService.GetAllRecipes();
        }

        [HttpGet("{id:int}")]
        public ActionResult<RecipeDTO> GetRecipe(int id)
        {
            RecipeDTO recipe = _recipeService.GetRecipeById(id);
            if (recipe == null)
            {
                return NotFound();
            }
            return recipe;
        }

        [HttpGet("user/{id}")]
        public List<RecipeDTO> Get(int id)
        {
            return _recipeService.GetAllByUserIdRecipes(id);
        }

        [Authorize]
        [HttpPost]
        public ActionResult<RecipeDTO> CreateNewRecipe(RecipeDTO recipe)
        {
            RecipeDTO savedRecipe = _recipeService.AddRecipe(recipe, GetUserId());
            return savedRecipe;
        }

        [HttpPut("{id:int}")]
        public ActionResult<RecipeDTO> UpdateRecipe(int id, [FromBody] RecipeDTO recipe)
        {
            RecipeDTO storedRecipe;
            int userId = Int32.Parse(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            try
            {
                storedRecipe = _recipeService.UpdateRecipe(id, userId, recipe);
            }
            catch (ArgumentNullException)
            {
                return BadRequest(new { message = "Invalid recipe" });
            }

            return storedRecipe;
        }

        [HttpDelete("{id:int}")]
        public ActionResult DeleteRecipe(int id)
        {
            bool ok = _recipeService.DeleteRecipe(id);
            if (!ok)
            {
                return BadRequest(new { message = "Invalid recipe" });
            }
            return NoContent();
        }

        [Authorize]
        [HttpGet("suggestions")]
        public ActionResult<IEnumerable<RecipeDTO>> GetSuggestionsBasedOnShoppingLists()
        {
            return _recipeService.GetRecipeMatchesBasedOnUsersShoppingLists(GetUserId());
        }

        private int GetUserId()
        {
            return Int32.Parse(HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
        }
    }
}