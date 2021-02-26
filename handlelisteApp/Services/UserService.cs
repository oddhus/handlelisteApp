using handlelisteApp.Data;
using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
using System.Collections.Generic;

namespace handlelisteApp.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public ICollection<User> GetAllUsers()
        {
            return _userRepository.GetAllUsers();
        }

        public UserDTO GetUser(int id)
        {
            User user = _userRepository.GetUserById(id);

            //TODO: Better mapping library?
            UserDTO userDTO = new UserDTO { UserID = user.UserID, Username = user.Username, ShoppingLists = user.ShoppingLists, UserAge = user.UserAge };
            return userDTO;
        }

        public UserDTO CreateNewUser(User user)
        {

            User savedUser = _userRepository.CreateNewUser(user);
            UserDTO userDTO = new UserDTO { UserID = savedUser.UserID, Username=savedUser.Username, ShoppingLists = savedUser.ShoppingLists, UserAge = savedUser.UserAge };
            return userDTO;
        }
    }
}