<div align="center">

<img src="assets/images/icon.png" width="96" alt="Ícone do Ford Retain">

# Ford Retain

Saúde do veículo, avisos preventivos e revisão agendada na rede Ford, no celular do cliente.

![Expo SDK 57](https://img.shields.io/badge/Expo_SDK-57-00095B?style=flat-square&logo=expo&logoColor=white)
![React Native 0.86](https://img.shields.io/badge/React_Native-0.86-00095B?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-00095B?style=flat-square&logo=typescript&logoColor=white)
![Android](https://img.shields.io/badge/Android-APK-00095B?style=flat-square&logo=android&logoColor=white)

**[Baixar o APK](https://expo.dev/accounts/vitoreskes/projects/ford-retain/builds/36100d03-3e59-4676-a772-e97e47fdd6d1)** · [Telas](#telas) · [Design System](#design-system) · [Arquitetura](#arquitetura-e-decisões-técnicas)

</div>

## Sobre o projeto

Projeto da disciplina **Mobile Development & IoT** (Engenharia de Software, 3º
ano, FIAP) no desafio Ford x FIAP. Esta versão corresponde à **Sprint 3: versão
final do app com Design System**.

| Integrante         | RM       |
| ------------------ | -------- |
| Gustavo Morais     | RM554972 |
| Leonardo Scarpitta | RM555460 |
| Murilo Justi       | RM554512 |
| Vitor Eskes        | RM555137 |

## Download e instalação

O APK é gerado pelo Expo EAS Build e fica disponível na
**[página do build no Expo](https://expo.dev/accounts/vitoreskes/projects/ford-retain/builds/36100d03-3e59-4676-a772-e97e47fdd6d1)**.

1. Abra o link no aparelho Android e toque em **Install**, ou escaneie pelo
   celular o QR code exibido na página.
2. Autorize a instalação de apps de fontes desconhecidas quando o Android pedir.
3. Abra o app, toque em **Conectar meu Ford** e informe uma placa válida, antiga
   (`ABC-1234`) ou Mercosul (`ABC-1D23`).

A placa `AAA-0000` simula uma falha de conexão, para demonstrar o estado de erro.

## O desafio e a solução

Depois do fim da garantia, boa parte dos donos de veículos Ford deixa de fazer a
manutenção na rede de concessionárias. O cliente só descobre o estado do carro
quando algo quebra, não tem clareza sobre o preço da revisão e acaba na oficina
independente. A rede perde o relacionamento de pós-venda, e o cliente perde o
histórico oficial que valoriza o carro na revenda.

O Ford Retain transforma os dados que o próprio veículo produz em um laudo
compreensível e em uma ação simples:

- **Saúde em linguagem direta:** cada componente tem uma nota de 0 a 100, que
  compõe a saúde de cada sistema e a saúde geral, com a variação da semana.
- **Aviso antes do problema:** o assistente Ford Assist explica o risco de adiar
  e quanto custa resolver agora em comparação com depois.
- **Revisão com preço fechado:** orçamento com peças originais e mão de obra, e
  concessionária sugerida pelo menor desvio da rota diária.
- **Histórico que vale dinheiro:** as revisões feitas na rede ficam registradas
  e o app mostra o ganho estimado na revenda.

## Funcionalidades

| Área | O que o app faz |
| --- | --- |
| Conexão | Placa com máscara e validação (antiga e Mercosul), sessão criptografada e rotas protegidas |
| Início | Orbe de saúde geral, quatro sistemas com nota e tendência, recomendação do Ford Assist, cartão de procedência com compartilhamento nativo, novidades e central de avisos |
| Sistema | Componentes com nota, barra de vida útil, medida lida e explicação do risco |
| Ford Assist | Mensagens proativas, perguntas sugeridas, campo livre, indicador de digitação e respostas com atalho para a tela certa |
| Revisão | Orçamento detalhado, custo de adiar, três concessionárias por desvio, horários livres, confirmação e remarcação |
| Perfil | Dados do veículo, selo de procedência, histórico na rede, ajustes e desconexão |

## Telas

<table>
  <tr>
    <td align="center"><img src="docs/screens/01-welcome.png" width="240" alt="Abertura"><br><sub>Abertura</sub></td>
    <td align="center"><img src="docs/screens/02-connect.png" width="240" alt="Conexão pela placa"><br><sub>Conexão pela placa</sub></td>
    <td align="center"><img src="docs/screens/03-connect-error.png" width="240" alt="Erro de conexão"><br><sub>Erro de conexão</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screens/04-home.png" width="240" alt="Início"><br><sub>Início</sub></td>
    <td align="center"><img src="docs/screens/05-home-news.png" width="240" alt="Procedência e novidades"><br><sub>Procedência e novidades</sub></td>
    <td align="center"><img src="docs/screens/06-notifications.png" width="240" alt="Avisos"><br><sub>Avisos</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screens/07-system.png" width="240" alt="Detalhe do sistema"><br><sub>Detalhe do sistema</sub></td>
    <td align="center"><img src="docs/screens/08-news.png" width="240" alt="Detalhe da novidade"><br><sub>Detalhe da novidade</sub></td>
    <td align="center"><img src="docs/screens/09-assistant.png" width="240" alt="Ford Assist"><br><sub>Ford Assist</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screens/10-assistant-reply.png" width="240" alt="Resposta do assistente"><br><sub>Resposta do assistente</sub></td>
    <td align="center"><img src="docs/screens/11-service.png" width="240" alt="Orçamento da revisão"><br><sub>Orçamento da revisão</sub></td>
    <td align="center"><img src="docs/screens/12-service-slots.png" width="240" alt="Concessionária e horário"><br><sub>Concessionária e horário</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screens/13-booking-sheet.png" width="240" alt="Confirmação"><br><sub>Confirmação</sub></td>
    <td align="center"><img src="docs/screens/14-booking-done.png" width="240" alt="Visita marcada"><br><sub>Visita marcada</sub></td>
    <td align="center"><img src="docs/screens/15-service-booked.png" width="240" alt="Revisão agendada"><br><sub>Revisão agendada</sub></td>
  </tr>
  <tr>
    <td align="center"><img src="docs/screens/16-profile.png" width="240" alt="Perfil"><br><sub>Perfil</sub></td>
    <td align="center"><img src="docs/screens/17-profile-settings.png" width="240" alt="Histórico e ajustes"><br><sub>Histórico e ajustes</sub></td>
    <td></td>
  </tr>
</table>

## Design System

Toda a identidade visual sai de tokens definidos em um único lugar e é aplicada
por componentes reutilizáveis: nenhuma tela declara cor, fonte ou medida própria.

**Cores.** Definidas em `global.css` (consumidas pelo NativeWind) e espelhadas
em `src/theme/colors.ts` para ícones e SVG.

| Token | Valor | Uso |
| --- | --- | --- |
| `primary` | `#00095B` | Ford Blue: ações principais e marca |
| `accent` | `#0562D2` | Links, seleção e destaques |
| `background` / `card` | `#F2F3F6` / `#FFFFFF` | Fundo das telas e superfícies |
| `foreground` / `muted-foreground` | `#101430` / `#5B6172` | Texto principal e de apoio |
| `positive` / `warning` / `negative` | `#097A3C` / `#A84700` / `#C42B10` | Em dia, atenção e urgente |

O status nunca depende só da cor: sempre vem acompanhado de ícone e rótulo.

**Tipografia.** Archivo (Regular, Medium e SemiBold), embarcada no app, com
escala única exposta pelo componente `Text`: nota 30, título de tela 24, título
20, subtítulo 16, corpo 15, apoio 13 e legenda 11. O texto acompanha a fonte do
sistema até 1,3 vez o tamanho base.

**Espaçamento.** Margem lateral 16, seções 18, itens 8, cartões com padding 16 e
raio 20. As medidas partem de um frame de 393 pt e são reduzidas
proporcionalmente em telas estreitas.

**Componentes.** `Text`, `Button` (primary, secondary, outline e ghost),
`Card`, `Sheet`, `PressableScale`, `IconDisc`, `Avatar`, `SectionHeader`,
`QueryState`, `Screen`, `ScreenHeader` e a `TabBar` flutuante com indicador
animado.

**Estados de interação.**

| Estado | Onde aparece |
| --- | --- |
| Carregando | Blocos que dependem do laudo, botões de conexão, agendamento e desconexão, digitação do assistente |
| Erro | Laudo indisponível com nova tentativa, placa não encontrada, horário indisponível, erro global e rota inexistente |
| Vazio | Central de avisos sem itens; agendamento bloqueado até a escolha de um horário |
| Sucesso | Confirmação animada da visita e retorno háptico na conexão e no agendamento |

## Arquitetura e decisões técnicas

| Camada | Tecnologia |
| --- | --- |
| Plataforma | Expo SDK 57, React Native 0.86, React 19.2, TypeScript em modo estrito |
| Navegação | Expo Router com rotas tipadas e grupos público e privado |
| Estilo | NativeWind 4 (Tailwind CSS) com tokens em CSS |
| Estado e dados | Zustand para estado do app, TanStack Query para dados do servidor |
| Nativo | Reanimated 4, React Native SVG, Expo Secure Store, Expo Haptics |
| Qualidade e build | Biome, Expo EAS Build |

- **Organização por funcionalidade.** Cada domínio (`auth`, `vehicle`, `home`,
  `assistant`, `service`, `news`, `notifications`, `profile`) reúne telas,
  hooks, dados, stores e serviços. Os arquivos em `app/` apenas declaram rotas.
- **Serviços com duas implementações.** Cada serviço tem uma interface, uma
  versão simulada e uma versão HTTP. A variável `EXPO_PUBLIC_API_URL` escolhe
  qual usar: sem ela o app roda com dados simulados; com ela, consome a API sem
  mudar nenhuma tela.
- **Uma fonte para o laudo.** O TanStack Query mantém o laudo em cache
  compartilhado, então home, detalhe, perfil e assistente mostram os mesmos
  números a partir de uma única requisição.
- **Regras de saúde centralizadas.** `src/features/vehicle/health.ts` concentra
  as contas: abaixo de 40 é urgente, abaixo de 75 pede atenção; a nota do
  sistema é a média dos componentes e o status é o pior entre eles.
- **Sessão segura.** A sessão fica no Keystore/Keychain e é restaurada antes da
  primeira decisão de rota, com a tela de abertura nativa cobrindo o intervalo.
- **Resiliência e acessibilidade.** `ErrorBoundary` global, falhas de
  armazenamento que não travam o app, rótulos e papéis de acessibilidade e
  respeito à escala de fonte do sistema.

```
app/                 rotas: (public) abertura e placa, (private) abas e telas de pilha
src/components/      Design System: ui/, layout/ e brand/
src/features/        auth, vehicle, home, assistant, service, news, notifications, profile
src/services/        cliente HTTP e armazenamento seguro
src/theme/           cores, fontes, medidas, escala e degradês
```

## Como executar

Requer Node.js 20.19.4 ou superior e pnpm 10.

```bash
pnpm install
pnpm start                                        # Expo Go ou emulador Android
pnpm check                                        # tipos (tsc) e lint (Biome)
eas build --platform android --profile preview    # gera o APK
```

Para usar uma API real, copie `.env.example` para `.env` e preencha
`EXPO_PUBLIC_API_URL`.

## Entregas da Sprint 3

- **Design System consolidado:** tokens de cor, tipografia e espaçamento,
  componentes reutilizáveis e estados de interação padronizados em todas as telas.
- **Identidade no aparelho:** ícone do app, ícone adaptativo com versão
  monocromática e tela de abertura nativa com a marca.
- **APK de release validado** em emulador Android 15, percorrendo todos os fluxos.
- **Correções encontradas no teste do APK:** encerramento do app ao abrir o
  indicador de digitação do assistente, teclado cobrindo o botão de conexão e o
  campo do chat, textos cortados por arredondamento de largura no Android e
  resposta errada do assistente para a pergunta sobre revenda.

## Próximos passos

- Integrar o laudo aos dados reais de veículos conectados Ford, usando a camada
  HTTP já existente.
- Trocar as respostas por regras do Ford Assist por um modelo de linguagem que
  leia o laudo completo.
- Enviar os avisos proativos como notificações push.
- Consultar a agenda real das concessionárias e exibir a rota em mapa.
- Adicionar testes automatizados das regras de saúde, da agenda e dos fluxos
  principais.
