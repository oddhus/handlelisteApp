### Migrations
For å oppdatere Sqlite gjør følgende
- Naviger til handlelisteApp-mappen
- Skriv inn kommandoen: dotnet ef migrations add NavnetPaMigrasjonen --project ../SqliteMigrations -- --provider Sqlite
- Sørg deretter for at "Provider" i appsetting står til "Sqlite".
- Skriv inn kommandoen: dotnet ef database update

For å oppdatere SqlServer skriv følgende kommando fra handlelisteApp-mappen:
- Naviger til handlelisteApp-mappen
- Skriv inn kommandoen: dotnet ef migrations add NavnetPaMigrasjonen --project ../SqlServerMigrations -- --provider SqlServer
- Sørg deretter for at "Provider" i appsetting står til "SqlServer".
- Skriv inn kommandoen: dotnet ef database update

