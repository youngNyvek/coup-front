export enum GamePhaseEnum {
  WaitingToStart,
  WaitingForAction,       // Jogador atual precisa escolher uma ação
  WaitingForBlockOrPass,  // Ação declarada, agora outros jogadores podem bloquear ou contestar
  WaitingForChallengeOrPass, // Caso de bloqueio, jogador pode contestar ou aceitar
  ResolveAction,          // Executa o resultado final da ação
  EndTurn
}