// content.js — v5. All copy lives here. Edit strings only. Never touch JSX.

export const HERO = {
  alignment: 'center',
  statusPill: 'Open to RevOps leadership roles',
  name: 'Sajan Vaidhyanathan',
  role: 'Revenue & Marketing Operations Leader',
  rotatingPrefix: "I'm building",
  rotatingWords: [
    'Agentic GTM Systems',
    'Pipeline Engines',
    'Forecasting Models',
    'Custom GTM Apps',
    'GTM Observability',
    'Autonomous Research Agents',
    'Enrichment Waterfalls',
    'Pipeline Coverage Models',
    'Attribution Engines',
    'GTM Data Platform'
  ],
  rotateIntervalMs: 2000,
  description:
    'PhD in Marketing. Nine years building GTM systems inside B2B SaaS. Most recently powering 7x revenue growth at Kibo, from $6M to $43M in ARR, by treating revenue operations as a product, not a back-office function.',
  primaryCTA:   { label: 'Email me',          href: 'mailto:ssajan.is@gmail.com' },
  secondaryCTA: { label: 'View case studies', href: '#the-work' },
  linkedInURL:  'https://www.linkedin.com/in/sajan-vaidhyanathan-80b47988/',
  metaRow:      'Chennai, India · UTC+5:30 · Currently at Kibo'
};

export const METRICS = [
  [
    { value: '7×',     label: 'Revenue scaled',          sub: '$6M to $43M ARR at Kibo' },
    { value: '20%',    label: 'Pipeline from intent',    sub: 'Sourced 6 to 12 months early' },
    { value: '$180K',  label: 'Annual vendor savings',   sub: 'Across 20+ tools at Kibo' },
    { value: '3M+',    label: 'Contacts governed',       sub: 'Email health 9 of 10' },
  ],
  [
    { value: '95%',    label: 'Form accuracy',           sub: 'Shortened intake forms' },
    { value: '99.2%',  label: 'Email deliverability',    sub: 'Persona-led segmentation' },
    { value: '95%',    label: 'Forecast accuracy',       sub: 'Quarter over quarter' },
    { value: '80%+',   label: 'Quota attainment',        sub: 'Across the rep org' },
  ],
  [
    { value: '30+',    label: 'Dashboards shipped',      sub: 'Tableau on Snowflake' },
    { value: '$250K+', label: 'Negotiated in savings',   sub: 'Across career' },
    { value: '5',      label: 'Custom GTM apps shipped', sub: 'Engineered at Kibo' },
    { value: '5×',     label: 'Pipeline coverage',       sub: 'Maintained per quarter' },
  ],
];

export const THE_WORK = {
  sectionHeader: {
    eyebrow:  'The Work',
    title:    'Work that moved numbers.',
    subhead:  'Eight projects, four roles, forty-four tools. Three views of the same career.'
  },
  rotateIntervalMs: 5000,
  tabs: [
    { id: 'cases',      label: 'Case Studies',    count: 8  },
    { id: 'experience', label: 'Work Experience', count: 4  },
    { id: 'stack',      label: 'Tech Stack',      count: 44 }
  ]
};

