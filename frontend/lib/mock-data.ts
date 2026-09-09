import type { Experience, Project, Skill } from "./types";

/**
 * ---------------------------------------------------------------------------
 * PLACEHOLDER CONTENT — replace with real data once provided.
 * Anything wrapped in [brackets] or marked TODO is invented scaffolding and
 * must be confirmed before publishing. Structure is final; wording is not.
 * ---------------------------------------------------------------------------
 */

export const projects: Project[] = [
  {
    slug: "whanos",
    title: "Whanos",
    tagline: "From git push to production on Kubernetes — automatically.",
    shortDescription:
      "A CI/CD platform that detects a project's language, containerises it, and deploys it to Kubernetes with a single git push.",
    category: "DevOps",
    featured: true,
    status: "completed",
    year: "2025",
    role: "DevOps Engineer",
    technologies: ["Docker", "Kubernetes", "Jenkins", "Helm", "Ansible", "Groovy"],
    coverImage: null,
    links: {
      github: "https://github.com/Kalambodaniel143",
      // live: "",
      // docs: "",
    },
    caseStudy: {
      overview:
        "Whanos is an automated delivery pipeline: push code to a repository and the platform builds, packages and ships it to a Kubernetes cluster without any manual step. [Describe the exact scope you owned.]",
      problem:
        "Teams waste time wiring the same build-and-deploy plumbing for every new service. Whanos removes that by standardising containerisation and deployment across five supported languages (C, Java, JavaScript, Python, Befunge).",
      contribution:
        "[TODO: your precise contribution — e.g. authored the Jenkins shared library, the base images, the Ansible provisioning, the Helm charts.]",
      stack:
        "Jenkins for orchestration, Docker for base and per-language images, Ansible to provision the Jenkins host, Helm to template Kubernetes manifests, a private registry for image storage.",
      architecture:
        "A Jenkins job clones the target repo, inspects it for a Dockerfile or a recognised language layout, builds the matching image from a Whanos base image, pushes to the registry, then applies a Helm-templated Deployment + Service to the cluster.",
      decisions: [
        {
          heading: "Standard base images per language",
          body: "Pre-built base images keep per-project builds fast and predictable, and make security patching a single-point operation.",
        },
        {
          heading: "Helm over raw manifests",
          body: "Templating lets one chart serve every project; only values (image, port, replicas) change per deployment.",
        },
      ],
      challenges: [
        {
          heading: "Language auto-detection",
          body: "[Describe how the pipeline decides which base image to use and how ambiguous repos are handled.]",
        },
        {
          heading: "Cluster access from CI",
          body: "[Describe how Jenkins authenticates to the cluster and how credentials are scoped.]",
        },
      ],
      results:
        "[TODO: measurable outcome — e.g. new service from zero to running in under X minutes, N languages supported.]",
      learned:
        "Deep, hands-on understanding of the container lifecycle, Kubernetes primitives, and why reproducible builds matter for reliable delivery.",
    },
  },
  {
    slug: "aptely",
    title: "Aptely",
    tagline: "A recruitment platform connecting candidates and companies.",
    shortDescription:
      "Full-stack recruitment platform with candidate profiles, job postings and application tracking. [Confirm feature set.]",
    category: "Full-Stack",
    featured: true,
    status: "in-progress",
    year: "2025",
    role: "Full-Stack Developer",
    technologies: ["TypeScript", "React", "Node.js", "PostgreSQL", "REST API"],
    coverImage: null,
    links: {
      github: "https://github.com/Kalambodaniel143",
    },
    caseStudy: {
      overview:
        "[TODO: one-paragraph overview of what Aptely does and who it is for.]",
      problem:
        "[TODO: the recruitment pain point Aptely addresses.]",
      contribution:
        "[TODO: which layers you built — frontend, API, data model, auth, deployment.]",
      stack:
        "[Confirm] Frontend in React/TypeScript, backend REST API in Node.js, PostgreSQL for persistence.",
      architecture:
        "[TODO: client ↔ API ↔ database, plus any background jobs, file storage or third-party integrations.]",
      decisions: [
        {
          heading: "[Decision title]",
          body: "[Why you chose this approach over the alternative.]",
        },
      ],
      challenges: [
        {
          heading: "[Challenge title]",
          body: "[Problem encountered and how you solved it.]",
        },
      ],
      results: "[TODO: current state, users, or demo availability.]",
      learned:
        "[TODO: what building an application end-to-end taught you about architecture and product trade-offs.]",
    },
  },
  {
    slug: "epibot-trc",
    title: "EpiBot — Tekbot Robotics Challenge",
    tagline: "An autonomous robot that sorts waste on its own.",
    shortDescription:
      "Autonomous mobile robot for the Tekbot Robotics Challenge 2025: perception, navigation and decision-making to detect and sort waste.",
    category: "Robotics",
    featured: true,
    status: "completed",
    year: "2025",
    role: "Robotics Engineer — perception & autonomy",
    technologies: ["ROS", "Python", "C++", "Computer Vision", "Embedded Linux"],
    coverImage: null,
    links: {
      github: "https://github.com/Kalambodaniel143",
    },
    caseStudy: {
      overview:
        "Over nine months our team designed and built an autonomous robot able to identify waste items and sort them into the correct bin, as part of the Tekbot Robotics Challenge 2025.",
      problem:
        "The robot must perceive its environment, classify objects, plan a path and act — reliably, on constrained embedded hardware, without human intervention.",
      contribution:
        "[TODO: your area — e.g. the vision pipeline, the sorting logic, sensor integration, the ROS node graph.]",
      stack:
        "ROS for the node architecture and messaging, Python/C++ for the nodes, a camera-based perception stack, embedded Linux on the robot's compute board.",
      architecture:
        "Sensor nodes publish camera and range data; a perception node classifies items; a decision node selects the target bin; a motion node drives the actuators. [Refine to match your build.]",
      decisions: [
        {
          heading: "ROS as the backbone",
          body: "A publish/subscribe graph let the team develop perception, decision and motion independently and integrate through well-defined message types.",
        },
      ],
      challenges: [
        {
          heading: "Reliable perception under changing light",
          body: "[Describe how the vision pipeline was made robust — calibration, thresholds, model choice.]",
        },
        {
          heading: "Real-time constraints on embedded hardware",
          body: "[Describe the latency budget and how you stayed within it.]",
        },
      ],
      results:
        "[TODO: competition result, sorting accuracy, run completion rate.]",
      learned:
        "How the perception → decision → action loop behaves under real-world noise, and the discipline required to integrate a multi-person robotics system.",
    },
  },
  {
    slug: "my-torch",
    title: "My_Torch",
    tagline: "A neural network built from scratch — no ML libraries.",
    shortDescription:
      "Feed-forward neural network implemented from first principles, trained with supervised learning to classify chess board states (check, checkmate, stalemate…).",
    category: "AI",
    featured: false,
    status: "completed",
    year: "2024",
    role: "Solo project",
    technologies: ["C++", "Linear Algebra", "Backpropagation"],
    coverImage: null,
    links: {
      github: "https://github.com/Kalambodaniel143",
    },
    caseStudy: {
      overview:
        "My_Torch is a small neural-network engine written without any specialised ML framework: the layers, forward pass, loss and backpropagation are all hand-implemented.",
      problem:
        "Understand neural networks by building one — then use it to classify the state of a chess game from a board description.",
      contribution: "Entire project: engine, training loop, dataset handling, CLI.",
      stack: "[Confirm language] C++, custom matrix operations, gradient descent.",
      architecture:
        "A configurable stack of dense layers with activation functions; a training mode that learns from a labelled dataset and a prediction mode that loads a saved network.",
      decisions: [
        {
          heading: "Implement backprop by hand",
          body: "Writing the gradient computation manually was the whole point — it makes the maths concrete rather than abstract.",
        },
      ],
      challenges: [
        {
          heading: "Numerical stability",
          body: "[Describe issues with exploding/vanishing values and how you handled them — normalisation, learning-rate tuning.]",
        },
      ],
      results:
        "[TODO: classification accuracy on the evaluation set.]",
      learned:
        "The mechanics of gradient descent and backpropagation, and why framework abstractions exist.",
    },
  },
  {
    slug: "gomoku",
    title: "Gomoku AI",
    tagline: "A real-time strategic game AI.",
    shortDescription:
      "An AI opponent for Gomoku (five-in-a-row) that evaluates positions and plays strategically under a strict per-move time limit.",
    category: "AI",
    featured: false,
    status: "completed",
    year: "2023",
    role: "Solo project",
    technologies: ["C++", "Minimax", "Alpha-Beta Pruning", "Heuristics"],
    coverImage: null,
    links: {
      github: "https://github.com/Kalambodaniel143",
    },
    caseStudy: {
      overview:
        "A Gomoku engine that communicates over the standard protocol and must return a strong move within a fixed time budget.",
      problem:
        "The search space is large; the AI needs a good position-evaluation heuristic and an efficient, time-bounded search.",
      contribution: "Entire project.",
      stack: "C++, minimax with alpha-beta pruning, a pattern-based board evaluation.",
      architecture:
        "A move generator restricted to relevant cells, an evaluation function scoring threats and alignments, and an iterative-deepening search that respects the time limit.",
      decisions: [
        {
          heading: "Restrict the search to cells near existing stones",
          body: "Cuts the branching factor dramatically with negligible loss in play strength.",
        },
      ],
      challenges: [
        {
          heading: "Staying within the time limit",
          body: "[Describe iterative deepening / early cutoff strategy.]",
        },
      ],
      results: "[TODO: win rate against reference opponents.]",
      learned:
        "Adversarial search, heuristic design, and the trade-off between search depth and evaluation quality.",
    },
  },
];

