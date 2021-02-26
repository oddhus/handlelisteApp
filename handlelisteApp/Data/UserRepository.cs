using handlelisteApp.Context;
using handlelisteApp.Models;
using System.Collections.Generic;
using System.Linq;

namespace handlelisteApp.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly ShoppingListContext _context;

        public UserRepository(ShoppingListContext context)
        {
            _context = context;
        }

        public ICollection<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        User IUserRepository.CreateNewUser(User user)
        {
            //EF does SELECT immediately following INSERT, so no need to re-SELECT
            _context.Add(user);
            _context.SaveChanges();
            return user;
        }

        User IUserRepository.GetUserById(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}