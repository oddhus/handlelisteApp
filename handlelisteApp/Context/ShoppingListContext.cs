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
        public ShoppingListContext() : base()
        {

        }
        public ShoppingListContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<ItemInRecipe>()
                .HasKey(s => new { s.RecipeID, s.ItemID });
            modelBuilder
                .Entity<ItemInMyKitchen>()
                .HasKey(s => new { s.MyKitchenID, s.ItemID });
            modelBuilder.Entity<SavedRecipe>()
                .HasOne(bc => bc.User)
                .WithMany(b => b.SavedRecipes)
                .HasForeignKey(bc => bc.UserId);
            modelBuilder.Entity<SavedRecipe>()
                .HasOne(bc => bc.Recipe)
                .WithMany(c => c.UserSaved)
                .HasForeignKey(bc => bc.RecipeId);
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
        public virtual DbSet<SavedRecipe> SavedRecipes { get; set; }
    }
}
