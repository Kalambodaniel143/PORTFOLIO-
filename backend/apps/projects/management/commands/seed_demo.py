"""
Populate the database with placeholder portfolio content.

Idempotent: run it as many times as you like. It mirrors the frontend mock
data so the site looks identical whether or not the API is wired up.

    python manage.py seed_demo          # add / update demo content
    python manage.py seed_demo --flush  # wipe portfolio tables first
"""
from datetime import date

from django.core.management.base import BaseCommand
from django.db import transaction

from apps.contact.models import ContactMessage
from apps.experience.models import Experience, ExperienceHighlight
from apps.projects.models import (
    CaseStudyPoint,
    Project,
    ProjectTechnology,
    SchoolProject,
    Technology,
)
from apps.skills.models import Skill

TECHNOLOGIES = {
    "Docker": "devops",
    "Kubernetes": "devops",
    "Jenkins": "devops",
    "Helm": "devops",
    "Ansible": "devops",
    "GitHub Actions": "devops",
    "Docker Compose": "devops",
    "Groovy": "language",
    "C": "language",
    "C++": "language",
    "Python": "language",
    "Haskell": "language",
    "TypeScript": "language",
    "React": "frontend",
    "Next.js": "frontend",
    "Node.js": "backend",
    "Django": "backend",
    "Express.js": "backend",
    "REST API": "backend",
    "PostgreSQL": "database",
    "ROS": "ai",
    "Computer Vision": "ai",
    "Embedded Linux": "devops",
    "Minimax": "ai",
    "Alpha-Beta Pruning": "ai",
    "Backpropagation": "ai",
    "Linear Algebra": "ai",
    "Heuristics": "ai",
    "CSFML": "tool",
    "ncurses": "tool",
}

