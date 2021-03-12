using Microsoft.EntityFrameworkCore.Migrations;

namespace SqlServerMigrations.Migrations
{
    public partial class Preferences : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmailAdress",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PreferencesID",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Preferences",
                columns: table => new
                {
                    PreferencesID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Darkmode = table.Column<bool>(type: "bit", nullable: false),
                    Fontsize = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Preferences", x => x.PreferencesID);
                });

            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    RecipeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RecipeName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShortDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Approach = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipes", x => x.RecipeID);
                });

            migrationBuilder.CreateTable(
                name: "ItemsInRecipes",
                columns: table => new
                {
                    RecipeID = table.Column<int>(type: "int", nullable: false),
                    ItemID = table.Column<int>(type: "int", nullable: false),
                    Quantiy = table.Column<int>(type: "int", nullable: false),
                    Unit = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemsInRecipes", x => new { x.RecipeID, x.ItemID });
                    table.ForeignKey(
                        name: "FK_ItemsInRecipes_Items_ItemID",
                        column: x => x.ItemID,
                        principalTable: "Items",
                        principalColumn: "ItemID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItemsInRecipes_Recipes_RecipeID",
                        column: x => x.RecipeID,
                        principalTable: "Recipes",
                        principalColumn: "RecipeID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_PreferencesID",
                table: "Users",
                column: "PreferencesID");

            migrationBuilder.CreateIndex(
                name: "IX_ItemsInRecipes_ItemID",
                table: "ItemsInRecipes",
                column: "ItemID");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Preferences_PreferencesID",
                table: "Users",
                column: "PreferencesID",
                principalTable: "Preferences",
                principalColumn: "PreferencesID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Preferences_PreferencesID",
                table: "Users");

            migrationBuilder.DropTable(
                name: "ItemsInRecipes");

            migrationBuilder.DropTable(
                name: "Preferences");

            migrationBuilder.DropTable(
                name: "Recipes");

            migrationBuilder.DropIndex(
                name: "IX_Users_PreferencesID",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "EmailAdress",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PreferencesID",
                table: "Users");
        }
    }
}
