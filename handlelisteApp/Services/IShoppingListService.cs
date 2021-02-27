using handlelisteApp.Models.DTO;

namespace handlelisteApp.Data
{
    public interface IShoppingListService
    {
        ShoppingListReadDTO CreateShoppingList(int userID, ShoppingListCreateDTO shoppingListDTO);
    }
}