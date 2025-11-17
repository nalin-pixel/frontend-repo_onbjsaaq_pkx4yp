import { useState } from 'react'

export default function ServiceModal({ service, onClose, onBook }) {
  const [form, setForm] = useState({ full_name: '', email: '', phone: '', preferred_date: '', notes: '' })
  if (!service) return null

  const submit = (e)=>{
    e.preventDefault()
    onBook && onBook({ ...form, service_id: service.id })
  }

  return (
    <div className="fixed inset-0 z-40 bg-black/30 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
            <p className="text-sm text-gray-500">{service.category} • {service.location}</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="p-4 grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-700 whitespace-pre-line">{service.description}</p>
            {service.address && <p className="mt-2 text-sm text-gray-600">Address: {service.address}</p>}
            {service.provider_name && <p className="mt-1 text-sm text-gray-600">Provider: {service.provider_name}</p>}
            {(service.tags||[]).length>0 && (
              <div className="mt-3 flex gap-1 flex-wrap">
                {service.tags.map(t=> <span key={t} className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">{t}</span>)}
              </div>
            )}
          </div>
          <div>
            {service.booking_required ? (
              <form onSubmit={submit} className="space-y-2">
                <p className="font-medium text-gray-800 mb-2">Book this service</p>
                <input className="w-full px-3 py-2 border rounded" placeholder="Full name" value={form.full_name} onChange={e=>setForm({...form, full_name: e.target.value})} required/>
                <input className="w-full px-3 py-2 border rounded" placeholder="Email (optional)" value={form.email} onChange={e=>setForm({...form, email: e.target.value})}/>
                <input className="w-full px-3 py-2 border rounded" placeholder="Phone (optional)" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})}/>
                <input className="w-full px-3 py-2 border rounded" placeholder="Preferred date/time" value={form.preferred_date} onChange={e=>setForm({...form, preferred_date: e.target.value})}/>
                <textarea className="w-full px-3 py-2 border rounded" placeholder="Notes" value={form.notes} onChange={e=>setForm({...form, notes: e.target.value})}/>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2">Submit Booking</button>
              </form>
            ) : (
              <div className="bg-green-50 text-green-700 border border-green-200 rounded p-3 text-sm">
                This service doesn't require booking. Use the contact details to arrange support.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
