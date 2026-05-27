#!/bin/bash

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Iniciando FlexShoe com Docker...${NC}"

# Verificar se docker está instalado
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker não está instalado${NC}"
    exit 1
fi

# Verificar se docker-compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose não está instalado${NC}"
    exit 1
fi

# Construir e subir containers
echo -e "${BLUE}📦 Construindo imagens...${NC}"
docker-compose build

echo -e "${BLUE}🐳 Subindo containers...${NC}"
docker-compose up -d

# Aguardar backend ficar pronto
echo -e "${BLUE}⏳ Aguardando backend ficar pronto...${NC}"
sleep 10

# Verificar status
echo -e "${BLUE}📊 Status dos containers:${NC}"
docker-compose ps

echo -e "${GREEN}✅ FlexShoe rodando!${NC}"
echo -e "${GREEN}📍 Backend: http://localhost:3001${NC}"
echo -e "${GREEN}📍 Frontend: http://localhost:3000${NC}"
echo -e "${GREEN}📍 Swagger: http://localhost:3001/api-docs${NC}"
echo -e "${GREEN}📍 PostgreSQL: localhost:5432${NC}"

echo -e "\n${BLUE}Comandos úteis:${NC}"
echo "  docker-compose logs -f     # Ver logs"
echo "  docker-compose down        # Parar containers"
echo "  docker-compose restart     # Reiniciar"
echo "  docker-compose exec backend sh  # Acessar backend"