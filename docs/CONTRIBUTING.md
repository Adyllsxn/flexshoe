# 🤝 Contribuindo para o FlexShoe

Primeiro, obrigado por considerar contribuir com o FlexShoe! 🎉

## 📋 Índice
- [Como reportar bugs](#como-reportar-bugs)
- [Como sugerir features](#como-sugerir-features)
- [Guia de desenvolvimento](#guia-de-desenvolvimento)
- [Padrões de código](#padrões-de-código)
- [Processo de Pull Request](#processo-de-pull-request)

## 🐛 Como reportar bugs

Abra uma **Issue** com o template de bug report:
- Título claro e descritivo
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots se aplicável
- Ambiente (OS, navegador, versões)

## 💡 Como sugerir features

Abra uma **Issue** com o template de feature request:
- Descrição da funcionalidade
- Motivação/uso
- Alternativas consideradas

## 🛠️ Guia de desenvolvimento

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Docker (opcional)

### Setup local
```bash
# Fork o projeto
# Clone seu fork
git clone https://github.com/Adyllsxn/flexshoe.git

# Entre no diretório
cd flexshoe

# Instale dependências do backend
cd backend && npm install

# Instale dependências do frontend
cd ../frontend && npm install

# Configure variáveis de ambiente
cp .env.example .env

# Rode o projeto
npm run dev
``` 

---

## 📏 Padrões de código
- TypeScript estritamente tipado
- ESLint para linting
- Prettier para formatação
- Commits semânticos:
    - feat: nova funcionalidade
    - fix: correção de bug
    - docs: documentação
    - style: formatação
    - refactor: refatoração
    - test: testes
    - chore: manutenção

## 🔄 Processo de Pull Request
- Fork o repositório
- Crie uma branch (git checkout -b feature/nova-feature)
- Commit suas mudanças (git commit -m 'feat: add nova feature')
- Push para a branch (git push origin feature/nova-feature)
- Abra um Pull Request para main


## Checklist do PR:
- Código segue os padrões
- Testes passam localmente
- Documentação atualizada
- Branch está atualizada com main


## 📄 Licença
> Ao contribuir, você concorda que suas contribuições serão licenciadas sob a licença MIT do projeto.

> Dúvidas? Abra uma issue ou contate os mantenedores.
