using handlelisteApp.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models
{
    public class LoginResponse
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }


        public LoginResponse(UserDTO user, string token)
        {
            Id = user.UserID;
            Username = user.Username;
            Token = token;
        }

        public LoginResponse()
        {
        }
    }
}
