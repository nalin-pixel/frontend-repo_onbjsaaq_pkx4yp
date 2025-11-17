import { useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')

  const submit = (e)=>{
    e.preventDefault()
    onSearch && onSearch({ q, category })
  }

  return (
    <form onSubmit={submit} className="w-full flex flex-col md:flex-row gap-2">
      <div className="flex items-center gap-2 px-3 py-2 border rounded-md flex-1 bg-white">
        <Search size={18} className="text-gray-400"/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search services (e.g., food, tutoring, transport)" className="flex-1 outline-none text-sm"/>
      </div>
      <select value={category} onChange={e=>setCategory(e.target.value)} className="px-3 py-2 border rounded-md bg-white text-sm">
        <option value="">All categories</option>
        <option>Food</option>
        <option>Health</option>
        <option>Education</option>
        <option>Transport</option>
        <option>Clothing</option>
        <option>Community</option>
      </select>
      <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm">Search</button>
    </form>
  )
}
