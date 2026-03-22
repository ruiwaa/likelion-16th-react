import React, { useRef, useState } from "react";
import S from "./TodosCRUD.module.css";
import type { Todo } from "./type";
import { formatDate } from "../utils";

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
const getISOString = () => new Date().toISOString();
const DEBOUNCE_TIME = 300;

export default function NestedObject() {
  // 할일 목록(상태)
  const [todos, setTodos] = useState(INITIAL_TODOS);

  // 할 일을 뒤집는 목록(파생된 상태: 상태가 변경되면 렌더링 중에 다시 계산된 값)
  const reversedTodos = todos.toReversed(); //원본 복사하여 반대로 정렬

  // [방법 2] 리액트 제어 방식으로 접근성 조작
  const [doit, setDoit] = useState("");

  // 파생된 상태
  const addIsDisabled = 1 > doit.trim().length;

  // 리액트 렌더링 프로세스와 무관하게 특정 값을 기억해야한다.
  // useRef 사용
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleChangeDoit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const timeoutId = timeoutIdRef.current;
    //  timeoutId.current이 null이 아닌 경우에만
    // 사용자가 입력할 때마다 설정된 타이머 해제
    if (timeoutId) clearTimeout(timeoutId);

    //특정 시간이 지난 후 지연되어 처리되는 상태 업데이트
    timeoutIdRef.current = setTimeout(() => {
      setDoit(value);
    }, DEBOUNCE_TIME);
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
        createdAt: getISOString(),
        updatedAt: null,
      },
    };

    // 실행 시점의 최신값을 넘겨줌(상태 업데이트)
    setTodos((prev) => [...prev, newTodo]);
  };

  // 할 일 수정(Update)
  const updateTodo = (todoId: Todo["id"]) =>
    setTodos(
      todos.map((todo) =>
        todo.id !== todoId
          ? todo
          : {
              ...todo,
              done: !todo.done,
              metadata: {
                ...todo.metadata,
                updatedAt: getISOString(),
              },
            },
      ),
    );

  // 할 일 삭제
  const deleteTodo = (todoId: Todo["id"]) => {
    if (confirm("정말로 할 일을 삭제하시겠습니까?")) {
      // filter 메서드를 사용하는 이유
      // filter 안에 조건이 '참'인 인자들만 남기기때문에
      // 해당 todo.id 와 같지 않다면, 그 인자들을 통과시켜버림
      // 통과 = 삭제
      const nextTodos = todos.filter((todo) => todo.id !== todoId);
      // if(todo.id === todoId) {return true}
      // else return false
      // 위의 filter 메서드 구문과 같은 맥락

      setTodos(nextTodos);
    }
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
            defaultValue={doit}
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
                  {!todo.done
                    ? `${formatDate(createdAt)} 생성`
                    : `${updatedAt} 완료`}
                </span>
              </span>
              <div className={S.buttonGroup}>
                <button
                  type="button"
                  className={S.buttonToggle}
                  aria-pressed={todo.done}
                  onClick={() => updateTodo(todo.id)}
                >
                  {todo.done ? "취소" : "완료"}
                </button>
                <button
                  type="button"
                  className={S.buttonDelete}
                  aria-label={`${todo.text} 삭제`}
                  onClick={() => deleteTodo(todo.id)}
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
