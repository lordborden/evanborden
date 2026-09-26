// Evan Borden — site content & skills data
export const SITE_DATA = {
  name: "Evan Borden",
  role: "Manager of Engineering",
  company: "Razorfish",
  location: "Charlotte, NC",
  tz: "America/New_York",
  email: "evanpatrickborden@outlook.com",
  phone: "704.401.4864",
  linkedin: "https://www.linkedin.com/in/evan-borden/",
  tagline: "Engineering manager and Adobe architect at a martech agency. I staff the team, hold the architecture to account, and get regulated work into production.",
  manifesto: "I'm Evan Borden, an engineering manager and Adobe architect based in Charlotte, NC, leading engineering teams at Razorfish since 2018. My background runs from enterprise WordPress and Adobe Experience Manager (AEM) platforms to the wider Adobe cloud stack — App Builder, Experience Platform and Journey Optimizer — and modern CI/CD on GitLab and Azure DevOps, with ongoing hands-on work bringing AI tooling into real engineering workflows. These days the job is as much people and planning as code: hiring and staffing development and QA teams across the US, India and Costa Rica, working resource plans and margin with project managers, and taking architecture through client review boards with HIPAA and PHI in mind. The priorities stay the same at every level: make the team faster, the codebase calmer, and the client confident.",

  experience: [
    {
      role: "Manager of Engineering",
      company: "Razorfish",
      period: "Nov 2018 — Present",
      tag: "current",
      bullets: [
        "Own hiring, staffing and resource planning for development and QA roles across my accounts, along with the architecture those teams build.",
        "Tech Lead and primary Adobe Experience Manager developer on UC Health (AEM 6.5 on-premise) from 2018 to 2023, while developing on Disney Rewards in parallel.",
        "Tech Lead on Disney Rewards from 2022 until the GVP of Technology and CTO at the time entrusted me with leading Labcorp, which I still lead today.",
        "Adobe Architect and Tech Lead on Marker by Labcorp and Thrive 5 Personalization. Took both into production in 2026, earning retainer work through the end of the year, with the potential for more in 2027.",
      ],
    },
    {
      role: "Senior Web Developer",
      company: "Interactive Knowledge",
      period: "Sep 2012 — Oct 2018",
      tag: "",
      bullets: [
        "Built media-rich interactive experiences for non-profits, museums and educational institutions.",
        "Shipped responsive, mobile-first apps in React and Vue against custom REST and microservice backends.",
        "Partnered with UX to translate design comps into accessible, performant interfaces.",
      ],
    },
  ],

  education: [
    { school: "UNC Charlotte", degree: "B.S. Computer Science — Software Engineering Concentration", years: "2006 — 2008" },
    { school: "Central Piedmont Community College", degree: "A.A.S. Advertising + Graphic Design", years: "2004 — 2006" },
  ],

  // Skills by category, with the work that backs each one
  skills: [
    { cat: "Leadership & Delivery", skill: "Hiring & Interviewing", notes: "Razorfish — interview and place development and QA engineers across experience levels and role types; hired my own successor on Disney Rewards." },
    { cat: "Leadership & Delivery", skill: "Global Talent Sourcing", notes: "Razorfish — work with staffing leads to find technical resources in Costa Rica and India, alongside internal bench and external candidates." },
    { cat: "Leadership & Delivery", skill: "Resource Planning & Margin", notes: "Razorfish — refine role start and end dates with project managers; understand role rates and cost, and adjust staffing to hold margin." },
    { cat: "Leadership & Delivery", skill: "SOWs, RFPs & Estimation", notes: "Razorfish — contribute directly to statements of work, review RFPs, and vet technical requirements and levels of effort with delivery teams." },
    { cat: "Leadership & Delivery", skill: "Technical Presentations & Live Demos", notes: "Slide decks and live demos of technical functionality for client and internal audiences; discovery documentation and architecture research." },
    { cat: "Leadership & Delivery", skill: "Architecture Review Boards", notes: "Labcorp Thrive 5 — present and defend architecture recommendations to client review boards within the wider enterprise infrastructure." },
    { cat: "Security & Compliance", skill: "HIPAA & PHI Data-Flow Review", notes: "Labcorp and UC Health — identify every data path in an architecture for security concerns and PHI exposure under HIPAA." },
    { cat: "Cloud & Infrastructure", skill: "AWS", notes: "Personal projects (multi-year) — VM (EC2) provisioning, security groups, networking, DNS / Route 53, domain management, cost monitoring." },
    { cat: "Cloud & Infrastructure", skill: "Azure", notes: "Personal projects (multi-year) — VM provisioning, network security groups, DNS, domain management, cost analysis." },
    { cat: "Cloud & Infrastructure", skill: "Adobe App Builder", notes: "Labcorp Thrive 5 — my team designed and built the integration tier: custom services and React UI extensions connecting AEM, Adobe Experience Platform and Journey Optimizer, and the downstream Patient Portal." },
    { cat: "Cloud & Infrastructure", skill: "Adobe I/O (Runtime, Events, CLI)", notes: "Labcorp Thrive 5 — serverless actions on I/O Runtime, event-driven integration through I/O Events, and project, workspace and credential setup via the aio CLI and Developer Console." },
    { cat: "Cloud & Infrastructure", skill: "Docker", notes: "Disney Rewards local environment running WordPress; comfortable with commands, configs, and compose flows." },
    { cat: "Cloud & Infrastructure", skill: "Linux Server Administration", notes: "Personal projects (multi-year) — SSH, Apache and Nginx, filesystem permissions, user/group management, service configuration. Also recommended optimization for UC Health on-prem AEM." },
    { cat: "CMS / DAM", skill: "WordPress", notes: "Disney Rewards — custom theme & plugins; REST API extension, hooks/filters, custom post types and taxonomies, WP-CLI, sanitization patterns." },
    { cat: "CMS / DAM", skill: "Adobe Experience Manager (AEM)", notes: "Marker by Labcorp — led the team building custom AEM as a Cloud Service components, back end and front end, for a media-driven product landing page. Labcorp Thrive 5 — architected where AEM as a Cloud Service sits in the solution and how it integrates with App Builder and AEP/AJO (built by a partner team). UC Health — Tech Lead and primary AEM developer on AEM 6.5 on-premise; multi-module Maven project. OSGi services, Sling models and servlets, HTL templating, JCR content packaging, Touch UI dialogs." },
    { cat: "CMS / DAM", skill: "Gutenberg / Block Editor", notes: "Disney Rewards — block.json, @wordpress/scripts, Interactivity API." },
    { cat: "CMS / DAM", skill: "ACF Pro", notes: "Disney Rewards — field groups, options pages, ACF blocks." },
    { cat: "Frontend", skill: "JavaScript", notes: "Used continuously across every client engagement and personal project — modern ES2022+, async/await, modules, DOM/Fetch APIs." },
    { cat: "Frontend", skill: "React", notes: "Labcorp Thrive 5 — React UI extensions on Adobe App Builder. Disney Rewards — Gutenberg block editor; hobby projects and experiments." },
    { cat: "Frontend", skill: "Vue.js", notes: "UC Health — Vue 2 in AEM clientlibs; Vue 3 experimentation across projects." },
    { cat: "Frontend", skill: "Node.js", notes: "Disney Rewards and UC Health — front-end build tooling runtime." },
    { cat: "Frontend", skill: "Sass / SCSS", notes: "Disney Rewards and UC Health — theme and clientlib styles." },
    { cat: "Backend", skill: "PHP", notes: "Disney Rewards & non-professional projects — PHP 8.2, strict types, PSR-12." },
    { cat: "Backend", skill: "Java", notes: "UC Health — OSGi components, Sling Models, servlets." },
    { cat: "Backend", skill: "REST API Design", notes: "Labcorp Thrive 5 — API contracts across the stack: App Builder serverless actions as REST endpoints, AEP ingestion and segment APIs, AJO journey triggers. UC Health — Sling servlet JSON endpoints." },
    { cat: "Backend", skill: "MySQL / SQL", notes: "Disney Rewards — custom WP tables, prepared statements via $wpdb, schema design. Comfortable with MySQL/MariaDB tooling." },
    { cat: "Backend", skill: "Composer", notes: "Disney Rewards — PHP dependency management." },
    { cat: "DevOps & Tooling", skill: "Webpack", notes: "Disney Rewards and UC Health — custom multi-config builds." },
    { cat: "DevOps & Tooling", skill: "Git & Deployment Workflows", notes: "Branching strategies, merge/pull requests, code review, deploying through dev / stage / prod pipelines." },
    { cat: "DevOps & Tooling", skill: "CI/CD Pipelines", notes: "Disney Rewards — ship through GitLab CI/CD; can use and extend existing pipelines." },
    { cat: "DevOps & Tooling", skill: "Postman", notes: "UC Health — API collections for Sling servlets." },
    { cat: "Data & Analytics", skill: "Adobe Analytics & CJA", notes: "Disney Rewards — Customer Journey Analytics tagging. UC Health — Adobe Analytics tagging and data layer via Adobe Launch." },
    { cat: "Data & Analytics", skill: "XDM / Schema Modeling", notes: "Labcorp Thrive 5 — XDM class and schema design, field groups and identity maps underpinning the AEP profile, Journey Optimizer and Data Collection." },
    { cat: "Data & Analytics", skill: "Adobe Experience Platform Data Collection", notes: "Labcorp Thrive 5 — Data Collection setup: tag configuration and a datastream routing events into AEP and Journey Optimizer. Formerly Adobe Launch — tagging and data layer work on UC Health." },
    { cat: "CDP & Personalization", skill: "Adobe Experience Platform (AEP)", notes: "Labcorp Thrive 5 — architected the unified profile: datasets and data ingestion, identity stitching, and segment definitions feeding downstream activation." },
    { cat: "CDP & Personalization", skill: "Adobe Journey Optimizer (AJO)", notes: "Labcorp Thrive 5 — journey, campaign and channel configuration on AEP profiles: event triggers, audience entry, channel surfaces, and and message templates." },
    { cat: "CDP & Personalization", skill: "Decision Management (Offer Decisioning)", notes: "Labcorp Thrive 5 — offer catalog, decision rules and selection strategies governing what each profile is served through Journey Optimizer." },
    { cat: "CDP & Personalization", skill: "Adobe Target", notes: "Disney Rewards and UC Health — at.js anti-flicker, mbox tracking." },
    { cat: "AI & Machine Learning", skill: "AI-Assisted Architecture & Documentation", notes: "Razorfish — Claude, ChatGPT and other models to draft architecture documents and write Confluence documentation against real codebases." },
    { cat: "AI & Machine Learning", skill: "AI Workflow Automation", notes: "Razorfish — automated Jira ticket resolution, plus personal efficiency tools that generate Word documents, Excel spreadsheets and PowerPoint decks." },
    { cat: "AI & Machine Learning", skill: "Prompt Engineering", notes: "Daily work across Claude, ChatGPT and other models — structuring prompts and context for documentation, analysis and automation against real codebases." },
    { cat: "Testing & QA", skill: "Accessibility Testing (WCAG)", notes: "Disney Rewards (consumer) and UC Health (healthcare) — accessible markup." },
    { cat: "Security & Compliance", skill: "OAuth / OIDC", notes: "Disney Rewards — Chase API token lifecycle in the Chase WP Connect plugin." },
    { cat: "Security & Compliance", skill: "JWT / JOSE", notes: "Disney Rewards — JWS/JWE with web-token/jwt-framework and phpseclib3." },
    { cat: "Architecture", skill: "Agile / SAFe", notes: "Disney Rewards and UC Health — Jira/Azure DevOps, merge requests, release branches." },
    { cat: "Architecture", skill: "System Design", notes: "Labcorp Thrive 5 — owned the solution architecture across AEMaaCS, App Builder, AEP/AJO and a downstream HIPAA-compliant Patient Portal. Disney Rewards and UC Health — architecture analysis, research, and proposals at the application and integration layer." },
    { cat: "Architecture", skill: "Technical Analysis & Documentation", notes: "Architecture analysis and research, technical strategy, diagrams and flowcharts, technical documentation." },
    { cat: "Healthcare", skill: "Epic EHR", notes: "UC Health — managed the integration; architecture-level familiarity." },
  ],

  projects: [
    {
      title: "Thrive 5 Personalization",
      kind: "Razorfish · Labcorp · 2026",
      blurb: "Adobe Architect and Tech Lead on a Labcorp personalization program spanning AEM as a Cloud Service, Adobe App Builder, Adobe Experience Platform and Journey Optimizer, feeding a downstream proprietary Patient Portal that has to stay HIPAA-compliant. I owned the solution architecture, and my team built the App Builder integration tier and the AEP/AJO layer: XDM schemas, profiles, journeys and offer decisioning. Getting it into production took constant work with the AEM and Patient Portal teams and with the client, including architecture review board sign-off with every PHI data path accounted for.",
      stack: ["Solution architecture", "Adobe App Builder", "Adobe Experience Platform", "Adobe Journey Optimizer", "AEMaaCS integration", "HIPAA"],
    },
    {
      title: "Marker by Labcorp",
      kind: "Razorfish · Labcorp · 2026",
      blurb: "Adobe Architect and Tech Lead on a media-driven landing page for a custom Labcorp product, delivered on a tight timeline. I led the technical implementation and the team building custom AEM as a Cloud Service components across the back end and front end. I stayed on camera with the client at every step, ran ticket management, and worked hand in hand with the project manager to get it live.",
      stack: ["AEMaaCS", "Custom components", "Back end", "Front end", "Team leadership"],
    },
    {
      title: "Disney Rewards",
      kind: "Razorfish · 2019–2026 · Tech Lead from 2022",
      blurb: "Custom WordPress platform with bespoke Gutenberg blocks, ACF Pro field architecture, Chase Bank API integration via JWT/JOSE, Adobe CJA tagging, and Adobe Target personalization. Shipped through GitLab CI/CD.",
      stack: ["WordPress", "PHP 8", "Gutenberg", "Chase API", "Adobe CJA", "Adobe Target"],
    },
    {
      title: "UC Health",
      kind: "Razorfish · Tech Lead 2018–2023",
      blurb: "On-premise AEM 6.5 platform for a large healthcare system: a multi-module Maven build with OSGi services, Sling models and servlets, HTL templating, JCR packaging. Vue 2 in AEM clientlibs. Epic EHR integration architecture.",
      stack: ["AEM 6.5 on-prem", "Java", "Sling", "Vue 2", "Maven"],
    },
  ],

  // Personal side projects — shown under "Off the clock", kept apart from client work.
  sideProjects: [
    {
      title: "Claude × MCP × WordPress",
      kind: "Personal · 2025–26",
      blurb: "A self-hosted Linux box running custom Nginx that wires GitHub webhooks and the Model Context Protocol up to Claude apps. The result: prompt-driven WordPress page creation, automated code management, and CMS publishing that I drive from chat.",
      stack: ["Linux", "Nginx", "MCP", "WordPress REST", "GitHub Webhooks"],
    },
    {
      title: "Unity Game Engine Project",
      kind: "Personal · multi-year",
      blurb: "A long-running Unity FPS built for the love of the craft — hand-built C# scripts, scenes and prefabs, with an increasingly AI-augmented toolchain: Unity MCP and custom Claude connectors driving the editor, a Leonardo.ai pipeline for art and textures, and a bespoke map design and generation pipeline.",
      stack: ["Unity 3D", "C#", "Unity MCP", "Claude connectors", "Leonardo.ai", "Map gen pipeline"],
    },
  ],

  // "Off the Clock" — the human behind the title. Used by v3.
  hobbies: [
    { id: "hiking", name: "Hiking", tag: "carolina trails", glyph: "mountain", blurb: "Trading the screen for a trailhead. Carolina ridgelines and greenways are the best place I know to think through a hard problem.", accent: "green" },
    { id: "running", name: "Running", tag: "logging miles", glyph: "route", blurb: "Miles around Charlotte to clear the head. Steady cadence, no notifications, one foot in front of the other.", accent: "clay" },
    { id: "gaming", name: "Gaming", tag: "controller down-time", glyph: "controller", blurb: "Studying the craft from the player's side of the screen — what makes a world worth exploring and a system worth mastering.", accent: "green" },
    { id: "family", name: "Father & Husband", tag: "the title that matters most", glyph: "home", blurb: "Above every waypoint on this map: dad and husband. The reason the rest of it is worth doing at all.", accent: "clay" },
  ],

  // Leadership scope — verified facts only (v3 "Leadership" waypoint).
  leadership: {
    intro: "The job has two halves: the people and the plan behind a team, and the architecture that team builds. This is how I handle both.",
    facets: [
      { title: "Hiring & interviewing", body: "Run staffing and interviews for development and quality assurance roles across experience levels and role types — including hiring my own successor on Disney Rewards." },
      { title: "Global talent sourcing", body: "Work directly with the people in charge of staffing to find qualified engineers in Costa Rica and India, and fill project roles from both the internal bench and external candidates." },
      { title: "Resource planning & margin", body: "Partner with project managers to refine resource start and end dates, understand role rates and cost, and adjust the staffing mix to protect margin." },
      { title: "Account leadership", body: "Comfortable running more than one account at once, and trusted with the ones that matter. Technology leadership handed me Labcorp to lead it to success, and I still do. I work across teams and directly with the client, not only with my own engineers." },
      { title: "Architecture governance", body: "Take architecture recommendations through client architecture review boards, vetting each one against the wider enterprise infrastructure it has to live in." },
      { title: "Security & HIPAA", body: "Identify and weigh every data path in an architecture for security concerns and PHI exposure, so healthcare builds meet HIPAA by design rather than by audit." },
      { title: "Pre-sales & scoping", body: "Contribute directly to statements of work, read RFPs, and vet technical requirements and levels of effort with the teams who will build it. Then build the slide decks, live demos and discovery documentation that frame the work." },
      { title: "Advocacy & growth", body: "Surface engineers' contributions to leadership and make the case for their promotions. Partner daily with VP+ technical leaders." },
      { title: "Standards & practices", body: "Streamlined teams onto an agreed set of coding conventions, naming and formatting rules, so the codebase stays consistent, reviewable and easy to hand off." },
      { title: "AI-augmented delivery", body: "Fully up to speed with Claude, ChatGPT and other models as working tools: drafting architecture documents, writing Confluence documentation against real codebases, automating Jira ticket resolution, and building my own tools that turn out Word documents, Excel spreadsheets and PowerPoint decks.", wide: true },
    ],
  },

  // Third-party endorsements (via LinkedIn) — v3 "References" waypoint.
  testimonials: [
    {
      quote: "I had the pleasure of working with Evan Borden on several cross-functional projects, and he consistently delivered high-quality work with precision and thoughtfulness. Evan brings a sharp technical mind to every challenge and always asks the right questions to drive clarity and alignment — something that made our collaboration both efficient and effective. He also has a great sense for balancing user experience with technical feasibility, which made him a key contributor to building thoughtful, scalable solutions. What stands out most is his strong work ethic and professionalism. He's the kind of engineering partner you want on every team: reliable, detail-oriented, and always pushing to build better products. Any team would be lucky to have him!",
      name: "Bianca Gassaway",
      title: "Senior Technical Program Manager",
      rel: "Worked with Evan on the same team",
      date: "Jun 2025",
    },
    {
      quote: "Evan is one of those rare developers you find in the hacker role in blockbuster movies — the protagonists go to him at their greatest time of need and in a matter of movie minutes he's in the mainframe, hacking the planet and ensuring the good guys win. He also has a fantastic bedside manner with clients and often provides excellent insight and technical acumen to save the day. I don't worry about tickets or difficult bugs when I assign them to Evan — they'll get done on time, and better documented at the end to boot.",
      name: "Philip Kostka",
      title: "Senior Technical Project Manager",
      rel: "Was senior to Evan",
      date: "Jun 2022",
    },
  ],
};
