// src/locales/i18n.js

const translations = {
  en: {
    header: {
      problemsOverview: "Problems Overview",
      analysis: "Analysis",
      feed: "Feed",
      profile: "Profile",
      logout: "Logout",
      staff: "Staff",
      lokSabha: "Lok Sabha",
    },
    table: {
      problemID: "Problem ID",
      description: "Description",
      location: "Location",
      reportedBy: "Reported By",
      status: "Status",
      noProblems: "No problems in this category.",
    },
    categories: {
      allIssues: "All Issues",
      infrastructure: "Infrastructure",
      cleanliness: "Cleanliness",
      publicSafety: "Public Safety",
      environment: "Environment",
      education: "Education",
      waterDrainage: "Water & Drainage",
      traffic: "Traffic",
    },
    status: {
      open: "Open",
      inProgress: "In Progress",
      resolved: "Resolved",
    },
    posts: {
      noPosts: "No posts in this category.",
      addNew: "Add New Post",
      author: "Author *",
      title: "Title *",
      description: "Description *",
      category: "Category *",
      selectCategory: "Select Category",
      photo: "Photo",
      addPhoto: "Add a photo",
      dragDrop: "Drag and drop or click to upload",
      remove: "Remove",
      cancel: "Cancel",
      post: "Post",
      viewDetails: "View Details",
      helpText: "I am here to help you",
    },
    postsData: [
      {
        author: "Ravi Kumar",
        location: "Delhi, India",
        title: "Potholes on Main Road",
        description:
          "Several deep potholes on MG Road causing accidents. Needs urgent repair.",
        image:
          "https://cdn.shopify.com/s/files/1/0274/7288/7913/files/MicrosoftTeams-image_32.jpg?v=1705315718",
        likes: 10,
        comments: 3,
        actionText: "View Details",
        category: "Infrastructure",
      },
      {
        author: "Neha Sharma",
        location: "Mumbai, India",
        title: "Overflowing Garbage Bins",
        description:
          "Garbage not collected for a week in Andheri East. Strong smell in the area.",
        image:
          "https://www.norcalcompactors.net/wp-content/uploads/2020/05/overflowing-garbage.jpg",
        likes: 18,
        comments: 7,
        actionText: "View Details",
        category: "Cleanliness",
      },
      {
        author: "Mohammed Ali",
        location: "Lucknow, India",
        title: "Streetlights not working",
        description:
          "Entire lane near Hazratganj is dark at night due to broken streetlights.",
        image:
          "https://media.istockphoto.com/id/496026170/photo/broken-street-lamp.jpg?s=612x612&w=0&k=20&c=1bX4binyYkD8P_ZzHbfRTspKowTIGoTkSjxvbcjAkY4=",
        likes: 7,
        comments: 2,
        actionText: "View Details",
        category: "Public Safety",
      },
      {
        author: "Priya Singh",
        location: "Chennai, India",
        title: "Tree Cutting in Park",
        description:
          "Old trees in Anna Nagar park being cut without notice. Residents protesting.",
        image:
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=80&auto=format&fit=crop",
        likes: 22,
        comments: 5,
        actionText: "View Details",
        category: "Environment",
      },
      {
        author: "Ankit Verma",
        location: "Patna, India",
        title: "Broken School Building",
        description:
          "Government school in Kankarbagh has damaged classrooms. Unsafe for children.",
        image:
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80&auto=format&fit=crop",
        likes: 14,
        comments: 6,
        actionText: "View Details",
        category: "Education",
      },
      {
        author: "Sunita Devi",
        location: "Bhopal, India",
        title: "Water Supply Problem",
        description:
          "No water supply in Ashoka Colony since 3 days. Residents struggling.",
        image:
          "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=1200&q=80&auto=format&fit=crop",
        likes: 11,
        comments: 4,
        actionText: "View Details",
        category: "Water & Drainage",
      },
      {
        author: "Rahul Mehta",
        location: "Jaipur, India",
        title: "Traffic Signal Not Working",
        description:
          "Signal at MI Road crossing is broken, causing traffic chaos during peak hours.",
        image:
          "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1200&q=80&auto=format&fit=crop",
        likes: 9,
        comments: 1,
        actionText: "View Details",
        category: "Traffic",
      },
    ],
  },

  hi: {
    header: {
      problemsOverview: "समस्याओं का अवलोकन",
      analysis: "विश्लेषण",
      feed: "फ़ीड",
      profile: "प्रोफ़ाइल",
      logout: "लॉगआउट",
      staff: "स्टाफ",
      lokSabha: "लोक सभा",
    },
    table: {
      problemID: "समस्या आईडी",
      description: "विवरण",
      location: "स्थान",
      reportedBy: "द्वारा रिपोर्ट किया गया",
      status: "स्थिति",
      noProblems: "इस श्रेणी में कोई समस्या नहीं है।",
    },
    categories: {
      allIssues: "सभी समस्याएँ",
      infrastructure: "इंफ्रास्ट्रक्चर",
      cleanliness: "स्वच्छता",
      publicSafety: "सार्वजनिक सुरक्षा",
      environment: "पर्यावरण",
      education: "शिक्षा",
      waterDrainage: "जल और निकासी",
      traffic: "यातायात",
    },
    status: {
      open: "खुला",
      inProgress: "प्रगति में",
      resolved: "सुलझा हुआ",
    },
    posts: {
      noPosts: "इस श्रेणी में कोई पोस्ट नहीं है।",
      addNew: "नई पोस्ट जोड़ें",
      author: "लेखक *",
      title: "शीर्षक *",
      description: "विवरण *",
      category: "श्रेणी *",
      selectCategory: "श्रेणी चुनें",
      photo: "फ़ोटो",
      addPhoto: "एक फ़ोटो जोड़ें",
      dragDrop: "खींचें और छोड़ें या अपलोड करने के लिए क्लिक करें",
      remove: "हटाएँ",
      cancel: "रद्द करें",
      post: "पोस्ट करें",
      viewDetails: "विवरण देखें",
      helpText: "मैं आपकी मदद करने के लिए यहाँ हूँ",
    },
    postsData: [
      {
        author: "रवि कुमार",
        location: "दिल्ली, भारत",
        title: "मुख्य सड़क पर गड्ढे",
        description:
          "एमजी रोड पर कई गहरे गड्ढे दुर्घटनाओं का कारण बन रहे हैं। तुरंत मरम्मत की आवश्यकता है।",
        image:
          "https://cdn.shopify.com/s/files/1/0274/7288/7913/files/MicrosoftTeams-image_32.jpg?v=1705315718",
        likes: 10,
        comments: 3,
        actionText: "विवरण देखें",
        category: "इंफ्रास्ट्रक्चर",
      },
      {
        author: "नेहा शर्मा",
        location: "मुंबई, भारत",
        title: "कचरे के डिब्बे भरे हुए",
        description:
          "अंधेरी ईस्ट में एक सप्ताह से कचरा नहीं उठाया गया। क्षेत्र में तेज़ बदबू है।",
        image:
          "https://www.norcalcompactors.net/wp-content/uploads/2020/05/overflowing-garbage.jpg",
        likes: 18,
        comments: 7,
        actionText: "विवरण देखें",
        category: "स्वच्छता",
      },
      {
        author: "मोहम्मद अली",
        location: "लखनऊ, भारत",
        title: "स्ट्रीट लाइट खराब",
        description:
          "हजरतगंज के पास पूरी गली रात में अंधेरे में है क्योंकि स्ट्रीट लाइट टूटी हुई हैं।",
        image:
          "https://media.istockphoto.com/id/496026170/photo/broken-street-lamp.jpg?s=612x612&w=0&k=20&c=1bX4binyYkD8P_ZzHbfRTspKowTIGoTkSjxvbcjAkY4=",
        likes: 7,
        comments: 2,
        actionText: "विवरण देखें",
        category: "सार्वजनिक सुरक्षा",
      },
      {
        author: "प्रिया सिंह",
        location: "चेन्नई, भारत",
        title: "पार्क में पेड़ों की कटाई",
        description:
          "अन्ना नगर पार्क में पुराने पेड़ बिना सूचना के काटे जा रहे हैं। निवासी विरोध कर रहे हैं।",
        image:
          "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&q=80&auto=format&fit=crop",
        likes: 22,
        comments: 5,
        actionText: "विवरण देखें",
        category: "पर्यावरण",
      },
      {
        author: "अंकित वर्मा",
        location: "पटना, भारत",
        title: "टूटी हुई स्कूल बिल्डिंग",
        description:
          "कंकड़बाग का सरकारी स्कूल क्षतिग्रस्त कक्षाओं के साथ है। बच्चों के लिए असुरक्षित।",
        image:
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80&auto=format&fit=crop",
        likes: 14,
        comments: 6,
        actionText: "विवरण देखें",
        category: "शिक्षा",
      },
      {
        author: "सुनीता देवी",
        location: "भोपाल, भारत",
        title: "पानी की आपूर्ति समस्या",
        description:
          "अशोका कॉलोनी में 3 दिनों से पानी की आपूर्ति नहीं है। निवासी परेशान हैं।",
        image:
          "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=1200&q=80&auto=format&fit=crop",
        likes: 11,
        comments: 4,
        actionText: "विवरण देखें",
        category: "जल और निकासी",
      },
      {
        author: "राहुल मेहता",
        location: "जयपुर, भारत",
        title: "ट्रैफिक सिग्नल खराब",
        description:
          "एमआई रोड क्रॉसिंग पर सिग्नल खराब है, जिससे व्यस्त समय में यातायात अव्यवस्थित हो रहा है।",
        image:
          "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1200&q=80&auto=format&fit=crop",
        likes: 9,
        comments: 1,
        actionText: "विवरण देखें",
        category: "यातायात",
      },
    ],
  },
};

export default translations;
