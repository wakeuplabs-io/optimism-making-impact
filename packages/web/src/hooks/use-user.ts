import { UserContext } from "@/contexts/user/user-context";
import { useContext } from "react";

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useChains must be used within a ChainsProvider");
  }
  return context;
}