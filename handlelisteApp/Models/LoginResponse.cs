using handlelisteApp.Models.DTO;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Models
{
    [ExcludeFromCodeCoverage]
    public class LoginResponse
    {
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Token { get; set; }


        public LoginResponse(UserDTO user, string token)
        {
            UserID = user.UserID;
            Username = user.Username;
            Token = token;
        }

        public LoginResponse()
        {
        }
    }
}
