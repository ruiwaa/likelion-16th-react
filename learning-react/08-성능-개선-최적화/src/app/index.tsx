import S from "./style.module.css";
import SmartHomePanel from '@/practices/SmartHomePanel-step-2'
// import GrandFather from "../learns/CompositonRender/parts/GrandFather";
// import Father from "../learns/CompositonRender/parts/Father";
// import Child from "../learns/CompositonRender/parts/Child";

export default function App() {
  return (
    <div className={S.container}>
      <SmartHomePanel />
      {/* <CompositionRender>
        <GrandFather>
          <Father>
            <Child />
          </Father>
        </GrandFather>
      </CompositionRender> */}
    </div>
  );
}
