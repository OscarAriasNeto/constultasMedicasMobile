📱 Sistema de Agendamento de Consultas Médicas

Aplicativo mobile desenvolvido em React Native com TypeScript, que facilita o agendamento e gerenciamento de consultas médicas de maneira simples, rápida e acessível.

🚀 Sobre o Projeto

O objetivo deste app é oferecer uma experiência prática para pacientes que precisam marcar consultas.
Com ele, é possível visualizar médicos disponíveis, escolher horários, agendar compromissos e gerenciar consultas já marcadas, tudo em uma interface amigável.

✨ Funcionalidades

Listagem de médicos por especialidade

Agendamento de novas consultas

Visualização, edição e cancelamento de consultas existentes

Validação de datas e horários

Interface moderna e responsiva

Armazenamento local de dados com persistência

Suporte a modo claro/escuro

🛠️ Tecnologias Utilizadas

React Native – Desenvolvimento mobile multiplataforma

TypeScript – Tipagem estática para maior segurança

React Navigation – Navegação entre telas

Styled Components – Estilização dinâmica com CSS-in-JS

AsyncStorage – Armazenamento local

React Native Elements – Componentes prontos de UI

📦 Pré-requisitos

Certifique-se de ter instalado em sua máquina:

Node.js (v14+)

npm ou yarn

React Native CLI

Android Studio (para Android)

Xcode (para iOS, em macOS)

⚙️ Instalação
# Clone o repositório
git clone https://github.com/seu-usuario/marcacaoDeConsultasMedicas.git
cd marcacaoDeConsultasMedicas

# Instale as dependências
npm install
# ou
yarn install

# (apenas em macOS) Instale as dependências do iOS
cd ios && pod install && cd ..

# Inicie o app
# Android
npm run android
# iOS (macOS)
npm run ios

📂 Estrutura do Projeto
src/
├── components/         # Componentes reutilizáveis
│   ├── Header/         
│   └── AppointmentForm/
├── screens/            # Telas principais
│   ├── HomeScreen.tsx
│   └── CreateAppointmentScreen.tsx
├── styles/             # Estilos globais e tema
│   └── theme.ts
├── types/              # Tipagens TypeScript
├── utils/              # Funções auxiliares

📜 Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

👨‍🏫 Autor

Professor Hete Caetano – hete.caetano@fiap.com.br
Oscar Arias Neto

Agradecimentos especiais à React Native Community, React Navigation, Styled Components e a todos os colaboradores.
