using handlelisteApp.Context;

namespace handlelisteApp.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly ShoppingListContext _context;

        public UserRepository(ShoppingListContext context)
        {
            _context = context;
        }


    }
}