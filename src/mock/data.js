const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

export const users = [
  { id: 1, email: 'superadmin@paaila.com', password: 'admin123', role: 'super_admin', name: 'Rajesh Mehta', avatar: null },
  { id: 2, email: 'admin@sunrisemontessori.edu', password: 'school123', role: 'school_admin', name: 'Priya Sharma', avatar: null, schoolId: 1 },
  { id: 3, email: 'anita.patel@sunrisemontessori.edu', password: 'teach123', role: 'teacher', name: 'Anita Patel', avatar: null, schoolId: 1, classId: 1 },
  { id: 4, email: 'suresh.gupta@gmail.com', password: 'parent123', role: 'parent', name: 'Suresh Gupta', avatar: null, schoolId: 1, childIds: [1, 2] },
];

export const schools = [
  { id: 1, name: 'Sunrise Montessori School', logo: null, themeColor: '#e89830', address: '42 Peaceful Garden Road, Kathmandu', phone: '+977-1-4423156', email: 'info@sunrisemontessori.edu', subscription: 'premium', studentsCount: 128, teachersCount: 14, founded: '2018', motto: 'Nurturing curious minds naturally' },
  { id: 2, name: 'Green Leaves Academy', logo: null, themeColor: '#4da351', address: '18 Tinkune Heights, Lalitpur', phone: '+977-1-5534267', email: 'contact@greenleaves.edu', subscription: 'premium', studentsCount: 95, teachersCount: 10, founded: '2020', motto: 'Growing together, learning forever' },
  { id: 3, name: 'Little Explorers Montessori', logo: null, themeColor: '#0c8cf1', address: '7 Baneshwor Lane, Bhaktapur', phone: '+977-1-6612845', email: 'hello@littleexplorers.edu', subscription: 'basic', studentsCount: 62, teachersCount: 7, founded: '2022', motto: 'Every child is an explorer' },
  { id: 4, name: 'Bamboo Grove Children\'s House', logo: null, themeColor: '#8b5e3c', address: '33 Riverside Path, Pokhara', phone: '+977-61-523478', email: 'info@bambogrove.edu', subscription: 'basic', studentsCount: 48, teachersCount: 6, founded: '2023', motto: 'Rooted in nature, reaching for the sky' },
];

export const classes = [
  { id: 1, name: 'Casa dei Bambini A', schoolId: 1, teacherId: 3, ageGroup: '3-6 years', capacity: 20, currentStrength: 18, room: 'Sunflower Room', program: 'Casa' },
  { id: 2, name: 'Casa dei Bambini B', schoolId: 1, teacherId: 5, ageGroup: '3-6 years', capacity: 20, currentStrength: 16, room: 'Lotus Room', program: 'Casa' },
  { id: 3, name: 'Toddler Community', schoolId: 1, teacherId: 6, ageGroup: '18 months - 3 years', capacity: 12, currentStrength: 10, room: 'Butterfly Room', program: 'Toddler' },
  { id: 4, name: 'Lower Elementary', schoolId: 1, teacherId: 7, ageGroup: '6-9 years', capacity: 24, currentStrength: 22, room: 'Oak Room', program: 'Elementary' },
];

