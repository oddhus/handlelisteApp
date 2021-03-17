﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using handlelisteApp.Context;

namespace SqlServerMigrations.Migrations
{
    [DbContext(typeof(ShoppingListContext))]
    partial class ShoppingListContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("handlelisteApp.Models.Item", b =>
                {
                    b.Property<int>("ItemID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ItemName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Weight")
                        .HasColumnType("float");

                    b.HasKey("ItemID");

                    b.ToTable("Items");
                });

            modelBuilder.Entity("handlelisteApp.Models.ItemInMyKitchen", b =>
                {
                    b.Property<int>("MyKitchenID")
                        .HasColumnType("int");

                    b.Property<int>("ItemID")
                        .HasColumnType("int");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.HasKey("MyKitchenID", "ItemID");

                    b.HasIndex("ItemID");

                    b.ToTable("ItemsInKitchens");
                });

            modelBuilder.Entity("handlelisteApp.Models.ItemInRecipe", b =>
                {
                    b.Property<int>("RecipeID")
                        .HasColumnType("int");

                    b.Property<int>("ItemID")
                        .HasColumnType("int");

                    b.Property<string>("Category")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<string>("Unit")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RecipeID", "ItemID");

                    b.HasIndex("ItemID");

                    b.ToTable("ItemsInRecipes");
                });

            modelBuilder.Entity("handlelisteApp.Models.ItemOnShoppingList", b =>
                {
                    b.Property<int>("ShoppingListId")
                        .HasColumnType("int");

                    b.Property<int>("ItemId")
                        .HasColumnType("int");

                    b.Property<bool>("HasBeenBought")
                        .HasColumnType("bit");

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<string>("Unit")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ShoppingListId", "ItemId");

                    b.HasIndex("ItemId");

                    b.ToTable("ItemOnShoppingLists");
                });

            modelBuilder.Entity("handlelisteApp.Models.MyKitchen", b =>
                {
                    b.Property<int>("MyKitchenID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("MyKitchenID");

                    b.HasIndex("UserID")
                        .IsUnique();

                    b.ToTable("Kitchens");
                });

            modelBuilder.Entity("handlelisteApp.Models.Preferences", b =>
                {
                    b.Property<int>("PreferencesID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Darkmode")
                        .HasColumnType("bit");

                    b.Property<int>("Fontsize")
                        .HasColumnType("int");

                    b.Property<string>("Language")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PreferencesID");

                    b.ToTable("Preferences");
                });

            modelBuilder.Entity("handlelisteApp.Models.Recipe", b =>
                {
                    b.Property<int>("RecipeID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Approach")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RecipeName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ShortDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("RecipeID");

                    b.HasIndex("UserID");

                    b.ToTable("Recipes");
                });

            modelBuilder.Entity("handlelisteApp.Models.ShoppingList", b =>
                {
                    b.Property<int>("ShoppingListID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("UpdatedOn")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("ShoppingListID");

                    b.HasIndex("UserId");

                    b.ToTable("ShoppingLists");
                });

            modelBuilder.Entity("handlelisteApp.Models.User", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("EmailAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HashedPassword")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PreferencesID")
                        .HasColumnType("int");

                    b.Property<int>("UserAge")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserID");

                    b.HasIndex("PreferencesID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("handlelisteApp.Models.ItemInMyKitchen", b =>
                {
                    b.HasOne("handlelisteApp.Models.Item", "Item")
                        .WithMany()
                        .HasForeignKey("ItemID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("handlelisteApp.Models.MyKitchen", "MyKitchen")
                        .WithMany("ItemsInMyKitchen")
                        .HasForeignKey("MyKitchenID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Item");

                    b.Navigation("MyKitchen");
                });

            modelBuilder.Entity("handlelisteApp.Models.ItemInRecipe", b =>
                {
                    b.HasOne("handlelisteApp.Models.Item", "Item")
                        .WithMany()
                        .HasForeignKey("ItemID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("handlelisteApp.Models.Recipe", "Recipe")
                        .WithMany("Items")
                        .HasForeignKey("RecipeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Item");

                    b.Navigation("Recipe");
                });

            modelBuilder.Entity("handlelisteApp.Models.ItemOnShoppingList", b =>
                {
                    b.HasOne("handlelisteApp.Models.Item", "Item")
                        .WithMany()
                        .HasForeignKey("ItemId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("handlelisteApp.Models.ShoppingList", "ShoppingList")
                        .WithMany("Items")
                        .HasForeignKey("ShoppingListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Item");

                    b.Navigation("ShoppingList");
                });

            modelBuilder.Entity("handlelisteApp.Models.MyKitchen", b =>
                {
                    b.HasOne("handlelisteApp.Models.User", "User")
                        .WithOne("MyKitchen")
                        .HasForeignKey("handlelisteApp.Models.MyKitchen", "UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("handlelisteApp.Models.Recipe", b =>
                {
                    b.HasOne("handlelisteApp.Models.User", "user")
                        .WithMany("Recipes")
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("user");
                });

            modelBuilder.Entity("handlelisteApp.Models.ShoppingList", b =>
                {
                    b.HasOne("handlelisteApp.Models.User", "user")
                        .WithMany("ShoppingLists")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("user");
                });

            modelBuilder.Entity("handlelisteApp.Models.User", b =>
                {
                    b.HasOne("handlelisteApp.Models.Preferences", "Preferences")
                        .WithMany()
                        .HasForeignKey("PreferencesID");

                    b.Navigation("Preferences");
                });

            modelBuilder.Entity("handlelisteApp.Models.MyKitchen", b =>
                {
                    b.Navigation("ItemsInMyKitchen");
                });

            modelBuilder.Entity("handlelisteApp.Models.Recipe", b =>
                {
                    b.Navigation("Items");
                });

            modelBuilder.Entity("handlelisteApp.Models.ShoppingList", b =>
                {
                    b.Navigation("Items");
                });

            modelBuilder.Entity("handlelisteApp.Models.User", b =>
                {
                    b.Navigation("MyKitchen");

                    b.Navigation("Recipes");

                    b.Navigation("ShoppingLists");
                });
#pragma warning restore 612, 618
        }
    }
}