PROJECTS = [
    {
        "slug": "whanos",
        "title": "Whanos",
        "tagline": "From git push to production on Kubernetes — automatically.",
        "short_description": "A CI/CD platform that detects a project's language, containerises it, and deploys it to Kubernetes with a single git push.",
        "category": "DevOps",
        "featured": True,
        "status": "completed",
        "year": "2025",
        "role": "DevOps Engineer",
        "order": 1,
        "github_url": "https://github.com/Kalambodaniel143",
        "technologies": ["Docker", "Kubernetes", "Jenkins", "Helm", "Ansible", "Groovy"],
        "overview": "Whanos is an automated delivery pipeline: push code to a repository and the platform builds, packages and ships it to a Kubernetes cluster without any manual step. [Describe the exact scope you owned.]",
        "problem": "Teams waste time wiring the same build-and-deploy plumbing for every new service. Whanos removes that by standardising containerisation and deployment across supported languages.",
        "contribution": "[TODO: your precise contribution.]",
        "stack": "Jenkins for orchestration, Docker for base and per-language images, Ansible to provision the Jenkins host, Helm to template Kubernetes manifests, a private registry for image storage.",
        "architecture": "A Jenkins job clones the target repo, inspects it for a Dockerfile or a recognised language layout, builds the matching image from a Whanos base image, pushes to the registry, then applies a Helm-templated Deployment + Service to the cluster.",
        "results": "[TODO: measurable outcome.]",
        "learned": "Deep, hands-on understanding of the container lifecycle, Kubernetes primitives, and why reproducible builds matter for reliable delivery.",
        "decisions": [
            ("Standard base images per language", "Pre-built base images keep per-project builds fast and predictable, and make security patching a single-point operation."),
            ("Helm over raw manifests", "Templating lets one chart serve every project; only values change per deployment."),
        ],
        "challenges": [
            ("Language auto-detection", "[Describe how the pipeline decides which base image to use.]"),
            ("Cluster access from CI", "[Describe how Jenkins authenticates to the cluster.]"),
        ],
    },
    {
        "slug": "aptely",
        "title": "Aptely",
        "tagline": "A recruitment platform connecting candidates and companies.",
        "short_description": "Full-stack recruitment platform with candidate profiles, job postings and application tracking. [Confirm feature set.]",
        "category": "Full-Stack",
        "featured": True,
        "status": "in-progress",
        "year": "2025",
        "role": "Full-Stack Developer",
        "order": 2,
        "github_url": "https://github.com/Kalambodaniel143",
        "technologies": ["TypeScript", "React", "Node.js", "PostgreSQL", "REST API"],
        "overview": "[TODO: one-paragraph overview of what Aptely does and who it is for.]",
        "problem": "[TODO: the recruitment pain point Aptely addresses.]",
        "contribution": "[TODO: which layers you built.]",
        "stack": "[Confirm] Frontend in React/TypeScript, backend REST API in Node.js, PostgreSQL for persistence.",
        "architecture": "[TODO: client <-> API <-> database, plus any background jobs or integrations.]",
        "results": "[TODO: current state, users, or demo availability.]",
        "learned": "[TODO: what building an application end-to-end taught you.]",
        "decisions": [("[Decision title]", "[Why you chose this approach over the alternative.]")],
        "challenges": [("[Challenge title]", "[Problem encountered and how you solved it.]")],
    },
    {
        "slug": "epibot-trc",
        "title": "EpiBot — Tekbot Robotics Challenge",
        "tagline": "An autonomous robot that sorts waste on its own.",
        "short_description": "Autonomous mobile robot for the Tekbot Robotics Challenge 2025: perception, navigation and decision-making to detect and sort waste.",
        "category": "Robotics",
        "featured": True,
        "status": "completed",
        "year": "2025",
        "role": "Robotics Engineer — perception & autonomy",
        "order": 3,
        "github_url": "https://github.com/Kalambodaniel143",
        "technologies": ["ROS", "Python", "C++", "Computer Vision", "Embedded Linux"],
        "overview": "Over nine months our team designed and built an autonomous robot able to identify waste items and sort them into the correct bin, as part of the Tekbot Robotics Challenge 2025.",
        "problem": "The robot must perceive its environment, classify objects, plan a path and act — reliably, on constrained embedded hardware, without human intervention.",
        "contribution": "[TODO: your area — e.g. the vision pipeline, the sorting logic, sensor integration.]",
        "stack": "ROS for the node architecture and messaging, Python/C++ for the nodes, a camera-based perception stack, embedded Linux on the robot's compute board.",
        "architecture": "Sensor nodes publish camera and range data; a perception node classifies items; a decision node selects the target bin; a motion node drives the actuators.",
        "results": "[TODO: competition result, sorting accuracy, run completion rate.]",
        "learned": "How the perception -> decision -> action loop behaves under real-world noise, and the discipline required to integrate a multi-person robotics system.",
        "decisions": [("ROS as the backbone", "A publish/subscribe graph let the team develop perception, decision and motion independently and integrate through well-defined message types.")],
        "challenges": [
            ("Reliable perception under changing light", "[Describe how the vision pipeline was made robust.]"),
            ("Real-time constraints on embedded hardware", "[Describe the latency budget and how you stayed within it.]"),
        ],
    },
    {
        "slug": "my-torch",
        "title": "My_Torch",
        "tagline": "A neural network built from scratch — no ML libraries.",
        "short_description": "Feed-forward neural network implemented from first principles, trained with supervised learning to classify chess board states.",
        "category": "AI",
        "featured": False,
        "status": "completed",
        "year": "2024",
        "role": "Solo project",
        "order": 4,
        "github_url": "https://github.com/Kalambodaniel143",
        "technologies": ["C++", "Linear Algebra", "Backpropagation"],
        "overview": "My_Torch is a small neural-network engine written without any specialised ML framework: the layers, forward pass, loss and backpropagation are all hand-implemented.",
        "problem": "Understand neural networks by building one — then use it to classify the state of a chess game from a board description.",
        "contribution": "Entire project: engine, training loop, dataset handling, CLI.",
        "stack": "[Confirm language] C++, custom matrix operations, gradient descent.",
        "architecture": "A configurable stack of dense layers with activation functions; a training mode that learns from a labelled dataset and a prediction mode that loads a saved network.",
        "results": "[TODO: classification accuracy on the evaluation set.]",
        "learned": "The mechanics of gradient descent and backpropagation, and why framework abstractions exist.",
        "decisions": [("Implement backprop by hand", "Writing the gradient computation manually was the whole point — it makes the maths concrete.")],
        "challenges": [("Numerical stability", "[Describe issues with exploding/vanishing values and how you handled them.]")],
    },
    {
        "slug": "gomoku",
        "title": "Gomoku AI",
        "tagline": "A real-time strategic game AI.",
        "short_description": "An AI opponent for Gomoku (five-in-a-row) that evaluates positions and plays strategically under a strict per-move time limit.",
        "category": "AI",
        "featured": False,
        "status": "completed",
        "year": "2023",
        "role": "Solo project",
        "order": 5,
        "github_url": "https://github.com/Kalambodaniel143",
        "technologies": ["C++", "Minimax", "Alpha-Beta Pruning", "Heuristics"],
        "overview": "A Gomoku engine that communicates over the standard protocol and must return a strong move within a fixed time budget.",
        "problem": "The search space is large; the AI needs a good position-evaluation heuristic and an efficient, time-bounded search.",
        "contribution": "Entire project.",
        "stack": "C++, minimax with alpha-beta pruning, a pattern-based board evaluation.",
        "architecture": "A move generator restricted to relevant cells, an evaluation function scoring threats and alignments, and an iterative-deepening search that respects the time limit.",
        "results": "[TODO: win rate against reference opponents.]",
        "learned": "Adversarial search, heuristic design, and the trade-off between search depth and evaluation quality.",
        "decisions": [("Restrict the search to cells near existing stones", "Cuts the branching factor dramatically with negligible loss in play strength.")],
        "challenges": [("Staying within the time limit", "[Describe iterative deepening / early cutoff strategy.]")],
    },
]