export const students = [
  { id: 1, name: 'Aarav Gupta', age: 4, classId: 1, schoolId: 1, parentId: 4, photo: null, dob: '2022-03-15', bloodGroup: 'A+', allergies: 'None', emergencyContact: '+977-9841234567', admissionDate: '2025-04-01', personality: 'Curious and active, loves music and numbers', busRoute: 'Route A' },
  { id: 2, name: 'Ananya Gupta', age: 6, classId: 4, schoolId: 1, parentId: 4, photo: null, dob: '2020-07-22', bloodGroup: 'B+', allergies: 'Peanuts', emergencyContact: '+977-9841234567', admissionDate: '2023-04-01', personality: 'Creative and gentle, strong reader, loves art', busRoute: 'Route A' },
  { id: 3, name: 'Vivaan Sharma', age: 4, classId: 1, schoolId: 1, parentId: null, photo: null, dob: '2022-01-10', bloodGroup: 'O+', allergies: 'None', emergencyContact: '+977-9851234567', admissionDate: '2025-04-01', personality: 'Social butterfly, shows leadership in group work', busRoute: 'Route B' },
  { id: 4, name: 'Diya Joshi', age: 5, classId: 1, schoolId: 1, parentId: null, photo: null, dob: '2021-05-08', bloodGroup: 'AB+', allergies: 'Dairy', emergencyContact: '+977-9861234567', admissionDate: '2024-08-01', personality: 'Quiet observer, meticulous with materials', busRoute: null },
  { id: 5, name: 'Arjun Singh', age: 5, classId: 1, schoolId: 1, parentId: null, photo: null, dob: '2021-11-30', bloodGroup: 'A-', allergies: 'None', emergencyContact: '+977-9871234567', admissionDate: '2024-04-01', personality: 'Enthusiastic, loves outdoor activities and sports', busRoute: 'Route A' },
  { id: 6, name: 'Ishaan Thapa', age: 4, classId: 1, schoolId: 1, parentId: null, photo: null, dob: '2022-02-14', bloodGroup: 'B+', allergies: 'None', emergencyContact: '+977-9881234567', admissionDate: '2025-01-15', personality: 'Gentle and focused, excels at practical life', busRoute: 'Route C' },
  { id: 7, name: 'Myra Karki', age: 5, classId: 1, schoolId: 1, parentId: null, photo: null, dob: '2021-09-05', bloodGroup: 'O-', allergies: 'Gluten', emergencyContact: '+977-9891234567', admissionDate: '2025-04-01', personality: 'Artistic and imaginative, natural storyteller', busRoute: 'Route B' },
  { id: 8, name: 'Kabir Maharjan', age: 4, classId: 1, schoolId: 1, parentId: null, photo: null, dob: '2022-06-20', bloodGroup: 'A+', allergies: 'None', emergencyContact: '+977-9801234567', admissionDate: '2025-04-01', personality: 'Loves sensorial materials, developing fine motor', busRoute: null },
  { id: 9, name: 'Zara Rana', age: 3, classId: 1, schoolId: 1, parentId: null, photo: null, dob: '2023-04-12', bloodGroup: 'B-', allergies: 'None', emergencyContact: '+977-9812345678', admissionDate: '2026-01-10', personality: 'Newest member, adjusting beautifully', busRoute: 'Route A' },
  { id: 10, name: 'Rohan Shrestha', age: 5, classId: 1, schoolId: 1, parentId: null, photo: null, dob: '2021-08-03', bloodGroup: 'O+', allergies: 'Eggs', emergencyContact: '+977-9823456789', admissionDate: '2024-04-01', personality: 'Math enthusiast, loves number rods', busRoute: 'Route C' },
  { id: 11, name: 'Prisha Adhikari', age: 4, classId: 1, schoolId: 1, parentId: null, photo: null, dob: '2022-11-18', bloodGroup: 'AB-', allergies: 'None', emergencyContact: '+977-9834567890', admissionDate: '2025-08-01', personality: 'Careful and precise, wonderful with pink tower', busRoute: 'Route B' },
  { id: 12, name: 'Aditya Bhandari', age: 5, classId: 1, schoolId: 1, parentId: null, photo: null, dob: '2021-12-25', bloodGroup: 'A+', allergies: 'None', emergencyContact: '+977-9845678901', admissionDate: '2024-04-01', personality: 'Independent worker, mentors younger children', busRoute: null },
  { id: 13, name: 'Saanvi Pandey', age: 4, classId: 1, schoolId: 1, parentId: null, photo: null, dob: '2022-07-09', bloodGroup: 'B+', allergies: 'Shellfish', emergencyContact: '+977-9856789012', admissionDate: '2025-04-01', personality: 'Language lover, expanding vocabulary rapidly', busRoute: 'Route A' },
  { id: 14, name: 'Krish Tamang', age: 5, classId: 1, schoolId: 1, parentId: null, photo: null, dob: '2021-03-27', bloodGroup: 'O+', allergies: 'None', emergencyContact: '+977-9867890123', admissionDate: '2024-01-15', personality: 'Confident and kind, natural peacemaker', busRoute: 'Route C' },
  { id: 15, name: 'Anvi Rai', age: 4, classId: 1, schoolId: 1, parentId: null, photo: null, dob: '2022-10-01', bloodGroup: 'A-', allergies: 'None', emergencyContact: '+977-9878901234', admissionDate: '2025-04-01', personality: 'Curious about nature, loves botany work', busRoute: 'Route B' },
  { id: 16, name: 'Reyansh KC', age: 3, classId: 1, schoolId: 1, parentId: null, photo: null, dob: '2023-01-14', bloodGroup: 'B+', allergies: 'None', emergencyContact: '+977-9889012345', admissionDate: '2026-01-10', personality: 'Energetic new joiner, settling in well', busRoute: null },
  { id: 17, name: 'Navya Basnet', age: 5, classId: 1, schoolId: 1, parentId: null, photo: null, dob: '2021-06-30', bloodGroup: 'AB+', allergies: 'None', emergencyContact: '+977-9890123456', admissionDate: '2024-04-01', personality: 'Musical talent, enjoys bells and tone bars', busRoute: 'Route A' },
  { id: 18, name: 'Vihaan Malla', age: 4, classId: 1, schoolId: 1, parentId: null, photo: null, dob: '2022-04-22', bloodGroup: 'O-', allergies: 'Dust mites', emergencyContact: '+977-9801234567', admissionDate: '2025-04-01', personality: 'Detail-oriented, loves geography puzzles', busRoute: 'Route C' },
];

