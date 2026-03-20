import React, { useRef, useState } from "react";
import S from "./TodosCRUD.module.css";
import type { Todo } from "./type";

// --------------------------------------------------------------
// 실습 가이드
// --------------------------------------------------------------
// - [Create, 생성] 새로운 할 일 추가, 생성 날짜 설정
//    - `id` 값은 `Date.now()`로 설정
//    - `createdAt` 값은 `new Date.toISOString()`로 설정
// - [Read, 조회] 할 일 목록 데이터를 읽어 상태 선언
// - [Update, 수정] 선택된 할 일 완료 여부 토글(toggle), 업데이트 날짜 수정
//    - `updatedAt` 값은 `new Date.toISOString()`로 설정
// - [Delete, 삭제] 선택된 할 일 삭제
// - [Formatting, 형식 변환] 완료 날짜 포맷팅 (예: '2026년 3월 20일')
// - [A11y, 접근성] 초점 이동, 버튼 비활성화 등 사용자 경험 향상 고려 -> ref 사용
// --------------------------------------------------------------

const INITIAL_TODOS: Todo[] = [
  {
    id: "todo-1773533484499",
    text: "중첩된 객체 합성",
    done: false,
    metadata: {
      createdAt: "2026-03-18T17:12:41.964Z",
      updatedAt: null,
    },
  },
  {
    id: "todo-1773533492567",
    text: "전개 연산자 사용 힘들어! 😭",
    done: false,
    metadata: {
      createdAt: "2026-03-19T21:06:47.985Z",
      updatedAt: null,
    },
  },
];

export default function NestedObject() {
  // 할일 목록(상태)
  const [todos, setTodos] = useState(INITIAL_TODOS);
  // 할 일을 뒤집는 목록(파생된 상태: 상태가 변경되면 렌더링 중에 다시 계산된 값)
  const reversedTodos = todos.toReversed(); //원본 복사하여 반대로 정렬

  // [방법 2] 리액트 제어 방식으로 접근성 조작
  const [doit, setDoit] = useState("");

  // 파생된 상태
  const addIsDisabled = 1 > doit.trim().length;
  const handleChangeDoit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDoit(value);
  };
  // input 컴포넌트 참조 (DOM 접근/ 조작)
  const doItInputRef = useRef<HTMLInputElement>(null);

  // 방법1 비제어 방식
  const addButtonRef = useRef<HTMLButtonElement>(null);
  // 생성
  const addTodo = (doit: Todo["text"]) => {
    // 새로운 할일 객체
    const newTodo: Todo = {
      id: `todo-${Date.now()}`,
      text: doit,
      done: false,
      metadata: {
        createdAt: new Date().toISOString(),
        updatedAt: null,
      },
    };

    // 실행 시점의 최신값을 넘겨줌(상태 업데이트)
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 폼데이터 생성
    const formData = new FormData(e.currentTarget);
    const doit = formData.get("doit") as string; // 타입 단언

    // input에 값이 입력되어있을 때만 추가(유효성 검사)
    if (doit && doit.trim().length > 0) {
      addTodo(doit);

      // 할 일 입력 필드 초기화
      const doItInput = doItInputRef.current;
      if (doItInput) {
        doItInput.value = "";
        doItInput.focus();
      }
    }
  };

  return (
    <section className={S.container} aria-labelledby="todos-title">
      <header className={S.header}>
        <h2 id="todos-title" className={S.title}>
          객체/배열 <abbr title="Create Read Update Delete">CRUD</abbr> 실습
        </h2>

        <form className={S.form} onSubmit={handleSubmit}>
          <input
            // 방법 1 비제어 방식
            // ref={doItInputRef}
            // onInput={(e) => {
            //   const doit = e.currentTarget.value;
            //   const addButton = addButtonRef.current;
            //   // 조건문
            //   if (doit.trim().length > 0) {
            //     addButton?.setAttribute("aria-disabled", "false");
            //   } else addButton?.setAttribute("aria-disabled", "true");
            // }}
            value={doit}
            onChange={handleChangeDoit}
            type="text"
            name="doit"
            className={S.input}
            aria-label="할 일"
            placeholder="오늘 할 일 입력"
          />
          <button
            ref={addButtonRef}
            type="submit"
            className={S.buttonAdd}
            // 방법 1 비제어 방식
            // aria-disabled="true"

            //방법 2 리액트 제어 방식
            aria-disabled={addIsDisabled}
          >
            추가
          </button>
        </form>
      </header>

      <ul className={S.list} aria-label="할 일 목록">
        {reversedTodos.map((todo) => {
          const todoTextClassName =
            `${S.text} ${todo.done ? S.completed : ""}`.trim();
          const { createdAt, updatedAt } = todo.metadata;

          return (
            <li key={todo.id} className={S.item}>
              <span className={todoTextClassName}>
                {todo.text}
                <span className="sr-only">
                  {!todo.done ? `${createdAt} 생성` : `${updatedAt} 완료`}
                </span>
              </span>
              <div className={S.buttonGroup}>
                <button
                  type="button"
                  className={S.buttonToggle}
                  aria-pressed={todo.done}
                >
                  {todo.done ? "취소" : "완료"}
                </button>
                <button
                  type="button"
                  className={S.buttonDelete}
                  aria-label={`${todo.text} 삭제`}
                >
                  삭제
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {todos.length === 0 && (
        <p className={S.empty}>할 일 목록이 비어 있습니다.</p>
      )}
    </section>
  );
}
