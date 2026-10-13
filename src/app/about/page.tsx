import Link from "next/link";

import type { ReactNode } from "react";
import AboutScrollEffects from "./AboutScrollEffects";



const philosophy = ["ASSESS", "IMPROVE", "PROTECT", "GOVERN", "SUSTAIN"];



const values = [

    ["Safety and Human Dignity", "Recognising that the purpose of safety systems is to protect people."],

    ["Engineering Independence", "Keeping technical observations, assessments and recommendations objective and evidence-based."],

    ["Professional Integrity", "Maintaining honest reporting, responsible communication and accountability."],

    ["Competency and Continuous Learning", "Developing the knowledge, practical capability and professional behaviour required for responsible work."],

    ["Transparency and Traceability", "Supporting reliable documentation and clear ownership of actions."],

    ["Shared Responsibility", "Encouraging cooperation among users, owners, maintenance agencies, engineers, employers and institutions."],

    ["Sustainability", "Promoting responsible lifecycle decisions, continuous improvement and long-term governance."],

];



const principles = [

    ["Safety First", "Give appropriate priority to public safety."],

    ["Technical Competency", "Assign work according to relevant competence and experience."],

    ["Professional Integrity", "Base findings on observations, available evidence and professional judgement."],

    ["Independence", "Keep technical opinions impartial and free from inappropriate commercial influence."],

    ["Transparency", "Communicate scope, findings, limitations and responsibilities clearly."],

    ["Accountability", "Maintain responsibility for assigned work and its records."],

    ["Confidentiality", "Protect information according to applicable obligations and authorised access."],

    ["Respect for Stakeholders", "Promote professional cooperation and fair treatment."],

    ["Continuous Improvement", "Improve practices as knowledge and requirements evolve."],

];



const governanceSteps = [

    ["ASSESS", "Independent Engineering Assessment", "Understand the asset's condition through applicable inspection, testing, technical assessment and evidence."],

    ["IMPROVE", "Appropriate Corrective Action", "Help relevant stakeholders identify observations, coordinate follow-up and make informed decisions within their responsibilities."],

    ["PROTECT", "Awareness and Readiness", "Develop informed users, QRT readiness, responsible operating behaviour and emergency coordination under approved procedures."],

    ["GOVERN", "Traceability and Accountability", "Connect observations, maintenance updates, operational cross-checks, digital records and relevant escalation."],

    ["SUSTAIN", "Lifecycle and Continuous Improvement", "Support informed lifecycle planning, refresher learning, reliability improvement and responsible long-term decisions."],

];



const qrtResponsibilities = [

    ["User Observation and Complaint Registration", "Provide a structured channel for reporting abnormal sound, vibration, jerking, door behaviour, levelling concerns, repeated breakdowns and other unusual operating conditions."],

    ["Complaint Filtering and Consolidation", "Review related reports for the same lift, location and issue. Consolidate them into a structured callback record while retaining linked history and traceability."],

    ["Weekly Operational Governance Checks", "Carry out defined weekly observations and readiness checks using the approved QRT checklist. These checks do not replace technical maintenance or statutory inspection."],

    ["Readiness and Site Controls", "Check designated first-aid supplies, approved emergency-access arrangements, suitable barricades and “Under Maintenance / Out of Service” signage, as applicable to site procedures."],

    ["Emergency Coordination", "Follow the approved emergency SOP, contact authorised responders and coordinate communication and passenger assistance. Rescue or evacuation must be performed only by trained and authorised personnel under the applicable procedure."],

    ["Maintenance Coordination and Closure Follow-up", "Send structured observations through the designated DGS process and verify defined operational points after the maintenance agency reports completion."],

];



const trainingAreas = [

    ["Technical and Vocational Training", "Lift and escalator-related technical knowledge and equipment-specific areas within the approved training scope."],

    ["Skill India Programmes", "Relevant programmes delivered under applicable Skill India authorisation and course requirements."],

    ["Practical Learning and OJT", "Practical exposure and on-the-job training where included in the relevant programme and subject to its terms."],

    ["Safety and QRT Training", "Operational observation, structured reporting, emergency readiness, first-level governance and approved SOP awareness."],

    ["Professional and Soft Skills", "Professional communication, workplace behaviour, email and workplace messaging, discipline, teamwork and responsibility."],

    ["Competency Development", "Helping learners understand what to do, why procedures matter and how documentation and accountability support responsible work."],

];



