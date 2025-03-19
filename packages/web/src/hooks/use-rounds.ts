import { RoundsContext } from "@/contexts/rounds/rounds-context";
import { useContext } from "react";

export function useRounds() {
  const context = useContext(RoundsContext);

  if (!context) {
    throw new Error("useRounds must be used within a RoundsProvider");
  }
  return context;
}