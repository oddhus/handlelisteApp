using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace handlelisteApp.Migrations
{
    public partial class UpdatedShoppingListModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemOnShoppingLists_Items_ItemID",
                table: "ItemOnShoppingLists");

            migrationBuilder.DropForeignKey(
                name: "FK_Items_ShoppingLists_ShoppingListID",
                table: "Items");

            migrationBuilder.DropForeignKey(
                name: "FK_ShoppingLists_Users_UserID",
                table: "ShoppingLists");

            migrationBuilder.DropIndex(
                name: "IX_Items_ShoppingListID",
                table: "Items");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItemOnShoppingLists",
                table: "ItemOnShoppingLists");

            migrationBuilder.DropColumn(
                name: "ShoppingListID",
                table: "Items");

            migrationBuilder.RenameColumn(
                name: "UserID",
                table: "ShoppingLists",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ShoppingLists_UserID",
                table: "ShoppingLists",
                newName: "IX_ShoppingLists_UserId");

            migrationBuilder.RenameColumn(
                name: "ItemID",
                table: "ItemOnShoppingLists",
                newName: "ItemId");

            migrationBuilder.RenameColumn(
                name: "ItemOnShoppingListID",
                table: "ItemOnShoppingLists",
                newName: "ShoppingListId");

            migrationBuilder.RenameIndex(
                name: "IX_ItemOnShoppingLists_ItemID",
                table: "ItemOnShoppingLists",
                newName: "IX_ItemOnShoppingLists_ItemId");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "ShoppingLists",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedOn",
                table: "ShoppingLists",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedOn",
                table: "ShoppingLists",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<int>(
                name: "ItemId",
                table: "ItemOnShoppingLists",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ShoppingListId",
                table: "ItemOnShoppingLists",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<string>(
                name: "Measurement",
                table: "ItemOnShoppingLists",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItemOnShoppingLists",
                table: "ItemOnShoppingLists",
                columns: new[] { "ShoppingListId", "ItemId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ItemOnShoppingLists_Items_ItemId",
                table: "ItemOnShoppingLists",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "ItemID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ItemOnShoppingLists_ShoppingLists_ShoppingListId",
                table: "ItemOnShoppingLists",
                column: "ShoppingListId",
                principalTable: "ShoppingLists",
                principalColumn: "ShoppingListID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ShoppingLists_Users_UserId",
                table: "ShoppingLists",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemOnShoppingLists_Items_ItemId",
                table: "ItemOnShoppingLists");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemOnShoppingLists_ShoppingLists_ShoppingListId",
                table: "ItemOnShoppingLists");

            migrationBuilder.DropForeignKey(
                name: "FK_ShoppingLists_Users_UserId",
                table: "ShoppingLists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ItemOnShoppingLists",
                table: "ItemOnShoppingLists");

            migrationBuilder.DropColumn(
                name: "CreatedOn",
                table: "ShoppingLists");

            migrationBuilder.DropColumn(
                name: "UpdatedOn",
                table: "ShoppingLists");

            migrationBuilder.DropColumn(
                name: "Measurement",
                table: "ItemOnShoppingLists");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "ShoppingLists",
                newName: "UserID");

            migrationBuilder.RenameIndex(
                name: "IX_ShoppingLists_UserId",
                table: "ShoppingLists",
                newName: "IX_ShoppingLists_UserID");

            migrationBuilder.RenameColumn(
                name: "ItemId",
                table: "ItemOnShoppingLists",
                newName: "ItemID");

            migrationBuilder.RenameColumn(
                name: "ShoppingListId",
                table: "ItemOnShoppingLists",
                newName: "ItemOnShoppingListID");

            migrationBuilder.RenameIndex(
                name: "IX_ItemOnShoppingLists_ItemId",
                table: "ItemOnShoppingLists",
                newName: "IX_ItemOnShoppingLists_ItemID");

            migrationBuilder.AlterColumn<int>(
                name: "UserID",
                table: "ShoppingLists",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<int>(
                name: "ShoppingListID",
                table: "Items",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ItemID",
                table: "ItemOnShoppingLists",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "ItemOnShoppingListID",
                table: "ItemOnShoppingLists",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ItemOnShoppingLists",
                table: "ItemOnShoppingLists",
                column: "ItemOnShoppingListID");

            migrationBuilder.CreateIndex(
                name: "IX_Items_ShoppingListID",
                table: "Items",
                column: "ShoppingListID");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemOnShoppingLists_Items_ItemID",
                table: "ItemOnShoppingLists",
                column: "ItemID",
                principalTable: "Items",
                principalColumn: "ItemID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Items_ShoppingLists_ShoppingListID",
                table: "Items",
                column: "ShoppingListID",
                principalTable: "ShoppingLists",
                principalColumn: "ShoppingListID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ShoppingLists_Users_UserID",
                table: "ShoppingLists",
                column: "UserID",
                principalTable: "Users",
                principalColumn: "UserID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