export const CASE_STUDIES = [
  {
    id: 'invisible-pipeline-engine',
    category: 'Agentic AI',
    title: 'Invisible Pipeline Engine',
    oneLineHook: 'Sourcing 20% of pipeline 6 to 12 months before prospects raise their hand.',
    sections: {
      problem:  'Most B2B SaaS pipeline coverage is reactive. A prospect raises their hand on the website, the SDR books a meeting, the AE closes or doesn\'t. The companies that actually drive growth are the ones who knew about the buyer six months before the buyer knew they had a problem. That intelligence existed across the internet (funding announcements, leadership hires, job postings, technographic changes) but nobody was watching it.',
      approach: 'I\'m building a signal monitoring system that watches the web for buying intent signals 6 to 12 months ahead of demand. Funding rounds (Series B and above signal expansion budget). Leadership hires at the VP and CXO level (new leaders rebuild their tech stacks). Competitor churn signals. Job postings that mention competing tools (a company hiring for HubSpot administrator is a Marketo conversion target). Technographic changes that indicate stack consolidation.',
      howBuilt: 'The signal layer pulls from Crunchbase for funding events, Clay\'s LinkedIn waterfall for leadership changes, Predictleads for job postings, BuiltWith for technographic shifts. n8n orchestrates the daily polling, deduplication, and normalization across sources. An LLM scores combined signal weight on a 1-100 scale per account, weighted higher when multiple signals converge on the same company in the same week. High-score accounts write to a HubSpot list with full signal context as a record property. AEs get a Slack alert with the account, the signals, and a one-paragraph LLM-generated narrative on why this account just got hot.',
      roi:      'Roughly 20% of pipeline now sources from accounts surfaced by the engine before they entered any traditional intent platform. Average sales cycle on engine-sourced accounts is shorter than inbound, because reps walk in with context the prospect didn\'t know they were broadcasting.'
    },
    tools: ['Crunchbase', 'Clay', 'Predictleads', 'BuiltWith', 'n8n', 'HubSpot', 'Slack']
  },
  {
    id: 'list-enrichment-agent',
    category: 'Agentic AI',
    title: 'Automated List Enrichment Agent',
    oneLineHook: 'Reducing list enrichment from 6 hours to under 20 minutes, with higher accuracy.',
    sections: {
      problem:  'Marketing operations teams spend an absurd amount of time enriching prospect lists. Someone uploads 500 names from a conference. Someone else dumps a webinar registration list. A third person paid for a third-party list. Every list needs email validation, firmographic enrichment, ICP scoring, deduplication against CRM, owner routing, and lifecycle stage assignment before it can be used. The work is mechanical, tedious, and prone to errors that propagate through the funnel for months.',
      approach: 'I\'m building an enrichment agent that takes a raw list (company names, partial contacts, just domains, anything) and produces a CRM-ready output in minutes. The agent decides which enrichment source to use based on what\'s missing, which is the part that traditional rule-based waterfalls cannot do well.',
      howBuilt: 'n8n watches a Google Drive folder for new CSV uploads. The agent reads each row, inspects what fields are populated, then routes to the right enrichment source. ZoomInfo for U.S. mid-market and enterprise. Apollo for SMB and international. Clay\'s waterfall API for the long tail. An LLM (Claude) handles three decisions the waterfall can\'t: which source to call first based on company size signals, how to clean messy output (job titles with typos, miscategorized industries), and whether the contact matches Kibo\'s ICP. The cleaned, enriched, scored output writes back to HubSpot with deduplication logic checking both email and LinkedIn URL. Owners auto-assign based on territory rules. Lifecycle stage assigns based on ICP score.',
      roi:      'A list of 500 contacts that used to take an ops analyst 4 to 6 hours of manual work now completes in under 20 minutes. Enrichment accuracy is higher than manual, because the agent never gets tired and never skips the deduplication step. Cost per enriched contact dropped because the routing logic uses the cheapest source that meets the quality bar, not the default one.'
    },
    tools: ['n8n', 'ZoomInfo', 'Apollo', 'Clay', 'Claude', 'HubSpot']
  },
  {
    id: 'negative-persona-engine',
    category: 'Agentic AI',
    title: 'Negative Persona Engine',
    oneLineHook: 'Cutting 15% of wasted outbound effort by silencing perennial non-buyers.',
    sections: {
      problem:  'Every B2B database has a class of contacts who engage but never buy. Students researching for a class project. Competitors doing teardown analysis. Consultants pricing the category for their clients. Tire-kickers who download every whitepaper but never enter a sales conversation. These contacts pollute lead scoring models, drain SDR cycles, inflate ad audiences, and silently corrupt every campaign metric they touch.',
      approach: 'I\'m building a classifier that identifies negative-persona contacts and suppresses them from all outbound activity, while keeping them in the database for nurture and brand exposure. The system is behavioral, not just role-based.',
      howBuilt: 'The engine looks at six features per contact: engagement count over 12 months, conversion attempts that stalled at MQL, email patterns that suggest non-buyer roles (university addresses, generic free providers paired with senior titles), company stage mismatches with ICP, frequency of returning to pricing pages without sales engagement, and source channel patterns. An LLM acts as the classifier, taking these features and producing a confidence score on whether this contact would ever buy. Contacts above the threshold get a hidden CRM property flag. n8n watches that flag and automatically removes them from active sequences in Outreach, excludes them from paid ad custom audiences in LinkedIn and Meta, and quietly suppresses them from SDR queues. They stay in the database for newsletter, webinar invites, and brand campaigns, just not for active sales motion.',
      roi:      'Outbound wasted-effort dropped roughly 15% based on SDR time saved on contacts who would never convert. Lead scoring model accuracy improved because the training data is no longer poisoned by perennial non-buyers. Marketing cost per opportunity dropped because the paid ad audiences are now cleaner.'
    },
    tools: ['HubSpot', 'LLM Classifier', 'n8n', 'Outreach', 'LinkedIn Ads', 'Meta Ads']
  },
  {
    id: 'auto-crm-record-creation',
    category: 'Agentic AI',
    title: 'Auto-CRM Record Creation Workflow',
    oneLineHook: 'Normalizing 8+ inbound channels into one CRM intake, 9 of 10 email health.',
    sections: {
      problem:  'Inbound leads arrive through eight or more channels: website forms, webinar registrations, gated content downloads, event scans, partner referrals, list uploads, social DMs, and signals from the Invisible Pipeline Engine. Each channel produces a different data shape, different field naming, different completeness. The traditional approach is brittle integrations that break every time a form changes. The result is duplicate records, missing fields, wrong owners, and lifecycle stages that don\'t match reality.',
      approach: 'I\'m building a single intake workflow that takes records from any channel, normalizes them, enriches them, deduplicates against the existing database, routes them to the right owner, and writes them to HubSpot with the right lifecycle stage. Channels don\'t get bespoke integrations anymore. They all pour into one pipe.',
      howBuilt: 'n8n acts as the central router. Each inbound channel is a webhook source (forms via Marketo and HubSpot webhooks, Goldcast for webinars, Splash for events, Zapier from the long-tail sources). The first step normalizes the payload into a common schema. Clay enriches any missing firmographic data. An LLM handles three things rules can\'t do well: matching messy company names to canonical accounts, deciding lifecycle stage based on the signal context, and routing the lead to the right owner when standard territory rules conflict. The deduplication logic checks email, LinkedIn URL, and the canonical account match before writing. New records write to HubSpot with full source attribution preserved.',
      roi:      'CRM data accuracy improved measurably (email health score climbed to 9 out of 10, form submission accuracy hit 95%). Duplicate records dropped to near zero on new intake. SDR follow-up speed improved because leads land with correct owner and stage on first write, not after a manual cleanup pass. The system handles 3M+ contacts cumulatively.'
    },
    tools: ['n8n', 'Clay', 'LLM Router', 'HubSpot', 'Goldcast', 'Splash', 'Zapier']
  },
  {
    id: 'customer-economics-engine',
    category: 'Systems & Analytics',
    title: 'Customer Economics Engine',
    oneLineHook: 'True LTV calculator that reallocated paid spend toward profitable segments.',
    sections: {
      problem:  'Most SaaS companies optimize for CAC. That\'s the wrong number. A customer who costs $10K to acquire and stays for 5 years is profitable. A customer who costs $5K to acquire, churns in 8 months, and burns $40K in support tickets along the way is a loss. But the support cost, the expansion revenue, the discount stacking, and the retention curve all live in different systems. Nobody\'s adding them up at the contact level. So the GTM team keeps chasing the wrong segments, and the CAC number on the board deck stays meaningless.',
      approach: 'I\'m building a true LTV calculator that combines acquisition cost, support burden, expansion revenue, and retention curve into one number per customer. It runs at the account level so segmentation actually means something, and it powers ICP refinement, paid spend allocation, and SDR territory carving.',
      howBuilt: 'The data lives across HubSpot (deal records, contact records, ACV), Salesforce (renewal data, expansion deals), the support system (ticket volume and time-to-resolve), Snowflake (the central data warehouse where everything lands). I built a pipeline that pulls all four into Snowflake nightly, joins them at the account level, and computes a normalized economic profile per customer. The formula accounts for blended CAC by source channel, gross margin by tier, support cost weighted by time and seniority of the responding rep, expansion ARR over rolling 12 months, and a retention probability score based on historical churn patterns. The output writes to a Tableau dashboard sliced by segment, source, AE, and cohort.',
      roi:      'The model identified that one of the heaviest-served customer segments was structurally unprofitable when full support cost was loaded against it. We pulled paid spend out of that segment, reallocated to the segments with healthier economics, and improved overall portfolio economics. The downstream effect on win rate and gross margin was more meaningful than any single campaign optimization Marketing ran that year.'
    },
    tools: ['HubSpot', 'Salesforce', 'Snowflake', 'Tableau']
  },
  {
    id: 'marketo-to-hubspot-migration',
    category: 'Systems & Analytics',
    title: 'Marketo to HubSpot Migration',
    oneLineHook: 'Migrating 3M+ contacts with zero data loss and zero days of campaign downtime.',
    sections: {
      problem:  'Kibo\'s marketing automation was running on Marketo, with workflows accumulated over years, smart lists with broken logic, programs that nobody could explain, and a contact database tangled across multiple sync rules. Marketo licensing was expensive and the team\'s day-to-day was bottlenecked on a small group who knew the Marketo quirks. We needed to be on HubSpot for the team velocity, the cost structure, and the integration surface area HubSpot offered. But moving a 3M+ contact database with active campaigns running is the kind of project that breaks lead flow for a quarter if you do it wrong.',
      approach: 'I\'m running a zero-data-loss migration with three non-negotiables: no break in lead flow to sales, no loss of historical engagement data, and no campaign downtime. The migration runs in parallel for a defined cutover window, with rollback paths at every stage.',
      howBuilt: 'Phase 1 was inventory. Every Marketo program, smart list, workflow, custom object, and integration mapped to a sheet, with an owner, a recreate-or-retire decision, and a target HubSpot equivalent. About 30% of Marketo assets got retired in this phase as deprecated. Phase 2 was field and object mapping. Phase 3 was the data move in batches: company records first, then contacts, then engagement history, then active workflows. Each batch validated against Marketo before moving forward. Phase 4 was the parallel-run period. Both systems ran simultaneously for two weeks with a routing rule that prevented duplicate sends. Phase 5 was the cutover, with Marketo workflows disabled in sequence and HubSpot taking over fully.',
      roi:      'Zero records lost in the migration. Zero days of campaign downtime. The team\'s monthly campaign throughput went up because HubSpot workflows are faster to build than Marketo programs, and the cost structure dropped because the new contract eliminated Marketo\'s per-contact licensing escalation.'
    },
    tools: ['Marketo', 'HubSpot', 'Salesforce', 'Outreach', 'ZoomInfo']
  },
  {
    id: 'tableau-snowflake-infrastructure',
    category: 'Systems & Analytics',
    title: 'Tableau + Snowflake Analytics Infrastructure',
    oneLineHook: '30+ self-serve dashboards that ended every meeting\'s number-reconciliation argument.',
    sections: {
      problem:  'GTM analytics at Kibo was scattered. Looker Studio dashboards owned by Marketing. HubSpot reports owned by RevOps. Salesforce reports owned by Sales. Each team had its own version of pipeline, its own definition of MQL, its own attribution model. Leadership meetings would devolve into number-reconciliation arguments instead of decisions. The data lived in 12 different systems and nobody had a single trustworthy view.',
      approach: 'I\'m building a unified analytics layer with Snowflake as the central data warehouse and Tableau as the visualization surface. Every GTM system pipes into Snowflake. Every dashboard reads from Snowflake. Metric definitions get governed centrally, not negotiated meeting by meeting.',
      howBuilt: 'The data layer pulls from HubSpot, Salesforce, Outreach, Gong, Clari, ZoomInfo, Goldcast, the support system, and the website analytics into Snowflake via Fivetran for the standard sources and custom Python pipelines for the long tail. Models in Snowflake reshape the raw tables into a clean star schema with conformed dimensions across all systems. The metrics dictionary lives in a governed layer so that pipeline coverage means the same thing whether you\'re looking at the CRO dashboard or the SDR scorecard. Tableau sits on top, with 30+ dashboards built across propensity models, pipeline velocity, campaign performance, SDR/AE/CS/SE performance scorecards, attribution, and executive views.',
      roi:      'Leadership meetings stopped debating which number was real and started debating what to do about the number. Dashboards are self-serve, so the RevOps team isn\'t bottlenecked on ad-hoc requests anymore. Three downstream projects (forecasting models, the Customer Economics Engine, attribution accuracy) became possible because Snowflake gave us the join surface area Looker never had.'
    },
    tools: ['Snowflake', 'Tableau', 'Fivetran', 'Python', 'HubSpot', 'Salesforce', 'Gong', 'Clari']
  },
  {
    id: 'vendor-consolidation',
    category: 'Systems & Analytics',
    title: 'Vendor Consolidation Program',
    oneLineHook: '$180K saved annually, self-funding two of the agentic AI projects.',
    sections: {
      problem:  'Kibo\'s MarTech and sales tech stack had grown to 20+ tools over years of independent procurement decisions. Multiple tools overlapped (two enrichment vendors, three intent sources, two webinar platforms). Contracts auto-renewed at escalator rates because nobody was tracking renewal calendars centrally. Annual spend was high and growing, and no single person could tell you which tool actually drove which dollar of pipeline.',
      approach: 'I\'m running a stack-wide audit and renegotiation program, with three goals: cut redundant tools, renegotiate the survivors at fair-market rates, and build a renewal calendar that prevents the next round of silent escalation.',
      howBuilt: 'The audit started with a usage and ROI scorecard per tool: license count vs active users, integration depth, pipeline attributed, contract terms, renewal date, escalator clauses. Each tool got a keep/renegotiate/replace/retire decision. The renegotiation playbook used three levers: competitive benchmarking from peer companies, threat of consolidation to a competing vendor, and multi-year commitment in exchange for rate reduction. The renewal calendar lives in a shared sheet with 90-day lead-time alerts, owned by RevOps, reviewed monthly.',
      roi:      '$180K saved annually across the 20+ tools. Stack rationalized to a cleaner, more integrated footprint. The savings funded the addition of a Snowflake instance and the Clay subscription that powers the Invisible Pipeline Engine, so the program net-funded two of the agentic projects without expanding the overall budget.'
    },
    tools: ['Procurement playbook', 'Snowflake', 'Clay']
  }
];