export const teachers = [
  { id: 3, name: 'Anita Patel', email: 'anita.patel@sunrisemontessori.edu', phone: '+977-9841111111', classId: 1, schoolId: 1, qualification: 'AMI Montessori Diploma (3-6), M.Ed Early Childhood', joinDate: '2019-01-15', specialization: 'Practical Life & Sensorial' },
  { id: 5, name: 'Sunita Rai', email: 'sunita.rai@sunrisemontessori.edu', phone: '+977-9842222222', classId: 2, schoolId: 1, qualification: 'AMI Montessori Diploma (3-6), B.Ed', joinDate: '2020-06-01', specialization: 'Language & Cultural Studies' },
  { id: 6, name: 'Meera Shrestha', email: 'meera.shrestha@sunrisemontessori.edu', phone: '+977-9843333333', classId: 3, schoolId: 1, qualification: 'AMI Assistants Certificate (0-3), B.Ed Early Childhood', joinDate: '2021-04-01', specialization: 'Toddler Development' },
  { id: 7, name: 'Vikram Thapa', email: 'vikram.thapa@sunrisemontessori.edu', phone: '+977-9844444444', classId: 4, schoolId: 1, qualification: 'AMS Montessori Credential (6-9), M.Ed', joinDate: '2022-01-15', specialization: 'Mathematics & Geometry' },
  { id: 8, name: 'Kavita Adhikari', email: 'kavita.adhikari@sunrisemontessori.edu', phone: '+977-9845555555', classId: null, schoolId: 1, qualification: 'AMI Montessori Diploma (3-6), B.Ed Art Education', joinDate: '2023-08-01', specialization: 'Art & Creative Expression' },
  { id: 9, name: 'Deepak Gurung', email: 'deepak.gurung@sunrisemontessori.edu', phone: '+977-9846666666', classId: null, schoolId: 1, qualification: 'B.Ed Physical Education, Yoga Instructor', joinDate: '2024-01-15', specialization: 'Movement & Physical Development' },
];

