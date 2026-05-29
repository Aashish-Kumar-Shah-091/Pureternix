import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { homework as initialHomework, classes } from '../../mock/data';
import { HiBookOpen, HiPlus, HiCalendar, HiX, HiLightBulb } from 'react-icons/hi';

const areaColors = {
  'Practical Life': 'bg-nature-50 text-nature-700 border-nature-100',
  'Sensorial': 'bg-purple-50 text-purple-700 border-purple-100',
  'Language': 'bg-sky-50 text-sky-700 border-sky-100',
  'Mathematics': 'bg-warm-50 text-warm-700 border-warm-100',
  'Cultural': 'bg-primary-50 text-primary-700 border-primary-100',
};

export default function Homework() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [homeworkList, setHomeworkList] = useState(initialHomework);
  const [showForm, setShowForm] = useState(false);
  const [newHw, setNewHw] = useState({ title: '', description: '', type: 'activity', dueDate: '', area: 'Practical Life' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const isTeacher = user.role === 'teacher';
  const myClass = classes.find(c => c.teacherId === user.id);

  const relevantHomework = isTeacher
    ? homeworkList.filter(h => h.teacherId === user.id)
    : user.role === 'parent'
    ? homeworkList.filter(h => [1, 4].includes(h.classId))
    : homeworkList;

  const validate = () => {
    const errs = {};
    if (!newHw.title.trim()) errs.title = 'Title is required';
    if (!newHw.description.trim()) errs.description = 'Description is required';
    if (!newHw.dueDate) errs.dueDate = 'Due date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 500));
    const hw = {
      id: Date.now(),
      ...newHw,
      classId: myClass?.id,
      teacherId: user.id,
      date: new Date().toISOString().split('T')[0],
    };
    setHomeworkList([hw, ...homeworkList]);
    setNewHw({ title: '', description: '', type: 'activity', dueDate: '', area: 'Practical Life' });
    setShowForm(false);
    setSubmitting(false);
    addToast('Posted! Parents will see this immediately.');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Homework & Activities</h1>
          <p className="text-gray-500 text-sm">{relevantHomework.length} items · Montessori home extensions</p>
        </div>
        {isTeacher && (
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-colors btn-press shadow-sm">
            <HiPlus size={16} /> Post New
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 animate-slide-up">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">New Homework / Activity</h3>
            <button type="button" onClick={() => setShowForm(false)} className="p-1.5 hover:bg-gray-100 rounded-lg"><HiX size={18} className="text-gray-400" /></button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Title <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={newHw.title}
              onChange={e => { setNewHw({ ...newHw, title: e.target.value }); setErrors({ ...errors, title: null }); }}
              placeholder="e.g., Practical Life: Folding Activity"
              className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-primary-200 outline-none text-sm ${errors.title ? 'border-red-300' : 'border-gray-200'}`}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description & Instructions <span className="text-red-400">*</span></label>
            <textarea
              value={newHw.description}
              onChange={e => { setNewHw({ ...newHw, description: e.target.value }); setErrors({ ...errors, description: null }); }}
              placeholder="Clear instructions for parents to guide their child..."
              rows={4}
              className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-primary-200 outline-none text-sm resize-none ${errors.description ? 'border-red-300' : 'border-gray-200'}`}
              maxLength={500}
            />
            {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
            <p className="text-[11px] text-gray-400 mt-1 text-right">{newHw.description.length}/500</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Montessori Area</label>
              <select value={newHw.area} onChange={e => setNewHw({ ...newHw, area: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm">
                <option>Practical Life</option>
                <option>Sensorial</option>
                <option>Language</option>
                <option>Mathematics</option>
                <option>Cultural</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Type</label>
              <select value={newHw.type} onChange={e => setNewHw({ ...newHw, type: e.target.value })} className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm">
                <option value="activity">Home Activity</option>
                <option value="homework">Worksheet/Task</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Due Date <span className="text-red-400">*</span></label>
              <input
                type="date"
                value={newHw.dueDate}
                onChange={e => { setNewHw({ ...newHw, dueDate: e.target.value }); setErrors({ ...errors, dueDate: null }); }}
                min={today}
                className={`w-full px-3 py-2 border rounded-xl text-sm ${errors.dueDate ? 'border-red-300' : 'border-gray-200'}`}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium">Cancel</button>
            <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 text-sm font-medium shadow-sm disabled:opacity-60 flex items-center gap-2">
              {submitting ? 'Posting...' : 'Post to Parents'}
            </button>
          </div>
        </form>
      )}

      {relevantHomework.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <HiBookOpen className="mx-auto text-gray-200" size={40} />
          <p className="text-sm text-gray-500 mt-3">No homework or activities posted yet</p>
          <p className="text-xs text-gray-400 mt-1">Activities and home extensions will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {relevantHomework.map(hw => (
            <div key={hw.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${hw.type === 'homework' ? 'bg-sky-50 border-sky-100' : 'bg-nature-50 border-nature-100'}`}>
                  {hw.type === 'homework' ? <HiBookOpen className="text-sky-600" size={18} /> : <HiLightBulb className="text-nature-600" size={18} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm">{hw.title}</h3>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${areaColors[hw.area] || 'bg-gray-50 text-gray-600 border-gray-100'}`}>{hw.area}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${hw.type === 'homework' ? 'bg-sky-50 text-sky-700' : 'bg-nature-50 text-nature-700'}`}>{hw.type === 'homework' ? 'Worksheet' : 'Activity'}</span>
                      </div>
                    </div>
                    {hw.dueDate && (
                      <span className="flex items-center gap-1 text-[11px] text-gray-400 flex-shrink-0 bg-gray-50 px-2 py-1 rounded-lg">
                        <HiCalendar size={12} /> Due {hw.dueDate}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{hw.description}</p>
                  <p className="text-[11px] text-gray-400 mt-3">Posted {hw.date === today ? 'today' : hw.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
