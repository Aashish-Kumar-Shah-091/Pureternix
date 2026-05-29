import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { students, meals as initialMeals, classes } from '../../mock/data';
import { HiHeart, HiEmojiHappy, HiEmojiSad, HiMinusCircle, HiSearch } from 'react-icons/hi';

export default function Meals() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [mealsData, setMealsData] = useState(initialMeals);
  const [noteInput, setNoteInput] = useState({});
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const today = new Date().toISOString().split('T')[0];
  const isTeacher = user.role === 'teacher';
  const isParent = user.role === 'parent';

  const relevantStudents = isTeacher
    ? students.filter(s => s.classId === classes.find(c => c.teacherId === user.id)?.id)
    : isParent
    ? students.filter(s => user.childIds?.includes(s.id))
    : students;

  const filtered = relevantStudents.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const getMeal = (studentId) => mealsData.find(m => m.studentId === studentId && m.date === today);

  const markMeal = (studentId, status) => {
    const note = noteInput[studentId] || getMeal(studentId)?.note || '';
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const existing = mealsData.findIndex(m => m.studentId === studentId && m.date === today);
    if (existing >= 0) {
      const updated = [...mealsData];
      updated[existing] = { ...updated[existing], status, note, markedAt: now };
      setMealsData(updated);
    } else {
      setMealsData([...mealsData, { id: Date.now(), studentId, date: today, status, note, markedBy: user.id, markedAt: now }]);
    }
    const student = students.find(s => s.id === studentId);
    const statusLabels = { ate_well: 'ate well', ate_little: 'ate a little', did_not_eat: "didn't eat" };
    addToast(`${student.name} — ${statusLabels[status]}`);
  };

  const trackedCount = relevantStudents.filter(s => getMeal(s.id)).length;
  const ateWellCount = relevantStudents.filter(s => getMeal(s.id)?.status === 'ate_well').length;

  const statusConfig = {
    ate_well: { icon: HiEmojiHappy, label: 'Ate Well', emoji: '😊', color: 'bg-nature-500 text-white shadow-nature-200', inactive: 'bg-nature-50 text-nature-600 hover:bg-nature-100 border border-nature-200' },
    ate_little: { icon: HiMinusCircle, label: 'Ate Little', emoji: '😐', color: 'bg-warm-500 text-white shadow-warm-200', inactive: 'bg-warm-50 text-warm-600 hover:bg-warm-100 border border-warm-200' },
    did_not_eat: { icon: HiEmojiSad, label: "Didn't Eat", emoji: '😟', color: 'bg-red-400 text-white shadow-red-200', inactive: 'bg-red-50 text-red-500 hover:bg-red-100 border border-red-200' },
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Meal Status</h1>
          <p className="text-gray-500 text-sm">Track how each child ate today · {trackedCount}/{relevantStudents.length} updated</p>
        </div>
        {trackedCount > 0 && (
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-nature-400 rounded-full" />{ateWellCount} ate well</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-warm-400 rounded-full" />{relevantStudents.filter(s => getMeal(s.id)?.status === 'ate_little').length} ate little</span>
          </div>
        )}
      </div>

      {relevantStudents.length > 5 && (
        <div className="relative">
          <HiSearch className="absolute left-3.5 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="w-full sm:w-72 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-200 focus:border-primary-400 outline-none text-sm"
            aria-label="Search students"
          />
        </div>
      )}

      <div className="space-y-3">
        {filtered.map(student => {
          const meal = getMeal(student.id);
          const isExpanded = expandedId === student.id;

          return (
            <div key={student.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-warm-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary-700">{student.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm">{student.name}</p>
                    <p className="text-xs text-gray-400">{classes.find(c => c.id === student.classId)?.name} · Age {student.age}</p>
                  </div>
                  {meal && !isTeacher && (
                    <div className={`px-3 py-1.5 rounded-xl text-xs font-medium ${
                      meal.status === 'ate_well' ? 'bg-nature-50 text-nature-700 border border-nature-100' :
                      meal.status === 'ate_little' ? 'bg-warm-50 text-warm-700 border border-warm-100' :
                      'bg-red-50 text-red-600 border border-red-100'
                    }`}>
                      {statusConfig[meal.status]?.label}
                    </div>
                  )}
                </div>

                {(isTeacher || user.role === 'school_admin') && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {Object.entries(statusConfig).map(([key, config]) => (
                      <button
                        key={key}
                        onClick={() => markMeal(student.id, key)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all btn-press ${
                          meal?.status === key ? `${config.color} shadow-sm` : config.inactive
                        }`}
                        aria-label={`Mark ${student.name} as ${config.label}`}
                      >
                        <config.icon size={16} /> {config.label}
                      </button>
                    ))}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : student.id)}
                      className="px-3 py-2 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      {isExpanded ? 'Hide note' : '+ Add note'}
                    </button>
                  </div>
                )}

                {isExpanded && (isTeacher || user.role === 'school_admin') && (
                  <div className="mt-3 animate-slide-up">
                    <textarea
                      value={noteInput[student.id] ?? meal?.note ?? ''}
                      onChange={e => setNoteInput({ ...noteInput, [student.id]: e.target.value })}
                      placeholder="How did they eat? Any observations... (optional)"
                      rows={2}
                      maxLength={200}
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-200 focus:border-primary-400 outline-none resize-none"
                    />
                    <p className="text-[11px] text-gray-400 mt-1 text-right">{(noteInput[student.id] ?? meal?.note ?? '').length}/200</p>
                  </div>
                )}

                {/* Parent view of meal notes */}
                {isParent && meal?.note && (
                  <div className="mt-3 bg-cream-100 rounded-xl p-3 border border-cream-200">
                    <p className="text-xs text-gray-500 font-medium">Teacher's note:</p>
                    <p className="text-sm text-gray-700 mt-0.5">"{meal.note}"</p>
                    {meal.markedAt && <p className="text-[11px] text-gray-400 mt-1">Updated at {meal.markedAt}</p>}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <HiHeart className="mx-auto text-gray-200" size={40} />
            <p className="text-sm text-gray-500 mt-3">No students found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
