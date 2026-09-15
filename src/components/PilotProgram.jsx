import React from "react";
import styles from "../style";
import CalendlyButton from "./CalendlyButton";

const pilotSteps = [
  {
    title: "Check feasibility",
    detail: "Confirm your camera or video-management system, site access, connectivity, power and the operational problem you want to measure.",
  },
  {
    title: "Agree one workflow",
    detail: "Set a baseline, scope, delivery milestones and acceptance criteria before a written proposal is signed or payment is requested.",
  },
  {
    title: "Validate at your site",
    detail: "Evaluate the agreed workflow using authorized sources. Record results, false alerts, installation effort and operating costs.",
  },
  {
    title: "Decide using evidence",
    detail: "Review the measured results and limitations. Any recurring service or additional sites require a separately agreed scope.",
  },
];

const PilotProgram = () => (
  <main className={`${styles.paddingX} bg-primary min-h-screen text-white py-16`}>
    <div className={`${styles.boxWidth} mx-auto`}>
      <a href="/" className="inline-block mb-8 text-blue-300 underline">
        Back to Edgebox
      </a>

      <header className="max-w-3xl mx-auto text-center mb-12">
        <p className="text-blue-300 font-semibold mb-3">SCOPED SITE VALIDATION</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Start with one measurable operational workflow.
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Explore how your existing site cameras could support operational alerts
          and evidence, without committing to a full replacement of your systems.
          We start with compatibility, a clear problem and an agreed baseline.
        </p>
      </header>

      <aside className="bg-gray-800 border border-gray-600 rounded-lg p-6 mb-10" aria-label="Availability and development status">
        <h2 className="text-xl font-semibold mb-2">Availability is subject to feasibility</h2>
        <p className="text-gray-300 leading-relaxed">
          Edgebox is in development. This page describes a proposed validation
          offer, not a claim that every feature, device or integration is already
          supported. Demonstrations may use simulated data and do not establish
          production performance. A written proposal confirms what can be delivered
          at your site before any payment is requested.
        </p>
      </aside>

      <section className="grid lg:grid-cols-2 gap-8 mb-12" aria-labelledby="pilot-scope-heading">
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-8">
          <h2 id="pilot-scope-heading" className="text-2xl font-bold mb-3">Paid validation project</h2>
          <p className="text-3xl font-bold text-blue-300 mb-2">Indicative fee: R25,000</p>
          <p className="text-sm text-gray-300 mb-6">One project, excluding VAT where applicable. Final scope and price are confirmed in writing.</p>
          <dl className="space-y-5">
            <div><dt className="font-semibold">Proposed scope</dt><dd className="text-gray-300">One site, one defined workflow, up to eight compatible camera streams and a 30-day validation period after commissioning.</dd></div>
            <div><dt className="font-semibold">Proposed deliverables</dt><dd className="text-gray-300">A documented baseline, configuration of the accepted workflow, agreed observations and a results report with limitations.</dd></div>
            <div><dt className="font-semibold">Quoted separately unless included in writing</dt><dd className="text-gray-300">Hardware, travel, installation outside the agreed scope, third-party licenses, additional integrations and extended support.</dd></div>
            <div><dt className="font-semibold">No unlimited commitments</dt><dd className="text-gray-300">Camera capacity, storage, notifications, engineering time and support are bounded in the proposal. Performance and savings are measured, not guaranteed.</dd></div>
          </dl>
        </div>

        <div className="bg-gray-800 border border-gray-600 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-3">After a successful validation</h2>
          <p className="text-3xl font-bold text-blue-300 mb-2">Indicative service: R15,000 / site / month</p>
          <p className="text-sm text-gray-300 mb-6">A proposed managed-service price, excluding VAT where applicable. Not an automatic subscription.</p>
          <p className="text-gray-300 leading-relaxed mb-5">
            A follow-on proposal would define the supported sources, workflow,
            evidence retention, usage limits, support hours and responsibilities.
            Hardware ownership and field support are agreed separately. Additional
            sites are added only when compatibility, capacity and commercial terms
            are confirmed.
          </p>
          <p className="text-gray-300 leading-relaxed mb-5">
            Potential workflows include queue or dwell-time exceptions and finding
            evidence for dispatch operations. The feasibility assessment determines
            whether a workflow is appropriate; these examples are not a list of
            guaranteed integrations or outcomes.
          </p>
          <p className="text-gray-300 leading-relaxed">
            The proposed service supports operational decisions. It is not an
            emergency-response service or a replacement for safety-critical systems.
          </p>
        </div>
      </section>

      <section className="mb-12" aria-labelledby="process-heading">
        <h2 id="process-heading" className="text-3xl font-bold mb-8 text-center">From a question to measured results</h2>
        <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pilotSteps.map((step, index) => (
            <li key={step.title} className="bg-gray-800 rounded-lg p-6">
              <p className="text-blue-300 font-bold mb-3">Step {index + 1}</p>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-300 leading-relaxed">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-gray-800 border border-gray-600 rounded-lg p-8 mb-12" aria-labelledby="terms-heading">
        <h2 id="terms-heading" className="text-2xl font-bold mb-4">Clear scope, data responsibilities and terms</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Site access and processing of footage must be authorized. Before work
          starts, the agreement identifies data responsibilities, access controls,
          retention, deliverables, acceptance criteria and any required third-party
          permissions. Hosting location alone is not a statement of regulatory
          compliance.
        </p>
        <p className="text-gray-300 leading-relaxed">
          Payment, cancellation and refund terms are set out in the signed proposal
          and remain subject to applicable rights. This page does not change any
          existing signed customer agreement. We do not offer a blanket guarantee
          of accuracy, uptime, cost savings or loss prevention.
        </p>
      </section>

      <section className="text-center max-w-3xl mx-auto" aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="text-3xl font-bold mb-4">Discuss a scoped proposal</h2>
        <p className="text-gray-300 mb-6">Bring one operational problem and your current camera or video-management setup. We will establish fit before proposing a paid project.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <CalendlyButton text="Book a feasibility discussion" variant="primary" size="large" />
          <a href="/#early-access" className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg underline">Register your interest</a>
        </div>
        <p className="mt-6 text-gray-300">Questions? <a href="mailto:support@edgebox.africa" className="text-blue-300 underline">support@edgebox.africa</a></p>
      </section>
    </div>
  </main>
);

export default PilotProgram;
