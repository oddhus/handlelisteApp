using Microsoft.EntityFrameworkCore.Migrations;

namespace SqliteMigrations.Migrations
{
    public partial class ImgUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RecipeFavorites");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItemOnShoppingLists",
                table: "ItemOnShoppingLists");

            migrationBuilder.AddColumn<string>(
                name: "ImgUrl",
                table: "Recipes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "ItemOnShoppingLists",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0)
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItemOnShoppingLists",
                table: "ItemOnShoppingLists",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "SavedRecipes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(type: "INTEGER", nullable: true),
                    RecipeId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedRecipes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SavedRecipes_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "RecipeID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SavedRecipes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemOnShoppingLists_ShoppingListId",
                table: "ItemOnShoppingLists",
                column: "ShoppingListId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedRecipes_RecipeId",
                table: "SavedRecipes",
                column: "RecipeId");

            migrationBuilder.CreateIndex(
                name: "IX_SavedRecipes_UserId",
                table: "SavedRecipes",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SavedRecipes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItemOnShoppingLists",
                table: "ItemOnShoppingLists");

            migrationBuilder.DropIndex(
                name: "IX_ItemOnShoppingLists_ShoppingListId",
                table: "ItemOnShoppingLists");

            migrationBuilder.DropColumn(
                name: "ImgUrl",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "ItemOnShoppingLists");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItemOnShoppingLists",
                table: "ItemOnShoppingLists",
                columns: new[] { "ShoppingListId", "ItemId" });

            migrationBuilder.CreateTable(
                name: "RecipeFavorites",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    RecipeId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipeFavorites", x => new { x.UserId, x.RecipeId });
                    table.ForeignKey(
                        name: "FK_RecipeFavorites_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "RecipeID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RecipeFavorites_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RecipeFavorites_RecipeId",
                table: "RecipeFavorites",
                column: "RecipeId");
        }
    }
}
