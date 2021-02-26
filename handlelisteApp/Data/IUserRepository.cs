using handlelisteApp.Models;
using System.Collections.Generic;

namespace handlelisteApp.Data
{
    public interface IUserRepository
    {
        public ICollection<User> GetAllUsers();
        public User GetUserById(int id);
        public User CreateNewUser(User user);
    }
}