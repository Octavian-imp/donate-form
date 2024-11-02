import React from "react"

const PrepareQueryPage = () => {
  try {
    const bodyQuery = localStorage.getItem("bodyQuery")

    return (
      <main className="w-full h-screen flex items-center justify-center">
        <pre className="p-4 rounded-xl bg-zinc-500 text-white">
          <code>
            {bodyQuery.replace(/\,/g, ",\n").replace(/\:(?=\{)/g, ":\n\t")}
          </code>
        </pre>
      </main>
    )
  } catch (error) {
    return <pre>Возникла ошибка: {error.message}</pre>
  }
}

export default PrepareQueryPage