export const WORK_EXPERIENCE = [
  {
    company: 'Kibo', companyURL: 'https://kibocommerce.com',
    role: 'Senior Manager, Revenue Operations & Marketing Operations',
    dates: 'Sept 2023 to Present', location: 'Chennai, India (Remote)',
    summary: 'Running RevOps and MarOps for Kibo, leading a team of 4 and owning the full GTM tech ecosystem. Powering 7x revenue growth from $6M to $43M ARR. Building the agentic AI systems that drive execution across Marketing, Sales, and Customer Success.',
    accomplishments: [
      { headline: 'Invisible Pipeline Engine.',        detail: 'Monitors intent signals from the web (funding rounds, leadership hires, competitor churn, job postings) to identify future buyers 6 to 12 months early. Sources ~20% of pipeline from early signal detection.' },
      { headline: '5 custom Marketing tools.',         detail: 'Including a Customer Economics Engine for true LTV (acquisition cost, support burden, expansion revenue) and a Negative Persona Engine that cuts wasted outreach by ~15%.' },
      { headline: 'Agentic GTM + Systems leadership.', detail: 'Built a 4-person Ops team supporting Marketing and Sales. Renegotiated vendor contracts across 20+ tools, saving $180K annually. Project manage external agencies aligned to Kibo\'s GTM goals.' }
    ],
    responsibilities: [
      { headline: 'GTM Tech Stack Roadmap.',         detail: 'Own evaluation, purchase, and implementation of 20+ tools including HubSpot, ZoomInfo, Clay, Hockeystack, Gong, n8n, Outreach, Tableau, 6Sense, and Regie.' },
      { headline: 'Executive Partnership.',          detail: 'Support ELT with campaign planning, budget allocation, pipeline forecasting, account book rotation, resource allocation, quota setting, commissions, propensity and capacity modeling.' },
      { headline: 'Database & Campaign Management.', detail: 'Oversee 3M+ contact database. Built AI workflows integrating Clay and other MarTech to auto-create CRM records. Optimized ZoomInfo with smart sync rules and waterfall logic. Email health score 9 of 10. Form submission accuracy 95%.' },
      { headline: 'GTM Analytics.',                  detail: 'Led migration from Looker Studio to Tableau and Snowflake. Developed 30+ self-serve dashboards covering propensity models, pipeline velocity, campaign performance, SDR/AE/CS/SE scorecards.' },
      { headline: 'Migrations & Integrations.',      detail: 'Led multiple large-scale migrations including Marketo to HubSpot. Co-owned website redesign. Oversee all integrations by mapping fields, configuring sync logic, and connecting systems via REST/SOAP APIs and FTPs.' }
    ]
  },
  {
    company: 'ThoughtSpot', companyURL: 'https://www.thoughtspot.com',
    role: 'Senior Marketing Operations Specialist',
    dates: 'Jan 2020 to Sept 2023', location: 'Bangalore, India',
    summary: 'Owning end-to-end marketing operations from strategy through execution and reporting. Managed a 3M+ lead and contact database. Saved $200K+ from a $2M MarTech spend through structured tool evaluation.',
    accomplishments: [
      { headline: 'Campaign operations at scale.', detail: 'Scaled campaign operations end to end (email creation, landing pages, forms, list uploads, lead inflow). Increased email delivery to 99.2% and boosted open rates 8x through persona segmentation.' },
      { headline: 'Stakeholder communication.',    detail: 'Managed marketing campaigns from strategy through execution. Built dashboards and presented performance to stakeholders. Maintained database health across 3M+ leads and contacts.' },
      { headline: 'Tech stack evaluation.',        detail: 'Validated and implemented Marketing and Sales tech tools. Made recommendations, analyzed results, managed contract renewals. Saved $200K+ from a $2M MarTech spend through tool evaluation and vendor analysis.' }
    ],
    responsibilities: [
      { headline: 'Campaign Operations.',                             detail: 'Built scalable processes to ensure campaigns launched on time and were accurately reported for ROI. Configured, tested, and deployed emails, landing pages, forms, and drip nurture campaigns.' },
      { headline: 'Data Governance, Segmentation & Personalization.', detail: 'Managed GDPR and CCPA compliance. Handled data segmentation and personalization to maintain accuracy and improve GTM effectiveness.' },
      { headline: 'GTM Tech Stack & Integrations.',                   detail: 'Implemented GTM tech and API integrations with Qualified, Outreach, Sendoso, Siftrock, People.ai, Gong, and Metadata for seamless data synchronization and automation.' },
      { headline: 'Analytics & Reporting.',                           detail: 'Built centralized and automated workflows for analytics infrastructure. Developed 20+ dynamic dashboards to drive visibility and data-driven decision making across teams.' },
      { headline: 'Performance Tracking & Documentation.',            detail: 'Monitored KPIs, open rates, CTRs, conversions, churn reduction, and shared actionable insights with the Growth team.' }
    ]
  },
  {
    company: 'Everstage', companyURL: 'https://www.everstage.com',
    role: 'Strategic Advisor, Marketing Operations',
    dates: 'Dec 2021 to Dec 2022', location: 'Remote',
    summary: 'Strategic Advisor for Marketing Operations. Built the marketing operations foundation and tech stack from scratch. Integrated HubSpot, lead scoring, and Salesforce into a unified demand engine. Enriched 300K+ contacts through ZoomInfo and Apollo.',
    accomplishments: [
      { headline: 'MarTech foundation from scratch.', detail: 'Built and implemented the marketing operations foundation and tech stack. Integrated HubSpot workflows, lead scoring models, and automated email flows with Salesforce to create a unified demand engine.' },
      { headline: 'End-to-end demand visibility.',    detail: 'Connected ZoomInfo with the broader stack to establish end-to-end visibility from lead capture to revenue reporting.' },
      { headline: '300K+ contact enrichment.',        detail: 'Enriched a database of 300K+ contacts through multi-source enrichment using ZoomInfo and Apollo, improving targeted ad precision and campaign conversion.' }
    ],
    responsibilities: [
      { headline: 'MarTech Foundation.',         detail: 'Stand up the marketing operations stack for a Series A SaaS company. Define lifecycle stages, lead scoring rules, and routing logic.' },
      { headline: 'Stack Integration.',          detail: 'Integrate enrichment, advertising, and CRM systems for a single source of truth on demand performance.' },
      { headline: 'Operating Cadence Advisory.', detail: 'Advise the founding team on RevOps hires, tech stack choices, and operating cadence for an early-stage GTM org.' }
    ]
  },
  {
    company: 'SysArc Infomatix', companyURL: null,
    role: 'Marketing Operations Specialist',
    dates: 'Nov 2017 to Jan 2020', location: 'Chennai, India',
    summary: 'Built the backbone of a system-led GTM engine, designing and implementing an integrated MarTech stack that turned digital transformation into measurable, data-driven growth.',
    accomplishments: [
      { headline: 'Scalable MarTech stack.',     detail: 'Built and maintained a scalable marketing tech stack aligned to business needs, integrating tools like HubSpot and ZoomInfo to enable seamless data flow and visibility.' },
      { headline: '20+ performance dashboards.', detail: 'Developed 20+ performance dashboards, giving the business real-time forecasting capability and measurable insight into marketing ROI.' },
      { headline: 'Attribution modeling.',       detail: 'Took ownership of campaign tracking and analytics, ensuring data-driven decision making through structured attribution models.' }
    ],
    responsibilities: [
      { headline: 'CRM & Automation Architecture.',            detail: 'Set up HubSpot CRM and automation from scratch, owning licensing, permissions, field layout, lifecycle, API integration, and workflows.' },
      { headline: 'MarTech Infrastructure & Data Management.', detail: 'Owned the marketing technology ecosystem, leading technical troubleshooting, system integrations, and database projects focused on data enrichment, standardization, and junk elimination.' },
      { headline: 'Data Privacy & Compliance.',                detail: 'Revamped lead, contact, and customer data privacy. Implemented GDPR and documented CCPA and other local privacy regulations.' },
      { headline: 'Analytics & Performance Measurement.',      detail: 'Monitored monthly and quarterly performance of every channel across 20+ Marketing Metrics dashboards on Power BI.' },
      { headline: 'Cross-Functional Partnership.',             detail: 'Partnered with strategic teams to design and deliver BI reports, product usage dashboards, and marketing data insights.' }
    ]
  }
];

