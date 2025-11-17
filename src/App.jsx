import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import ServiceCard from './components/ServiceCard'
import ServiceModal from './components/ServiceModal'
import AddServiceForm from './components/AddServiceForm'

function Home() {
  const [services, setServices] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchServices = async (params = {}) => {
    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const qs = new URLSearchParams(params).toString()
      const res = await fetch(`${baseUrl}/api/services${qs?`?${qs}`:''}`)
      const data = await res.json()
      setServices(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ fetchServices() },[])

  const handleBook = async (payload)=>{
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        alert('Booking submitted! We\'ll be in touch soon.')
        setSelected(null)
      } else {
        const err = await res.json().catch(()=>({detail:'Error'}))
        alert(`Error: ${err.detail || res.status}`)
      }
    } catch (e) {
      alert(`Error: ${e.message}`)
    }
  }

  return (
    <div>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Find help. Serve others.</h1>
          <p className="mt-2 text-gray-600 max-w-2xl">Discover Adventist community services near you — food assistance, tutoring, health clinics, transport, and more.</p>
          <div className="mt-6">
            <SearchBar onSearch={fetchServices} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading && <p className="text-gray-600">Loading services...</p>}
        {!loading && services.length === 0 && (
          <div className="text-gray-600">No services found. Try adjusting your search.</div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(s=> (
            <ServiceCard key={s.id} service={s} onView={setSelected} />
          ))}
        </div>
      </div>

      <ServiceModal service={selected} onClose={()=>setSelected(null)} onBook={handleBook} />
    </div>
  )
}

function AddService() {
  const navigate = useNavigate()
  return (
    <div>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-gray-900">Add a Service</h1>
          <p className="mt-2 text-gray-600">Share a ministry, outreach, or local support your church offers so neighbors can find help.</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <AddServiceForm onCreated={(id)=> navigate(`/`)} />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddService />} />
      </Routes>
    </div>
  )
}
