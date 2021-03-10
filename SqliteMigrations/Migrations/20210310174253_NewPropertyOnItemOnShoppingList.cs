using Microsoft.EntityFrameworkCore.Migrations;

namespace SqliteMigrations.Migrations
{
    public partial class NewPropertyOnItemOnShoppingList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasBeenBought",
                table: "ItemOnShoppingLists",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasBeenBought",
                table: "ItemOnShoppingLists");
        }
    }
}
