export default function ServiceCard({ service, onView }) {
  return (
    <div className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-gray-900">{service.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
        </div>
        <span className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200">{service.category}</span>
      </div>
      <div className="mt-3 text-sm text-gray-600">
        <p>{service.location}{service.address ? ` • ${service.address}` : ''}</p>
        {service.provider_name && <p className="mt-1">By {service.provider_name}</p>}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="flex gap-1 flex-wrap">
          {(service.tags || []).slice(0,4).map(t=> (
            <span key={t} className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">{t}</span>
          ))}
        </div>
        <button onClick={()=>onView && onView(service)} className="text-sm text-blue-600 hover:text-blue-700 font-medium">View</button>
      </div>
    </div>
  )
}
