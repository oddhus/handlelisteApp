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

namespace handlelisteApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly ShoppingListContext _context;

        private readonly UserService _userService;

        private ScryptEncoder _encoder;


        public UserController(UserService userService, ShoppingListContext context, ScryptEncoder encoder)
        {
            _context = context;
            _userService = userService;
            _encoder = encoder;
        }


        [HttpGet]
        public IEnumerable<User> Get()
        {
            //var json = JsonSerializer.Serialize(context.Users.ToList());


            
            return _context.Users.ToList();
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            User result = await _context.Users.FindAsync(id);
            if(result == null)
            {
                return NotFound();
            }
            return result;
        }


        [HttpPost]
        public ActionResult<UserDTO> PostUser(User user)
        {
            
            user.HashedPassword = _encoder.Encode(user.HashedPassword);
            //_context.Users.Add(user);
            //await _context.SaveChangesAsync();

            UserDTO userDTO = _userService.CreateNewUser(user);

            return CreatedAtAction(nameof(GetUser), userDTO);
        }


        // GET: UserController
        public ActionResult Index()
        {
            return View();
        }

        // GET: UserController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: UserController/Create
        public ActionResult Create()
        {
            return View();
        }


        /*
        // POST: UserController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
        */

        /*

        // GET: UserController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }
        */


        /*
        // POST: UserController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        */

        /*
        // GET: UserController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }
        */

        /*
        // POST: UserController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
        */
    }
}
