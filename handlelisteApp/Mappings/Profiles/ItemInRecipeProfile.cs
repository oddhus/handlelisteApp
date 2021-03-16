using AutoMapper;
using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Mappings.Profiles
{
    public class ItemInRecipeProfile : Profile
    {
        public ItemInRecipeProfile()
        {
            CreateMap<ItemInRecipe, ItemInRecipeDTO>()
                .ForMember(s => s.ItemName, opt =>
                {
                    opt.MapFrom(i => i.Item.ItemName);
                });
        }
    }
}
