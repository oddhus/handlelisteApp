using handlelisteApp.Context;
using handlelisteApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using handlelisteApp.Services;
using Scrypt;
using handlelisteApp.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace handlelisteApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly ShoppingListContext _context;

        private readonly IUserService _userService;

        private ScryptEncoder _encoder;
        //private IAuthService _authService;


        public UserController(IUserService userService, ShoppingListContext context, ScryptEncoder encoder)
        {
            _context = context;
            _userService = userService;
            _encoder = encoder;
           
        }


        [HttpGet]
        public IEnumerable<UserDTO> Get()
        {
            
            IEnumerable<UserDTO> result = _userService.GetAllUsers();
            
            return result;
        }


        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id:int}")]
        public async Task<ActionResult<UserDTO>> GetUser(int id)
        {
            //User result = await _context.Users.FindAsync(id);
            UserDTO result = _userService.GetUser(id);
            if(result == null)
            {
                return NotFound();
            }
            return result;
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<UserDTO> CreateUser(User user)
        {
            
            user.HashedPassword = _encoder.Encode(user.HashedPassword);
            //_context.Users.Add(user);
            //await _context.SaveChangesAsync();

            UserDTO userDTO = _userService.CreateNewUser(user);

            return CreatedAtAction(nameof(GetUser), userDTO);
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult<LoginResponse> LoginPost([FromBody] LoginRequest login)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            //User user = _context.Users.FirstOrDefault(u => u.Username == login.Username);
            var response = _userService.LoginUser(login);

            if(response == null)
            {
                return BadRequest(new { message = "Invalid username or password" });
            }

            

            return Ok(response);


        }










    }
}
