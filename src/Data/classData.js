const classesData = [
  {
    id: 1,
    number: "01",
    title: "Strength Foundations",
    category: "Strength",
    level: "Beginner",
    duration: "60 Min",
    trainer: "Arjun Sharma",
    schedule: "Mon • Wed • Fri",
    time: "07:00 AM",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1600&q=90",

    description:
      "Learn proper lifting technique, build full-body strength and create a strong foundation for long-term progress.",

    about:
      "Strength Foundations is designed to teach you the fundamentals of strength training. You will learn proper exercise technique, improve body control and gradually build full-body strength.",

    benefits: [
      "Build full-body strength",
      "Improve lifting technique",
      "Develop muscle control",
      "Increase training confidence",
    ],
  },

  {
    id: 2,
    number: "02",
    title: "Power Lifting",
    category: "Strength",
    level: "Intermediate",
    duration: "60 Min",
    trainer: "Arjun Sharma",
    schedule: "Tue • Thu • Sat",
    time: "06:30 PM",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=90",

    description:
      "Improve your squat, bench and deadlift with focused strength programming and expert coaching.",

    about:
      "Power Lifting focuses on controlled strength development through compound movements. Each session helps improve technique, power and overall lifting performance.",

    benefits: [
      "Increase maximum strength",
      "Improve compound lifts",
      "Develop better technique",
      "Build training confidence",
    ],
  },

  {
    id: 3,
    number: "03",
    title: "Muscle Builder",
    category: "Strength",
    level: "All Levels",
    duration: "55 Min",
    trainer: "Vikram Singh",
    schedule: "Mon • Wed • Sat",
    time: "05:30 PM",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1600&q=90",

    description:
      "Structured resistance training designed to improve muscle strength, control and overall body composition.",

    about:
      "Muscle Builder combines resistance exercises with structured training to help improve muscle strength, control and overall fitness.",

    benefits: [
      "Build lean muscle",
      "Improve strength",
      "Increase muscle control",
      "Full-body resistance training",
    ],
  },

  {
    id: 4,
    number: "04",
    title: "Cardio Burn",
    category: "Cardio",
    level: "Beginner",
    duration: "45 Min",
    trainer: "Kabir Singh",
    schedule: "Mon • Wed • Fri",
    time: "06:30 AM",
    image:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1600&q=90",

    description:
      "Boost stamina, burn calories and improve cardiovascular fitness with an energetic guided workout.",

    about:
      "Cardio Burn is a fast-paced full-body cardio workout designed to burn calories, improve endurance and keep you energized. The class combines simple dynamic exercises with guided coaching, making it suitable for beginners who want to improve their overall fitness.",

    benefits: [
      "High calorie burn",
      "Improved endurance",
      "Full body workout",
      "Fun and energetic training",
    ],
  },

  {
    id: 5,
    number: "05",
    title: "Endurance Ride",
    category: "Cardio",
    level: "All Levels",
    duration: "50 Min",
    trainer: "Kabir Singh",
    schedule: "Tue • Thu • Sat",
    time: "07:30 AM",
    image:
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1600&q=90",

    description:
      "Build endurance and cardiovascular strength through challenging intervals and controlled intensity.",

    about:
      "Endurance Ride is designed to improve cardiovascular endurance through controlled intervals and sustained training. You can adjust the intensity to match your current fitness level.",

    benefits: [
      "Improve stamina",
      "Build endurance",
      "Support heart health",
      "Adjustable intensity",
    ],
  },

  {
    id: 6,
    number: "06",
    title: "Cardio Conditioning",
    category: "Cardio",
    level: "Intermediate",
    duration: "45 Min",
    trainer: "Neeraj Kumar",
    schedule: "Tue • Fri • Sun",
    time: "06:00 PM",
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=90",

    description:
      "Improve speed, stamina and total-body conditioning with fast-moving cardio exercises and circuits.",

    about:
      "Cardio Conditioning combines cardio drills and functional exercises to improve stamina, speed and overall conditioning.",

    benefits: [
      "Improve cardiovascular fitness",
      "Increase stamina",
      "Build conditioning",
      "Improve daily energy",
    ],
  },

  {
    id: 7,
    number: "07",
    title: "HIIT Blast",
    category: "HIIT",
    level: "Intermediate",
    duration: "40 Min",
    trainer: "Kabir Singh",
    schedule: "Mon • Wed • Sat",
    time: "06:00 PM",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=90",

    description:
      "High-intensity intervals combine strength and cardio for a powerful, efficient full-body workout.",

    about:
      "HIIT Blast uses short high-intensity exercise intervals with controlled recovery periods to challenge your full body.",

    benefits: [
      "Improve conditioning",
      "Build strength and stamina",
      "High-energy workout",
      "Improve athletic performance",
    ],
  },

  {
    id: 8,
    number: "08",
    title: "Power HIIT",
    category: "HIIT",
    level: "Advanced",
    duration: "35 Min",
    trainer: "Neeraj Kumar",
    schedule: "Tue • Thu • Sat",
    time: "07:00 PM",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1600&q=90",

    description:
      "Push your limits with explosive exercises, short recovery periods and high-energy conditioning.",

    about:
      "Power HIIT is an advanced high-intensity session combining explosive movement, conditioning and challenging intervals.",

    benefits: [
      "Advanced conditioning",
      "Improve power",
      "Build stamina",
      "Full-body challenge",
    ],
  },

  {
    id: 9,
    number: "09",
    title: "Full Body HIIT",
    category: "HIIT",
    level: "All Levels",
    duration: "40 Min",
    trainer: "Arjun Sharma",
    schedule: "Mon • Fri • Sun",
    time: "05:00 PM",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1600&q=90",

    description:
      "Train your entire body through dynamic intervals that build endurance, strength and athletic fitness.",

    about:
      "Full Body HIIT combines upper-body, lower-body and core exercises into one efficient interval workout.",

    benefits: [
      "Full-body training",
      "Improve endurance",
      "Develop strength",
      "High-energy intervals",
    ],
  },

  {
    id: 10,
    number: "10",
    title: "Morning Yoga",
    category: "Yoga",
    level: "Beginner",
    duration: "50 Min",
    trainer: "Riya Mehta",
    schedule: "Mon • Wed • Fri",
    time: "06:30 AM",
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1600&q=90",

    description:
      "Start your day with mindful movement, controlled breathing and gentle flexibility training.",

    about:
      "Morning Yoga combines gentle movement, breathing and stretching to help improve flexibility and start your day feeling active.",

    benefits: [
      "Improve flexibility",
      "Increase mobility",
      "Improve body awareness",
      "Support balance and posture",
    ],
  },

  {
    id: 11,
    number: "11",
    title: "Flexibility Flow",
    category: "Yoga",
    level: "All Levels",
    duration: "45 Min",
    trainer: "Riya Mehta",
    schedule: "Tue • Thu • Sat",
    time: "08:00 AM",
    image:
      "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=1600&q=90",

    description:
      "Improve mobility, posture and flexibility through controlled yoga flows and stretching exercises.",

    about:
      "Flexibility Flow uses controlled yoga movements and stretching to improve mobility, posture and range of motion.",

    benefits: [
      "Improve flexibility",
      "Increase mobility",
      "Support posture",
      "Improve movement quality",
    ],
  },

  {
    id: 12,
    number: "12",
    title: "Power Yoga",
    category: "Yoga",
    level: "Intermediate",
    duration: "55 Min",
    trainer: "Riya Mehta",
    schedule: "Mon • Thu • Sun",
    time: "06:00 PM",
    image:
      "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=1600&q=90",

    description:
      "A stronger yoga session combining balance, mobility, flexibility and controlled bodyweight strength.",

    about:
      "Power Yoga combines traditional yoga movement with stronger bodyweight sequences for mobility, balance and control.",

    benefits: [
      "Improve flexibility",
      "Build body control",
      "Develop balance",
      "Improve mobility",
    ],
  },

  {
    id: 13,
    number: "13",
    title: "Weight Loss Coaching",
    category: "Personal",
    level: "Personalized",
    duration: "60 Min",
    trainer: "Expert Coach",
    schedule: "Mon • Tue • Thu",
    time: "08:00 AM",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=90",

    description:
      "Personalized one-to-one workouts designed around your fitness level, lifestyle and weight-loss goal.",

    about:
      "Weight Loss Coaching gives you personalized training based on your current fitness level, goals and schedule.",

    benefits: [
      "Personalized workout plan",
      "One-to-one coaching",
      "Goal-focused training",
      "Progress support",
    ],
  },

  {
    id: 14,
    number: "14",
    title: "Strength Coaching",
    category: "Personal",
    level: "Personalized",
    duration: "60 Min",
    trainer: "Arjun Sharma",
    schedule: "Wed • Fri • Sat",
    time: "09:00 AM",
    image:
      "https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=1600&q=90",

    description:
      "Train one-to-one with focused strength programming, technique correction and progress tracking.",

    about:
      "Strength Coaching provides individual guidance to help improve lifting technique, strength and training consistency.",

    benefits: [
      "Personal strength plan",
      "Technique correction",
      "One-to-one coaching",
      "Progress tracking",
    ],
  },

  {
    id: 15,
    number: "15",
    title: "Fitness Transformation",
    category: "Personal",
    level: "Personalized",
    duration: "60 Min",
    trainer: "Expert Coach",
    schedule: "Tue • Thu • Sat",
    time: "05:00 PM",
    image:
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=1600&q=90",

    description:
      "A complete personal fitness approach built around your body, goals, schedule and training experience.",

    about:
      "Fitness Transformation provides personalized coaching and structured workouts built around your individual goals.",

    benefits: [
      "Personalized training",
      "Goal-focused plan",
      "Coach support",
      "Progress tracking",
    ],
  },

  {
    id: 16,
    number: "16",
    title: "Functional Basics",
    category: "Functional",
    level: "Beginner",
    duration: "50 Min",
    trainer: "Arjun Sharma",
    schedule: "Mon • Wed • Fri",
    time: "08:00 AM",
    image:
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?auto=format&fit=crop&w=1600&q=90",

    description:
      "Build better movement, balance and everyday strength through practical full-body exercises.",

    about:
      "Functional Basics teaches practical movements designed to improve everyday strength, balance and coordination.",

    benefits: [
      "Improve everyday movement",
      "Develop functional strength",
      "Improve balance",
      "Improve coordination",
    ],
  },

  {
    id: 17,
    number: "17",
    title: "Athletic Conditioning",
    category: "Functional",
    level: "Intermediate",
    duration: "50 Min",
    trainer: "Kabir Singh",
    schedule: "Tue • Thu • Sat",
    time: "05:30 PM",
    image:
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1600&q=90",

    description:
      "Develop speed, agility, coordination and strength through athletic movement-based training.",

    about:
      "Athletic Conditioning uses dynamic movements to develop speed, agility, coordination and functional strength.",

    benefits: [
      "Improve speed",
      "Develop agility",
      "Increase coordination",
      "Build functional strength",
    ],
  },

  {
    id: 18,
    number: "18",
    title: "Core & Mobility",
    category: "Functional",
    level: "All Levels",
    duration: "45 Min",
    trainer: "Riya Mehta",
    schedule: "Tue • Fri • Sun",
    time: "07:00 AM",
    image:
      "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?auto=format&fit=crop&w=1600&q=90",

    description:
      "Strengthen your core and improve mobility with controlled movements designed for better performance.",

    about:
      "Core & Mobility combines controlled core exercises with mobility work to improve movement quality and stability.",

    benefits: [
      "Build core strength",
      "Improve mobility",
      "Increase stability",
      "Improve movement control",
    ],
  },
];

export default classesData;