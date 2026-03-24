import { useEffect, useState, createElement } from "react";
import GrandFather from "./parts/GrandFather";
import S from "./style.module.css";
import { formatTime } from "./util/formatTime";

const getCurrentDate = () => new Date();
export default function DeepRender() {
  const [time, setTime] = useState(getCurrentDate);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const [count, setCount] = useState(0);

  return (
    <div className={S.container}>
      <section className={S.timerSection}>
        <h2 className={S.title}>현재 시간</h2>
        <time dateTime={time.toISOString()} className={S.timeDisplay}>
          {formatTime(time)}
        </time>
      </section>

      <div className={S.counterSection}>
        {/* 매번 렌더링 할 때마다 리액트 엘리먼트(객체) 생성 (렌더링 될 때마다 다른 참조이기때문)*/}
        {createElement(GrandFather, { count, setCount })}
        {/* <GrandFather count={count} setCount={setCount} /> */}
      </div>
    </div>
  );
}