export const experiences: Experience[] = [
  {
    id: "master-ai",
    type: "education",
    title: "Master's in Artificial Intelligence",
    organization: "[School name — Paris]",
    location: "Paris, France",
    startDate: "2026-09",
    endDate: null,
    description:
      "Graduate programme focused on artificial intelligence and autonomous systems. [Confirm school and specialisation.]",
    highlights: [],
  },
  {
    id: "epitech-bachelor",
    type: "education",
    title: "Bachelor in Computer Science (Expertise Informatique)",
    organization: "Epitech Bénin",
    location: "Cotonou, Bénin",
    startDate: "2023-09",
    endDate: "2026-07",
    description:
      "Three-year project-based curriculum in software engineering, with an orientation towards AI, autonomous systems and infrastructure automation.",
    highlights: [
      "50+ technical projects across systems, AI, web and DevOps",
      "Team-based delivery under real deadlines",
    ],
  },
  {
    id: "trc-2025",
    type: "competition",
    title: "Tekbot Robotics Challenge 2025 — Participant",
    organization: "Tekbot Robotics Challenge",
    location: "Bénin",
    startDate: "2024-11",
    endDate: "2025-07",
    description:
      "Nine months designing and building an autonomous robot able to detect and sort waste.",
    highlights: [
      "Perception, navigation and decision-making with ROS",
      "[Add competition result]",
    ],
  },
  {
    id: "africereal",
    type: "work",
    title: "Software Engineering Intern",
    organization: "Africereal",
    location: "[Location]",
    startDate: "2024-06",
    endDate: "2024-08",
    description:
      "Two-month internship building an e-learning platform with modern web frameworks, and designing and developing a 3D game.",
    highlights: [
      "Contributed to an e-learning web platform",
      "Built a 3D game [engine / stack to confirm]",
    ],
  },
  {
    id: "highschool",
    type: "education",
    title: "High School Diploma",
    organization: "Complexe Scolaire Frère Nkadilu",
    location: "[Location]",
    startDate: "2020-09",
    endDate: "2023-07",
    description: "Scientific track. Final-year project: a strategic real-time game AI (Gomoku).",
    highlights: [],
  },
];

