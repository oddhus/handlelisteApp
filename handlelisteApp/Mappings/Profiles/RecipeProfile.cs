using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

namespace handlelisteApp.Mappings.Profiles
{
    public class RecipeProfile : Profile
    {
        public RecipeProfile()
        {
            CreateMap<PaginatedRecipeList, PaginatedReadRecipeDTO>();
            CreateMap<Recipe, RecipeDTO>()
                .ForMember(r => r.IsOwner, opt =>
                    {
                        opt.MapFrom((src, dest, destVal, ctx) => ctx.Items["UserId"].Equals(src.UserID));
                    })
                .ForMember(r => r.HasLiked, opt =>
                    {
                        opt.MapFrom((src, dest, destVal, ctx) => src.UserSaved.Any(u => ctx.Items["UserId"].Equals(u.UserId)));
                    });
        }
    }
}