export const TECH_STACK = [
  { category: 'Automation & CRM',       tools: ['HubSpot', 'Pardot', 'Marketo', 'Salesforce'] },
  { category: 'Enrichment',             tools: ['ZoomInfo', 'Apollo.io', 'Clay'] },
  { category: 'ABM & Intent',           tools: ['DemandBase', '6Sense', 'Metadata', 'Hockeystack'] },
  { category: 'Revenue Intelligence',   tools: ['Clari', 'Gong', 'Qualified'] },
  { category: 'Business Intelligence',  tools: ['Tableau', 'PowerBI', 'Looker', 'ThoughtSpot'] },
  { category: 'Website & SEO',          tools: ['SEMrush', 'Ahrefs', 'VWO', 'FullStory', 'Splash', 'WordPress'] },
  { category: 'Webinar',                tools: ['Zoom', 'Wistia', 'Goldcast'] },
  { category: 'AI, NLP & Coding',       tools: ['SQL', 'Python', 'Java', 'JavaScript', 'Claude Code', 'Google Antigravity', 'VS Code'] },
  { category: 'Email & Outreach',       tools: ['BeeFree', 'Knack', 'MailChimp', 'Outreach', 'Regie.io', 'Captivate IQ'] },
  { category: 'AI Workflow Automation', tools: ['n8n', 'Zapier', 'Make.com', 'Tray.io'] },
  { category: 'Design',                 tools: ['Figma', 'Sketch'] },
  { category: 'Project Management',     tools: ['Jira', 'Asana'] }
];