export const attendance = [
  { id: 1, studentId: 1, date: today, status: 'present', markedBy: 3, markedAt: '08:47 AM', note: '' },
  { id: 2, studentId: 2, date: today, status: 'present', markedBy: 7, markedAt: '08:42 AM', note: '' },
  { id: 3, studentId: 3, date: today, status: 'present', markedBy: 3, markedAt: '08:51 AM', note: '' },
  { id: 4, studentId: 4, date: today, status: 'late', markedBy: 3, markedAt: '09:18 AM', note: 'Parent called ahead - traffic delay' },
  { id: 5, studentId: 5, date: today, status: 'present', markedBy: 3, markedAt: '08:38 AM', note: '' },
  { id: 6, studentId: 6, date: today, status: 'present', markedBy: 3, markedAt: '08:55 AM', note: '' },
  { id: 7, studentId: 7, date: today, status: 'present', markedBy: 3, markedAt: '08:44 AM', note: '' },
  { id: 8, studentId: 8, date: today, status: 'absent', markedBy: 3, markedAt: '09:00 AM', note: 'Parent informed - mild fever' },
  { id: 9, studentId: 9, date: today, status: 'present', markedBy: 3, markedAt: '08:50 AM', note: '' },
  { id: 10, studentId: 10, date: today, status: 'present', markedBy: 3, markedAt: '08:46 AM', note: '' },
  { id: 11, studentId: 11, date: today, status: 'present', markedBy: 3, markedAt: '08:53 AM', note: '' },
  { id: 12, studentId: 12, date: today, status: 'present', markedBy: 3, markedAt: '08:35 AM', note: 'Arrived early with sibling' },
  { id: 13, studentId: 13, date: today, status: 'present', markedBy: 3, markedAt: '08:49 AM', note: '' },
  { id: 14, studentId: 14, date: today, status: 'present', markedBy: 3, markedAt: '08:41 AM', note: '' },
  { id: 15, studentId: 15, date: today, status: 'present', markedBy: 3, markedAt: '08:57 AM', note: '' },
  { id: 16, studentId: 16, date: today, status: 'absent', markedBy: 3, markedAt: '09:00 AM', note: 'Family travel' },
  { id: 17, studentId: 17, date: today, status: 'present', markedBy: 3, markedAt: '08:43 AM', note: '' },
  { id: 18, studentId: 18, date: today, status: 'present', markedBy: 3, markedAt: '08:52 AM', note: '' },
  { id: 19, studentId: 1, date: yesterday, status: 'present', markedBy: 3, markedAt: '08:40 AM', note: '' },
  { id: 20, studentId: 2, date: yesterday, status: 'present', markedBy: 7, markedAt: '08:45 AM', note: '' },
];

export const meals = [
  { id: 1, studentId: 1, date: today, status: 'ate_well', note: 'Finished rice, dal, and vegetables. Asked for seconds of the fruit!', markedBy: 3, markedAt: '12:35 PM' },
  { id: 2, studentId: 3, date: today, status: 'ate_well', note: 'Great appetite today. Ate everything including the salad.', markedBy: 3, markedAt: '12:38 PM' },
  { id: 3, studentId: 4, date: today, status: 'ate_little', note: 'Had the rice and some dal, but didn\'t want vegetables. Drank all her water.', markedBy: 3, markedAt: '12:40 PM' },
  { id: 4, studentId: 5, date: today, status: 'ate_well', note: 'Wonderful eater today! Tried the new spinach dish for the first time.', markedBy: 3, markedAt: '12:32 PM' },
  { id: 5, studentId: 6, date: today, status: 'ate_well', note: '', markedBy: 3, markedAt: '12:45 PM' },
  { id: 6, studentId: 7, date: today, status: 'did_not_eat', note: 'Said tummy hurts. Had some warm water and crackers. Will monitor.', markedBy: 3, markedAt: '12:50 PM' },
  { id: 7, studentId: 9, date: today, status: 'ate_little', note: 'Still adjusting to school meals. Had half her tiffin from home.', markedBy: 3, markedAt: '12:42 PM' },
  { id: 8, studentId: 10, date: today, status: 'ate_well', note: 'Cleaned his plate! Loved the paneer today.', markedBy: 3, markedAt: '12:36 PM' },
  { id: 9, studentId: 11, date: today, status: 'ate_well', note: '', markedBy: 3, markedAt: '12:48 PM' },
  { id: 10, studentId: 12, date: today, status: 'ate_well', note: 'Helped serve food to younger friends before eating.', markedBy: 3, markedAt: '12:30 PM' },
  { id: 11, studentId: 1, date: yesterday, status: 'ate_little', note: 'Not in the mood for dal today. Had rice and curd only.', markedBy: 3, markedAt: '12:40 PM' },
];

