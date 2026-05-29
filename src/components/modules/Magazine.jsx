import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { magazine as initialMag, students } from '../../mock/data';
import { HiPhotograph, HiPlus, HiCheck, HiX, HiStar, HiFilter } from 'react-icons/hi';

export default function Magazine() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [magItems, setMagItems] = useState(initialMag);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [newItem, setNewItem] = useState({ title: '', type: 'artwork', studentId: '', description: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const isParent = user.role === 'parent';
  const canApprove = user.role === 'teacher' || user.role === 'school_admin';

  const displayItems = canApprove
    ? (filter === 'pending' ? magItems.filter(m => m.status === 'pending') : magItems)
    : magItems.filter(m => m.status === 'approved' || m.submittedBy === user.id);

  const pendingCount = magItems.filter(m => m.status === 'pending').length;

  const validate = () => {
    const errs = {};
    if (!newItem.title.trim()) errs.title = 'Title is required';
    if (!newItem.studentId) errs.studentId = 'Please select a child';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 500));
    const item = {
      id: Date.now(),
      ...newItem,
      studentId: parseInt(newItem.studentId),
      submittedBy: user.id,
      status: 'pending',
      image: 'uploaded_artwork.jpg',
      date: new Date().toISOString().split('T')[0],
    };
    setMagItems([item, ...magItems]);
    setNewItem({ title: '', type: 'artwork', studentId: '', description: '' });
    setShowForm(false);
    setSubmitting(false);
    addToast('Submitted for teacher review!');
  };

  const handleApproval = (id, approved) => {
    setMagItems(magItems.map(m => m.id === id ? { ...m, status: approved ? 'approved' : 'rejected' } : m));
    addToast(approved ? 'Approved and added to the magazine!' : 'Submission declined');
  };

  const myChildren = students.filter(s => user.childIds?.includes(s.id));

  const typeColors = {
    artwork: 'bg-purple-50 text-purple-700 border-purple-100',
    writing: 'bg-sky-50 text-sky-700 border-sky-100',
    craft: 'bg-warm-50 text-warm-700 border-warm-100',
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">School Magazine</h1>
          <p className="text-gray-500 text-sm">Celebrating our children's creativity</p>
        </div>
        <div className="flex gap-2">
          {canApprove && pendingCount > 0 && (
            <button
              onClick={() => setFilter(filter === 'pending' ? 'all' : 'pending')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                filter === 'pending' ? 'bg-warm-50 text-warm-700 border-warm-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <HiFilter size={14} /> {pendingCount} Pending
            </button>
          )}
          {isParent && (
            <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-colors btn-press shadow-sm">
              <HiPlus size={16} /> Submit Work
            </button>
          )}
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 animate-slide-up">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Submit Your Child's Work</h3>
            <button type="button" onClick={() => setShowForm(false)} className="p-1.5 hover:bg-gray-100 rounded-lg"><HiX size={18} className="text-gray-400" /></button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Title <span className="text-red-400">*</span></label>
              <input
                type="text"
                value={newItem.title}
                onChange={e => { setNewItem({ ...newItem, title: e.target.value }); setErrors({ ...errors, title: null }); }}
                placeholder="Name of the artwork or creation"
                className={`w-full px-4 py-2.5 border rounded-xl text-sm ${errors.title ? 'border-red-300' : 'border-gray-200'}`}
              />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Child <span className="text-red-400">*</span></label>
              <select
                value={newItem.studentId}
                onChange={e => { setNewItem({ ...newItem, studentId: e.target.value }); setErrors({ ...errors, studentId: null }); }}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm ${errors.studentId ? 'border-red-300' : 'border-gray-200'}`}
              >
                <option value="">Select child...</option>
                {myChildren.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              {errors.studentId && <p className="text-xs text-red-500 mt-1">{errors.studentId}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Type</label>
            <div className="flex gap-2">
              {['artwork', 'writing', 'craft'].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setNewItem({ ...newItem, type: t })}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all capitalize ${
                    newItem.type === t ? 'bg-primary-50 border-primary-300 text-primary-700 ring-2 ring-primary-100' : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary-300 transition-colors cursor-pointer">
            <HiPhotograph className="mx-auto text-gray-300" size={36} />
            <p className="text-sm text-gray-500 mt-2">Click to upload a photo</p>
            <p className="text-[11px] text-gray-400 mt-0.5">JPG, PNG up to 5MB</p>
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium">Cancel</button>
            <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 text-sm font-medium shadow-sm disabled:opacity-60">
              {submitting ? 'Submitting...' : 'Submit for Review'}
            </button>
          </div>
        </form>
      )}

      {displayItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <HiStar className="mx-auto text-gray-200" size={40} />
          <p className="text-sm text-gray-500 mt-3">{filter === 'pending' ? 'No pending submissions' : 'No magazine entries yet'}</p>
          <p className="text-xs text-gray-400 mt-1">Student artwork and creative work will be showcased here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayItems.map(item => {
            const student = students.find(s => s.id === item.studentId);
            return (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
                <div className="aspect-[4/3] bg-gradient-to-br from-primary-50 via-warm-50 to-nature-50 flex items-center justify-center relative">
                  <HiPhotograph className="text-primary-200 group-hover:scale-110 transition-transform" size={44} />
                  <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    item.status === 'approved' ? 'bg-nature-100 text-nature-700' :
                    item.status === 'pending' ? 'bg-warm-100 text-warm-700' :
                    'bg-red-100 text-red-600'
                  }`}>{item.status}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-xs text-gray-500">by {student?.name}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium border capitalize ${typeColors[item.type] || ''}`}>{item.type}</span>
                  </div>
                  {item.content && <p className="text-sm text-gray-600 mt-2 italic leading-relaxed line-clamp-3">"{item.content}"</p>}
                  {item.description && <p className="text-xs text-gray-500 mt-2">{item.description}</p>}
                  <p className="text-[11px] text-gray-400 mt-2">{item.date}</p>

                  {canApprove && item.status === 'pending' && (
                    <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
                      <button onClick={() => handleApproval(item.id, true)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-nature-50 text-nature-700 rounded-xl text-xs font-medium hover:bg-nature-100 border border-nature-200 transition-colors btn-press">
                        <HiCheck size={14} /> Approve
                      </button>
                      <button onClick={() => handleApproval(item.id, false)} className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-medium hover:bg-red-100 border border-red-200 transition-colors btn-press">
                        <HiX size={14} /> Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
