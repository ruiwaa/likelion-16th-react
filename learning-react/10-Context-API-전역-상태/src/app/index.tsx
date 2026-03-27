import { ContextAdvanced } from "@/_/learns";
import S from "./style.module.css";
import { FamilyProvider } from "@/contexts";
import { AuthProvider } from "@/contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <div className={S.container}>
        <FamilyProvider>
          <ContextAdvanced />
        </FamilyProvider>
      </div>
    </AuthProvider>
  );
}
