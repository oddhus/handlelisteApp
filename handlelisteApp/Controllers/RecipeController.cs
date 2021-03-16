﻿using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
using handlelisteApp.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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

        [HttpGet]
        public IEnumerable<RecipeDTO> GetAllRecipes()
        {
            return _recipeService.GetAllRecipes();
        }

        [HttpGet("{id:int}")]
        public ActionResult<RecipeDTO> GetRecipe(int id)
        {
            RecipeDTO recipe = _recipeService.GetRecipeById(id);
            if(recipe == null)
            {
                return NotFound();
            }
            return recipe;
        }

        [HttpPost]
        public ActionResult<RecipeDTO> CreateNewRecipe(RecipeDTO recipe)
        {
            RecipeDTO savedRecipe = _recipeService.AddRecipe(recipe);
            return savedRecipe;
        }

        [HttpPut("{id:int}")]
        public ActionResult<RecipeDTO> UpdateRecipe(int id, [FromBody] RecipeDTO recipe)
        {
            RecipeDTO storedRecipe;
            try
            {
                storedRecipe = _recipeService.UpdateRecipe(id, recipe);
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


    }
}
