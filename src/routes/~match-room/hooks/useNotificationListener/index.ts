import { useNotificationHandlers } from "./useNotificationHandlers";
import { IUseActions } from "./interfaces/IUseActions";


export const useNotificationListener = () => {
  const handlers = useNotificationHandlers(); 

  return ({ type, actionEntity }: IUseActions) => {
    const handler = handlers[type];
    if (!handler) {
      console.warn(`No handler found for notification type: ${type}`);
      return;
    }

    handler(actionEntity);
  };
};
