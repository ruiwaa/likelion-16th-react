import S from '../FileUpload.module.css'


interface Props{
  onFileSubmit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>
}
export default function SaveButton({onFileSubmit} :Props) {
  return (
    <button type="submit" className={S.submitButton} onClick={onFileSubmit}>
      저장
    </button>
  )
}