export const THE_RECOMMENDATIONS = {
  sectionHeader: {
    eyebrow:  'The Recommendations',
    title:    'What people say about working with me.',
    subhead:  'Eighteen recommendations from managers, peers, and direct reports across ThoughtSpot, Kibo, and beyond.'
  },
  rotateIntervalMs:   6000,
  fadeAnimationMs:    1200,
  staggerMs:          100,
  cardsVisibleDesktop: 4,
  cardsVisibleMobile:  1,
  linkedInURL: 'https://www.linkedin.com/in/sajan-vaidhyanathan-80b47988/details/recommendations/?detailScreenTabIndex=0',
  recommendations: [
    { name: 'Faiz Sayyad',             title: 'GTM Engineer & Strategist | Clay Certified | Building Outbound Engine',                    quote: 'Sajan built KIBO\'s entire revenue engine, driving growth from $10M to $20M ARR, and managed all critical operations with precision.' },
    { name: 'Shabnam Biswas',          title: 'Sales Development | SaaS & Data Tech | Driving Pipeline & Qualified Leads',               quote: 'He doesn\'t just solve problems, he anticipates them, creating systems that make a real difference.' },
    { name: 'Shrutik Patil',           title: 'Senior Salesforce Administrator | Revenue Operations Manager',                             quote: 'Working with Sajan has been one of the best professional experiences of my career. He has been a fantastic mentor, always providing insightful feedback.' },
    { name: 'Gowtham Gnanasekaran',    title: 'GTM Engineer at Recruiterflow | RevOps, GTM, MarTech, Automation',                        quote: 'We define Sajan as success. He is a best-in-class MOps leader in the country. He builds, manages, and scales processes, systems, and resources with precision.' },
    { name: 'Paola Johnson',           title: 'Customer Marketing (AMER & LATAM) at Grafana Labs',                                       quote: 'Sajan was like a ray of sunshine and a true powerhouse within our marketing operations team at ThoughtSpot. His meticulous attention to detail significantly contributed to the success of our email campaigns.' },
    { name: 'Martina Spoljaric',       title: 'Customer Advocacy & Communications at Box',                                               quote: 'Sajan is a go-getter, an amazing teammate and a partner for marketers across the organisation. An expert in his marketing operations.' },
    { name: 'Vaibhav Singh',           title: 'Sr. Data Engineer',                                                                       quote: 'Sajan\'s strategic thinking and innovative approach to marketing campaigns consistently impressed me. An asset to any team.' },
    { name: 'Katie Dunn',              title: 'Head of Global Campaigns at Redis',                                                       quote: 'Sajan is selfless, a go-getter. A true team player and skilled marketing operations guru. I highly recommend Sajan to any organisation looking to grow.' },
    { name: 'Smitha SR',               title: 'Demand Generation Manager',                                                               quote: 'Sajan is a strategic thinker and one of the wisest guys I had the pleasure of working with. I cannot recommend him enough, a true professional.' },
    { name: 'Aby Jerin',               title: 'Builder at Heart, Data Engineer · Product & Strategy · Founder',                         quote: 'I highly recommend Sajan if you want someone to run or scale marketing operations.' },
    { name: 'Lindsay (Noonan) Lukens', title: 'Vice President of Global Communications at ThoughtSpot',                                 quote: 'Sajan is a collaborative, supportive, and solutions-minded team player. He supported and scaled our global email campaign program.' },
    { name: 'Tim Krings',              title: 'GTM Operations & Technology @ ESO',                                                       quote: 'I highly recommend Sajan for a role within any org looking to elevate their marketing operations department.' },
    { name: 'Aria Shirani',            title: 'Marketing Leader at Mews · Previously UiPath, ThoughtSpot',                              quote: 'I would thoroughly recommend Sajan for any senior marketing operations roles. You\'ll get a true gem of a co-worker and an exceptionally great human being.' },
    { name: 'Tejas Sachdeva',          title: 'Senior Product Manager, Product-Led Growth at Teradata',                                  quote: 'Sajan is a great team player with deep expertise in building and scaling email marketing programs.' },
    { name: 'Gowtham Gnanasekaran',    title: 'GTM Engineer @ Recruiterflow',                                                            quote: 'Sajan is a data maven, solution oriented nerd. Crunches insights and one of the best storytellers in the house.' },
    { name: 'Edna Adelina Fernandes',  title: 'Brand Marketing & Employee Experience, India & APJ @ Okta',                              quote: 'Sajan\'s energy and commitment to his work is truly inspiring. A great asset and an empathetic and lovely human being.' },
    { name: 'Brendon Ritz',            title: 'Helping scale the Marketing team at Dataiku',                                             quote: 'Sajan is one of the best people I\'ve ever met. I sincerely valued my 3.5 years with him, and wholeheartedly recommend him to any company looking to build or scale their Campaign Operations program.' },
    { name: 'Jeanne Lack',             title: 'Senior Partner & Field Marketing Leader | B2B SaaS & GTM Expert',                        quote: 'Sajan is responsive and makes himself available off time-zone frequently to ensure emails go out on time.' }
  ]
};

