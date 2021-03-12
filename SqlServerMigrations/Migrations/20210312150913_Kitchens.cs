using Microsoft.EntityFrameworkCore.Migrations;

namespace SqlServerMigrations.Migrations
{
    public partial class Kitchens : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Kitchens",
                columns: table => new
                {
                    MyKitchenID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: false)
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
                name: "ItemsInKitchens",
                columns: table => new
                {
                    ItemID = table.Column<int>(type: "int", nullable: false),
                    MyKitchenID = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
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

            migrationBuilder.CreateIndex(
                name: "IX_ItemsInKitchens_ItemID",
                table: "ItemsInKitchens",
                column: "ItemID");

            migrationBuilder.CreateIndex(
                name: "IX_Kitchens_UserID",
                table: "Kitchens",
                column: "UserID",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemsInKitchens");

            migrationBuilder.DropTable(
                name: "Kitchens");
        }
    }
}
