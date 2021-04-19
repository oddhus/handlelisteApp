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
        public PaginatedReadRecipeDTO GetAllRecipes([FromQuery] RecipeParameters recipeParameters)
        {
            return _recipeService.GetAllRecipes(GetUserId(), recipeParameters);
        }

        [HttpGet("{id:int}")]
        public ActionResult<RecipeDTO> GetRecipe(int id)
        {
            RecipeDTO recipe = _recipeService.GetRecipeById(id, GetUserId());
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
        [HttpGet("favorite")]
        public List<RecipeDTO> GetSavedRecipes()
        {
            int userId = GetUserId();
            return _recipeService.GetSavedRecipes(userId);
        }

        [Authorize]
        [HttpPost("favorite/{rId}")]
        public ActionResult<SavedRecipeDTO> SaveRecipe(int rId)
        {
            int userId = GetUserId();
            return _recipeService.SaveRecipe(userId, rId);
        }


        [HttpDelete("favorite/{rId}")]
        public ActionResult DeleteSavedRecipe(int rId)
        {
            int userId = GetUserId();
            bool ok = _recipeService.DeleteSavedRecipe(userId, rId);
            if (!ok)
            {
                return BadRequest(new { message = "Recipe not saved! " });
            }
            return NoContent();
        }

        [Authorize]
        [HttpPost]
        public ActionResult<RecipeDTO> CreateNewRecipe(RecipeDTO recipe)
        {
            RecipeDTO savedRecipe;
            try 
            { 
                savedRecipe = _recipeService.AddRecipe(recipe, GetUserId()); 
            } catch (ArgumentException)
            {
                return BadRequest(new { message = "Recipes must have items" });
            }
            
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
        public List<RecipeDTO> GetSuggestionsBasedOnShoppingLists()
        {
            return _recipeService.GetRecipeMatchesBasedOnUsersShoppingLists(GetUserId());
        }

        private int GetUserId()
        {
            var id = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (id != null)
            {
                return Int32.Parse(id);
            }
            else
            {
                return -1;
            }
        }
    }
}