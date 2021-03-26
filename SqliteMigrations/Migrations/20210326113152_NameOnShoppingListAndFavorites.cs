using Microsoft.EntityFrameworkCore.Migrations;

namespace SqliteMigrations.Migrations
{
    public partial class NameOnShoppingListAndFavorites : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Kitchens_UserID",
                table: "Kitchens");

            migrationBuilder.DropColumn(
                name: "Category",
                table: "ItemOnShoppingLists");

            migrationBuilder.RenameColumn(
                name: "Unit",
                table: "ItemOnShoppingLists",
                newName: "ItemIdentifier");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ShoppingLists",
                type: "TEXT",
                nullable: true);

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
                name: "IX_Kitchens_UserID",
                table: "Kitchens",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_RecipeFavorites_RecipeId",
                table: "RecipeFavorites",
                column: "RecipeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RecipeFavorites");

            migrationBuilder.DropIndex(
                name: "IX_Kitchens_UserID",
                table: "Kitchens");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "ShoppingLists");

            migrationBuilder.RenameColumn(
                name: "ItemIdentifier",
                table: "ItemOnShoppingLists",
                newName: "Unit");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "ItemOnShoppingLists",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Kitchens_UserID",
                table: "Kitchens",
                column: "UserID",
                unique: true);
        }
    }
}
