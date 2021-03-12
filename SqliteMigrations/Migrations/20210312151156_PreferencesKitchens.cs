using Microsoft.EntityFrameworkCore.Migrations;

namespace SqliteMigrations.Migrations
{
    public partial class PreferencesKitchens : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmailAdress",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PreferencesID",
                table: "Users",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Kitchens",
                columns: table => new
                {
                    MyKitchenID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserID = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kitchens", x => x.MyKitchenID);
                    table.ForeignKey(
                        name: "FK_Kitchens_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Preferences",
                columns: table => new
                {
                    PreferencesID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Language = table.Column<string>(type: "TEXT", nullable: true),
                    Darkmode = table.Column<bool>(type: "INTEGER", nullable: false),
                    Fontsize = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Preferences", x => x.PreferencesID);
                });

            migrationBuilder.CreateTable(
                name: "Recipes",
                columns: table => new
                {
                    RecipeID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RecipeName = table.Column<string>(type: "TEXT", nullable: true),
                    ShortDescription = table.Column<string>(type: "TEXT", nullable: true),
                    Approach = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipes", x => x.RecipeID);
                });

            migrationBuilder.CreateTable(
                name: "ItemsInKitchens",
                columns: table => new
                {
                    ItemID = table.Column<int>(type: "INTEGER", nullable: false),
                    MyKitchenID = table.Column<int>(type: "INTEGER", nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemsInKitchens", x => new { x.MyKitchenID, x.ItemID });
                    table.ForeignKey(
                        name: "FK_ItemsInKitchens_Items_ItemID",
                        column: x => x.ItemID,
                        principalTable: "Items",
                        principalColumn: "ItemID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ItemsInKitchens_Kitchens_MyKitchenID",
                        column: x => x.MyKitchenID,
                        principalTable: "Kitchens",
                        principalColumn: "MyKitchenID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ItemsInRecipes",
                columns: table => new
                {
                    RecipeID = table.Column<int>(type: "INTEGER", nullable: false),
                    ItemID = table.Column<int>(type: "INTEGER", nullable: false),
                    Quantiy = table.Column<int>(type: "INTEGER", nullable: false),
                    Unit = table.Column<string>(type: "TEXT", nullable: true)
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
                name: "IX_ItemsInKitchens_ItemID",
                table: "ItemsInKitchens",
                column: "ItemID");

            migrationBuilder.CreateIndex(
                name: "IX_ItemsInRecipes_ItemID",
                table: "ItemsInRecipes",
                column: "ItemID");

            migrationBuilder.CreateIndex(
                name: "IX_Kitchens_UserID",
                table: "Kitchens",
                column: "UserID",
                unique: true);

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
                name: "ItemsInKitchens");

            migrationBuilder.DropTable(
                name: "ItemsInRecipes");

            migrationBuilder.DropTable(
                name: "Preferences");

            migrationBuilder.DropTable(
                name: "Kitchens");

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
