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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<ItemOnShoppingList>()
                .HasKey(s => new { s.ShoppingListId, s.ItemId });
        }

        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<ItemOnShoppingList> ItemOnShoppingLists { get; set; }
        public virtual DbSet<ShoppingList> ShoppingLists { get; set; }
    }
}