export const PERSON_STORY = {
  eyebrowLabel: 'The Story',
  leadLine: 'Chennai is where I\'m from, where I work, and where I keep coming back to.',
  paragraphs: [
    'By day I run Revenue and Marketing Operations at Kibo. By night I build things nobody asked for. I just finished a PhD in Marketing on the side.',
    'My doctorate at SRM University looked at how personalized advertising shapes purchase intent. I\'m interested in the line where personalization stops being helpful and starts being intrusive. Most marketers ignore that line. The research argues you can\'t afford to.',
    'I lecture at India\'s top B-schools, advise founders informally on when they need to hire a person and when they need to build a system, and read across three shelves: business and marketing for the day job, history when I want to think slowly, and the occasional novel when I need to remember not everything is a problem to solve.'
  ]
};

export const PERSON_NOW = {
  eyebrowLabel: 'What I\'m into right now',
  rows: [
    { label: 'Reading',  content: 'The Coming Wave by Mustafa Suleyman. On the risks and opportunities of AI. Recommended for anyone building agents.' },
    { label: 'Building', content: 'OpEx tracker for managing MarTech and sales tech spend. Marketing attribution tool in progress. AI game analyst that watches my sports games and coaches me on what to fix.' },
    { label: 'Playing',  content: 'Badminton, cricket, football, pickleball, tennis. Club level, not professional. Just well enough to lose properly and want to come back tomorrow.' },
    { label: 'Teaching', content: 'Guest lectures at India\'s top B-schools on GTM roles, RevOps, and outbound automation. Most recently at Great Lakes Institute of Management.' }
  ]
};