export const notices = [
  { id: 1, title: 'Annual Day Celebration - "The Garden of Dreams"', content: 'Dear Parents,\n\nWe are delighted to invite you to our Annual Day celebration themed "The Garden of Dreams" on June 15, 2026 at 10:00 AM. Each child will participate in a short performance showcasing their learning journey. Light refreshments will be served. Please confirm attendance by June 10.\n\nWarm regards,\nMs. Priya Sharma', schoolId: 1, classId: null, createdBy: 2, createdAt: yesterday, priority: 'high', attachment: null, readBy: [4] },
  { id: 2, title: 'Water Bottle & Sun Hat Reminder', content: 'As summer temperatures rise, please ensure your child brings:\n• A labeled water bottle (minimum 500ml)\n• A sun hat for outdoor play time\n• Light, comfortable cotton clothing\n\nWe encourage children to stay hydrated throughout the day.', schoolId: 1, classId: null, createdBy: 2, createdAt: yesterday, priority: 'medium', attachment: null, readBy: [] },
  { id: 3, title: 'Nature Walk to Shivapuri - Permission Required', content: 'Casa A class is planning a nature walk to Shivapuri National Park on June 5th. Children will observe local flora and fauna as part of our Botany curriculum. Please sign and return the permission slip by June 2.\n\nWhat to pack: Comfortable shoes, water bottle, small snack, rain jacket.', schoolId: 1, classId: 1, createdBy: 3, createdAt: '2026-05-27', priority: 'medium', attachment: 'nature_walk_permission.pdf', readBy: [4] },
  { id: 4, title: 'Monthly Fee Reminder - June 2026', content: 'Gentle reminder that the monthly fee for June is due by June 5, 2026. Payment can be made via bank transfer or at the school office between 9 AM - 2 PM.\n\nFor any fee-related queries, please contact our office.', schoolId: 1, classId: null, createdBy: 2, createdAt: '2026-05-26', priority: 'low', attachment: null, readBy: [4] },
  { id: 5, title: 'New Montessori Materials Arrived!', content: 'We\'re excited to share that new Montessori materials have arrived for our Casa classrooms including:\n• Geometric solids set\n• Metal insets (complete set)\n• Botany cabinet with new leaf cards\n\nChildren will be introduced to these materials gradually over the coming weeks.', schoolId: 1, classId: 1, createdBy: 3, createdAt: '2026-05-25', priority: 'low', attachment: null, readBy: [] },
];

export const homework = [
  { id: 1, title: 'Practical Life: Pouring Practice', description: 'Set up a small tray at home with a pitcher and 2-3 cups. Let your child practice pouring water carefully. Focus on steady hands and concentration. Celebrate the effort, not perfection! A towel underneath is helpful.', classId: 1, teacherId: 3, date: today, dueDate: '2026-06-01', type: 'activity', area: 'Practical Life' },
  { id: 2, title: 'Sandpaper Letter Tracing: S, A, T', description: 'Using the sandpaper letter cards sent home, guide your child to trace letters S, A, and T with their index finger. Say the sound (not the letter name) as they trace. Try 2-3 repetitions of each letter.', classId: 1, teacherId: 3, date: today, dueDate: '2026-06-02', type: 'homework', area: 'Language' },
  { id: 3, title: 'Nature Collection Walk', description: 'Take a short walk with your child and collect 5-8 items from nature (leaves, small stones, flowers, seeds). At home, sort them by size, color, or type. This builds classification skills naturally!', classId: 1, teacherId: 3, date: yesterday, dueDate: '2026-06-01', type: 'activity', area: 'Sensorial' },
  { id: 4, title: 'Number Rods: Counting 1-5', description: 'Using household items (spoons, crayons, blocks), create groups of 1, 2, 3, 4, and 5. Have your child count each group and match with the written numeral if possible.', classId: 1, teacherId: 3, date: '2026-05-27', dueDate: '2026-05-30', type: 'homework', area: 'Mathematics' },
  { id: 5, title: 'Cultural: Family Photo Sharing', description: 'Please help your child bring or share (digitally) a family photo for our "People Around Us" cultural display. We\'ll discuss families, communities, and the people who care for us.', classId: 1, teacherId: 3, date: '2026-05-26', dueDate: '2026-06-03', type: 'activity', area: 'Cultural' },
];

