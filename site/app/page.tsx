import Link from "next/link";
import { VpGroupIcon, VpCodeBracketsIcon, VpFileIcon, VpArrowRightIcon } from "@vtmn-play/icons/react";
import { SITE } from "@/lib/site";

const principles = [
  { number: "01", title: "One project entry point", text: "Bring the front end, API, services, documentation, and prototypes into a product monorepo instead of organizing daily work around disconnected repositories.", icon: VpGroupIcon },
  { number: "02", title: "Knowledge beside code", text: "Link business rules, user journeys, and technical decisions to the implementation they explain. Keep the “why” as discoverable as the “how”.", icon: VpCodeBracketsIcon },
  { number: "03", title: "Context that lasts", text: "Record shared knowledge in readable, versioned files, not only in conversations. The next contributor starts from the same project memory.", icon: VpFileIcon },
];
const domains = [
  ["Product management", "Needs, business rules, priorities, and acceptance criteria remain connected to the features being delivered.", "docs/product/"],
  ["Design", "Research, journeys, screen states, and prototypes can be understood alongside product and technical constraints.", "docs/ux-ui/"],
  ["Engineering", "Front-end and back-end code, contracts, architectural decisions, and tests share the same project boundary.", "apps/ · docs/architecture/"],
  ["Data and analytics", "Metric definitions and tracking plans retain their product meaning and links to implementation.", "docs/data/"],
  ["QA and operations", "Test scenarios, runbooks, and incident findings make delivered behavior easier to validate and support.", "docs/qa/ · docs/run/"],
  ["Everyone maintains context", "Owners and reviewers keep their area's knowledge accurate. AI assistance does not take over business responsibility.", "docs/"],
];
const paths = [
  ["README.md", "Project purpose, boundaries, and navigation."],
  ["apps/api/ · apps/front/", "Back-end and front-end applications; adapt application folders to the product."],
  ["apps/mockup/", "Prototypes when a visible interface is relevant."],
  ["docs/product/ · docs/project/", "Requirements, business rules, user guides, project framing, roadmaps, and tasks."],
  ["docs/ux-ui/ · docs/architecture/", "Research, user journeys, design systems, decisions, API contracts, data models, and diagrams."],
  ["docs/data/ · docs/qa/ · docs/run/", "Metrics, tracking, validation, runbooks, and incident knowledge."],
  ["docs/security/ · docs/compliance/", "Security and compliance context; never credentials or secrets."],
  ["docs/glossaries/ · docs/context-map.md", "Shared vocabulary, metadata, tags, and context navigation."],
  ["site/", "This presentation and the separately authored website documentation."],
  ["AGENTS.md · .github/", "Contribution guidance, GitHub configuration, and optional AI instructions, skills, and profiles."],
];

