import { RolesEnum } from "../enums/RolesEnum";

export const getRoleColor = (role?: RolesEnum) => {
  switch (role) {
    case RolesEnum.Duke: return "bg-yellow-600 hover:bg-yellow-700";
    case RolesEnum.Assassin: return "bg-red-600 hover:bg-red-700";
    case RolesEnum.Ambassador: return "bg-orange-600 hover:bg-orange-700";
    case RolesEnum.Captain: return "bg-purple-600 hover:bg-purple-700";
    case RolesEnum.Countess: return "bg-blue-600 hover:bg-blue-700";
    default: return "btn--teal"; // Ações sem role específica
  }
};