EXPERIENCES = [
    {
        "type": "education",
        "title": "Master's in Artificial Intelligence",
        "organization": "[School name — Paris]",
        "location": "Paris, France",
        "start_date": date(2026, 9, 1),
        "end_date": None,
        "description": "Graduate programme focused on artificial intelligence and autonomous systems. [Confirm school and specialisation.]",
        "order": 1,
        "highlights": [],
    },
    {
        "type": "education",
        "title": "Bachelor in Computer Science (Expertise Informatique)",
        "organization": "Epitech Bénin",
        "location": "Cotonou, Bénin",
        "start_date": date(2023, 9, 1),
        "end_date": date(2026, 7, 1),
        "description": "Three-year project-based curriculum in software engineering, with an orientation towards AI, autonomous systems and infrastructure automation.",
        "order": 2,
        "highlights": [
            "50+ technical projects across systems, AI, web and DevOps",
            "Team-based delivery under real deadlines",
        ],
    },
    {
        "type": "competition",
        "title": "Tekbot Robotics Challenge 2025 — Participant",
        "organization": "Tekbot Robotics Challenge",
        "location": "Bénin",
        "start_date": date(2024, 11, 1),
        "end_date": date(2025, 7, 1),
        "description": "Nine months designing and building an autonomous robot able to detect and sort waste.",
        "order": 3,
        "highlights": [
            "Perception, navigation and decision-making with ROS",
            "[Add competition result]",
        ],
    },
    {
        "type": "work",
        "title": "Software Engineering Intern",
        "organization": "Africereal",
        "location": "[Location]",
        "start_date": date(2024, 6, 1),
        "end_date": date(2024, 8, 1),
        "description": "Two-month internship building an e-learning platform with modern web frameworks, and designing and developing a 3D game.",
        "order": 4,
        "highlights": [
            "Contributed to an e-learning web platform",
            "Built a 3D game [engine / stack to confirm]",
        ],
    },
    {
        "type": "education",
        "title": "High School Diploma",
        "organization": "Complexe Scolaire Frère Nkadilu",
        "location": "[Location]",
        "start_date": date(2020, 9, 1),
        "end_date": date(2023, 7, 1),
        "description": "Scientific track. Final-year project: a strategic real-time game AI (Gomoku).",
        "order": 5,
        "highlights": [],
    },
]