export const activities = [
  { id: 1, title: 'Practical Life: Table Washing', description: 'Today the children practiced washing and polishing small tables. They were so focused and careful! Each child completed the full cycle: wet, soap, scrub, rinse, dry. Wonderful concentration and sense of accomplishment.', classId: 1, teacherId: 3, date: today, photos: ['table_washing_1.jpg', 'table_washing_2.jpg', 'table_washing_3.jpg'], type: 'Practical Life' },
  { id: 2, title: 'Sensorial: Color Box 3 Exploration', description: 'Several children worked with Color Box 3 today, grading colors from lightest to darkest. Aarav and Vivaan even created a beautiful rainbow pattern on the floor. Such attention to subtle differences!', classId: 1, teacherId: 3, date: today, photos: ['color_box_1.jpg'], type: 'Sensorial' },
  { id: 3, title: 'Garden Time: Watering Our Plants', description: 'We visited our class garden to water the marigolds and tomato plants the children planted last month. Everyone took turns using the small watering can. The tomatoes are showing tiny green fruits!', classId: 1, teacherId: 3, date: yesterday, photos: ['garden_1.jpg', 'garden_2.jpg'], type: 'Cultural' },
  { id: 4, title: 'Art: Leaf Printing with Tempera', description: 'Using leaves collected during our morning walk, children made beautiful prints with tempera paint. They explored patterns, symmetry, and the beauty of natural forms. Artworks drying on the display shelf!', classId: 1, teacherId: 3, date: yesterday, photos: ['leaf_art_1.jpg', 'leaf_art_2.jpg', 'leaf_art_3.jpg', 'leaf_art_4.jpg'], type: 'Art' },
  { id: 5, title: 'Language: Story Circle - "The Very Hungry Caterpillar"', description: 'Our morning circle included a reading of The Very Hungry Caterpillar. Children discussed sequencing, days of the week, and the butterfly life cycle. Several children then chose caterpillar-related work during free choice.', classId: 1, teacherId: 3, date: '2026-05-27', photos: ['story_circle.jpg'], type: 'Language' },
];

export const feedback = [
  { id: 1, fromId: 3, fromRole: 'teacher', toId: 4, toRole: 'parent', studentId: 1, category: 'progress', message: 'Aarav had a wonderful morning! He chose the Pink Tower independently and built it perfectly three times in a row. His concentration is really developing beautifully. He also helped a younger friend learn the pouring exercise.', date: today, read: false },
  { id: 2, fromId: 4, fromRole: 'parent', toId: 3, toRole: 'teacher', studentId: 1, category: 'concern', message: 'Thank you for the update! At home, Aarav mentioned he finds the button frame difficult. Could you spend a little extra time helping him with it? He gets frustrated and gives up quickly with buttons.', date: yesterday, read: true },
  { id: 3, fromId: 3, fromRole: 'teacher', toId: 4, toRole: 'parent', studentId: 1, category: 'milestone', message: 'Great news! Aarav successfully completed the button frame today without any help! He was beaming with pride. We celebrated with the class. His persistence is really paying off.', date: yesterday, read: true },
  { id: 4, fromId: 3, fromRole: 'teacher', toId: 4, toRole: 'parent', studentId: 2, category: 'progress', message: 'Ananya is reading beautifully! She finished her first chapter book this week and shared a summary with the class during circle time. Her comprehension and vocabulary continue to impress. She\'s ready for the next reading level.', date: '2026-05-27', read: true },
  { id: 5, fromId: 4, fromRole: 'parent', toId: 7, toRole: 'teacher', studentId: 2, category: 'appreciation', message: 'Mr. Vikram, we wanted to thank you for the wonderful geometry work Ananya has been doing. She came home yesterday and pointed out all the triangles in our house! We can see her mathematical thinking growing every day.', date: '2026-05-26', read: true },
  { id: 6, fromId: 3, fromRole: 'teacher', toId: 4, toRole: 'parent', studentId: 1, category: 'observation', message: 'Today during free choice, Aarav spent 45 minutes working with the number rods. He counted carefully and even started combining rods to make 10. This deep concentration at age 4 is wonderful to see.', date: '2026-05-25', read: true },
];

