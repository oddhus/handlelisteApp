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

        public User FindUserByUserName(string username)
        {
            return _context.Users.SingleOrDefault(u => u.Username == username);
        }

        public ICollection<User> GetAllUsers()
        {
            return _context.Users.ToList();
        }

        public User CreateNewUser(User user)
        {
            //EF does SELECT immediately following INSERT, so no need to re-SELECT
            _context.Add(user);
            _context.SaveChanges();
            return user;
        }

        public User GetUserById(int id)
        {
            return _context.Users.Find(id);
        }
    }
}