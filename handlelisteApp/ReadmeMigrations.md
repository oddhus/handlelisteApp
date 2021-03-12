### Migrations
For å gjennomføre disse kommandoene trenger man https://docs.microsoft.com/en-us/ef/core/cli/dotnet

For å oppdatere Sqlite gjør følgende
- (1) Naviger til handlelisteApp-mappen
- (2) Skriv inn kommandoen: dotnet ef migrations add NavnetPaMigrasjonen --project ../SqliteMigrations -- --provider Sqlite
- (3) Sørg deretter for at "Provider" i appsetting står til "Sqlite".
- (4) Start prosjektet ved å skrive inn: dotnet run. Deretter avslutt kjøringen (her går det sikkert an å bruke dotnet build eller dotnet restore også).
- (5) Naviger til mappen SqliteMigrations og skriv inn: dotnet ef database update --startup-project ../handlelisteApp
- Hvis dette ikke fungerer ta å slett /bin mappen i handlelisteApp, og begynn på punkt 4.


For å oppdatere SqlServer skriv følgende kommando fra handlelisteApp-mappen:
- (1) Naviger til handlelisteApp-mappen
- (2) Skriv inn kommandoen: dotnet ef migrations add NavnetPaMigrasjonen --project ../SqlServerMigrations -- --provider SqlServer
- (3) Sørg deretter for at "Provider" i appsetting står til "SqlServer".
- (4) Start prosjektet ved å skrive inn: dotnet run. Deretter avslutt kjøringen (her går det sikkert an å bruke dotnet build eller dotnet restore også)
- (5) Naviger til mappen SqServerMigrations og skriv inn: dotnet ef database update --startup-project ../handlelisteApp
- Hvis dette ikke fungerer ta å slett /bin mappen i handlelisteApp, og begynn på punkt 4.


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
