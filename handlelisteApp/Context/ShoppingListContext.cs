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
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<ItemOnShoppingList>()
                .HasKey(s => new { s.ShoppingListId, s.ItemId });
            modelBuilder
                .Entity<ItemInRecipe>()
                .HasKey(s => new { s.RecipeID, s.ItemID });
            modelBuilder
                .Entity<ItemInMyKitchen>()
                .HasKey(s => new { s.MyKitchenID, s.ItemID });
            modelBuilder
                .Entity<RecipeFavorite>()
                .HasKey(s => new { s.UserId, s.RecipeId });
        }

        public virtual DbSet<Item> Items { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<ItemOnShoppingList> ItemOnShoppingLists { get; set; }
        public virtual DbSet<ShoppingList> ShoppingLists { get; set; }
        public virtual DbSet<Preferences> Preferences { get; set; }
        public virtual DbSet<Recipe> Recipes { get; set; }
        public virtual DbSet<ItemInRecipe> ItemsInRecipes { get; set; }
        public virtual DbSet<MyKitchen> Kitchens { get; set; }
        public virtual DbSet<ItemInMyKitchen> ItemsInKitchens { get; set; }
        public virtual DbSet<RecipeFavorite> RecipeFavorites { get; set; }
    }
}