const corporateTraining = [

    ["Codes, Standards and Regulatory Awareness", "Role-appropriate understanding of applicable Acts, standards, procedures and responsibilities."],

    ["Safety Frameworks and Safety Culture", "Understanding why safety processes matter, how responsibilities connect and how concerns should be reported."],

    ["Human Behaviour and Workplace Responsibility", "Situational awareness, communication, disciplined work practices, reporting behaviour and responsibility under pressure."],

    ["QRT Refresher Training", "Refresher learning on observation, complaint handling, approved checks, emergency escalation and operational governance."],

    ["Lift Industry Technical Refresher Training", "Relevant technical and safety learning for lift companies, installation contractors, OEMs, AMC agencies and other applicable participants."],

    ["Corporate and Cross-Industry Training", "Customised programmes for facility management, manufacturing, infrastructure, public-sector organisations, transport facilities and relevant work environments."],

    ["Supervisory and Management Awareness", "Role clarity, documentation, escalation, maintenance coordination, contractor accountability and governance practices."],

];



const sectors = [

    ["Residential Welfare Associations and Apartment Societies", "QRT development, user awareness, maintenance coordination, DGS records, operational governance and applicable engineering services."],

    ["Lift and Vertical Transportation Companies", "Independent engineering services, technical training, corporate refresher learning, competency development and structured governance inputs."],

    ["Government and Public-Sector Organisations", "Applicable engineering assessment, training, safety awareness and governance services, subject to eligibility, authorisation and agreed scope."],

    ["MRTS, Railway Stations and Public Transport Infrastructure", "Potential applications include safety awareness, QRT readiness, callback governance, coordinated maintenance scheduling and structured operational records."],

    ["Other Industrial and Corporate Environments", "Relevant industrial lifting equipment services, corporate training, workplace safety awareness, technical competency development and governance support within the approved scope."],

];



const sustainability = [

    ["Asset Lifecycle Awareness", "Understanding ageing, obsolescence, repeat failures, component history and modernisation considerations."],

    ["Responsible Maintenance Coordination", "Supporting relevant observations and records without interfering with the maintenance agency's independent technical decisions."],

    ["Evidence-Based Governance", "Preserving the history of observations, actions, cross-checks and unresolved concerns."],

    ["Continuous Competency Development", "Encouraging technical and corporate refresher learning as requirements and responsibilities evolve."],

    ["User Awareness", "Promoting clear communication and responsible operating behaviour."],

    ["Operational Planning", "Coordinating necessary work with facility requirements without compromising safety or technical completeness."],

    ["Continuous Improvement", "Using available records, lessons learned and verified trends to improve future planning and governance."],

];



function TricolourLine({ className = "" }: { className?: string }) {

    return (

        <span className={`inline-flex h-1 w-16 overflow-hidden rounded-full ${className}`} aria-hidden="true">

            <span className="w-1/3 bg-[#ff9933]" />

            <span className="w-1/3 bg-white" />

            <span className="w-1/3 bg-[#138808]" />

        </span>

    );

}



function SectionHeading({

    eyebrow,

    title,

    description,

    light = false,

}: {

    eyebrow: string;

    title: string;

    description?: string;

    light?: boolean;

}) {

    return (

        <div className="reveal-on-scroll mb-10 max-w-3xl">

            <p className={`text-xs font-bold uppercase tracking-[0.18em] ${light ? "text-teal-200" : "text-[#0d9488]"}`}>{eyebrow}</p>

            <h2 className={`mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl ${light ? "text-white" : "text-[#102844]"}`}>{title}</h2>

            {description && <p className={`mt-4 max-w-2xl text-sm leading-7 sm:text-base ${light ? "text-slate-300" : "text-slate-600"}`}>{description}</p>}

            <TricolourLine className="mt-5" />

        </div>

    );

}



