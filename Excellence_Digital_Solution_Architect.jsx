import { useState, useEffect, useRef } from "react";

const NAVY = "#0D1B2A";
const TEAL = "#00E5B9";
const DARK_TEAL = "#00B894";
const WHITE = "#FFFFFF";
const LIGHT_BG = "#F0F7F5";
const DARK_TEXT = "#1B2838";
const MUTED = "#6B7B8D";
const CARD_BG = "#F8FFFE";

const industries = [
  {
    id: "mortgage",
    icon: "💰",
    title: "Mortgage & Finance",
    subtitle: "Al Eastburn · Nicole Bazinet",
    painPoints: [
      "Leads go cold because follow-up takes too long",
      "Clients can't easily check their loan status",
      "No way to capture leads from my website at night",
      "Manually sending rate alerts is eating my day"
    ],
    solutions: {
      0: {
        name: "AI Speed-to-Lead System",
        stack: ["GoHighLevel CRM", "AI Phone Agent", "Zapier", "Custom Dashboard"],
        description: "When a lead fills out your form, an AI agent calls them within 60 seconds, qualifies them, and books a callback. No more cold leads.",
        timeline: "2-3 weeks",
        impact: "80% faster response time → 3x more conversions",
        edgeCases: [
          "What if the AI can't understand the caller? → Instant warm handoff to your cell with full context.",
          "What about after hours? → AI handles it 24/7. You wake up to booked appointments.",
          "What if someone calls back? → System recognizes returning leads and pulls up their file automatically."
        ]
      },
      1: {
        name: "Client Portal + Status Tracker",
        stack: ["Next.js", "Supabase", "GoHighLevel", "Stripe"],
        description: "Branded portal where borrowers log in, see their application stage, upload documents, and get real-time updates — like tracking a package.",
        timeline: "4-6 weeks",
        impact: "60% fewer 'where's my loan?' calls",
        edgeCases: [
          "What if a client uploads the wrong document? → AI pre-screens uploads and flags issues instantly.",
          "Multiple co-borrowers? → Each gets their own login with shared file visibility.",
          "Privacy concerns? → Bank-grade encryption, SOC2-ready architecture."
        ]
      },
      2: {
        name: "24/7 Lead Capture Funnel",
        stack: ["WordPress/Elementor", "GoHighLevel", "AI Chatbot", "Google Ads"],
        description: "Landing page with an intelligent chatbot that pre-qualifies visitors, calculates estimated rates, and captures their info — even at 2 AM.",
        timeline: "1-2 weeks",
        impact: "Capture leads you're currently losing overnight",
        edgeCases: [
          "What if someone asks a question the bot can't answer? → Escalates to SMS/email with full chat transcript.",
          "How do leads get into my CRM? → Automatic sync in real-time — no CSV imports.",
          "Can I A/B test? → Built-in split testing on headlines, CTAs, and chat flows."
        ]
      },
      3: {
        name: "Automated Rate Alert Engine",
        stack: ["GoHighLevel", "Zapier", "Custom API", "Email/SMS"],
        description: "System monitors rate changes, matches them to your database of past clients, and automatically sends personalized alerts — 'Hey Al, rates dropped. Your refi could save you $400/mo.'",
        timeline: "2-3 weeks",
        impact: "Reactivate dormant leads on autopilot",
        edgeCases: [
          "What if rates change multiple times a day? → Configurable throttle — daily digest or instant alerts.",
          "Can I customize by loan type? → Yes — FHA, VA, conventional, jumbo each get tailored messaging.",
          "What about compliance? → Built-in opt-out, TCPA-compliant, full audit trail."
        ]
      }
    }
  },
  {
    id: "legal",
    icon: "⚖️",
    title: "Legal / Personal Injury",
    subtitle: "Jennifer Mandelbaum · Thomas Shea",
    painPoints: [
      "Intake process is slow and paper-heavy",
      "Clients keep calling for case updates",
      "Not enough leads from Google searches",
      "Hard to get and manage client reviews"
    ],
    solutions: {
      0: {
        name: "Smart Digital Intake System",
        stack: ["React Form Builder", "GoHighLevel", "DocuSign API", "HIPAA Vault"],
        description: "Clients fill out a beautiful online form, e-sign documents, upload photos of the accident — all before their first call. Data flows straight into your case management.",
        timeline: "2-3 weeks",
        impact: "Cut intake time from 45 min to 10 min",
        edgeCases: [
          "What about clients who aren't tech-savvy? → Mobile-first design, option to call and have staff walk them through.",
          "HIPAA compliance? → All data encrypted at rest and in transit. BAA-ready infrastructure.",
          "What if they abandon the form? → Automated follow-up texts: 'We noticed you started — need help?'"
        ]
      },
      1: {
        name: "Case Status Client Portal",
        stack: ["Next.js", "Supabase", "Twilio", "GoHighLevel"],
        description: "Clients log into a branded portal, see their case timeline, upcoming dates, and next steps. Automated text updates at every milestone.",
        timeline: "4-5 weeks",
        impact: "70% fewer status-check calls to your office",
        edgeCases: [
          "Multiple cases per client? → Dashboard shows all cases with individual timelines.",
          "What if a client shares their login? → Role-based access, activity logging.",
          "Can staff update easily? → One-click status changes that trigger automatic client notifications."
        ]
      },
      2: {
        name: "Local SEO Domination Package",
        stack: ["WordPress SEO", "Google Business Profile", "Schema Markup", "Content Strategy"],
        description: "Optimize for 'personal injury lawyer Tampa,' build location-specific landing pages, and implement review generation — so you're the first name people see.",
        timeline: "Ongoing (results in 60-90 days)",
        impact: "First page for 'lawyer near me' in your service area",
        edgeCases: [
          "What about bar association advertising rules? → All content reviewed for compliance before publishing.",
          "Can I target specific injury types? → Yes — separate pages for car accidents, slip & fall, medical malpractice.",
          "What if a competitor is outranking me? → Monthly competitive analysis and counter-strategy."
        ]
      },
      3: {
        name: "Review Generation & Reputation System",
        stack: ["GoHighLevel", "Google Business API", "Automated SMS/Email", "Dashboard"],
        description: "After case resolution, clients automatically receive a review request. Positive reviews go to Google; concerns get routed to your team first.",
        timeline: "1-2 weeks",
        impact: "2x review volume within 90 days",
        edgeCases: [
          "What if a client leaves a negative review? → Instant alert to your team with response templates.",
          "Timing sensitivity? → Customizable delay — send after settlement check clears, not during litigation.",
          "Can I respond from one place? → Unified dashboard for Google, Yelp, Avvo reviews."
        ]
      }
    }
  },
  {
    id: "insurance",
    icon: "🛡️",
    title: "Insurance (P&C / Health)",
    subtitle: "Tristan Foreman · Timothy Pease",
    painPoints: [
      "Quoting process is clunky and slow",
      "Hard to explain coverage options clearly",
      "Renewals slip through the cracks",
      "Competing with big online carriers"
    ],
    solutions: {
      0: {
        name: "Instant Quote Comparison Tool",
        stack: ["React", "Custom API Layer", "GoHighLevel", "Analytics"],
        description: "Visitors enter basic info, see side-by-side plan comparisons instantly. Leads automatically enter your CRM pipeline with their preferences attached.",
        timeline: "3-4 weeks",
        impact: "Convert website visitors into qualified leads 24/7",
        edgeCases: [
          "What if carriers change rates? → Admin panel to update rates without touching code.",
          "Can I white-label it? → Your branding, your colors, your domain.",
          "What about mobile users? → Responsive design — 60% of insurance shoppers are on mobile."
        ]
      },
      1: {
        name: "Interactive Coverage Explainer",
        stack: ["React", "Animation Library", "CMS", "Video Integration"],
        description: "Visual, interactive tool where clients drag sliders to see how deductible changes affect premium. Makes complex coverage simple and shareable.",
        timeline: "3-4 weeks",
        impact: "Clients understand policies → fewer disputes, faster closes",
        edgeCases: [
          "Different insurance types? → Modular design — home, auto, flood each get custom calculators.",
          "Can agents use it in meetings? → Yes — works on tablets for in-person presentations.",
          "Multi-language support? → Built-in translation layer for Spanish-speaking clients."
        ]
      },
      2: {
        name: "Automated Renewal Pipeline",
        stack: ["GoHighLevel", "Zapier", "Custom Workflows", "SMS/Email"],
        description: "90 days before renewal, clients get automated touchpoints: review current coverage, suggest updates, book a call. No more missed renewals.",
        timeline: "2-3 weeks",
        impact: "95%+ renewal retention rate",
        edgeCases: [
          "What if the client's situation changed? → Pre-renewal survey captures life changes (new car, home reno, etc).",
          "Multiple policies per client? → System tracks all policies with staggered renewal sequences.",
          "What about compliance? → All communications logged with opt-out handling."
        ]
      },
      3: {
        name: "Local Authority Website + SEO",
        stack: ["WordPress", "Elementor", "SEO Strategy", "Blog Content"],
        description: "Professional website that ranks for 'insurance agent [your city]' with educational content that builds trust — blog posts, videos, FAQ pages that answer real questions.",
        timeline: "3-4 weeks (site) + ongoing SEO",
        impact: "Compete with GEICO and Progressive on a local level",
        edgeCases: [
          "I'm not a writer. → We handle all content creation, optimized for search.",
          "What about compliance disclaimers? → Built into every page template automatically.",
          "Can I track which content converts? → Full analytics dashboard showing content → lead → policy attribution."
        ]
      }
    }
  },
  {
    id: "realestate",
    icon: "🏠",
    title: "Real Estate & Inspections",
    subtitle: "Tony Hedayat · Chapter Referrals",
    painPoints: [
      "My listing pages don't stand out",
      "Inspection scheduling is a mess",
      "Leads from Zillow/Realtor.com are low quality",
      "No system to nurture past clients for referrals"
    ],
    solutions: {
      0: {
        name: "Custom Property Showcase Sites",
        stack: ["WordPress/Elementor", "IDX Integration", "Virtual Tour Embed", "Lead Capture"],
        description: "Each listing gets a beautiful standalone page with virtual tours, neighborhood data, mortgage calculator, and lead capture — shareable on social media.",
        timeline: "Template: 2 weeks, Per-listing: same day",
        impact: "Listings that sell themselves and generate buyer leads",
        edgeCases: [
          "What happens when a listing sells? → Auto-converts to 'sold' page that captures new buyer leads.",
          "Can I update it myself? → Yes — simple admin panel for photos, price changes, open house dates.",
          "Integration with MLS? → IDX feed keeps everything synced automatically."
        ]
      },
      1: {
        name: "Inspection Booking & Report Portal",
        stack: ["Next.js", "Calendly API", "PDF Generator", "GoHighLevel"],
        description: "Clients book inspections online, get automated reminders, and receive their report in a branded portal — not a generic email attachment.",
        timeline: "3-4 weeks",
        impact: "Professional experience that generates agent referrals",
        edgeCases: [
          "Rush inspections? → Priority slots with premium pricing built in.",
          "Multiple inspectors? → Calendar shows availability across your team.",
          "What if the report has issues? → Version control and revision tracking."
        ]
      },
      2: {
        name: "Direct Lead Generation System",
        stack: ["Landing Pages", "Google/Facebook Ads", "GoHighLevel", "AI Follow-up"],
        description: "Hyper-local landing pages + targeted ads that capture leads directly into your CRM. AI texts them within 30 seconds. You own the lead — no Zillow tax.",
        timeline: "2-3 weeks",
        impact: "Generate your own leads at 1/3 the cost of portal leads",
        edgeCases: [
          "What's my ad spend? → We optimize for your budget — even $500/mo can work locally.",
          "What if leads don't respond? → 6-month nurture sequence keeps you top of mind.",
          "Can I target specific neighborhoods? → Yes — geo-fencing down to the zip code."
        ]
      },
      3: {
        name: "Past Client Referral Machine",
        stack: ["GoHighLevel", "Automated Email/SMS", "Event Triggers", "Review System"],
        description: "Automated touchpoints on home anniversaries, market updates for their neighborhood, and holiday greetings. When they're ready to sell or know someone who is — you're the call.",
        timeline: "2 weeks",
        impact: "Turn your database into a referral engine",
        edgeCases: [
          "I have 2,000+ past clients. → We import and segment your entire database.",
          "What if someone wants to unsubscribe? → One-click opt-out, fully CAN-SPAM compliant.",
          "Can I track who's engaging? → Dashboard shows who's opening, clicking, and ready to act."
        ]
      }
    }
  },
  {
    id: "financial",
    icon: "📊",
    title: "Financial Planning",
    subtitle: "Albert Pinedo",
    painPoints: [
      "Client onboarding takes too many meetings",
      "Prospects don't understand my value proposition",
      "Hard to stay compliant with marketing rules",
      "No way to scale my practice without hiring"
    ],
    solutions: {
      0: {
        name: "Digital Client Onboarding Portal",
        stack: ["Next.js", "Supabase", "DocuSign", "Risk Assessment Engine"],
        description: "New clients complete risk questionnaires, upload documents, and e-sign agreements online — before their first meeting. You start with a complete picture.",
        timeline: "4-5 weeks",
        impact: "Onboard clients in 1 meeting instead of 3",
        edgeCases: [
          "What about complex financial situations? → Conditional form logic adapts questions based on answers.",
          "Compliance review? → All forms vetted for SEC/FINRA requirements.",
          "Can I customize per client type? → Different flows for HNW, retirees, young professionals."
        ]
      },
      1: {
        name: "Value Proposition Landing Page",
        stack: ["WordPress", "Elementor", "Video Integration", "Calendly"],
        description: "A beautiful page that explains your approach with client stories, an ROI calculator, and a 'book a free consultation' CTA. Designed to convert skeptics into believers.",
        timeline: "2-3 weeks",
        impact: "Turn website visitors into booked consultations",
        edgeCases: [
          "What about compliance disclaimers? → Integrated into design without killing conversion rates.",
          "Can I A/B test? → Yes — test different headlines, CTAs, and calculator assumptions.",
          "What if my firm has brand guidelines? → We match exactly — fonts, colors, tone."
        ]
      },
      2: {
        name: "Compliant Content Marketing Engine",
        stack: ["WordPress CMS", "AI Content Generation", "Compliance Review Workflow", "Email Distribution"],
        description: "AI drafts educational content (market updates, tax tips, retirement planning), your compliance team reviews in a simple dashboard, and approved content auto-publishes to your blog and email list.",
        timeline: "3-4 weeks",
        impact: "Consistent thought leadership without the time investment",
        edgeCases: [
          "What if the AI writes something non-compliant? → Nothing publishes without human approval.",
          "Can I schedule content in advance? → Full editorial calendar with approval workflows.",
          "What about archiving for audits? → Every piece archived with approval timestamps."
        ]
      },
      3: {
        name: "Automated Practice Growth System",
        stack: ["GoHighLevel", "AI Chatbot", "Zapier", "Analytics Dashboard"],
        description: "AI handles initial prospect conversations, qualifies leads, books appointments, and manages your follow-up sequences. You focus on advising — the system handles growth.",
        timeline: "3-4 weeks",
        impact: "Scale your practice 2x without adding staff",
        edgeCases: [
          "What if the AI gives financial advice? → Strictly trained to educate and qualify, never advise.",
          "Can I see what the AI is saying? → Full conversation logs and real-time monitoring.",
          "What about my existing clients? → Separate workflows for prospects vs. current client communications."
        ]
      }
    }
  },
  {
    id: "it",
    icon: "🖥️",
    title: "IT / Managed Services",
    subtitle: "Ann Ables · CBS LLC",
    painPoints: [
      "Clients can't easily submit support tickets",
      "No visibility into SLA performance",
      "Hard to upsell additional services",
      "My website doesn't reflect my technical capabilities"
    ],
    solutions: {
      0: {
        name: "Client Support Portal",
        stack: ["Next.js", "Supabase", "Twilio", "Custom Dashboard"],
        description: "Branded portal where clients submit tickets, track status, view their service history, and access a knowledge base. Professional, branded, and integrated with your tools.",
        timeline: "4-5 weeks",
        impact: "Fewer emails/calls, happier clients, better documentation",
        edgeCases: [
          "Integration with my PSA? → API connections to ConnectWise, Autotask, etc.",
          "What about priority escalation? → Custom SLA rules with automatic escalation paths.",
          "Can clients see their billing? → Optional billing integration for full transparency."
        ]
      },
      1: {
        name: "SLA Performance Dashboard",
        stack: ["React", "D3.js Charts", "API Integrations", "Automated Reports"],
        description: "Real-time dashboard showing uptime, response times, ticket resolution, and SLA compliance. Auto-generates monthly reports you can send to clients.",
        timeline: "3-4 weeks",
        impact: "Prove your value with data → retain and upsell",
        edgeCases: [
          "Multiple clients? → Each client gets their own view; you see the aggregate.",
          "What if SLAs are being missed? → Early warning system alerts your team before a breach.",
          "Custom SLA terms? → Configurable per client contract."
        ]
      },
      2: {
        name: "Service Expansion Automation",
        stack: ["GoHighLevel", "Custom Assessment Tool", "Email Sequences", "Proposals"],
        description: "Automated technology assessments that identify gaps in client environments. System generates tailored upsell proposals — 'You're vulnerable to X. Here's how we fix it.'",
        timeline: "3-4 weeks",
        impact: "Increase average revenue per client by 25%+",
        edgeCases: [
          "What if clients feel pressured? → Educational approach — 'here's what we found' not 'buy this now.'",
          "Can I customize recommendations? → Full control over what gets suggested and when.",
          "Integration with my quoting tool? → API connection to generate proposals automatically."
        ]
      },
      3: {
        name: "Technical Authority Website",
        stack: ["WordPress", "Custom Theme", "Case Studies", "SEO"],
        description: "A website that screams 'we know what we're doing' — case studies, certifications showcase, service breakdowns, and an ROI calculator for managed services.",
        timeline: "3-4 weeks",
        impact: "Win enterprise clients with a website that matches your expertise",
        edgeCases: [
          "I'm technical, not a writer. → We interview you and turn your expertise into compelling content.",
          "What about vendor partner logos? → Properly licensed badge displays for Microsoft, Cisco, etc.",
          "Can prospects request a network assessment? → Built-in lead magnet with automated delivery."
        ]
      }
    }
  }
];

