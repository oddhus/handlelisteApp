using AutoMapper;
using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
using System;
using System.Threading.Tasks;


namespace handlelisteApp.Mappings.Profiles
{
    public class ItemOnShoppingListProfile : Profile
    {
        public ItemOnShoppingListProfile()
        {
            CreateMap<ItemOnShoppingList, ItemOnShoppingListReadDTO>();
        }
    }
}