function InfoCards({ items, columns = "sm:grid-cols-2 lg:grid-cols-3" }: { items: string[][]; columns?: string }) {

    return (

        <div className={`grid gap-4 ${columns}`}>

            {items.map(([title, description], index) => (

                <article key={title} style={{ animationDelay: `${Math.min(index * 80, 400)}ms` }} className="reveal-on-scroll group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg sm:p-6">

                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#102844] text-xs font-bold text-teal-200">{String(index + 1).padStart(2, "0")}</span>

                    <h3 className="mt-4 text-lg font-bold text-[#102844]">{title}</h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>

                </article>

            ))}

        </div>

    );

}



function ActionLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {

    return (

        <Link href={href} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${secondary ? "border border-white/25 bg-white/5 text-white hover:bg-white/10" : "bg-[#12a6a0] text-white shadow-lg shadow-teal-950/20 hover:bg-[#0d9488]"}`}>

            {children} <span aria-hidden="true">↗</span>

        </Link>

    );

}



export default function AboutPage() {

    return (

        <main className="overflow-hidden">
            <AboutScrollEffects />

            {/* Hero */}

            <section

                className="about-hero relative isolate overflow-hidden bg-[#0b1e34] bg-cover bg-center text-white"

                style={{

                    backgroundImage:

                        "linear-gradient(135deg, rgba(7, 20, 38, 0.88) 0%, rgba(7, 20, 38, 0.76) 55%, rgba(7, 20, 38, 0.88) 100%), url('/images/nleta-about-bg.png')",

                }}

            >

                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:52px_52px]" />

                <div className="container-shell py-12 sm:py-16 lg:py-20">

                    <div className="about-hero-content mx-auto max-w-4xl text-center">

                        

                        <p className="mt-4 inline-flex rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-teal-100 sm:text-xs">Independent Engineering · Safety · Skill Development</p>

                        <h1 className="hero-animate hero-animate-2 mt-6 text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl lg:text-7xl">Beyond Inspection.<span className="mt-2 block text-[#8ec5ff]">Building Safer Futures.</span></h1>

                        <p className="hero-animate hero-animate-3 mx-auto mt-6 max-w-3xl text-sm leading-7 text-slate-100 drop-shadow-sm sm:text-base sm:leading-8">

                            NLETA strengthens lift and escalator safety through independent engineering,

                            technical assessment, digital governance and professional training.

                        </p>

                        <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base sm:leading-8">

                            Building safer systems through skilled people, informed decisions and

                            responsible governance.

                        </p>

                        <div className="hero-animate hero-animate-4 mt-8 flex flex-wrap justify-center gap-3">

                            <ActionLink href="/engineering-services">Explore Engineering Services</ActionLink>

                            <ActionLink href="/training" secondary>Explore Training & Certifications</ActionLink>

                            <ActionLink href="/contact" secondary>Discover QRT & DGS</ActionLink>

                        </div>

                     
                    </div>

                </div>

            </section>



            {/* Experience and founding philosophy */}

            <section className="about-section bg-white py-16 sm:py-20">

                <div className="container-shell grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">

                    <div>

                        <SectionHeading eyebrow="Our experience & philosophy" title="Experience Across the Industry. A Vision Beyond Inspection." />

                        <p className="text-sm leading-7 text-slate-600">NLETA’s perspective is shaped by how equipment is designed, installed, operated, maintained, assessed and sustained over time.</p>

                        <div className="mt-6 rounded-2xl bg-[#102844] p-6 text-white">

                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal-200">Collective core-team experience</p>

                            <p className="mt-2 text-4xl font-bold">150+ Years</p>

                            <p className="mt-2 text-sm leading-6 text-slate-300">Combined professional experience across different stages of the lift and escalator industry.</p>

                            <p className="mt-4 text-xs leading-5 text-slate-400">Publish this claim only after the core-team experience register has been verified and approved.</p>

                        </div>

                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-[#f7f9fc] p-6 sm:p-9">

                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0d9488]">The thinking behind NLETA</p>

                        <h3 className="mt-3 text-2xl font-bold text-[#102844] sm:text-3xl">“Think Like the Machine.”</h3>

                        <p className="mt-4 text-sm leading-7 text-slate-600">A lift or escalator responds to its design, operating conditions, maintenance, component condition and the actions of the people responsible for it. Engineering decisions must therefore be objective, evidence-based, documented and professionally responsible.</p>

                        <p className="mt-4 text-sm leading-7 text-slate-600">Our objective is not simply to identify an issue. It is to help stakeholders understand the issue, determine the appropriate next step within their responsibilities and maintain a reliable record of action and follow-up.</p>

                        <ActionLink href="/contact">Meet the NLETA Core Team</ActionLink>

                    </div>

                </div>

            </section>



            {/* Mission vision values */}

            <section className="about-section bg-[#f3f6fa] py-16 sm:py-20">

                <div className="container-shell">

                    <SectionHeading eyebrow="Mission, vision & values" title="A Clear Purpose. A Responsible Future." />

                    <div className="grid gap-5 lg:grid-cols-2">

                        <article className="rounded-3xl bg-[#102844] p-7 text-white sm:p-9">

                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">Our mission</p>

                            <p className="mt-4 text-xl font-semibold leading-8">To strengthen lift and escalator safety through independent engineering assessment, safety awareness, technical competency development, digital governance and responsible stakeholder collaboration.</p>

                        </article>

                        <article className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-9">

                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0d9488]">Our vision</p>

                            <p className="mt-4 text-xl font-semibold leading-8 text-[#102844]">To develop a scalable and trusted safety-governance ecosystem connecting engineering, people, processes and technology—first across India and, over time, across Asia and other relevant markets where the model can be adapted to local requirements.</p>

                        </article>

                    </div>

                    <h3 className="mb-5 mt-12 text-2xl font-bold text-[#102844]">Our Values</h3>

                    <InfoCards items={values} />

                </div>

            </section>



            {/* Social responsibility */}

            <section className="about-section bg-white py-16 sm:py-20">

                <div className="container-shell">

                    <SectionHeading eyebrow="Social & moral responsibility" title="Safety Is a Shared Social Responsibility" description="Lift and escalator safety involves owners, RWAs, facility managers, users, OEMs, AMC agencies, engineers, public authorities, training institutions and other stakeholders. Our approach is based on shared responsibility, not blame." />

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {[

                            "Help users understand safe lift and escalator behaviour.",

                            "Encourage reporting of unusual operation through appropriate channels.",

                            "Promote honest technical reporting and responsible follow-up.",

                            "Support building management in understanding governance responsibilities.",

                            "Encourage maintenance accountability without interfering with independent technical decisions.",

                            "Develop technically competent and professionally responsible workers.",

                            "Support informed engineering and lifecycle decisions.",

                        ].map((item, i) => <div key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-[#f8fafc] p-4"><span className="mt-0.5 text-lg font-bold text-[#0d9488]">✓</span><p className="text-sm leading-6 text-slate-700">{item}</p></div>)}

                    </div>

                </div>

            </section>



            {/* Regulatory commitment */}

            <section className="about-section bg-[#f3f6fa] py-16 sm:py-20">

                <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">

                    <div>

                        <SectionHeading eyebrow="Engineering & regulatory commitment" title="Engineering Within the Applicable Regulatory Framework" description="Services are structured around applicable State Lift Acts and Rules, statutory and regulatory requirements, relevant BIS / Indian Standards, applicable codes, OEM requirements and defined engineering criteria—according to the equipment, jurisdiction and agreed service scope." />

                        <ul className="space-y-3 text-sm leading-6 text-slate-700">

                            {["Applicable State Lift Acts and Rules", "Relevant BIS / Indian Standards", "Applicable building, electrical and engineering requirements", "Relevant international standards or codes, where applicable", "OEM technical documentation and equipment-specific requirements", "NLETA-approved technical frameworks, procedures and decision matrices"].map((item) => <li key={item} className="flex gap-3"><span className="font-bold text-[#0d9488]">✓</span>{item}</li>)}

                        </ul>

                    </div>

                    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">

                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-800">Our engineering commitment</p>

                        <h3 className="mt-3 text-2xl font-bold text-[#102844]">No invented criteria. No unsupported compliance claims.</h3>

                        <p className="mt-4 text-sm leading-7 text-slate-700">The applicable requirement must be established for the relevant jurisdiction, equipment and service. Technical observations, recommendations and reports must remain within the agreed scope and competence of responsible personnel.</p>

                        <p className="mt-4 text-sm leading-7 text-slate-700">NLETA’s independent assessment does not replace statutory authorities, OEM/AMC maintenance responsibilities or the technical judgement required from competent professionals.</p>

                        <div className="mt-6"><ActionLink href="/engineering-services">Explore Engineering Services</ActionLink></div>

                    </div>

                </div>

            </section>



            {/* Integrated model */}

            <section className="about-section bg-[#0b1e34] py-16 text-white sm:py-20">

                <div className="container-shell">

                    <SectionHeading eyebrow="Integrated safety governance model" title="One Connected Approach to Safety Governance" description="NLETA connects engineering assessment, appropriate action, awareness, traceability and lifecycle improvement." light />

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

                        {governanceSteps.map(([step, title, description], i) => <article key={step} className="rounded-2xl border border-white/15 bg-white/[0.06] p-5">

                            <p className="text-xs font-bold tracking-[0.16em] text-teal-200">STEP 0{i + 1}</p>

                            <h3 className="mt-3 text-xl font-extrabold text-[#8ec5ff]">{step}</h3>

                            <p className="mt-2 text-sm font-semibold text-white">{title}</p>

                            <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>

                        </article>)}

                    </div>

                    <p className="mt-5 text-xs leading-6 text-slate-400">This is NLETA’s institutional philosophy, not a mandatory technical sequence. The applicable service and engineering decision pathway determines which steps are relevant to a particular asset.</p>

                </div>

            </section>



            {/* QRT */}

            <section className="about-section bg-white py-16 sm:py-20">

                <div className="container-shell">

                    <SectionHeading eyebrow="First-level safety governance" title="QRT — Quick Response Team" description="Building a trained first-level lift safety supervision system for residential societies, commercial buildings, railway and MRTS facilities, bus terminals, institutions and other relevant public infrastructure." />

                    <InfoCards items={qrtResponsibilities} />

                    <div className="mt-6 rounded-2xl border-l-4 border-amber-400 bg-amber-50 p-5 text-sm leading-7 text-slate-700">

                        <strong>Important responsibility boundary:</strong> QRT does not replace OEM/AMC maintenance, perform unauthorised technical repairs or independently declare a lift technically safe merely because an operational cross-check is complete. Rescue and evacuation must follow approved procedures and be performed only by trained and authorised personnel.

                    </div>

                </div>

            </section>



            {/* DGS */}

            <section className="about-section bg-[#f3f6fa] py-16 sm:py-20">

                <div className="container-shell">

                    <SectionHeading eyebrow="Digital governance & traceability" title="DGS — Digital Governance System" description="Connecting observations, maintenance records and engineering decisions through structured digital records of asset identity, engineering history, maintenance information, callback reports, operational observations, compliance dates and relevant trends." />

                    <div className="rounded-2xl bg-[#102844] p-5 text-center text-sm font-bold leading-7 text-white sm:p-7 sm:text-base">

                        USER OBSERVATION <span className="text-teal-200">→</span> QRT SCREENING <span className="text-teal-200">→</span> DGS RECORD <span className="text-teal-200">→</span> OEM/AMC TECHNICAL DECISION <span className="text-teal-200">→</span> MAINTENANCE UPDATE <span className="text-teal-200">→</span> QRT OPERATIONAL CROSS-CHECK <span className="text-teal-200">→</span> DGS HISTORY & ANALYTICS

                    </div>

                    <div className="mt-6 grid gap-5 lg:grid-cols-3">

                        <article className="rounded-2xl bg-white p-6"><h3 className="font-bold text-[#102844]">Traceable records</h3><p className="mt-3 text-sm leading-7 text-slate-600">QRT consolidates relevant reports and provides structured inputs. DGS maintains traceability and routes information to designated maintenance contacts.</p></article>

                        <article className="rounded-2xl bg-white p-6"><h3 className="font-bold text-[#102844]">Maintenance coordination</h3><p className="mt-3 text-sm leading-7 text-slate-600">DGS can support planned maintenance coordination with building management or authorised public-infrastructure operations staff, without compromising safety or required work.</p></article>

                        <article className="rounded-2xl bg-white p-6"><h3 className="font-bold text-[#102844]">Lifecycle records</h3><p className="mt-3 text-sm leading-7 text-slate-600">Documented lifecycle review points, repeat failures, component history and reasons for delayed replacement can support further investigation and informed planning.</p></article>

                    </div>

                    <p className="mt-5 text-xs leading-6 text-slate-500">OEM/AMC independently determines technical priority, diagnosis, maintenance method, corrective action and required resources. DGS does not automatically determine root cause or authorise operation contrary to applicable requirements.</p>

                    <div className="mt-6"><ActionLink href="/contact">Discover DGS</ActionLink></div>

                </div>

            </section>



            {/* User awareness */}

            <section className="about-section bg-white py-16 sm:py-20">

                <div className="container-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">

                    <div><SectionHeading eyebrow="User awareness" title="Safety Information People Can Understand" description="Safety communication is most useful when people can see it, read it and understand what action they should take." /><p className="text-sm leading-7 text-slate-600">NLETA promotes clearly located lift-lobby signage and user-awareness programmes that explain safe behaviour and how to report unusual operation.</p></div>

                    <div className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-6 sm:p-8">

                        <h3 className="text-xl font-bold text-[#102844]">Key awareness areas</h3>

                        <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">{["Rated load and passenger capacity displayed in the appropriate location.", "How passenger, luggage, baggage and goods weight contributes to total load.", "Simple Do’s and Don’ts for lift usage.", "How to report abnormal sound, vibration, jerking, door behaviour or other unusual operation.", "Emergency contact and reporting instructions.", "Appropriate guidance for users with disabilities and other access needs, where applicable."].map((item) => <li key={item} className="flex gap-3"><span className="text-[#0d9488]">✓</span>{item}</li>)}</ul>

                        <div className="mt-6 border-t border-slate-200 pt-5"><h4 className="font-bold text-[#102844]">Local-language signage</h4><p className="mt-2 text-sm leading-7 text-slate-600">Where users speak different languages, signage should use locally appropriate language or languages, clear wording and suitable symbols. Technical values and signage must be verified against applicable requirements and site conditions.</p></div>

                    </div>

                </div>

            </section>



            {/* Technical training */}

            <section className="about-section bg-[#f3f6fa] py-16 sm:py-20">

                <div className="container-shell">

                    <SectionHeading eyebrow="Technical training & skill development" title="Developing Industry-Ready Professionals" description="Safety standards, technical procedures and governance systems are effective only when the people responsible for applying them have relevant competence, practical understanding and professional discipline." />

                    <InfoCards items={trainingAreas} />

                    <p className="mt-6 text-sm leading-7 text-slate-600">Our objective is to support industry-ready professionals who understand workplace expectations, work within their competence and continue learning as technology and requirements evolve.</p>

                    <div className="mt-6"><ActionLink href="/training">Explore Training & Certifications</ActionLink></div>

                </div>

            </section>



            {/* Corporate training */}

            <section className="about-section bg-white py-16 sm:py-20">

                <div className="container-shell">

                    <SectionHeading eyebrow="Corporate & refresher learning" title="Building a Continuous Learning and Safety Culture" description="Training should not end after induction. Regular refresher learning can help employees stay aware of their responsibilities, relevant requirements and safe working behaviour as roles, procedures and operating conditions change." />

                    <InfoCards items={corporateTraining} />

                    <div className="mt-6 rounded-2xl bg-[#eaf7f6] p-5 text-sm leading-7 text-slate-700">Training content should be tailored to participants’ roles, existing competency, work environment and applicable requirements. Refresher frequency should reflect the relevant programme, regulatory obligations, organisational policy and risk context. The goal is capability and accountability—not simply attendance.</div>

                    <div className="mt-6 flex flex-wrap gap-3"><ActionLink href="/training">Explore Corporate Training</ActionLink><ActionLink href="/contact" secondary>Request a Training Programme</ActionLink></div>

                </div>

            </section>



            {/* Employer connect */}

            <section className="about-section bg-[#f3f6fa] py-16 sm:py-20">

                <div className="container-shell">

                    <SectionHeading eyebrow="Employer connect" title="Connecting Industry Needs with Relevant Skills" description="Training and employment work best when employers’ needs are understood and candidates can present their training, competencies, experience and job preferences through a structured process." />

                    <div className="grid gap-5 lg:grid-cols-3">

                        <article className="rounded-2xl bg-white p-6"><h3 className="text-xl font-bold text-[#102844]">For Employers</h3><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">{["Register through the designated process.", "Share roles, skills, qualifications and preferred locations.", "Communicate workforce demand and selection requirements.", "Engage with suitable candidates matching stated needs."].map(x => <li key={x}>• {x}</li>)}</ul><Link href="/employment" className="mt-5 inline-flex text-sm font-bold text-[#2465a7] hover:text-[#0d9488]">Register as an Employer ↗</Link></article>

                        <article className="rounded-2xl bg-white p-6"><h3 className="text-xl font-bold text-[#102844]">For Candidates</h3><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">{["Build an employment profile.", "Record training, competencies and experience.", "Specify preferred roles and locations.", "Share information through the authorised process."].map(x => <li key={x}>• {x}</li>)}</ul><Link href="/employment" className="mt-5 inline-flex text-sm font-bold text-[#2465a7] hover:text-[#0d9488]">Candidate Employment Profile ↗</Link></article>

                        <article className="rounded-2xl bg-white p-6"><h3 className="text-xl font-bold text-[#102844]">For Training & Industry Partners</h3><p className="mt-4 text-sm leading-7 text-slate-600">Employer feedback can help inform future training requirements, competency development and industry-oriented learning.</p></article>

                    </div>

                    <p className="mt-5 text-xs leading-6 text-slate-500">Candidate matching remains subject to profile verification, candidate consent, eligibility and employer requirements. Training or registration does not guarantee employment, placement or selection.</p>

                </div>

            </section>



            {/* Sectors */}

            <section className="about-section bg-white py-16 sm:py-20">

                <div className="container-shell">

                    <SectionHeading eyebrow="Services across sectors" title="A Flexible Governance Approach for Different Operating Environments" description="NLETA’s philosophy can be adapted according to equipment, users, operating conditions, regulatory requirements and governance responsibilities." />

                    <InfoCards items={sectors} />

                    <p className="mt-5 text-xs leading-6 text-slate-500">Each engagement must be adapted to the relevant operating environment, applicable requirements and responsibilities of the organisations involved.</p>

                </div>

            </section>



            {/* Sustainability */}

            <section className="about-section bg-[#f3f6fa] py-16 sm:py-20">

                <div className="container-shell">

                    <SectionHeading eyebrow="Sustainability & lifecycle thinking" title="Sustainability Means Thinking Beyond Today" description="For NLETA, sustainability means supporting responsible decisions over an asset’s operating life while developing the people and processes required to sustain safe practices." />

                    <InfoCards items={sustainability} />

                </div>

            </section>



            {/* Future vision */}

            <section className="about-section bg-[#0b1e34] py-16 text-white sm:py-20">

                <div className="container-shell">

                    <SectionHeading eyebrow="Our future vision" title="From Pan-India Expansion to a Long-Term Pan-Asia Aspiration" description="NLETA aims to develop a consistent, controlled and scalable operating framework that can be extended across India, with potential future adaptation for relevant Asian markets." light />

                    <div className="grid gap-5 lg:grid-cols-3">

                        <article className="rounded-2xl border border-white/15 bg-white/[0.06] p-6"><p className="text-xs font-bold uppercase tracking-[0.15em] text-teal-200">Next horizon</p><h3 className="mt-3 text-2xl font-bold">Pan-India</h3><p className="mt-3 text-sm leading-7 text-slate-300">A scalable framework supported by standardised procedures, trained teams, controlled documentation, digital traceability, regional coordination and quality assurance.</p></article>

                        <article className="rounded-2xl border border-white/15 bg-white/[0.06] p-6"><p className="text-xs font-bold uppercase tracking-[0.15em] text-teal-200">Long-term aspiration</p><h3 className="mt-3 text-2xl font-bold">Pan-Asia</h3><p className="mt-3 text-sm leading-7 text-slate-300">Explore suitable opportunities while adapting to each country’s laws, technical standards, professional requirements, language, infrastructure and operating practices.</p></article>

                        <article className="rounded-2xl border border-white/15 bg-white/[0.06] p-6"><p className="text-xs font-bold uppercase tracking-[0.15em] text-teal-200">Innovation</p><h3 className="mt-3 text-2xl font-bold">Integration</h3><p className="mt-3 text-sm leading-7 text-slate-300">Bring engineering assessment, first-level safety governance, digital traceability, workforce development and continuous learning into a coordinated framework.</p></article>

                    </div>

                    <p className="mt-5 text-xs leading-6 text-slate-400">Pan-India is a strategic expansion objective; Pan-Asia is a longer-term aspiration, not a claim of current operational coverage. Implementation must adapt to local requirements.</p>

                </div>

            </section>



            {/* Certifications */}

            <section className="about-section bg-white py-16 sm:py-20">

                <div className="container-shell">

                    <SectionHeading eyebrow="Management system certifications" title="A Structured Approach to Quality, Environment and Education" description="NLETA maintains management system certifications intended to support structured organisational processes within the scope stated in the relevant certificates." />

                    <div className="grid gap-4 sm:grid-cols-3">

                        {[["ISO 9001", "Quality Management System"], ["ISO 14001", "Environmental Management System"], ["ISO 21001", "Educational Organization Management System"]].map(([code, name]) => <article key={code} className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 text-center"><p className="text-2xl font-extrabold text-[#102844]">{code}</p><p className="mt-2 text-sm text-slate-600">{name}</p></article>)}

                    </div>

                    <p className="mt-5 text-xs leading-6 text-slate-500">The certified entity, certificate number, certification body, applicable scope and validity must be confirmed from current certificate records before publication.</p>

                    <div className="mt-6"><ActionLink href="/contact">View Our Certifications</ActionLink></div>

                </div>

            </section>



            {/* Code of conduct */}

            <section className="about-section bg-[#f3f6fa] py-16 sm:py-20">

                <div className="container-shell">

                    <SectionHeading eyebrow="Professional integrity" title="The Principles Behind Every NLETA Engagement" description="NLETA’s Code of Conduct provides the foundation for professional behaviour, governance and technical responsibility." />

                    <InfoCards items={principles} />

                    <div className="mt-6"><ActionLink href="/contact">Read NLETA’s Code of Conduct</ActionLink></div>

                </div>

            </section>



            {/* Final CTA */}

            <section className="about-section bg-white py-14 sm:py-20">

                <div className="container-shell">

                    <div className="relative overflow-hidden rounded-[28px] bg-[#0b1e34] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14">

                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_20%,rgba(18,166,160,0.2),transparent_35%),radial-gradient(ellipse_at_10%_100%,rgba(36,101,167,0.25),transparent_45%)]" />

                        <div className="relative">

                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">Connect with NLETA</p>

                            <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">Let’s Build Safer, More Competent and Better-Governed Systems</h2>

                            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">Whether you represent a residential society, lift company, public-sector organisation, MRTS facility, industrial organisation, training institution or employer, explore the services and programmes relevant to your needs.</p>

                            <div className="mt-7 flex flex-wrap gap-3">

                                <ActionLink href="/engineering-services">Explore Engineering Services</ActionLink>

                                <ActionLink href="/training" secondary>Explore Training</ActionLink>

                                <ActionLink href="/employment" secondary>Connect as an Employer</ActionLink>

                                <ActionLink href="/contact" secondary>Contact Customer Service</ActionLink>

                            </div>

                            <p className="mt-8 text-xs font-bold tracking-wide text-slate-300">NLETA · ASSESS → IMPROVE → PROTECT → GOVERN → SUSTAIN</p>

                        </div>

                    </div>

                </div>

            </section>

        </main>

    );

}