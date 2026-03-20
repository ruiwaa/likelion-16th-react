import S from '../FileUpload.module.css'
import { CloseIcon, UploadIcon } from './SvgIcon'

interface Props {
  ref: React.RefObject<HTMLInputElement | null>
  previewUrl:string
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDeleteFile :() => void
}

// ---------------------------------------------------------------------
// 실습 가이드
// ---------------------------------------------------------------------
// 1.
// ---------------------------------------------------------------------

export default function FileUploadField({ ref, previewUrl, onFileChange, onDeleteFile }: Props) {
 
  return (
    <div className={S.field}>
      <span className={S.label}>프로필 사진</span>
      <div className={S.uploadWrapper}>
        <input
        // ref 포워딩 
        ref={ref}
          type="file"
          id="profileImage"
          name="profileImage"
          accept="image/*"
          className={S.hiddenInput}
          onChange={onFileChange}
        />

        {!previewUrl ? (
          <label htmlFor="profileImage" className={S.uploadZone}>
            <UploadIcon />
            <p className={S.uploadText}>
              <strong>클릭하여 업로드</strong>
            </p>
          </label>
        ) : (
          <div className={S.previewContainer}>
            <img src={previewUrl} className={S.previewImg} alt="미리보기" />
            <button type="button" className={S.removeButton} aria-label="삭제" onClick={onDeleteFile}>
              <CloseIcon />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
