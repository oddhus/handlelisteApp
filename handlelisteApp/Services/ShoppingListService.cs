using handlelisteApp.Data;

namespace handlelisteApp.Services
{
    public class ShoppingListService
    {
        private readonly IShoppingListRepository _shoppingListRepo;

        public ShoppingListService(IShoppingListRepository shoppingListRepo)
        {
            _shoppingListRepo = shoppingListRepo;
        }


    }
}