// createValidator 함수 정의
// - 유효성 검사 함수를 생성
export function createValidator(
  requiredMessage: string,
  customValidator: (value: string) => string,
) {
  return function validate(value: string, isTouched: boolean): readonly [string, boolean] {
    if (!isTouched) return ['', false] 
    if (!value) return [requiredMessage, true]
    const error = customValidator(value)
    const showError = error !== ''
    return [error, showError]
  }
}
