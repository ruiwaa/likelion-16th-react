import SearchForm from './_components/search-form'

export default function BooksLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="mx-auto mt-6 max-w-5xl">
      <SearchForm />
      {children}
    </div>
  )
}
