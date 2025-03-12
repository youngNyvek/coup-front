import { useModalStore } from "../../../store/modalStore";
import { getRoleColor } from "../../../utils/getRoleColor";

export default function ActionModal() {
  const { isOpen, position, actions, onSelect, closeModal } = useModalStore();

  if (!isOpen) return null;

  return (
    <div
      id="global-action-modal"
      className="absolute bg-slate-800 border border-slate-500 p-2 rounded-md shadow-lg text-white z-50"
      style={{
        top: position.y,
        left: position.x,
        transform: "translate(-50%, -100%)", // Centraliza e coloca acima do clique
      }}
    >
      <h3 className="text-xs">Ações</h3>
      <div className="flex mt-2 gap-1">
        {actions.map((action) => (
          <button
            key={action.name}
            onClick={() => {
              if (onSelect) onSelect(action);
              closeModal();
            }}
            className={`btn text-xs ${getRoleColor(action.role)}`}
          >
            {action.displayName}
          </button>
        ))}
      </div>
      {/* Seta apontando para o item clicado */}
      <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-slate-500 transform -translate-x-1/2"></div>
    </div>
  );
}

export function ActionModalContainedOverlay(){
  const { closeModal } = useModalStore();
  return (
     <div onClick={closeModal} className="absolute z-0 w-full h-full bg-red-600 opacity-0"/>
  );
}