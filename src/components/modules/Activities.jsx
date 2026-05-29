import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { activities as initialActivities, classes } from '../../mock/data';
import { HiPhotograph, HiPlus, HiCalendar, HiX } from 'react-icons/hi';

const typeColors = {
  'Practical Life': 'bg-nature-50 text-nature-700 border-nature-100',
  'Sensorial': 'bg-purple-50 text-purple-700 border-purple-100',
  'Language': 'bg-sky-50 text-sky-700 border-sky-100',
  'Cultural': 'bg-primary-50 text-primary-700 border-primary-100',
  'Art': 'bg-warm-50 text-warm-700 border-warm-100',
  'Outdoor': 'bg-nature-50 text-nature-700 border-nature-100',
};

export default function Activities() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [actList, setActList] = useState(initialActivities);
  const [showForm, setShowForm] = useState(false);
  const [newAct, setNewAct] = useState({ title: '', description: '', type: 'Practical Life' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const myClass = classes.find(c => c.teacherId === user.id);
  const today = new Date().toISOString().split('T')[0];

  const validate = () => {
    const errs = {};
    if (!newAct.title.trim()) errs.title = 'Title is required';
    if (!newAct.description.trim()) errs.description = 'Description is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 500));
    const act = {
      id: Date.now(),
      ...newAct,
      classId: myClass?.id,
      teacherId: user.id,
      date: today,
      photos: ['activity_photo.jpg'],
    };
    setActList([act, ...actList]);
    setNewAct({ title: '', description: '', type: 'Practical Life' });
    setShowForm(false);
    setSubmitting(false);
    addToast('Activity posted! Parents can now see this update.');
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Classroom Activities</h1>
          <p className="text-gray-500 text-sm">Share daily moments with parents · {actList.length} posts</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-colors btn-press shadow-sm">
          <HiPlus size={16} /> Post Activity
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 animate-slide-up">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Share Today's Activity</h3>
            <button type="button" onClick={() => setShowForm(false)} className="p-1.5 hover:bg-gray-100 rounded-lg"><HiX size={18} className="text-gray-400" /></button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Activity Title <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={newAct.title}
              onChange={e => { setNewAct({ ...newAct, title: e.target.value }); setErrors({ ...errors, title: null }); }}
              placeholder="e.g., Sensorial: Pink Tower Exploration"
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary-200 outline-none ${errors.title ? 'border-red-300' : 'border-gray-200'}`}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">What happened? <span className="text-red-400">*</span></label>
            <textarea
              value={newAct.description}
              onChange={e => { setNewAct({ ...newAct, description: e.target.value }); setErrors({ ...errors, description: null }); }}
              placeholder="Describe the activity, what children learned, and any highlights..."
              rows={4}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary-200 outline-none resize-none ${errors.description ? 'border-red-300' : 'border-gray-200'}`}
              maxLength={500}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
            <p className="text-[11px] text-gray-400 mt-1 text-right">{newAct.description.length}/500</p>
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Montessori Area</label>
              <select value={newAct.type} onChange={e => setNewAct({ ...newAct, type: e.target.value })} className="px-3 py-2 border border-gray-200 rounded-xl text-sm">
                <option>Practical Life</option>
                <option>Sensorial</option>
                <option>Language</option>
                <option>Cultural</option>
                <option>Art</option>
                <option>Outdoor</option>
              </select>
            </div>
            <div className="border-2 border-dashed border-gray-200 rounded-xl px-4 py-2.5 flex items-center gap-2 text-gray-400 text-sm cursor-pointer hover:border-primary-300 transition-colors">
              <HiPhotograph size={18} /> Add Photos (mock)
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium">Cancel</button>
            <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 text-sm font-medium shadow-sm disabled:opacity-60">
              {submitting ? 'Posting...' : 'Share with Parents'}
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {actList.map(act => (
          <div key={act.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {act.photos && act.photos.length > 0 && (
              <div className={`grid gap-0.5 ${act.photos.length >= 3 ? 'grid-cols-3' : act.photos.length === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {act.photos.slice(0, 3).map((_, i) => (
                  <div key={i} className="aspect-video bg-gradient-to-br from-primary-50 via-warm-50 to-nature-50 flex items-center justify-center">
                    <HiPhotograph className="text-primary-200" size={28} />
                  </div>
                ))}
              </div>
            )}
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{act.title}</h3>
                  <span className={`inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium border ${typeColors[act.type] || 'bg-gray-50 text-gray-600 border-gray-100'}`}>
                    {act.type}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-[11px] text-gray-400 flex-shrink-0 bg-gray-50 px-2 py-1 rounded-lg">
                  <HiCalendar size={12} /> {act.date === today ? 'Today' : act.date}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{act.description}</p>
              <div className="flex items-center gap-3 mt-3 text-[11px] text-gray-400">
                <span>{act.photos?.length || 0} photos</span>
                <span>{classes.find(c => c.id === act.classId)?.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
