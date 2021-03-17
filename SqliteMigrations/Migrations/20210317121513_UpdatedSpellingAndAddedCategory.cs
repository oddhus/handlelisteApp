using Microsoft.EntityFrameworkCore.Migrations;

namespace SqliteMigrations.Migrations
{
    public partial class UpdatedSpellingAndAddedCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EmailAdress",
                table: "Users",
                newName: "EmailAddress");

            migrationBuilder.RenameColumn(
                name: "Quantiy",
                table: "ItemsInRecipes",
                newName: "Quantity");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "ItemsInRecipes",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "ItemsInRecipes");

            migrationBuilder.RenameColumn(
                name: "EmailAddress",
                table: "Users",
                newName: "EmailAdress");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "ItemsInRecipes",
                newName: "Quantiy");
        }
    }
}