SKILLS = [
    ("C", "Programming", "strong"),
    ("C++", "Programming", "strong"),
    ("Python", "Programming", "strong"),
    ("Haskell", "Programming", "comfortable"),
    ("TypeScript", "Programming", "comfortable"),
    ("React / Next.js", "Web Development", "comfortable"),
    ("Django / DRF", "Web Development", "strong"),
    ("Express.js", "Web Development", "comfortable"),
    ("REST APIs", "Web Development", "strong"),
    ("PostgreSQL", "Web Development", "comfortable"),
    ("Docker", "DevOps & Infrastructure", "strong"),
    ("Kubernetes", "DevOps & Infrastructure", "comfortable"),
    ("Jenkins", "DevOps & Infrastructure", "comfortable"),
    ("GitHub Actions", "DevOps & Infrastructure", "comfortable"),
    ("Ansible", "DevOps & Infrastructure", "comfortable"),
    ("Helm", "DevOps & Infrastructure", "learning"),
    ("ROS", "AI & Robotics", "comfortable"),
    ("Neural networks (from scratch)", "AI & Robotics", "comfortable"),
    ("Computer vision", "AI & Robotics", "learning"),
    ("Adversarial search", "AI & Robotics", "comfortable"),
    ("Git", "Tools", "strong"),
    ("Linux", "Tools", "strong"),
    ("Bash", "Tools", "comfortable"),
]