export const PERSON_ADVISE = {
  eyebrowLabel: 'Advising founders',
  leadLine: 'Most early-stage GTM tech stacks aren\'t broken. They were never built.',
  paragraphs: [
    'I work with founders to design the architecture layer before the first sales hire compounds the wrong patterns. The shape of the stack at month 6 determines the velocity of the company at month 36.',
    'Most engagements run 4 to 8 weeks, focused on one specific layer: forecasting, attribution, tech stack rationalization, or AI agent design. Past work includes Everstage, where I built the marketing operations foundation from scratch.'
  ],
  availability: { state: 'waitlist', label: 'Currently on waitlist · Q4 openings' }
};

export const CERTIFICATIONS = {
  sectionHeader: {
    eyebrow:  'Formally Certified',
    title:    'Formally certified, perpetually learning.',
    subhead:  'Six issuers, twenty certifications, and counting.'
  },
  issuers: [
    { issuer: 'Google',            certs: ['Google Analytics 4', 'Google Ads Search', 'Google Digital Garage', 'Antigravity'] },
    { issuer: 'HubSpot',           certs: ['Super Admin & Marketing Automation', 'Revenue Operations & CRM', 'Email & Inbound Marketing', 'Digital Advertising & Marketing', 'SEO & Marketing Automation'] },
    { issuer: 'LinkedIn Learning', certs: ['Project Management (PMP)', 'Marketing Analytics', 'Design Thinking'] },
    { issuer: 'Udemy',             certs: ['Agile Project Management', 'Account Based Marketing', 'Complete Digital Marketing Course', 'Tableau & Power BI', 'Python, SQL, HTML, CSS for Marketers', 'Chat GPT for Marketers'] },
    { issuer: 'SEMrush',           certs: ['AI Powered Marketer'] },
    { issuer: 'Trailhead',         certs: ['Salesforce'] }
  ]
};

