// 리스트 렌더링
// 1. 리스트 렌더링 시, 아이템의 key는 형제 간 고유해야 한다. (전역에서는 아님)
// 2. 리스트 렌더링 시, 아이템의 key에 고유한 값을 사용하지 않을 경우 의도치 않는 결과가 발생한다. (index 사용할 경우)
// 3. 복잡한 데이터(중첩 데이터 포함) 리스트 렌더링을 수행해야 할 경우, 웹 표준을 준수하기 위해 Fragment 사용이 필요할 수 있다. 이 경우 <></>로 사용해서는 안된다. 왜냐하면 key 설정이 필요하기 때문이다. <Fragment key={shift.id}>
export { default as SimpleList } from "./SimpleList";
export { default as StaffList } from "./StaffList";

// Key의 정석
export { default as ShiftManager } from "./ShiftManager";
export { default as ScheduleTable } from "./ScheduleTable";

// 컴포넌트 분리
//단일 책임 원칙: 하나의 함수는 하나의 책임을 진다.
export { default as ProductList } from "./ProductList";

// 데이터 필터링
export { default as ProductListWithFilter } from "./ProductListWithFilter";
export { default as StaffListWithFilter } from "./StaffListWithFilter";

// 조건부 UI 렌더링
export { default as StatusList } from "./StatusList";