# Coursework completed at Epitech. Each entry is grounded in the project's
# official subject sheet — add more here as subjects are documented; over
# 50 were completed across the Bachelor's, this list grows over time.
SCHOOL_PROJECTS = [
    {
        "title": "Setting Up",
        "code": "G-CPE-110",
        "module": "Elementary Programming in C",
        "pitch": "First project of the C curriculum: used dynamic programming to compute the largest square of free space from a room's floor-plan file.",
        "details": "The program reads a room layout and has to find the largest square area free of obstacles — the classic 'maximal square' dynamic-programming problem. Built in C with a Makefile (re/clean/fclean rules), restricted to open/read/write/close/malloc/free/stat.",
        "order": 1,
        "technologies": ["C"],
    },
    {
        "title": "Organized",
        "code": "G-CPE-110",
        "module": "Elementary Programming in C",
        "pitch": "A shell-driven lab inventory: hardware is stored in a linked list, with add/delete/display commands and multi-key sorting (by type, name or id).",
        "details": "A small shell (`Workshop >>`) manages hardware — actuators, devices, processors, sensors, wires — each with a name and an auto-incrementing id, held in a linked list. Sorting supports three keys (type, name, id), each reversible with `-r`, and multiple keys can be chained (e.g. sort by type then name then id).",
        "order": 2,
        "technologies": ["C"],
    },
    {
        "title": "Secured",
        "code": "G-CPE-110",
        "module": "Elementary Programming in C",
        "pitch": "A hash table library (libhashtable.a) implemented from scratch in C.",
        "details": "Implements `libhashtable.a`, a generic hash table exposing insert/lookup/remove, built with only write/malloc/free available — no standard hash map to fall back on.",
        "order": 3,
        "technologies": ["C"],
    },
    {
        "title": "101Pong",
        "code": "G-MAT-100",
        "module": "Mathematics",
        "pitch": "Computed a ball's 3D trajectory — velocity vector, future position and paddle-impact angle — for a Pong/Breakout-style game, using pure vector geometry.",
        "details": "Given the ball's position at two points in time and a time shift, the program derives the velocity vector, the position at t+n, and — if the ball is actually heading toward it — the incidence angle on a paddle lying in the z=0 plane. Any language was allowed; the constraint was the maths, not the tooling.",
        "order": 4,
        "technologies": ["Linear Algebra"],
    },
    {
        "title": "102Architect",
        "code": "G-MAT-100",
        "module": "Mathematics",
        "pitch": "Implemented 2D geometric transformations (translation, scaling, rotation, reflection, and combinations) using homogeneous coordinates and matrix composition, with no matrix library allowed.",
        "details": "A home-planning tool that computes the coordinates of a point after translation, scaling, rotation and reflection about the origin — and any combination of them — by composing 3×3 matrices in homogeneous coordinates. Using a library such as numpy was explicitly banned.",
        "order": 5,
        "technologies": ["Linear Algebra"],
    },
    {
        "title": "My_Hunter",
        "code": "G-MUL-100",
        "module": "Multimedia",
        "pitch": "A Duck Hunt–style shooting game built with CSFML: animated sprites, mouse input, and frame-rate-independent movement.",
        "details": "A small video game where the player shoots ducks crossing the screen: animated sprites from sprite sheets, mouse-click shooting, a window closed through events, and movement timed by sfClock so it holds up regardless of the machine's speed.",
        "order": 6,
        "technologies": ["C", "CSFML"],
    },
    {
        "title": "My_Radar",
        "code": "G-MUL-100",
        "module": "Multimedia",
        "pitch": "A 2D air-traffic simulation panel rendered with CSFML: aircraft on straight-line trajectories, collisions, and circular control-tower zones, driven by a custom script format.",
        "details": "Aircraft take off, fly a straight line at a constant speed and land, read from a custom script file; they're destroyed if they collide outside of a control tower's circular safety zone. Rendered live with CSFML, with togglable hitbox/sprite visibility.",
        "order": 7,
        "technologies": ["C", "CSFML"],
    },
    {
        "title": "My_LS",
        "code": "G-PSU-100",
        "module": "Unix System Programming",
        "pitch": "Recoded the `ls` command (-a, -l, -R, -d, -t) using only opendir/readdir/stat/lstat — none of the standard library's usual shortcuts.",
        "details": "Reimplements list, long, recursive, directory-only and time-sort behaviour of `ls`, reading raw directory entries and file metadata by hand and rendering permissions, owners and dates without any formatting helpers. Column alignment, default alphabetical sort and colours were left as bonus.",
        "order": 8,
        "technologies": ["C"],
    },
    {
        "title": "My_Navy",
        "code": "G-PSU-100",
        "module": "Unix System Programming",
        "pitch": "A two-player Battleship where the two processes talk exclusively through SIGUSR1/SIGUSR2 signals — no sockets, no pipes.",
        "details": "Built with a partner: each player runs their own process holding an 8x8 grid and a ships file; turns and attacks are exchanged purely via UNIX signals (signal/sigaction), with the board re-rendered after every turn. Handling signal loss reliably was the core difficulty of the protocol.",
        "order": 9,
        "technologies": ["C"],
    },
    {
        "title": "My_Sokoban",
        "code": "G-PSU-100",
        "module": "Unix System Programming",
        "pitch": "A terminal Sokoban (warehouse-keeper puzzle) rendered with ncurses, playable with the arrow keys on any wall-enclosed map shape.",
        "details": "Reads a map file (walls, boxes, storage spots, player) and renders it live with ncurses; handles terminal resizing with a centered warning, resets on the space bar, and detects both the win condition (all boxes on storage) and the lose condition (no box can move anymore).",
        "order": 10,
        "technologies": ["C", "ncurses"],
    },
    {
        "title": "Amazed",
        "code": "G-CPE-200",
        "module": "Elementary Programming in C",
        "pitch": "Routes multiple robots simultaneously through a maze — parsing rooms and tunnels into a graph, then finding the shortest paths that move as many of them through at once.",
        "details": "Reads a maze description (robot count, rooms and their positions, tunnels linking them) from stdin, validates the terrain, and computes the shortest route(s) from entrance to exit so that every robot reaches it as fast as possible — built on graph and matrix adjacency representations.",
        "order": 11,
        "technologies": ["C"],
    },
    {
        "title": "Robot Factory",
        "code": "G-CPE-200",
        "module": "Elementary Programming in C",
        "pitch": "The assembler half of the Corewar arc: translates champions written in a custom assembly language into the bytecode the virtual machine executes.",
        "details": "Parses `.s` champion files byte by byte and compiles them into the binary format understood by the Corewar virtual machine — effectively a compiler for the game's own instruction set, built before the VM itself since the bytecode format has to be understood first.",
        "order": 12,
        "technologies": ["C"],
    },
    {
        "title": "Corewar",
        "code": "G-CPE-200",
        "module": "Elementary Programming in C",
        "pitch": "The virtual machine for the Corewar tournament: several assembly 'champion' programs share a memory arena and fight to be the last one alive.",
        "details": "Executes the bytecode produced by Robot Factory, giving each champion a fair share of cycles in a shared memory zone until only one is still signaling that it's alive — the classic Corewar/Redcode game, built as the final part of the arc after the assembler.",
        "order": 13,
        "technologies": ["C"],
    },
    {
        "title": "Chocolatine",
        "code": "G-DOP-200",
        "module": "DevOps",
        "pitch": "A self-contained GitHub Actions workflow that builds, tests and mirrors a repository to Epitech's grading platform on every push and pull request.",
        "details": "Runs a chain of jobs — each starting from a fresh checkout and only proceeding if the previous one succeeded — skipping entirely on 'no-ga/' branches or when the repo is already the mirror, to avoid an infinite mirroring loop. Only two external actions were allowed (checkout and a repository-mirroring action); everything else was built by hand, with secrets for anything sensitive.",
        "order": 14,
        "technologies": ["GitHub Actions"],
    },
    {
        "title": "Popeye",
        "code": "G-DOP-200",
        "module": "DevOps",
        "pitch": "Containerized a 5-service voting app (Flask, Redis, a Java worker, PostgreSQL, Node.js) with Docker and orchestrated it with Docker Compose.",
        "details": "Wrote the Dockerfiles for the Poll (Python/Flask) and Result (Node.js) services from official base images, and the Compose file wiring them to Redis, a Java worker and PostgreSQL — configuration passed entirely through environment variables, never hardcoded, following the classic Docker 'voting app' architecture.",
        "order": 15,
        "technologies": ["Docker", "Docker Compose"],
    },
    {
        "title": "Minishell1",
        "code": "G-PSU-200",
        "module": "Unix System Programming",
        "pitch": "A basic UNIX command interpreter modeled on tcsh: resolves commands via PATH or a direct path and implements cd/setenv/unsetenv/env/exit as builtins.",
        "details": "First step toward a full shell: a read-eval-print loop with no pipes or redirections yet, careful PATH resolution, and an environment that's copied and restored correctly. The exit status always mirrors the executed command's.",
        "order": 16,
        "technologies": ["C"],
    },
    {
        "title": "Minishell2",
        "code": "G-PSU-200",
        "module": "Unix System Programming",
        "pitch": "Extends the minishell with command chaining: semicolons, pipes, and the four redirection operators, with careful priority handling.",
        "details": "Builds directly on Minishell1 — same binary, same builtins — adding sequencing (`;`), piping commands together (`|`) via pipe/dup2, and file redirections, plus stdin/stdout/stderr duplication (`2>&1`) as a bonus.",
        "order": 17,
        "technologies": ["C"],
    },
    {
        "title": "42sh",
        "code": "G-PSU-200",
        "module": "Unix System Programming",
        "pitch": "A full TCSH-compatible shell built with a 4-5 person team: job control, globbing, variables, aliases, history, and dynamic line editing on top of the minishell base.",
        "details": "The final shell in the arc — adds job control (&, fg, bg), globbing, backticks, parentheses, local/special variables, command history (!), aliases, multiline editing with dynamic auto-completion, and basic scripting, all measured against tcsh as the reference implementation. Team workflow (task splitting, unit tests, Git branches) was as much a part of the brief as the shell itself.",
        "order": 18,
        "technologies": ["C"],
    },
    {
        "title": "Need4Stek",
        "code": "B-AIA-200",
        "module": "Artificial Intelligence",
        "pitch": "An AI that drives a simulated car around a track in CoppeliaSim, staying on course using lidar-style distance sensors and a custom control protocol.",
        "details": "Communicates with a CoppeliaSim virtual car over stdin/stdout through a socket-bridging binary, using text commands to start/stop the simulation, set speed and wheel angle, and read back lidar distance data — the goal being to complete the track without hitting a wall or driving the wrong way.",
        "order": 19,
        "technologies": ["C"],
    },
]


