import { useActionDeclaredHandler } from "./useActionDeclared";
import { useChallengeDeclaredHandler } from "./useChallengeDeclared";

export const useNotificationHandlers = () => ({
  ChallengeDeclared: useChallengeDeclaredHandler,
  ActionDeclared: useActionDeclaredHandler,
});