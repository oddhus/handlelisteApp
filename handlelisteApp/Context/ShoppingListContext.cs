using handlelisteApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace handlelisteApp.Context
{
    public class ShoppingListContext : DbContext
    {
        private static bool _created = false;
        public ShoppingListContext() : base()
        {

        }
        public ShoppingListContext(DbContextOptions options) : base(options)
        {
            /*
            if (!_created)
            {
                _created = true;
                Database.EnsureDeleted();
                Database.EnsureCreated();
            }
            */
        }

        public DbSet<Item> Items { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ItemOnShoppingList> ItemOnShoppingLists { get; set; }
        public DbSet<ShoppingList> ShoppingLists { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(@"DataSource=handlelisteApp.db");
        }

    }
}
