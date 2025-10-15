# DinoCare · Sistema de Agendamento de Consultas Médicas

👨‍🏫 **Autores**  
Oscar Arias Neto - RM556936  
Julia Rebelles - RM554516  
Nicolas Souza - RM555571

## 🎨 Identidade Visual
A nova identidade "**DinoCare**" entrega uma experiência lúdica, profissional e acolhedora para pacientes e profissionais.

| Token     | Cor       | Hex      |
|-----------|-----------|----------|
| Primária  | Verde Dino| `#3CA65B`|
| Secundária| Verde Claro| `#88D498`|
| Acento    | Amarelo Amigável | `#F2C94C` |
| Fundo     | Neve Suave| `#F9F9F9`|
| Texto     | Cinza Profissional| `#333333`|
| Erro      | Vermelho Cuidado | `#E63946` |
| Sucesso   | Verde Confiante | `#2ECC71` |

## 📸 Capturas de Tela
As prévias abaixo são representações vetoriais em PNG da experiência DinoCare, embutidas via *data URI* para evitar arquivos binários no repositório.

![Tela de Login DinoCare](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAACWCAYAAACb3McZAAACAUlEQVR42u3cQQ2DMACGUeRMxCTgAENImAK8cEdDBezWE3Dk0ATCWCjt+5PPQMm7bJSmnz6zpHSNQ5AAkQCRAJEAkQCRAJEA0WW9h845AKItiL2cEyBggAKIzuOABBA4IAEEjg4SQPRPHJAAAggggMABCSACBBABAogAAeTX1r2kuwJEAkQCRAJEAkT+SfcrlgABRN7mFSDugwgQNwoFiDvpAsRXTQSIfBcLEAkQCRAJEAkQByEBIgEiXQskxjhLSgeIBIgEiASIBIgEiASIBIgEiASIBIgEiASIJEAkQCRAJECkRwJxX0BPCBApZyBmOQ4QM0DMADEDxAwQM0AAMUAAMUDuAhJCkA4HiAQIIAIEEAECiAABRIAAIkAAESCACBBABAggEiASIIAIEEAECCACxH0Qcx8EEAMEEAMEEDNAzAAxA8QMEDNAADFAADFAvGoir5oAIkAAESCACBBAJEAkQAARIIAIEEAECCACBBABAogAAUSAACJAAJEAMXMfxAwQQAwQQAwQQAwQQA7vO7ZVBQgggAACCCCAAAIIIIAAAggggAACCCCAAAIIIICkgZRYbUBKfpaAAAJIjkBKrjYgnjkggAACCCCAAAIIIIAAAgggEiASIBIgEiCSAJEAkQCRAJEAkQCRAJEAkQCRAJEEiASIBIgEiASIBIgEiASIBIgkQKSdFpaFAtmPs8L3AAAAAElFTkSuQmCC)

![Tela de Cadastro DinoCare](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAACWCAYAAACb3McZAAACGElEQVR42u3bwQ2CQBCGUSqyAkqgA6uwKXoxoY4twNue4MphiAksyuj7k68B9F3Q6frxPkuK6zwECRAJEAkQCRAJEAkQCRA16/UcPAdAtAbxLs8JEDBAAUT7cUACCByQAALHAAkgOhMHJIAAAgggcEACiAABRIAAIkAAUR4ckAACCRyAAAIIIIAAAogAAUR+SQdEgAgQ/+YVIO5BBIiLQgHiJl2AgAIGINoG4zkAIgEiASIBIgEiCRAJEKkNkFrrLCkOEAkQCRAJEAkQCRAJEAkQCRAJkOP5e4K+GSDSLwAx++QAMQPEDBAzQMwAAcQAAcQAAcQAuTqQUooECCACBBABAogAAUSAACJAABEggAgQQAQIIAIEEEAECCACBBABAogAAUSAuAcx9yCAGCCAGCCAmAFiBoi3WPIWCxABAogAAUSAACJAABEggAgQQAQIIAIEEEAECCACBBABAogAAUSAACJA3IOYexBADBBAzAAxA8QMEG+x5C0WIAIEEAECiAABRIAAIkAAESCACBBAABEggAgQQAQIIAIEEAECiAABRIC4BzH3IICYAWIGyEV2mx4KAgQQQAABBBBAAAEEEEAAAQQQQAABBBBAAAEEEEAAAQQQQAABpCWQTMEQl/GzBAQQQDIDyRgMcb4bgAACCCCAAAKIBIgEiASIBIgEiASIBIgkQCRAJEAkQCRAJEAkQCRAJECkv28BG0mUZYpDO/IAAAAASUVORK5CYII=)

## 📱 Sobre o Projeto
Aplicativo mobile desenvolvido em React Native com TypeScript que facilita o agendamento e gerenciamento de consultas médicas de maneira simples, rápida e acessível.

### ✨ Funcionalidades Principais
- Listagem de médicos por especialidade
- Agendamento e gerenciamento de consultas
- Feedback visual de carregamento e mensagens
- Validação de datas e horários
- Persistência de dados local
- Interface responsiva com tema DinoCare

## 🛠️ Tecnologias Utilizadas
- **Expo + React Native** – desenvolvimento mobile multiplataforma
- **TypeScript** – tipagem estática para maior segurança
- **React Navigation** – navegação entre telas
- **Styled Components** – estilização dinâmica
- **AsyncStorage** – armazenamento local
- **React Native Elements/RNE UI** – componentes de apoio

## 🚀 Como Executar
1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/marcacaoDeConsultasMedicas.git
   cd marcacaoDeConsultasMedicas
   ```
2. **Instale as dependências**
   ```bash
   npm install
   ```
3. **Inicie o projeto**
   ```bash
   npm start
   ```
4. **Execute**
   - Android: `npm run android`
   - iOS (macOS): `npm run ios`
   - Web: `npm run web`

> 💡 Para melhor visualização utilize o aplicativo **Expo Go** no seu dispositivo ou um emulador configurado.

## 📂 Estrutura do Projeto
```
src/
├── components/         # Componentes reutilizáveis
│   ├── Button.tsx
│   ├── TextInput.tsx
│   └── Toast.tsx
├── screens/            # Telas principais
│   ├── HomeScreen/
│   ├── LoginScreen.tsx
│   └── RegisterScreen.tsx
├── styles/             # Estilos globais e tema
│   └── theme.ts
├── types/              # Tipagens TypeScript
├── utils/              # Funções auxiliares
```

## 📜 Licença
Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

Agradecimentos especiais à comunidade React Native, React Navigation, Styled Components e a todos os colaboradores.
