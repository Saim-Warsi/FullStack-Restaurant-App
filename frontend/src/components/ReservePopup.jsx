import React, { useState, useContext, useEffect } from 'react'
import { StoreContext } from '../context/StoreContext.jsx'
import { Database, SpoolIcon } from 'lucide-react'

const ReservePopup = ({ onConfirm, onCancel, formFields = [], prefilledDate = '', prefilledTime = '' }) => {
  const { showPopup, setShowPopup } = useContext(StoreContext)
  
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    guests: '2',
    date: prefilledDate || '',
    time: prefilledTime || ''
  })

  const [errors, setErrors] = useState({})
  
  // Initialize custom form data from formFields prop
  useEffect(() => {
    if (formFields.length > 0) {
      const customData = {}
      formFields.forEach(field => {
        customData[field.name] = field.defaultValue || ''
      })
      setFormData(prev => ({ ...prev, ...customData }))
    }
  }, [formFields])

  // Update form data when prefilled values change
  useEffect(() => {
    if (prefilledDate || prefilledTime) {
      setFormData(prev => ({
        ...prev,
        ...(prefilledDate && { date: prefilledDate }),
        ...(prefilledTime && { time: prefilledTime })
      }))
    }
  }, [prefilledDate, prefilledTime])

  // Fetch tables when date/time change (if you need this functionality)
  useEffect(() => {
    const fetchTablesWithAvailability = async (date, time) => {
      try {
        // TODO: Replace with your actual API endpoint
        // const response = await fetch(`/api/tables/availability?date=${date}&time=${time}`)
        // const data = await response.json()
        console.log('Fetching tables for:', date, time)
      } catch (error) {
        console.error('Error fetching tables:', error)
      }
    }

    if (formData.date && formData.time) {
      fetchTablesWithAvailability(formData.date, formData.time)
    }
  }, [formData.date, formData.time])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required'
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required'
    }
    
    formFields.forEach(field => {
      if (field.required && !formData[field.name]?.toString().trim()) {
        newErrors[field.name] = `${field.label} is required`
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleConfirm = async (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      if (onConfirm) {
        await onConfirm(formData)
        setFormData({
          customerName: '',
          phone: '',
          email: '',
          guests: '2',
          date: '',
          time: ''
        })
        setErrors({})
      }
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    } else {
      setShowPopup(false)
    }
    
    setFormData({
      customerName: '',
      phone: '',
      email: '',
      guests: '2',
      date: '',
      time: ''
    })
    setErrors({})
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-sm transition-all duration-300 ease-out'>
      <div className="relative w-full max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-300 ease-out scale-100">
          <div className="px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 border-b border-yellow-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white">
                  <SpoolIcon />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Reserve a Table
                </h3>
              </div>
              <button 
                onClick={handleCancel}
                className="text-white hover:text-gray-200 transition-colors text-xl font-bold"
              >
                ✕
              </button>
            </div>
          </div>

          <form onSubmit={handleConfirm}>
            <div className="px-6 py-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors ${
                    errors.customerName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="John Doe"
                />
                {errors.customerName && <p className="mt-1 text-xs text-red-600">{errors.customerName}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors ${
                    errors.phone ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors ${
                      errors.date ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.date && <p className="mt-1 text-xs text-red-600">{errors.date}</p>}
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors ${
                      errors.time ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.time && <p className="mt-1 text-xs text-red-600">{errors.time}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Guests
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>

              {formFields.map((field, index) => (
                <div key={index}>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label} {field.required && '*'}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors ${
                        errors[field.name] ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((opt, i) => (
                        <option key={i} value={opt.value || opt}>{opt.label || opt}</option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      rows={field.rows || 3}
                      placeholder={field.placeholder}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors ${
                        errors[field.name] ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors ${
                        errors[field.name] ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                  )}
                  {errors[field.name] && <p className="mt-1 text-xs text-red-600">{errors[field.name]}</p>}
                </div>
              ))}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium text-white bg-yellow-500 border border-transparent rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                >
                  Reserve Table
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReservePopup