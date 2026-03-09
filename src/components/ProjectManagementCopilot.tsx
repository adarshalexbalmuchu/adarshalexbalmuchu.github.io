import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Database, Radar, Workflow, BellRing, MessageSquareWarning } from 'lucide-react';

const modules = [
  {
    title: '1) Project Data Ingestion & Processing',
    details:
      'Parses charters, BRDs, scope docs, meeting transcripts, emails, reports, change requests, risk registers, and stakeholder communication across PDF, DOCX, XLSX, email, and text formats. NLP pipelines extract objectives, milestones, constraints, assumptions, deliverables, dependencies, and resource requirements.',
  },
  {
    title: '2) AI Scope Planning Engine',
    details:
      'Generates structured scope statements, decomposes deliverables into WBS hierarchies, suggests dependencies, and continuously detects scope creep from communication and change artifacts with impact prompts.',
  },
  {
    title: '3) Risk Intelligence Engine',
    details:
      'Detects technical, schedule, financial, resource, stakeholder, compliance, and external risks from communication patterns, project telemetry, and historical project analogs.',
  },
  {
    title: '4) Risk Assessment & Register',
    details:
      'Builds a live risk register with probability, impact, severity score, and priority ranking. Produces risk matrix, heat map views, and recommended mitigation/transfer/avoidance/monitoring actions.',
  },
  {
    title: '5) Adaptive Recommendation Engine',
    details:
      'Improves recommendations over time using reward signals from project outcomes, PM feedback, and mitigation effectiveness to promote high-performing interventions in similar contexts.',
  },
  {
    title: '6) Communication + Stakeholder Intelligence',
    details:
      'Monitors email/chat/transcripts for dissatisfaction, escalation, delivery risk, resource bottlenecks, and engagement drop-offs. Triggers alerts for key stakeholders and potential conflicts.',
  },
  {
    title: '7) Knowledge + Decision Support + Monitoring',
    details:
      'Maintains vector-searchable lessons learned, prior decisions, and risk treatments. Supports scenario planning, trade-off analysis, and continuous early-warning alerts for budget, schedule, risk, and scope.',
  },
];

const outputs = [
  'Structured Scope Statement',
  'AI-generated Work Breakdown Structure (WBS)',
  'Risk Register with auto-prioritization',
  'Risk Matrix and Heat Map',
  'Mitigation Recommendations',
  'Communication & Sentiment Alerts',
  'Stakeholder Engagement Reports',
  'Decision Support What-if Scenarios',
];

const stack = [
  'LLM agent orchestration (planning + reasoning)',
  'Document parsing + NLP entity extraction',
  'Vector database for semantic knowledge retrieval',
  'ML classifiers for risk and sentiment scoring',
  'Reinforcement learning feedback loop',
  'Dashboard UI for PMO-level monitoring',
];

const ProjectManagementCopilot: React.FC = () => {
  return (
    <section id="copilot" className="section py-20 md:py-28 bg-white dark:bg-dark-200">
      <div className="container-custom">
        <motion.div
          className="text-center max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            AI-Powered <span className="gradient-text">Project Management Copilot</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            An end-to-end AI advisor for scope, risk, communication, stakeholder monitoring, knowledge management,
            and decision support across the full project lifecycle.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3"><Workflow className="text-primary-500" /><h3 className="font-semibold">Architecture Modules</h3></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">7 integrated modules from ingestion to monitoring and adaptive learning.</p>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3"><Radar className="text-primary-500" /><h3 className="font-semibold">Core Objectives</h3></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Automate scope planning, detect risks early, and support data-driven PM decisions.</p>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3"><BellRing className="text-primary-500" /><h3 className="font-semibold">Continuous Alerts</h3></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Early warnings for scope creep, budget overruns, delays, conflicts, and high-risk scenarios.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><BrainCircuit className="text-primary-500" /> System Modules</h3>
            <ul className="space-y-4">
              {modules.map((module) => (
                <li key={module.title}>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{module.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{module.details}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><Database className="text-primary-500" /> Expected Outputs</h3>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                {outputs.map((item) => (
                  <li key={item} className="bg-primary-500/10 dark:bg-primary-400/10 rounded-md px-3 py-2">{item}</li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2"><MessageSquareWarning className="text-primary-500" /> Suggested Technology Stack</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectManagementCopilot;
