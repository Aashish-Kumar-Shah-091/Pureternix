import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { notices as initialNotices } from '../../mock/data';
import { HiSpeakerphone, HiPaperClip, HiPlus, HiX, HiCalendar } from 'react-icons/hi';

export default function Notices() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [noticesList, setNoticesList] = useState(initialNotices);
  const [showForm, setShowForm] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: '', content: '', priority: 'medium' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const canCreate = user.role === 'school_admin' || user.role === 'teacher';

  const validate = () => {
    const errs = {};
    if (!newNotice.title.trim()) errs.title = 'Title is required';
    if (newNotice.title.length > 100) errs.title = 'Title must be under 100 characters';
    if (!newNotice.content.trim()) errs.content = 'Content is required';
    if (newNotice.content.length > 1000) errs.content = 'Content must be under 1000 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 500));

    const notice = {
      id: Date.now(),
      ...newNotice,
      schoolId: 1,
      classId: null,
      createdBy: user.id,
      createdAt: new Date().toISOString().split('T')[0],
      attachment: null,
      readBy: [],
    };
    setNoticesList([notice, ...noticesList]);
    setNewNotice({ title: '', content: '', priority: 'medium' });
    setShowForm(false);
    setSubmitting(false);
    addToast('Notice published successfully! Parents will be notified.');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notices & Announcements</h1>
          <p className="text-gray-500 text-sm">{noticesList.length} notices · School-wide updates</p>
        </div>
        {canCreate && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-colors btn-press shadow-sm shadow-primary-200/50"
          >
            <HiPlus size={16} /> Create Notice
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 animate-slide-up">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">New Notice</h3>
            <button type="button" onClick={() => setShowForm(false)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <HiX size={18} className="text-gray-400" />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={newNotice.title}
              onChange={e => { setNewNotice({ ...newNotice, title: e.target.value }); setErrors({ ...errors, title: null }); }}
              placeholder="e.g., Holiday Notice - Buddha Jayanti"
              className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-primary-200 outline-none text-sm transition-all ${errors.title ? 'border-red-300 bg-red-50/50' : 'border-gray-200'}`}
              maxLength={100}
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
            <p className="text-[11px] text-gray-400 mt-1 text-right">{newNotice.title.length}/100</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Content <span className="text-red-400">*</span>
            </label>
            <textarea
              value={newNotice.content}
              onChange={e => { setNewNotice({ ...newNotice, content: e.target.value }); setErrors({ ...errors, content: null }); }}
              placeholder="Write your announcement here..."
              rows={5}
              className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-primary-200 outline-none text-sm resize-none transition-all ${errors.content ? 'border-red-300 bg-red-50/50' : 'border-gray-200'}`}
              maxLength={1000}
            />
            {errors.content && <p className="text-xs text-red-500 mt-1">{errors.content}</p>}
            <p className="text-[11px] text-gray-400 mt-1 text-right">{newNotice.content.length}/1000</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Priority</label>
              <select
                value={newNotice.priority}
                onChange={e => setNewNotice({ ...newNotice, priority: e.target.value })}
                className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-200 outline-none"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
            <div className="flex-1" />
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl text-sm font-medium transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 text-sm font-medium transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  Publishing...
                </>
              ) : 'Publish Notice'}
            </button>
          </div>
        </form>
      )}

      {noticesList.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <HiSpeakerphone className="mx-auto text-gray-200" size={40} />
          <p className="text-sm text-gray-500 mt-3">No notices yet</p>
          <p className="text-xs text-gray-400 mt-1">School announcements will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {noticesList.map(notice => (
            <div key={notice.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  notice.priority === 'high' ? 'bg-red-50 border border-red-100' :
                  notice.priority === 'medium' ? 'bg-primary-50 border border-primary-100' :
                  'bg-gray-50 border border-gray-100'
                }`}>
                  <HiSpeakerphone className={
                    notice.priority === 'high' ? 'text-red-500' :
                    notice.priority === 'medium' ? 'text-primary-500' :
                    'text-gray-400'
                  } size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-gray-800 text-sm">{notice.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium flex-shrink-0 ${
                      notice.priority === 'high' ? 'bg-red-100 text-red-600' :
                      notice.priority === 'medium' ? 'bg-warm-100 text-warm-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>{notice.priority}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 whitespace-pre-line leading-relaxed">{notice.content}</p>
                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <HiCalendar size={12} /> {notice.createdAt === today ? 'Today' : notice.createdAt}
                    </span>
                    {notice.attachment && (
                      <span className="flex items-center gap-1 text-[11px] text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
                        <HiPaperClip size={12} /> {notice.attachment}
                      </span>
                    )}
                    {notice.classId && (
                      <span className="text-[11px] text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">Class specific</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
