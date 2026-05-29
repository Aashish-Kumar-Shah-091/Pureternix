import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { activities as initialActivities, classes } from '../../mock/data';
import { HiPhotograph, HiPlus, HiCalendar } from 'react-icons/hi';

export default function Activities() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [actList, setActList] = useState(initialActivities);
  const [showForm, setShowForm] = useState(false);
  const [newAct, setNewAct] = useState({ title: '', description: '', type: 'classroom' });

  const myClass = classes.find(c => c.teacherId === user.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    const act = {
      id: Date.now(),
      ...newAct,
      classId: myClass?.id,
      teacherId: user.id,
      date: '2026-05-29',
      photos: ['new_photo.jpg'],
    };
    setActList([act, ...actList]);
    setNewAct({ title: '', description: '', type: 'classroom' });
    setShowForm(false);
    addToast('Activity posted!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Activities</h1>
          <p className="text-gray-500">Classroom activities and photo updates</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
          <HiPlus size={18} /> Add Activity
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-primary-100 p-5 space-y-4">
          <input
            type="text"
            value={newAct.title}
            onChange={e => setNewAct({ ...newAct, title: e.target.value })}
            placeholder="Activity title"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 outline-none"
            required
          />
          <textarea
            value={newAct.description}
            onChange={e => setNewAct({ ...newAct, description: e.target.value })}
            placeholder="Describe the activity..."
            rows={3}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-300 outline-none resize-none"
            required
          />
          <div className="flex items-center gap-4">
            <select
              value={newAct.type}
              onChange={e => setNewAct({ ...newAct, type: e.target.value })}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
            >
              <option value="classroom">Classroom</option>
              <option value="art">Art & Craft</option>
              <option value="outdoor">Outdoor</option>
              <option value="sensorial">Sensorial</option>
            </select>
            <div className="border-2 border-dashed border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 text-gray-400 text-sm">
              <HiPhotograph size={18} /> Upload Photos (mock)
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">Post</button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {actList.map(act => (
          <div key={act.id} className="bg-white rounded-xl border border-primary-100 overflow-hidden">
            <div className="grid grid-cols-3 gap-1">
              {(act.photos || []).slice(0, 3).map((_, i) => (
                <div key={i} className="aspect-video bg-gradient-to-br from-primary-100 to-warm-100 flex items-center justify-center">
                  <HiPhotograph className="text-primary-300" size={24} />
                </div>
              ))}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{act.title}</h3>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                    act.type === 'classroom' ? 'bg-sky-100 text-sky-700' :
                    act.type === 'art' ? 'bg-purple-100 text-purple-700' :
                    act.type === 'outdoor' ? 'bg-nature-100 text-nature-700' :
                    'bg-warm-100 text-warm-700'
                  }`}>{act.type}</span>
                </div>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <HiCalendar size={14} /> {act.date}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{act.description}</p>
              <p className="text-xs text-gray-400 mt-2">{act.photos?.length || 0} photos · {classes.find(c => c.id === act.classId)?.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
