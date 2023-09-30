type Props = {
  setActive: (id: 'account' | 'appearance' | 'relays' | 'languages') => void
}

export const Options = ({ setActive }: Props) => {
  const options = [
    {
      name: 'Conta',
      id: 'account',

      onClick: () => setActive('account'),
    },
    // {
    //   name: 'Aparência',
    //   id: 'appearance',
    //   onClick: () => setActive('appearance'),
    // },
    {
      name: 'Relays',
      id: 'relays',
      onClick: () => setActive('relays'),
    },
    {
      name: 'Idiomas',
      id: 'languages',
      onClick: () => setActive('languages'),
    },
  ]

  return (
    <div className="flex items-center flex-col px-12 h-full space-y-7 pt-5">
      {options.map((option) => (
        <span
          key={option.id}
          className="font-bold text-gray-200 hover:cursor-pointer hover:text-gray-100"
          onClick={option.onClick}
        >
          {option.name}
        </span>
      ))}
    </div>
  )
}