export const CONTACT = {
  headline: 'Let\'s talk.',
  subhead:  'I respond within 24 hours, usually the same day.',
  reasons: [
    { title: 'Hiring for RevOps leadership', body: 'I\'m open to Director, Head of, or VP of Revenue Operations roles at B2B SaaS companies between Series A and Series D.' },
    { title: 'Building your GTM systems',    body: 'I take on a small number of advisory and fractional engagements. Currently on waitlist with Q4 openings. Engagements run 4 to 8 weeks, focused on a specific GTM problem (forecasting, attribution, tech stack rationalization, AI agent design).' },
    { title: 'Speaking at your event',       body: 'I lecture at India\'s top B-schools and speak on agentic GTM, RevOps as a product function, and the future of marketing analytics.' }
  ],
  channels: [
    { type: 'email',    label: 'ssajan.is@gmail.com',    href: 'mailto:ssajan.is@gmail.com' },
    { type: 'linkedin', label: 'LinkedIn',               href: 'https://www.linkedin.com/in/sajan-vaidhyanathan-80b47988/' },
    { type: 'calendly', label: 'Book a 20-minute intro', href: 'https://calendar.app.google/mLAS7o2aVurvng4X9' }
  ],
  footer: {
    location:  'Chennai, India',
    tagline:   'Built with Claude Code and React. Hosted on GitHub Pages.',
    copyright: '2026 Sajan Vaidhyanathan'
  }
};
