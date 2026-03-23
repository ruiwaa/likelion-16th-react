import { useImmer } from "use-immer";
import S from "./ShoppingCart.module.css";

// 1단계 인터페이스 작성
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  options: {
    amount: number;
    checked: boolean;
  };
}

// 초기값 설정
const INITIAL_CART: CartItem[] = [
  {
    id: "item-1",
    name: "기계식 키보드",
    price: 28100,
    quantity: 1,
    options: {
      amount: 10,
      checked: false,
    },
  },
  {
    id: "item-2",
    name: "게이밍 마우스",
    price: 25300,
    quantity: 1,
    options: {
      amount: 4,
      checked: false,
    },
  },
];

export default function ShoppingCart() {
  // 2단계 상태 선언
  const [cart, setCart] = useImmer(INITIAL_CART);

  // 파생된 상태 (상태에 의존해 렌더링 마다 다시 계산된 값)
  const hasCartItems = cart.length > 0;
  const cartItemCount = cart.length;
  // 체크된 상품 항목을 필터링
  const checkedItems = cart.filter(({ options }) => options.checked);
  const isAllChecked = checkedItems.length === cartItemCount; // 배열 길이 = 총 갯수

  // 누산된 값 = 체크된 모든 상품의 가격 * 수량의 계산된 총금액
  const totalPrice = checkedItems.reduce(
    (total, { price, quantity }) => total + price * quantity,
    0,
  );

  // 4단계 상품 수량 계산 함수
  const updateQuantity = (itemId: CartItem["id"], delta: number) => {
    setCart((draft) => {
      // 전달된 아이템 id와 일치하는 카드 아이템 찾기
      const item = draft.find((item) => item.id === itemId);
      if (item) {
        const nextQuantity = item.quantity + delta;
        // 재고가 1이하로 떨어지지 않게 또는 해당 재고 이상으로 상품을 담지 못하게 하는 방어로직
        item.quantity =
          delta < 0
            ? Math.max(1, nextQuantity)
            : Math.min(item.options.amount, nextQuantity);
      }
    });
  };

  // 4 단계 상품 제거 함수
  const deleteItems = (itemId: CartItem["id"]) => {
    const targetItem = INITIAL_CART.find((item) => item.id === itemId);
    if (confirm(`${targetItem?.name}를(을) 삭제하시겠습니까?`)) {
      setCart((draft) => {
        const index = draft.findIndex((item) => item.id === itemId);
        if (index < 0) return;
        draft.splice(index, 1);
      });
    }
  };

  // 토글 아이템 함수
  const toggleItem = (itemId: CartItem["id"]) => {
    setCart((draft) => {
      const item = draft.find((item) => item.id === itemId);
      if (item) item.options.checked = !item.options.checked;
    });
  };
  // 장바구니 복구 및 비우기 핸들러 함수
  const handleClearCart = () => {
    setCart([]);
  };

  const handleRestoreCart = () => {
    setCart(INITIAL_CART);
  };

  // 전체 선택 및 해제 핸들러 함수
  const handleAllToggleChecked = () => {
    setCart((draft) => {
      draft.forEach((item) => {
        item.options.checked = !isAllChecked;
      });
    });
  };

  return (
    <section className={S.container}>
      <h2 className={S.title}>장바구니 실습</h2>
      {/* 2단계 상태에 따른 컴포넌트 렌더링 */}
      {/* 5단계 조건부 UI 렌더링 (hasItem) */}
      {hasCartItems ? (
        <>
          <header className={S.header}>
            <input
              type="checkbox"
              id="all-checked"
              className={S.checkbox}
              checked={isAllChecked}
              onChange={handleAllToggleChecked}
            />
            <label htmlFor="all-checked">
              전체 선택 (상품 {cartItemCount}개)
            </label>
          </header>
          <ul className={S.itemList}>
            {cart.map(
              ({ id, name, price, quantity, options: { amount, checked } }) => {
                {
                  const isMinDisabled = quantity === 1;
                  const isMaxDisabled = quantity >= amount;
                  return (
                    <li key={id} className={S.item}>
                      <input
                        className={S.checkbox}
                        type="checkbox"
                        id={id}
                        checked={checked}
                        onChange={() => toggleItem(id)}
                      />
                      <label className={S.info} htmlFor={id}>
                        <span className={S.name}>{name}</span>
                        <span className={S.price}>
                          {price.toLocaleString()}원
                        </span>
                      </label>
                      <div className={S.controls}>
                        {/* 3단계 상품 수량 제어 이벤트 연결 */}
                        <button
                          type="button"
                          className={S.button}
                          aria-label={`${name} 수량 감소`}
                          aria-disabled={isMinDisabled}
                          onClick={() => updateQuantity(id, -1)}
                        >
                          -
                        </button>
                        <span className={S.quantity}>{quantity}</span>
                        <button
                          type="button"
                          className={S.button}
                          aria-label={`${name} 수량 증가`}
                          aria-disabled={isMaxDisabled}
                          onClick={() => updateQuantity(id, 1)}
                        >
                          +
                        </button>
                        <button
                          type="button"
                          className={S.deleteButton}
                          aria-label={`장바구니에서 ${name} 삭제`}
                          onClick={() => deleteItems(id)}
                        >
                          삭제
                        </button>
                      </div>
                    </li>
                  );
                }
              },
            )}
          </ul>
          <footer className={S.footer} aria-live="polite">
            <span className={S.totalLabel}>결제 예정 금액</span>
            <output className={S.totalPrice}>
              {totalPrice.toLocaleString()}원
            </output>
          </footer>
        </>
      ) : (
        <p className={S.emptyMessage}>장바구니가 비어 있습니다.</p>
      )}

      {/*5단계 조건부 UI 렌더링  장바구니 복구 및 리셋*/}
      {hasCartItems ? (
        <button
          type="button"
          className={S.transitionButton}
          onClick={handleClearCart}
        >
          장바구니 비우기
        </button>
      ) : (
        <button
          type="button"
          className={S.transitionButton}
          onClick={handleRestoreCart}
        >
          장바구니 복구하기
        </button>
      )}
    </section>
  );
}