export const skills: Skill[] = [
  { name: "C", category: "Programming", level: "strong" },
  { name: "C++", category: "Programming", level: "strong" },
  { name: "Python", category: "Programming", level: "strong" },
  { name: "Haskell", category: "Programming", level: "comfortable" },
  { name: "TypeScript", category: "Programming", level: "comfortable" },

  { name: "React / Next.js", category: "Web Development", level: "comfortable" },
  { name: "Django / DRF", category: "Web Development", level: "strong" },
  { name: "Express.js", category: "Web Development", level: "comfortable" },
  { name: "REST APIs", category: "Web Development", level: "strong" },
  { name: "PostgreSQL", category: "Web Development", level: "comfortable" },

  { name: "Docker", category: "DevOps & Infrastructure", level: "strong" },
  { name: "Kubernetes", category: "DevOps & Infrastructure", level: "comfortable" },
  { name: "Jenkins", category: "DevOps & Infrastructure", level: "comfortable" },
  { name: "GitHub Actions", category: "DevOps & Infrastructure", level: "comfortable" },
  { name: "Ansible", category: "DevOps & Infrastructure", level: "comfortable" },
  { name: "Helm", category: "DevOps & Infrastructure", level: "learning" },

  { name: "ROS", category: "AI & Robotics", level: "comfortable" },
  { name: "Neural networks (from scratch)", category: "AI & Robotics", level: "comfortable" },
  { name: "Computer vision", category: "AI & Robotics", level: "learning" },
  { name: "Adversarial search", category: "AI & Robotics", level: "comfortable" },

  { name: "Git", category: "Tools", level: "strong" },
  { name: "Linux", category: "Tools", level: "strong" },
  { name: "Bash", category: "Tools", level: "comfortable" },
];
