﻿using handlelisteApp.Context;
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
using System.Security.Claims;

namespace handlelisteApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }


        [HttpGet]
        public IEnumerable<UserDTO> Get()
        {

            IEnumerable<UserDTO> result = _userService.GetAllUsers();

            return result;
        }


        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id:int}")]
        public ActionResult<UserDTO> GetUser(int id)
        {
            //User result = await _context.Users.FindAsync(id);
            UserDTO result = _userService.GetUser(id);
            if (result == null)
            {
                return NotFound();
            }
            return result;
        }

        [Authorize]
        [HttpGet("loggedIn")]
        public ActionResult<UserDTO> GetLoggedInUser()
        {
            var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
            var userId = Int32.Parse(claimsIdentity.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            return _userService.GetUser(userId);
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<LoginResponse> CreateUser(UserRegisterDTO user)
        {

            LoginResponse response = _userService.CreateNewUser(user);
            if (response == null)
            {
                return BadRequest(new { message = "Invalid username or password" });
            }

            return response;
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult<LoginResponse> LoginPost([FromBody] LoginRequest login)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            //User user = _context.Users.FirstOrDefault(u => u.Username == login.Username);
            var response = _userService.LoginUser(login);

            if (response == null)
            {
                return BadRequest(new { message = "Invalid username or password" });
            }



            return response;


        }










    }
}
