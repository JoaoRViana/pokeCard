# Aplicativo de Jogo de Cartas Pokémon

Bem-vindo ao Aplicativo de Jogo de Cartas Pokémon! Esta aplicação permite que você desfrute de uma experiência de jogo de cartas virtual com suas cartas Pokémon. Você pode criar, editar e gerenciar decks, participar de duelos e colecionar várias cartas Pokémon.

## Instalação

Para começar com o aplicativo, siga estas etapas:

1. Clone o repositório para sua máquina local usando o seguinte comando:
   ```
   git clone https://github.com/JoaoRViana/pokeCard.git
   ```

2. Navegue até a pasta do projeto:
   ```
   cd pokeCard
   ```  

3. Instale as dependências do projeto usando:
   ```
   npm install
   ```

4. Inicie o aplicativo com o comando:
   ```
   npm run dev
   ```

O aplicativo estará acessível em http://localhost:3000.

## Recursos

### Gerenciamento de Decks

- Criar Decks: Monte seus próprios decks de cartas Pokémon selecionando cartas de sua coleção.
- Editar Decks: Modifique decks existentes adicionando, removendo ou reorganizando cartas.
- Remover Decks: Delete decks que você não precisa mais.

### Sistema de Duelos

- Duelar com Oponentes: Participe de duelos contra oponentes controlados pelo computador.
- Recompensas: Vença um duelo para ganhar 3 cartas Pokémon aleatórias com Valores Individuais (IVs) aleatórios.
- Raridade Shiny: Há uma chance de 2% de receber uma carta Pokémon shiny como recompensa de duelo.


## Integração com API

Este aplicativo utiliza a API pública [PokéAPI](https://pokeapi.co) para obter informações sobre os Pokémons.