export const pickup = [
  { id: 1, studentId: 1, date: today, arrivalTime: '08:47 AM', departureTime: null, pickupPerson: null, status: 'in_school', dropoffPerson: 'Father (Suresh)' },
  { id: 2, studentId: 2, date: today, arrivalTime: '08:42 AM', departureTime: null, pickupPerson: null, status: 'in_school', dropoffPerson: 'Father (Suresh)' },
  { id: 3, studentId: 3, date: today, arrivalTime: '08:51 AM', departureTime: null, pickupPerson: null, status: 'in_school', dropoffPerson: 'Mother' },
  { id: 4, studentId: 4, date: today, arrivalTime: '09:18 AM', departureTime: null, pickupPerson: null, status: 'in_school', dropoffPerson: 'Grandmother' },
  { id: 5, studentId: 5, date: today, arrivalTime: '08:38 AM', departureTime: '01:45 PM', pickupPerson: 'Mother (Rekha)', status: 'picked_up', dropoffPerson: 'School Bus' },
  { id: 6, studentId: 6, date: today, arrivalTime: '08:55 AM', departureTime: null, pickupPerson: null, status: 'in_school', dropoffPerson: 'Father' },
  { id: 7, studentId: 7, date: today, arrivalTime: '08:44 AM', departureTime: null, pickupPerson: null, status: 'in_school', dropoffPerson: 'School Bus' },
  { id: 8, studentId: 9, date: today, arrivalTime: '08:50 AM', departureTime: null, pickupPerson: null, status: 'in_school', dropoffPerson: 'Mother' },
  { id: 9, studentId: 10, date: today, arrivalTime: '08:46 AM', departureTime: '01:30 PM', pickupPerson: 'Father (Ramesh)', status: 'picked_up', dropoffPerson: 'School Bus' },
  { id: 10, studentId: 1, date: yesterday, arrivalTime: '08:40 AM', departureTime: '02:00 PM', pickupPerson: 'Mother (Meena)', status: 'picked_up', dropoffPerson: 'Father (Suresh)' },
];

export const busStatus = [
  { id: 1, busNumber: 'Sunrise Bus 1', route: 'Route A - Thamel → Baluwatar → School', driver: 'Ram Prasad Tamang', phone: '+977-9811234567', status: 'at_school', lastUpdate: '08:35 AM', studentsCount: 8, capacity: 12, nextStop: null },
  { id: 2, busNumber: 'Sunrise Bus 2', route: 'Route B - Lalitpur → Kupondole → School', driver: 'Hari Bahadur KC', phone: '+977-9822345678', status: 'departed', lastUpdate: '02:10 PM', studentsCount: 10, capacity: 12, nextStop: 'Kupondole (est. 2:25 PM)' },
  { id: 3, busNumber: 'Sunrise Bus 3', route: 'Route C - Bhaktapur → Thimi → School', driver: 'Shyam Lal Dangol', phone: '+977-9833456789', status: 'nearby', lastUpdate: '02:28 PM', studentsCount: 6, capacity: 10, nextStop: 'Arriving at school in 5 min' },
];

