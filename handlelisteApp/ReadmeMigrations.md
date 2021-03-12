### Migrations
For å gjennomføre disse kommandoene trenger man https://docs.microsoft.com/en-us/ef/core/cli/dotnet

For å oppdatere Sqlite gjør følgende
- Naviger til handlelisteApp-mappen
- Skriv inn kommandoen: dotnet ef migrations add NavnetPaMigrasjonen --project ../SqliteMigrations -- --provider Sqlite
- Sørg deretter for at "Provider" i appsetting står til "Sqlite".
- Start prosjektet ved å skrive inn: dotnet run. Deretter avslutt kjøringen (her går det sikkert an å bruke dotnet build eller dotnet restore også)
- Skriv inn kommandoen: dotnet ef database update

For å oppdatere SqlServer skriv følgende kommando fra handlelisteApp-mappen:
- Naviger til handlelisteApp-mappen
- Skriv inn kommandoen: dotnet ef migrations add NavnetPaMigrasjonen --project ../SqlServerMigrations -- --provider SqlServer
- Sørg deretter for at "Provider" i appsetting står til "SqlServer".
- Start prosjektet ved å skrive inn: dotnet run. Deretter avslutt kjøringen (her går det sikkert an å bruke dotnet build eller dotnet restore også)
- Skriv inn kommandoen: dotnet ef database update


For å slette en migrasjon
 - dotnet ef migrations remove --project ../SqliteMigrations -- --provider Sqlite
eller
 - dotnet ef migrations remove --project ../SqlServerigrations -- --provider SqlServer




 Visual Studio:
 Åpne kommandolinje, naviger til SqlServerMigrations
 Add migration: dotnet ef migrations add NavnetPaMigrasjonen --startup-project ../handlelisteApp  -- --provider SqlServer
 Oppdatere: dotnet ef database update --startup-project ../handlelisteApp


 Tilsvarende SQlite:
 Add migration: dotnet ef migrations add NavnetPaMigrasjonen --startup-project ../handlelisteApp  -- --provider Sqlite
 Oppdatere: dotnet ef database update --startup-project ../handlelisteApp
