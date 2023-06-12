import { useRouter } from 'next/router'
import React from 'react'

const items = [
  {
    label: "Profile Information",
    query: "information"
  },
  {
    label: "Billings",
    query: "billings"
  },

]

const SidebarProfile = () => {
  const router = useRouter()
  const { tab } = router.query
  return (
    <aside className='border-r-2 pr-20 border-r-gray-500 '>
      <h1 className='text-3xl'>Profile</h1>
      <div className='flex flex-col gap-4 mt-20'>
        {
          items.map(({ label, query }) => (
            <div key={query} className={`py-2 pr-4 cursor-pointer  hover:border-b  ${tab === query && "font-black border-b "}`}>
              {label}
            </div>
          ))
        }

      </div>
    </aside>
  )
}

export default SidebarProfile