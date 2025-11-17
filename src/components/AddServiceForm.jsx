import { useState } from 'react'

export default function AddServiceForm({ onCreated }) {
  const [form, setForm] = useState({
    title: '', description: '', category: '', location: '', address: '',
    provider_name: '', contact_email: '', contact_phone: '', tags: '', booking_required: true
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    setLoading(true); setMessage('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const payload = {
        ...form,
        tags: form.tags.split(',').map(t=>t.trim()).filter(Boolean),
        booking_required: Boolean(form.booking_required)
      }
      const res = await fetch(`${baseUrl}/api/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to create')
      const data = await res.json()
      setMessage('Service added successfully!')
      setForm({ title: '', description: '', category: '', location: '', address: '', provider_name: '', contact_email: '', contact_phone: '', tags: '', booking_required: true })
      onCreated && onCreated(data.id)
    } catch (e) {
      setMessage(`Error: ${e.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <input className="px-3 py-2 border rounded" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title: e.target.value})} required/>
        <input className="px-3 py-2 border rounded" placeholder="Category (e.g., Food, Health)" value={form.category} onChange={e=>setForm({...form, category: e.target.value})} required/>
        <input className="px-3 py-2 border rounded" placeholder="Location (City)" value={form.location} onChange={e=>setForm({...form, location: e.target.value})} required/>
        <input className="px-3 py-2 border rounded" placeholder="Address (optional)" value={form.address} onChange={e=>setForm({...form, address: e.target.value})}/>
        <input className="px-3 py-2 border rounded" placeholder="Provider name" value={form.provider_name} onChange={e=>setForm({...form, provider_name: e.target.value})} required/>
        <input className="px-3 py-2 border rounded" placeholder="Contact email (optional)" value={form.contact_email} onChange={e=>setForm({...form, contact_email: e.target.value})}/>
        <input className="px-3 py-2 border rounded" placeholder="Contact phone (optional)" value={form.contact_phone} onChange={e=>setForm({...form, contact_phone: e.target.value})}/>
      </div>
      <textarea className="w-full px-3 py-2 border rounded" rows="4" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} required/>
      <div className="flex items-center gap-2">
        <input id="booking_required" type="checkbox" checked={form.booking_required} onChange={e=>setForm({...form, booking_required: e.target.checked})}/>
        <label htmlFor="booking_required" className="text-sm text-gray-700">Booking required</label>
      </div>
      <input className="w-full px-3 py-2 border rounded" placeholder="Tags (comma separated)" value={form.tags} onChange={e=>setForm({...form, tags: e.target.value})}/>
      <div className="flex gap-2">
        <button disabled={loading} type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">{loading? 'Saving...':'Add Service'}</button>
        {message && <span className="text-sm text-gray-700">{message}</span>}
      </div>
    </form>
  )
}
