.PHONY: run
run:
	@echo "🚀 Rodando Aquasmart Aspire AppHost..."
	dotnet run --project src/orchestration/aspire/Aquasmart.AppHost/Aquasmart.AppHost.csproj

.PHONY: build
build:
	dotnet build

.PHONY: restore
restore:
	dotnet restore

.PHONY: clean
clean:
	dotnet clean

.PHONY: test
test:
	dotnet test