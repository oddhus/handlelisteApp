using handlelisteApp.Authorization;
using handlelisteApp.Data;
using handlelisteApp.Models;
using handlelisteApp.Models.DTO;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Scrypt;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace handlelisteApp.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly AppSettings _appSettings;
        private ScryptEncoder _sCryptEncoder;


        public UserService(IUserRepository userRepository, IOptions<AppSettings> appSettings, ScryptEncoder sCryptEncoder)
        {
            _userRepository = userRepository;
            _appSettings = appSettings.Value;
            _sCryptEncoder = sCryptEncoder;
        }

        public IEnumerable<UserDTO> GetAllUsers()
        {
            return _userRepository.GetAllUsers().Select(u => UserToUserDTO(u));
        }

        public UserDTO GetUser(int id)
        {
            User user = _userRepository.GetUserById(id);

            //TODO: Better mapping library?
            UserDTO userDTO = null;
            if (user != null)
            {
                userDTO = UserToUserDTO(user);
            }

            return userDTO;
        }

        public LoginResponse CreateNewUser(UserRegisterDTO userRegisterDTO)
        {
            if (_userRepository.FindUserByUserName(userRegisterDTO.Username) != null) //username already exists
            {
                return null;
            }

            User user = new User()
            {
                Username = userRegisterDTO.Username,
                EmailAddress = userRegisterDTO.EmailAddress,
                UserAge = userRegisterDTO.UserAge,
                HashedPassword = _sCryptEncoder.Encode(userRegisterDTO.Password)
            };

            User savedUser = _userRepository.CreateNewUser(user);
            var token = generateJwtToken(user);
            return new LoginResponse(UserToUserDTO(user), token);
        }




        private UserDTO UserToUserDTO(User user)
        {
            return new UserDTO { UserID = user.UserID, Username = user.Username, ShoppingLists = user.ShoppingLists, UserAge = user.UserAge };

        }

        public LoginResponse LoginUser(LoginRequest login)
        {
            User user = _userRepository.FindUserByUserName(login.Username);

            if (user == null || !VerifyPassword(login.Password, user.HashedPassword))
            {
                return null;
            }

            var token = generateJwtToken(user);
            return new LoginResponse(UserToUserDTO(user), token);
        }



        public string HashPassword(string password)
        {
            return _sCryptEncoder.Encode(password);
        }

        public bool VerifyPassword(string actualPassword, string hashedPassword)
        {
            return _sCryptEncoder.Compare(actualPassword, hashedPassword);
        }

        private string generateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new System.Security.Claims.ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, user.UserID.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}