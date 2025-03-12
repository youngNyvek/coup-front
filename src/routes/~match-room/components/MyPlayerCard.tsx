import { ICard } from "../../../store/interfaces/ICard";
import { IPlayer } from "../../../store/interfaces/IPlayer";

export function MyPlayerCard({ myPlayer, deckPlayer }: { myPlayer: IPlayer | null; deckPlayer: ICard[]; }) {
  return (
    <div className="absolute bottom-0 p-2  flex flex-col items-center border-2 border-slate-500 rounded-md bg-slate-700">
      <div className="bg-slate-600 w-full text-center p-1 mt-2 rounded-md">
        Suas cartas
      </div>
      <p className="text-sm font-bold mb-2">{myPlayer?.nickname}</p>
      <div className="flex gap-1">
        {deckPlayer?.map(card => <CardFaceUp cardName={card.name} />)}
      </div>

      {/* Barra de moedas na base */}
      <div className="bg-slate-600 w-full text-center p-1 mt-2 rounded-md">
        Moedas: {myPlayer?.coins ?? 0}
      </div>
    </div>
  );
}

/** Carta virada para cima */
export function CardFaceUp({cardName} : {cardName: string}) {
  return (
    <div className="w-40 h-50 border-2 border-slate-500 bg-slate-200 text-slate-800 flex items-center justify-center text-base font-bold">
      {cardName}
      ♥
    </div>
  );
}
