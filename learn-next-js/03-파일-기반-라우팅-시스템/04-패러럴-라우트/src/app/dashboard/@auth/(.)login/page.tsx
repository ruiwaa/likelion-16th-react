'use client'

export default function AuthLogin() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10">
      <div
        role="dialog"
        aria-modal="true"
        className="flex h-110 flex-col gap-2 bg-indigo-50 p-5 shadow-2xl"
      >
        <button
          type="button"
          className="w-fit bg-indigo-200 px-2"
          onClick={() => window.history.back()}
        >
          닫기
        </button>
        <h2 className="text-2xl font-bold text-indigo-700">
          /dashboard/login 인증 페이지 {'{auth}'}
        </h2>
        <span className="text-sm text-indigo-800">
          (src/app/dashboard/@auth/login/page.tsx)
        </span>
      </div>
    </div>
  )
}
