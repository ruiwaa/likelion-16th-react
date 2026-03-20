import S from "../FileUpload.module.css";

interface Props {
  isUpLoading?: boolean;
  isDisabled?: boolean;
}
export default function SaveButton({
  isUpLoading = false,
  isDisabled = false,
}: Props) {
  return (
    <button
      type="submit"
      className={S.submitButton}
      aria-disabled={isDisabled || isUpLoading}
    >
      {isUpLoading ? "저장중 ..." : "저장"}
    </button>
  );
}
