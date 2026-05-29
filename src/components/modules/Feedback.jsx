import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { feedback as initialFeedback, students, users } from '../../mock/data';
import { HiChat, HiPlus, HiStar, HiExclamation, HiTrendingUp, HiFlag, HiHeart, HiX, HiEye } from 'react-icons/hi';

const categories = [
  { value: 'progress', label: 'Progress', icon: HiTrendingUp, color: 'text-nature-600', bg: 'bg-nature-50 border-nature-200' },
  { value: 'milestone', label: 'Milestone', icon: HiFlag, color: 'text-sky-600', bg: 'bg-sky-50 border-sky-200' },
  { value: 'observation', label: 'Observation', icon: HiEye, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' },
  { value: 'concern', label: 'Concern', icon: HiExclamation, color: 'text-warm-600', bg: 'bg-warm-50 border-warm-200' },
  { value: 'appreciation', label: 'Appreciation', icon: HiHeart, color: 'text-pink-600', bg: 'bg-pink-50 border-pink-200' },
];

export default function Feedback() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [feedbackList, setFeedbackList] = useState(initialFeedback);
  const [showForm, setShowForm] = useState(false);
  const [newFeedback, setNewFeedback] = useState({ message: '', category: 'progress', studentId: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const isTeacher = user.role === 'teacher';
  const isParent = user.role === 'parent';

  const relevantFeedback = feedbackList.filter(f => f.fromId === user.id || f.toId === user.id);
  const relevantStudents = isParent
    ? students.filter(s => user.childIds?.includes(s.id))
    : students.filter(s => s.classId === 1);

  const validate = () => {
    const errs = {};
    if (!newFeedback.studentId) errs.studentId = 'Please select a student';
    if (!newFeedback.message.trim()) errs.message = 'Message is required';
    if (newFeedback.message.length < 10) errs.message = 'Please write at least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 500));
    const fb = {
      id: Date.now(),
      fromId: user.id,
      fromRole: user.role,
      toId: isTeacher ? 4 : 3,
      toRole: isTeacher ? 'parent' : 'teacher',
      studentId: parseInt(newFeedback.studentId),
      category: newFeedback.category,
      message: newFeedback.message,
      date: new Date().toISOString().split('T')[0],
      read: false,
    };
    setFeedbackList([fb, ...feedbackList]);
    setNewFeedback({ message: '', category: 'progress', studentId: '' });
    setShowForm(false);
    setSubmitting(false);
    addToast('Feedback sent! They\'ll be notified.');
  };

  const getCategoryConfig = (cat) => categories.find(c => c.value === cat) || categories[0];
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Feedback</h1>
          <p className="text-gray-500 text-sm">Structured parent-teacher communication · {relevantFeedback.length} messages</p>
        </div>
        {(isTeacher || isParent) && (
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-colors btn-press shadow-sm">
            <HiPlus size={16} /> Send Feedback
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 animate-slide-up">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">New Feedback</h3>
            <button type="button" onClick={() => setShowForm(false)} className="p-1.5 hover:bg-gray-100 rounded-lg"><HiX size={18} className="text-gray-400" /></button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">About which child? <span className="text-red-400">*</span></label>
            <select
              value={newFeedback.studentId}
              onChange={e => { setNewFeedback({ ...newFeedback, studentId: e.target.value }); setErrors({ ...errors, studentId: null }); }}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm ${errors.studentId ? 'border-red-300' : 'border-gray-200'}`}
            >
              <option value="">Select child...</option>
              {relevantStudents.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            {errors.studentId && <p className="text-xs text-red-500 mt-1">{errors.studentId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setNewFeedback({ ...newFeedback, category: cat.value })}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-all btn-press ${
                    newFeedback.category === cat.value ? `${cat.bg} ring-2 ring-primary-200` : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <cat.icon size={14} className={cat.color} /> {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Message <span className="text-red-400">*</span></label>
            <textarea
              value={newFeedback.message}
              onChange={e => { setNewFeedback({ ...newFeedback, message: e.target.value }); setErrors({ ...errors, message: null }); }}
              placeholder={isTeacher ? "Share an observation, milestone, or developmental note..." : "Share a concern, question, or appreciation..."}
              rows={4}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:ring-2 focus:ring-primary-200 outline-none resize-none ${errors.message ? 'border-red-300' : 'border-gray-200'}`}
              maxLength={500}
            />
            {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
            <p className="text-[11px] text-gray-400 mt-1 text-right">{newFeedback.message.length}/500</p>
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium">Cancel</button>
            <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 text-sm font-medium shadow-sm disabled:opacity-60">
              {submitting ? 'Sending...' : 'Send Feedback'}
            </button>
          </div>
        </form>
      )}

      {relevantFeedback.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <HiChat className="mx-auto text-gray-200" size={40} />
          <p className="text-sm text-gray-500 mt-3">No feedback messages yet</p>
          <p className="text-xs text-gray-400 mt-1">Structured observations and notes will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {relevantFeedback.map(fb => {
            const catConfig = getCategoryConfig(fb.category);
            const student = students.find(s => s.id === fb.studentId);
            const from = users.find(u => u.id === fb.fromId);
            const isMine = fb.fromId === user.id;

            return (
              <div key={fb.id} className={`bg-white rounded-2xl border shadow-sm p-5 transition-all hover:shadow-md ${!fb.read && !isMine ? 'border-primary-200 bg-primary-50/20' : 'border-gray-100'}`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-warm-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-primary-700">{from?.name?.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium text-gray-800 text-sm">{from?.name}</p>
                      <span className="text-[11px] text-gray-400">about</span>
                      <span className="text-[11px] font-medium text-primary-700">{student?.name}</span>
                      <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border ${catConfig.bg}`}>
                        <catConfig.icon size={10} className={catConfig.color} /> {catConfig.label}
                      </span>
                      {!fb.read && !isMine && <span className="w-2 h-2 bg-primary-400 rounded-full" />}
                    </div>
                    <p className="text-sm text-gray-600 mt-2.5 leading-relaxed">{fb.message}</p>
                    <p className="text-[11px] text-gray-400 mt-2.5">{fb.date === today ? 'Today' : fb.date}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