export default function Home() {
  return (
    <main id="content" className="flex-1">
      <section className="home-hero max-w-320 mx-auto px-6" id="home">
        <div>
          <p className="eyebrow"><span className="status-dot" />The squad's shared workspace</p>
          <h1>One project.<br /><span>One shared context.</span></h1>
          <p className="hero-description">Bring your product's knowledge and code together. Inspired by a second brain, OneSquad gives the whole team one place to understand the product, contribute, and keep decisions connected to implementation.</p>
          <div className="hero-actions">
            <Link href="/docs/" className="primary-link">Explore the documentation <VpArrowRightIcon aria-hidden="true" /></Link>
            <a href="#principle" className="secondary-link">Understand the idea</a>
          </div>
          <p className="hero-note">A shared folder structure, not a multi-agent solution. No AI tool required.</p>
        </div>
        <div className="context-map" aria-label="Product, design, code, and operations connected through one shared project">
          <div className="context-map-top"><span className="status-dot" />PROJECT CONTEXT</div>
          <div className="context-map-row"><span>Product & design</span><code>docs/</code></div>
          <div className="context-map-row"><span>Architecture & decisions</span><code>docs/</code></div>
          <div className="context-map-center"><img src="/assets/one-squad-logo-transparent.png" width="56" height="56" alt="" /><div><strong>OneSquad</strong><small>Our shared project memory</small></div></div>
          <div className="context-map-row"><span>Applications & services</span><code>apps/</code></div>
          <div className="context-map-row"><span>Quality & operations</span><code>docs/</code></div>
          <p>One repository. Connected knowledge.</p>
        </div>
      </section>

      <section className="home-section max-w-320 mx-auto px-6" id="principle">
        <p className="eyebrow">Why OneSquad?</p>
        <h2>Less scattered context.<br />More shared understanding.</h2>
        <p className="section-description">A front-end repository here, an API there, business rules in a wiki, designs elsewhere: each person has to reconnect the pieces. An AI assistant looking at only one repository faces the same blind spots.</p>
        <div className="principle-grid">{principles.map(({ title, text, number, icon: Icon }) => (
          <article className="principle-card" key={number}><div className="card-top"><Icon aria-hidden="true" /><span>{number}</span></div><h3>{title}</h3><p>{text}</p></article>
        ))}</div>
        <div className="note"><strong>Centralize the project, not every source in the company.</strong><p>Jira, Confluence, Figma, and external libraries can remain authoritative for their subjects. Keep useful references and provenance; do not create competing copies or assume local summaries are always current.</p></div>
      </section>

      <section className="section-tint" id="team"><div className="home-section max-w-320 mx-auto px-6">
        <p className="eyebrow">A squad-level second brain</p><h2>A shared memory for the people<br />who build and run the product.</h2>
        <p className="section-description">Organized, durable knowledge that the team can find and reuse. Not a collection of assistant personas: the contributors are the squad itself.</p>
        <div className="domain-grid">{domains.map(([title, text, folder]) => (
          <article key={title}><h3>{title}</h3><p>{text}</p><code>{folder}</code></article>
        ))}</div>
      </div></section>

      <section className="home-section max-w-320 mx-auto px-6" id="layers">
        <p className="eyebrow">Context boundaries</p><h2>Personal. Squad. Enterprise.</h2>
        <div className="principle-grid">
          <article className="principle-card"><span className="eyebrow">Personal</span><h3>My own context</h3><p>Individual organization and private working notes belong outside the shared repository.</p></article>
          <article className="principle-card featured-card"><span className="eyebrow">Squad · OneSquad</span><h3>Our product workspace</h3><p>The shared context, code, and decisions needed for the team's daily work.</p></article>
          <article className="principle-card"><span className="eyebrow">Enterprise</span><h3>Organization-wide practices</h3><p>Standards and reusable guidance, such as SDLC resources, are consulted when relevant instead of copied wholesale.</p></article>
        </div>
        <p className="hero-note">These are intended relationships, not implemented automatic connections. External access depends on permissions and available integrations.</p>
      </section>

      <section className="home-section max-w-320 mx-auto px-6" id="repo">
        <p className="eyebrow">The structure</p><h2>Context and code, side by side.</h2>
        <p className="section-description">Domain folders, README indexes, templates, and links help people and AI tools find the smallest useful context.</p>
        <div className="repository-table">{paths.map(([folder, text]) => <div key={folder}><code>{folder}</code><p>{text}</p></div>)}</div>
        <p className="hero-note">Documentation metadata records identity, status, tags, summary, related paths, and update date. A feature slug connects related documents. Read summaries first, then follow links instead of loading the whole repository.</p>
      </section>

      <section className="section-tint" id="workflow"><div className="home-section max-w-320 mx-auto px-6">
        <p className="eyebrow">An example, not a prescribed process</p><h2>One feature can span<br />the whole project.</h2>
        <p className="section-description">Adding order cancellation needs more than a new button. Keep its business meaning, user experience, and technical behavior connected.</p>
        <ol className="feature-steps">
          <li><strong>Understand the rule</strong><p>Link the task to cancellation conditions, acceptance criteria, and open product questions.</p></li>
          <li><strong>Connect experience and implementation</strong><p>Document confirmation and error states, the API contract, and relevant decisions. Find the affected front-end and back-end code in the same project.</p></li>
          <li><strong>Change code and context together</strong><p>A pull request can include UI, API, tests, and documentation. A monorepo does not require components to share a runtime or release cycle.</p></li>
          <li><strong>Review with the responsible people</strong><p>Keep decisions and validation evidence in shared files. The team reviews and approves the work, whether written manually or with assistance.</p></li>
        </ol>
      </div></section>

      <section className="home-section max-w-320 mx-auto px-6" id="assistance">
        <p className="eyebrow">The place of AI</p><h2>Better context for an assistant.<br />Not an assistant for every role.</h2>
        <p className="section-description">Open the project in an AI-assisted tool and ask about its rules, investigate a problem, or prepare a change using the same linked knowledge the team reads.</p>
        <blockquote className="example-prompt">“Find the requirements and code for order cancellation. Explain the affected components and identify missing context before proposing a change.”</blockquote>
        <div className="principle-grid">
          <article className="principle-card"><h3>Instructions</h3><p>Scoped guidance explains conventions and relevant context. It is guidance, not a permission boundary.</p></article>
          <article className="principle-card"><h3>Skills</h3><p>Optional procedures help draft tickets, clarify domain terms, organize documentation, and curate sources.</p></article>
          <article className="principle-card"><h3>Profiles and methods</h3><p>Existing Copilot profiles and BMAD may complement the workspace. Neither specialized profiles nor multi-agent handoffs are required.</p></article>
        </div>
      </section>

      <section className="home-section max-w-320 mx-auto px-6" id="adopt">
        <p className="eyebrow">Getting started</p><h2>Start with a real project,<br />not an agent setup.</h2>
        <ol className="feature-steps">
          <li><strong>Define the product boundary</strong><p>Identify applications, services, shared knowledge, and external sources. Keep private personal material and restricted information outside the shared repository.</p></li>
          <li><strong>Organize code and knowledge</strong><p>Use apps/ for applications and docs/ for shared knowledge. Adapt the structure: a product without a UI does not need a front end or mockup. Do not fill every template just to fill folders.</p></li>
          <li><strong>Make context discoverable</strong><p>Maintain a clear README, local indexes, metadata, and links between tasks, requirements, decisions, design, and code. Reference external originals with provenance.</p></li>
          <li><strong>Agree responsibilities and try one change</strong><p>Identify owners and reviewers, then follow a real feature or investigation through the shared context. Add AI assistance only if it helps.</p></li>
        </ol>
        <div className="note"><strong>Moving existing repositories needs a plan.</strong><p>History, access, ownership, pipelines, and release arrangements must be considered first. Folders and CODEOWNERS do not prevent code edits or hide confidential content from repository readers.</p></div>
      </section>

      <section className="home-section max-w-320 mx-auto px-6" id="roadmap">
        <p className="eyebrow">Present and proposed</p><h2>A structure today.<br />An adoption roadmap taking shape.</h2>
        <div className="category-grid">
          <article className="principle-card"><h3>Present in this repository</h3><p>Application locations, domain documentation folders, README indexes, templates, metadata guidance, this presentation site and documentation portal, and optional Copilot configurations. Folder presence is not proof of a complete runnable product or automatic integration.</p></article>
          <article className="principle-card"><h3>Open roadmap, not delivered</h3><p>Product-facing information versus team docs, navigation for app/mockup/docs/support, a leaner generic template, governance and release rules, migration, update distribution, and the place of BMAD, profiles, skills, and instructions.</p></article>
        </div>
        <p className="hero-note">Automatic Enterprise/Personal connections and automatic documentation updates are not claimed as implemented. Proposed structural changes have not been carried out merely by documenting them.</p>
      </section>

      <section className="community-section" id="community"><div className="max-w-320 mx-auto px-6 community-inner">
        <div><p className="eyebrow">OneSquad community</p><h2>Build the shared<br />workspace together.</h2>
          <p>Share how your team organizes knowledge, keeps it connected to code, and adopts the structure. Bring lessons from real projects, with or without AI assistance.</p>
          <a className="primary-link" href={SITE.community} target="_blank" rel="noopener noreferrer">Join the community <VpArrowRightIcon aria-hidden="true" /></a>
        </div>
        <figure><img src="/assets/one-squad-community-qr.png" width="180" height="180" alt="QR code to join the OneSquad community" /><figcaption>Scan to join the community</figcaption></figure>
      </div></section>
    </main>
  );
}
