export const Languages = () => {
  return (
    <div className="pt-10">
      <h2 className="text-2xl font-bold mb-2">Idiomas</h2>

      <p className="text-sm text-gray-500 mb-7">
        Altere o idioma do aplicativo e do site.
      </p>

      <div className="flex items-center space-x-2">
        <input
          type="radio"
          readOnly
          checked
          about="Portuguese"
          className=""
          name="language"
        />
        <span className="text-sm text-gray-300 font-semibold">Português</span>
      </div>
    </div>
  )
}
