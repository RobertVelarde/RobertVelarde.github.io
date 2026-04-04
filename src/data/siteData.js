const siteData = {
  hero: {
    name: "Robert Velarde Jr.",
    headline: "Senior Software Engineer",
    tagline:
      "Building robust systems from kernel-level C to modern React interfaces.",
    headshot: "/headshot.jpg",
    socials: [
      {
        platform: "linkedin",
        url: "https://linkedin.com/in/velarder",
        label: "LinkedIn",
      },
      {
        platform: "github",
        url: "https://github.com/RobertVelarde",
        label: "GitHub",
      },
    ],
  },

  education: [
    {
      degree: "M.S. Computer Science",
      institution: "Georgia Institute of Technology",
      year: "2023",
      detail: "Specialization in Machine Learning",
    },
    {
      degree: "B.S. Software Engineering",
      institution: "Embry-Riddle Aeronautical University",
      year: "2018",
      detail: null,
    },
  ],

  experience: [
    {
      title: "Senior Software Engineer",
      company: "Entegris, Inc.",
      startDate: "July 2024",
      endDate: "Present",
      bullets: [
        "Modernized and stabilized legacy codebases for particle analysis and concentration monitoring products, significantly improving system reliability and maintainability.",
        "Collaborated directly with external customers to identify, scope, and develop high-impact software features for particle analyzers, streamlining workflows from data acquisition to reporting.",
      ],
    },
    {
      title: "Specialist Software Engineer",
      company: "L3Harris Technologies",
      startDate: "August 2021",
      endDate: "June 2024",
      bullets: [
        "Previously held Top Secret clearance, eligible for reinstatement.",
        "Architected a comprehensive Built-in-Test (BIT) system automating RF Loopback fault assessment, cutting troubleshooting time in half.",
        "Implemented logrotate-based log management on a unix system, increasing performance ~40% over the existing implementation.",
      ],
    },
    {
      title: "Software Engineer",
      company: "Northrop Grumman",
      startDate: "January 2020",
      endDate: "August 2021",
      bullets: [
        "Developed an optimized Bash script for in-place core file splitting, achieving a 4x performance gain with SHA-256 verification for data integrity.",
        "Developed kernel-level C software for real-time data processing and dynamic hardware configuration using memory-maps, signals, queues, and sockets.",
      ],
    },
    {
      title: "Associate Software Engineer",
      company: "Collins Aerospace",
      startDate: "August 2018",
      endDate: "January 2020",
      bullets: [
        "Engineered a thread-safe C++ solution for managing initialization message storage and cross-board forwarding, minimizing startup overhead.",
        "Ported a legacy codebase for a new client, collaborating with stakeholders on scope, requirements, and export restrictions.",
      ],
    },
    {
      title: "Programming Intern",
      company: "Irvine Police Department",
      startDate: "Summer 2016",
      endDate: null,
      bullets: [
        "Engineered real-time data automation systems for reports, maps, and bulletins, providing critical information to patrol officers and command staff.",
        "Deployed automation software across multiple Southern California police departments, boosting operational efficiency for crime analysts.",
      ],
    },
  ],

  projects: [
    {
      id: "zenith",
      title: "Zenith",
      subtitle: "Interactive Solar & Lunar Calculator",
      featured: true,
      description:
        "A full-featured, interactive solar and lunar calculator built on a Mapbox-powered map. Click any location on Earth and scrub through any date/time to see sunrise, sunset, moon phases, golden hour, twilight boundaries, and full-day trajectory arcs rendered as GeoJSON overlays.",
      challenge:
        "The core challenge was transforming astronomical data from the suncalc library into accurate, visually intuitive map overlays. This required implementing an azimuthal equidistant projection to plot celestial arcs on a local diagram, splitting trajectory paths at the horizon boundary while guarding against azimuth wrap-around artifacts, and computing timezone-correct trajectories by constructing Date objects in the location's local timezone via Luxon. The UI features dynamically-computed twilight gradient sliders and a procedural SVG moon phase icon using dual-arc path geometry.",
      techStack: [
        "React 19",
        "Vite",
        "Mapbox GL JS",
        "Tailwind CSS",
        "Luxon",
        "suncalc",
      ],
      github: "https://github.com/RobertVelarde/Zenith",
      liveUrl: null,
    },
    {
      id: "driving-camera",
      title: "Better Driving Camera",
      subtitle: "Project Zomboid Mod",
      featured: false,
      description:
        "A Java mod that replaces Project Zomboid's PlayerCamera class to add predictive, speed-proportional camera panning while driving. The camera leads in the direction of travel, scaling from zero offset at standstill to maximum at 90 km/h, with smooth lerp transitions.",
      challenge:
        "The key challenge was working within Project Zomboid's isometric projection system. The vehicle's forward vector must be rotated 45 degrees to align world-space direction with screen-space visual direction. An edge-intersection algorithm calculates where the direction vector hits the screen boundary to determine maximum camera offset, and the result is compensated for the current zoom level. The mod operates via full class replacement — the compiled .class file is merged directly into the game's JAR — requiring faithful preservation of all vanilla camera modes (joypad, keyboard pan, mouse aiming, return-to-center).",
      techStack: ["Java", "JOML", "LWJGL", "Project Zomboid API"],
      github: "https://github.com/RobertVelarde/Zomboid-BetterDrivingCamera",
      liveUrl: null,
    },
    {
      id: "caravan-food",
      title: "Caravan Food Policies",
      subtitle: "RimWorld Mod",
      featured: false,
      description:
        "A C# mod that adds per-pawn food policy management for RimWorld caravans. Pawns automatically switch between home and caravan food policies when departing on or returning from caravans, with a three-column UI in the Assign tab.",
      challenge:
        "The main challenge was hooking into five critical game methods via Harmony patches while maintaining stability across game updates and mod compatibility. Food supply calculations temporarily swap all departing pawns to caravan policies using a Prefix/Finalizer pattern that guarantees restoration even if the patched method throws. The mod persists data in a WorldComponent with a versioned migration system that converts from the original label-based lookup to ID-based storage, preventing breakage when players rename policies.",
      techStack: ["C#", ".NET", "Harmony 2", "Unity", "XML Patching"],
      github: "https://github.com/RobertVelarde/RimWorld-CaravanFoodPolicies",
      liveUrl: null,
    },
  ],

  skills: {
    Languages: ["C++", "C#", "C", "Python", "Java", "JavaScript", "Bash", "Lua"],
    "Libraries & Frameworks": [
      "React",
      "Tailwind CSS",
      "Mapbox GL JS",
      "PyTorch",
      "Pandas",
      "Scikit-learn",
      "NumPy",
      "Matplotlib",
      "Harmony",
    ],
    "Tools & Platforms": [
      "Git",
      "Linux",
      "Visual Studio",
      "Vite",
      "Jira",
      "Jenkins",
      "BitBucket",
    ],
  },

  contact: {
    heading: "Get In Touch",
    description:
      "Interested in working together or have a question? Send me a message and I'll get back to you.",
    formspreeEndpoint: "https://formspree.io/f/xbdppkrd",
  },
};

export default siteData;
