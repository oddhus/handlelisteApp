using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Services
{
    public interface IUserService
    {
        public IEnumerable<UserDTO> GetAllUsers();
        public UserDTO GetUser(int id);
        public UserDTO CreateNewUser(UserRegisterDTO user);
        public LoginResponse LoginUser(LoginRequest login);

    }
}
