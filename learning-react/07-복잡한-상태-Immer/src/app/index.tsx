// import { DerivedState } from "@/components";
import { ShoppingCart } from "@/practices/ShoppingCart";
import S from "./style.module.css";

export default function App() {
  return (
    <div className={S.container}>
      <ShoppingCart />
    </div>
  );
}