export const magazine = [
  { id: 1, title: 'My Family Under the Sun', studentId: 1, submittedBy: 4, type: 'artwork', status: 'approved', image: 'family_drawing.jpg', date: '2026-05-25', description: 'Aarav drew his whole family standing under a big yellow sun with a rainbow.' },
  { id: 2, title: 'Rainbow Butterfly Wings', studentId: 2, submittedBy: 4, type: 'artwork', status: 'pending', image: 'butterfly.jpg', date: yesterday, description: 'Ananya created this butterfly using tissue paper collage technique she learned in art class.' },
  { id: 3, title: 'My First Poem: Colors', studentId: 5, submittedBy: null, type: 'writing', status: 'approved', image: null, content: 'Red is the rose in my garden bright,\nBlue is the sky with birds in flight,\nGreen are the leaves on the tallest tree,\nYellow is the sun that shines on me!', date: '2026-05-20', description: '' },
  { id: 4, title: 'Clay Elephant Family', studentId: 14, submittedBy: null, type: 'craft', status: 'approved', image: 'elephant.jpg', date: '2026-05-22', description: 'Krish made a mama elephant and baby elephant from clay during art time.' },
  { id: 5, title: 'Leaf Print Garden', studentId: 7, submittedBy: null, type: 'artwork', status: 'approved', image: 'leaf_print.jpg', date: '2026-05-18', description: 'Myra used real leaves to stamp a beautiful garden scene with tempera paint.' },
  { id: 6, title: 'Number Story: My Five Senses', studentId: 10, submittedBy: null, type: 'writing', status: 'pending', image: null, content: 'I have two eyes to see the world,\nTwo ears to hear the birds,\nOne nose to smell the flowers,\nOne mouth to say kind words.', date: today, description: '' },
];

export const notifications = [
  { id: 1, userId: 4, type: 'attendance', message: 'Aarav has arrived safely and been marked present', time: '08:47 AM', date: today, read: false, icon: 'check' },
  { id: 2, userId: 4, type: 'attendance', message: 'Ananya has arrived safely and been marked present', time: '08:42 AM', date: today, read: false, icon: 'check' },
  { id: 3, userId: 4, type: 'meal', message: 'Aarav ate well today! Finished rice, dal, and vegetables', time: '12:35 PM', date: today, read: false, icon: 'heart' },
  { id: 4, userId: 4, type: 'feedback', message: 'New observation from Ms. Anita about Aarav\'s progress', time: '02:15 PM', date: today, read: false, icon: 'star' },
  { id: 5, userId: 4, type: 'notice', message: 'New notice: Annual Day Celebration - "The Garden of Dreams"', time: '10:00 AM', date: yesterday, read: true, icon: 'megaphone' },
  { id: 6, userId: 4, type: 'pickup', message: 'Ananya picked up safely by Mother at 02:00 PM', time: '02:00 PM', date: yesterday, read: true, icon: 'location' },
  { id: 7, userId: 4, type: 'homework', message: 'New activity posted: Nature Collection Walk', time: '03:30 PM', date: yesterday, read: true, icon: 'book' },
  { id: 8, userId: 4, type: 'bus', message: 'Sunrise Bus 1 has departed from school with Aarav', time: '02:15 PM', date: yesterday, read: true, icon: 'bus' },
  { id: 9, userId: 3, type: 'notice', message: 'New school notice: Water Bottle & Sun Hat Reminder', time: '09:00 AM', date: yesterday, read: true, icon: 'megaphone' },
  { id: 10, userId: 2, type: 'approval', message: 'New magazine submission awaiting your approval', time: '11:00 AM', date: yesterday, read: false, icon: 'photo' },
  { id: 11, userId: 2, type: 'attendance', message: 'Attendance for Casa A is complete - 16/18 present', time: '09:05 AM', date: today, read: false, icon: 'clipboard' },
];

export const parentCalendar = {
  studentId: 1,
  month: '2026-05',
  attendance: {
    '2026-05-01': 'present', '2026-05-02': 'present',
    '2026-05-05': 'present', '2026-05-06': 'present', '2026-05-07': 'present', '2026-05-08': 'present', '2026-05-09': 'present',
    '2026-05-12': 'present', '2026-05-13': 'late', '2026-05-14': 'present', '2026-05-15': 'present', '2026-05-16': 'present',
    '2026-05-19': 'present', '2026-05-20': 'present', '2026-05-21': 'absent', '2026-05-22': 'present', '2026-05-23': 'present',
    '2026-05-26': 'present', '2026-05-27': 'present', '2026-05-28': 'present', '2026-05-29': 'present',
  }
};
