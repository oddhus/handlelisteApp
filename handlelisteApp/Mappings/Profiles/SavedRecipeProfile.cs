using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

namespace handlelisteApp.Mappings.Profiles
{
    public class SavedRecipeProfile : Profile
    {
        public SavedRecipeProfile()
        {
            CreateMap<SavedRecipe, SavedRecipeDTO>();
            CreateMap<Recipe, SavedRecipeDTO>();
        }
    }
}