const phases = ["SELECT_INDUSTRY", "SELECT_PAIN", "VIEW_SOLUTION", "EDGE_CASES"];

function TypingText({ text, speed = 15, onDone }) {
  const [displayed, setDisplayed] = useState("");
  const idx = useRef(0);
  useEffect(() => {
    setDisplayed("");
    idx.current = 0;
    const timer = setInterval(() => {
      idx.current++;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) {
        clearInterval(timer);
        onDone && onDone();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text]);
  return <span>{displayed}</span>;
}

function BlueprintLine({ label, value, delay = 0 }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  if (!show) return null;
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 8, opacity: show ? 1 : 0, transition: "opacity 0.5s" }}>
      <span style={{ color: TEAL, fontWeight: 700, minWidth: 90, fontSize: 13 }}>{label}</span>
      <span style={{ color: WHITE, fontSize: 13 }}>{value}</span>
    </div>
  );
}

export default function App() {
  const [phase, setPhase] = useState("SELECT_INDUSTRY");
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [selectedPain, setSelectedPain] = useState(null);
  const [showEdgeCases, setShowEdgeCases] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const reset = () => {
    setPhase("SELECT_INDUSTRY");
    setSelectedIndustry(null);
    setSelectedPain(null);
    setShowEdgeCases(false);
    setAnimKey(k => k + 1);
  };

  const solution = selectedIndustry !== null && selectedPain !== null
    ? industries[selectedIndustry].solutions[selectedPain]
    : null;

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, ${NAVY} 0%, #162540 100%)`,
      fontFamily: "'Georgia', serif",
      color: WHITE,
      overflow: "auto"
    }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(90deg, ${NAVY}, #0a1628)`,
        borderBottom: `3px solid ${TEAL}`,
        padding: "20px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: 1 }}>
            <span style={{ color: TEAL }}>EXCELLENCE</span> DIGITAL
          </h1>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: MUTED, fontFamily: "Calibri, sans-serif" }}>
            Solution Architect — Interactive Demo
          </p>
        </div>
        {phase !== "SELECT_INDUSTRY" && (
          <button onClick={reset} style={{
            background: "transparent",
            border: `1px solid ${TEAL}`,
            color: TEAL,
            padding: "8px 16px",
            borderRadius: 6,
            cursor: "pointer",
            fontSize: 13,
            fontFamily: "Calibri, sans-serif",
            transition: "all 0.2s"
          }}>
            ← Start Over
          </button>
        )}
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>

        {/* PHASE 1: Select Industry */}
        {phase === "SELECT_INDUSTRY" && (
          <div key={animKey}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h2 style={{ fontSize: 26, marginBottom: 8 }}>
                What's Your <span style={{ color: TEAL }}>Industry</span>?
              </h2>
              <p style={{ color: MUTED, fontFamily: "Calibri, sans-serif", fontSize: 15 }}>
                Pick your business type and we'll show you exactly what Excellence Digital can build for you.
              </p>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16
            }}>
              {industries.map((ind, i) => (
                <div
                  key={ind.id}
                  onClick={() => { setSelectedIndustry(i); setPhase("SELECT_PAIN"); }}
                  onMouseEnter={() => setHoveredCard(`ind-${i}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: hoveredCard === `ind-${i}` ? "rgba(0,229,185,0.08)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${hoveredCard === `ind-${i}` ? TEAL : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 12,
                    padding: "20px 18px",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    transform: hoveredCard === `ind-${i}` ? "translateY(-2px)" : "none",
                    animation: `fadeSlideUp 0.4s ease ${i * 0.08}s both`
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{ind.icon}</div>
                  <h3 style={{ margin: "0 0 4px", fontSize: 16, color: WHITE }}>{ind.title}</h3>
                  <p style={{ margin: 0, fontSize: 12, color: TEAL, fontFamily: "Calibri, sans-serif" }}>
                    {ind.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHASE 2: Select Pain Point */}
        {phase === "SELECT_PAIN" && selectedIndustry !== null && (
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 24,
              padding: "12px 16px",
              background: "rgba(0,229,185,0.06)",
              borderRadius: 10,
              border: `1px solid rgba(0,229,185,0.15)`
            }}>
              <span style={{ fontSize: 28 }}>{industries[selectedIndustry].icon}</span>
              <div>
                <h3 style={{ margin: 0, fontSize: 18 }}>{industries[selectedIndustry].title}</h3>
                <p style={{ margin: 0, fontSize: 12, color: MUTED, fontFamily: "Calibri, sans-serif" }}>
                  Select your biggest challenge below
                </p>
              </div>
            </div>
            <h2 style={{ fontSize: 22, marginBottom: 16 }}>
              What's Your Biggest <span style={{ color: TEAL }}>Pain Point</span>?
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {industries[selectedIndustry].painPoints.map((pain, i) => (
                <div
                  key={i}
                  onClick={() => { setSelectedPain(i); setPhase("VIEW_SOLUTION"); }}
                  onMouseEnter={() => setHoveredCard(`pain-${i}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: hoveredCard === `pain-${i}` ? "rgba(0,229,185,0.1)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${hoveredCard === `pain-${i}` ? TEAL : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 10,
                    padding: "16px 20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    transition: "all 0.2s ease",
                    animation: `fadeSlideUp 0.35s ease ${i * 0.1}s both`
                  }}
                >
                  <span style={{
                    background: NAVY,
                    border: `2px solid ${TEAL}`,
                    borderRadius: "50%",
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 700,
                    color: TEAL,
                    flexShrink: 0
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: 15, fontFamily: "Calibri, sans-serif" }}>{pain}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PHASE 3: Solution Blueprint */}
        {phase === "VIEW_SOLUTION" && solution && (
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
              padding: "10px 14px",
              background: "rgba(0,229,185,0.06)",
              borderRadius: 10,
              border: `1px solid rgba(0,229,185,0.15)`
            }}>
              <span style={{ fontSize: 22 }}>{industries[selectedIndustry].icon}</span>
              <span style={{ fontSize: 14, color: MUTED, fontFamily: "Calibri, sans-serif" }}>
                {industries[selectedIndustry].title} → {industries[selectedIndustry].painPoints[selectedPain]}
              </span>
            </div>

            {/* Solution Card */}
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid rgba(0,229,185,0.2)`,
              borderRadius: 14,
              padding: "28px 24px",
              marginTop: 16,
              animation: "fadeSlideUp 0.5s ease both"
            }}>
              <div style={{
                display: "inline-block",
                background: `linear-gradient(135deg, ${TEAL}, ${DARK_TEAL})`,
                color: NAVY,
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 12px",
                borderRadius: 20,
                marginBottom: 12,
                fontFamily: "Calibri, sans-serif",
                letterSpacing: 1,
                textTransform: "uppercase"
              }}>
                Recommended Solution
              </div>

              <h2 style={{ margin: "0 0 16px", fontSize: 24, lineHeight: 1.3 }}>
                <TypingText text={solution.name} speed={30} />
              </h2>

              <p style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: 14,
                lineHeight: 1.7,
                fontFamily: "Calibri, sans-serif",
                marginBottom: 24
              }}>
                {solution.description}
              </p>

              {/* Tech Stack */}
              <div style={{ marginBottom: 20 }}>
                <span style={{ color: TEAL, fontSize: 12, fontWeight: 700, fontFamily: "Calibri, sans-serif", letterSpacing: 1 }}>
                  TECH STACK
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                  {solution.stack.map((tech, i) => (
                    <span key={i} style={{
                      background: "rgba(0,229,185,0.12)",
                      border: "1px solid rgba(0,229,185,0.25)",
                      color: TEAL,
                      padding: "5px 12px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontFamily: "Calibri, sans-serif",
                      animation: `fadeSlideUp 0.3s ease ${0.5 + i * 0.1}s both`
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Blueprint */}
              <div style={{
                background: "rgba(0,0,0,0.25)",
                borderRadius: 10,
                padding: "18px 20px",
                marginBottom: 20
              }}>
                <BlueprintLine label="Timeline:" value={solution.timeline} delay={600} />
                <BlueprintLine label="Impact:" value={solution.impact} delay={900} />
              </div>

              {/* Edge Cases Toggle */}
              {!showEdgeCases ? (
                <button
                  onClick={() => setShowEdgeCases(true)}
                  style={{
                    background: `linear-gradient(135deg, ${TEAL}, ${DARK_TEAL})`,
                    color: NAVY,
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "Calibri, sans-serif",
                    width: "100%",
                    transition: "transform 0.2s"
                  }}
                >
                  🤔 "But What About..." — See Edge Cases
                </button>
              ) : (
                <div style={{ animation: "fadeSlideUp 0.4s ease both" }}>
                  <h3 style={{ color: TEAL, fontSize: 15, marginBottom: 14, fontFamily: "Calibri, sans-serif" }}>
                    Edge Cases & Smart Answers
                  </h3>
                  {solution.edgeCases.map((ec, i) => {
                    const [question, answer] = ec.split(" → ");
                    return (
                      <div key={i} style={{
                        background: "rgba(0,0,0,0.2)",
                        borderRadius: 8,
                        padding: "14px 16px",
                        marginBottom: 10,
                        borderLeft: `3px solid ${TEAL}`,
                        animation: `fadeSlideUp 0.35s ease ${i * 0.15}s both`
                      }}>
                        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, fontFamily: "Calibri, sans-serif" }}>
                          {question}
                        </div>
                        <div style={{ fontSize: 13, color: TEAL, fontFamily: "Calibri, sans-serif" }}>
                          → {answer}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Try Another */}
            <div style={{
              display: "flex",
              gap: 12,
              marginTop: 20,
              flexWrap: "wrap"
            }}>
              <button
                onClick={() => { setSelectedPain(null); setShowEdgeCases(false); setPhase("SELECT_PAIN"); }}
                style={{
                  flex: 1,
                  minWidth: 200,
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid rgba(255,255,255,0.15)`,
                  color: WHITE,
                  padding: "12px 20px",
                  borderRadius: 8,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "Calibri, sans-serif"
                }}
              >
                ← Try Another Pain Point
              </button>
              <button
                onClick={reset}
                style={{
                  flex: 1,
                  minWidth: 200,
                  background: "rgba(255,255,255,0.05)",
                  border: `1px solid rgba(255,255,255,0.15)`,
                  color: WHITE,
                  padding: "12px 20px",
                  borderRadius: 8,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "Calibri, sans-serif"
                }}
              >
                🔄 Try a Different Industry
              </button>
            </div>

            {/* CTA */}
            <div style={{
              textAlign: "center",
              marginTop: 28,
              padding: "20px 24px",
              background: `linear-gradient(135deg, rgba(0,229,185,0.08), rgba(0,229,185,0.02))`,
              borderRadius: 12,
              border: `1px solid rgba(0,229,185,0.2)`
            }}>
              <p style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700 }}>
                Want this built for <span style={{ color: TEAL }}>your</span> business?
              </p>
              <p style={{ margin: 0, fontSize: 13, color: MUTED, fontFamily: "Calibri, sans-serif" }}>
                excellence-digital.com | 813-565-3131 | pierre@excellence-digital.com
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
        button:hover { opacity: 0.9; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,229,185,0.3); border-radius: 3px; }
      `}</style>
    </div>
  );
}