class Command(BaseCommand):
    help = "Seed the database with placeholder portfolio content."

    def add_arguments(self, parser):
        parser.add_argument(
            "--flush",
            action="store_true",
            help="Delete existing portfolio rows before seeding.",
        )
        parser.add_argument(
            "--if-empty",
            action="store_true",
            help=(
                "Only add rows for a category if that category is still empty. "
                "Never overwrites existing rows — safe to run on every deploy."
            ),
        )

    @transaction.atomic
    def handle(self, *args, **options):
        flush = options["flush"]
        if_empty = options["if_empty"]

        if flush:
            CaseStudyPoint.objects.all().delete()
            ProjectTechnology.objects.all().delete()
            Project.objects.all().delete()
            SchoolProject.objects.all().delete()
            Technology.objects.all().delete()
            ExperienceHighlight.objects.all().delete()
            Experience.objects.all().delete()
            Skill.objects.all().delete()
            ContactMessage.objects.all().delete()
            self.stdout.write(self.style.WARNING("Flushed portfolio tables."))

        self._seed_technologies()
        # Row-level idempotent (by title + code): safe to run every deploy,
        # adds newly-documented projects without touching existing rows —
        # this list keeps growing over time.
        self._seed_school_projects()

        self._seed_if(if_empty, Project, "projects", self._seed_projects)
        self._seed_if(if_empty, Experience, "experiences", self._seed_experiences)
        self._seed_if(if_empty, Skill, "skills", self._seed_skills)

        self.stdout.write(
            self.style.SUCCESS(
                f"Done. {Project.objects.count()} projects, "
                f"{SchoolProject.objects.count()} school projects, "
                f"{Experience.objects.count()} experiences, "
                f"{Skill.objects.count()} skills."
            )
        )

    def _seed_if(self, if_empty, model, label, seed_fn):
        if if_empty and model.objects.exists():
            self.stdout.write(f"{label.capitalize()} already present — skipping.")
            return
        seed_fn()

    def _seed_technologies(self):
        for name, category in TECHNOLOGIES.items():
            Technology.objects.update_or_create(
                name=name, defaults={"category": category}
            )

    def _seed_projects(self):
        for data in PROJECTS:
            data = dict(data)
            techs = data.pop("technologies")
            decisions = data.pop("decisions", [])
            challenges = data.pop("challenges", [])
            project, _ = Project.objects.update_or_create(
                slug=data["slug"], defaults=data
            )

            project.projecttechnology_set.all().delete()
            for i, tech_name in enumerate(techs):
                tech = Technology.objects.get(name=tech_name)
                ProjectTechnology.objects.create(
                    project=project, technology=tech, order=i
                )

            project.points.all().delete()
            for i, (heading, body) in enumerate(decisions):
                CaseStudyPoint.objects.create(
                    project=project,
                    kind=CaseStudyPoint.Kind.DECISION,
                    heading=heading,
                    body=body,
                    order=i,
                )
            for i, (heading, body) in enumerate(challenges):
                CaseStudyPoint.objects.create(
                    project=project,
                    kind=CaseStudyPoint.Kind.CHALLENGE,
                    heading=heading,
                    body=body,
                    order=i,
                )

    def _seed_school_projects(self):
        # get_or_create, not update_or_create: an entry already in the
        # database is never overwritten wholesale (admin edits survive).
        # For an existing row, only fields still blank get backfilled —
        # e.g. adding `details` later fills it in on old rows without
        # touching a pitch or module someone already hand-edited.
        for data in SCHOOL_PROJECTS:
            data = dict(data)
            techs = data.pop("technologies")
            school_project, created = SchoolProject.objects.get_or_create(
                title=data["title"], code=data.get("code", ""), defaults=data
            )
            if created:
                school_project.technologies.set(
                    Technology.objects.filter(name__in=techs)
                )
                continue

            changed = False
            for field, value in data.items():
                if field in ("title", "code"):
                    continue
                if not getattr(school_project, field) and value:
                    setattr(school_project, field, value)
                    changed = True
            if changed:
                school_project.save()
            if not school_project.technologies.exists() and techs:
                school_project.technologies.set(
                    Technology.objects.filter(name__in=techs)
                )

    def _seed_experiences(self):
        for data in EXPERIENCES:
            data = dict(data)
            highlights = data.pop("highlights")
            experience, _ = Experience.objects.update_or_create(
                title=data["title"],
                organization=data["organization"],
                defaults=data,
            )
            experience.highlights.all().delete()
            for i, text in enumerate(highlights):
                ExperienceHighlight.objects.create(
                    experience=experience, text=text, order=i
                )

    def _seed_skills(self):
        for i, (name, category, level) in enumerate(SKILLS):
            Skill.objects.update_or_create(
                name=name,
                defaults={"category": category, "level": level, "order": i},
            )
