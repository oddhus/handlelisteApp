using AutoMapper;
using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
using System;
using System.Threading.Tasks;


namespace handlelisteApp.Mappings.Profiles
{
    public class ShoppingListProfile : Profile
    {
        public ShoppingListProfile()
        {
            CreateMap<ShoppingList, ShoppingListReadDTO>();
        }
    }
}