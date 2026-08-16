import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Network,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import "./ApiDast.css";

type MetricCardProps = {
  icon: React.ReactNode;
  iconClass: string;
  label: string;
  value: string;
  detail: string;
};

function MetricCard({
  icon,
  iconClass,
  label,
  value,
  detail,
}: MetricCardProps) {
  return (
    <article className="api-metric-card">
      <div className={`api-metric-icon ${iconClass}`}>{icon}</div>

      <div className="api-metric-live">LIVE</div>

      <div className="api-metric-label">{label}</div>
      <div className="api-metric-value">{value}</div>
      <div className="api-metric-detail">{detail}</div>
    </article>
  );
}

function SeverityCard({
  label,
  value,
  type,
  width,
  description,
}: {
  label: string;
  value: string;
  type: string;
  width: string;
  description: string;
}) {
  return (
    <article className={`api-severity-card ${type}`}>
      <div className="api-severity-top">
        <div className="api-severity-name">
          <span className={`api-severity-dot ${type}`} />
          {label}
        </div>

        <strong>{value}</strong>
      </div>

      <div className="api-severity-description">
        {description}
      </div>

      <div className="api-severity-bar">
        <span
          className={`api-severity-fill ${type}`}
          style={{ width }}
        />
      </div>
    </article>
  );
}

function CoverageCard({
  type,
  icon,
  label,
  metric,
  description,
}: {
  type: string;
  icon: React.ReactNode;
  label: string;
  metric: string;
  description: string;
}) {
  return (
    <article className={`api-coverage-card ${type}`}>
      <div className="api-coverage-icon">{icon}</div>

      <div className="api-coverage-label">{label}</div>

      <div className="api-coverage-metric">{metric}</div>

      <div className="api-coverage-description">
        {description}
      </div>
    </article>
  );
}

export default function ApiDast() {
  return (
    <main className="api-dast-page">

      {/* PAGE HEADER */}
      <section className="api-page-header">
        <div>
          <div className="api-eyebrow">
            API & APPLICATION SECURITY
          </div>

          <h1>API / DAST Security Assessment</h1>

          <p>
            Dynamic application and API security testing across
            enterprise applications, services and endpoints.
          </p>
        </div>

        <button className="api-primary-button">
          <Plus size={21} />
          New Assessment
        </button>
      </section>

      {/* METRICS */}
      <section className="api-metrics-grid">

        <MetricCard
          icon={<Activity size={26} />}
          iconClass="blue"
          label="ACTIVE DAST SCANS"
          value="03"
          detail="+1 this week"
        />

        <MetricCard
          icon={<Network size={26} />}
          iconClass="purple"
          label="API ENDPOINTS"
          value="121"
          detail="+14 monitored"
        />

        <MetricCard
          icon={<AlertTriangle size={26} />}
          iconClass="red"
          label="OPEN FINDINGS"
          value="42"
          detail="08 high priority"
        />

        <MetricCard
          icon={<ShieldCheck size={26} />}
          iconClass="green"
          label="CRITICAL FINDINGS"
          value="04"
          detail="2 require immediate action"
        />

      </section>

      {/* NEW ASSESSMENT */}
      <section className="api-assessment-card">

        <div className="api-section-header">
          <div>
            <h2>New Security Assessment</h2>

            <p>
              Configure and launch an API or dynamic application
              security assessment.
            </p>
          </div>

          <div className="api-engine-badge">
            <span />
            ENGINE ONLINE
          </div>
        </div>

        <div className="api-form-grid">

          <label className="api-form-field api-field-wide">
            <span>Target URL / API Endpoint</span>

            <input
              type="text"
              placeholder="https://api.example.com"
            />
          </label>

          <label className="api-form-field">
            <span>Assessment Type</span>

            <select defaultValue="API Security">
              <option>API Security</option>
              <option>Web Application DAST</option>
              <option>Full API + DAST</option>
            </select>
          </label>

          <label className="api-form-field">
            <span>Authentication</span>

            <select defaultValue="No Authentication">
              <option>No Authentication</option>
              <option>Bearer Token</option>
              <option>API Key</option>
              <option>Basic Authentication</option>
            </select>
          </label>

          <label className="api-form-field">
            <span>Scan Profile</span>

            <select defaultValue="Full Security Assessment">
              <option>Full Security Assessment</option>
              <option>API Security</option>
              <option>OWASP Top 10</option>
              <option>Quick Assessment</option>
            </select>
          </label>

          <label className="api-form-field">
            <span>Scanner</span>

            <select defaultValue="BugTraceAI DAST Engine">
              <option>BugTraceAI DAST Engine</option>
              <option>Burp Suite Enterprise</option>
              <option>OWASP ZAP</option>
            </select>
          </label>

        </div>

        <div className="api-form-actions">
          <button className="api-secondary-button">
            Cancel
          </button>

          <button className="api-primary-button">
            <Activity size={20} />
            Start Assessment
          </button>
        </div>

      </section>

      {/* ACTIVE ASSESSMENTS + SEVERITY */}
      <section className="api-two-column-grid">

        {/* ACTIVE ASSESSMENTS */}
        <div className="api-panel">

          <div className="api-section-header">
            <div>
              <h2>Active Assessments</h2>

              <p>
                Current API and DAST security assessments.
              </p>
            </div>

            <button className="api-panel-action">
              View all
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="api-table-container">

            <table className="api-table">

              <thead>
                <tr>
                  <th>SCAN ID</th>
                  <th>TARGET</th>
                  <th>TYPE</th>
                  <th>STATUS</th>
                  <th>PROGRESS</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td className="api-scan-id">API-024</td>

                  <td className="api-target">
                    API Gateway
                  </td>

                  <td>
                    <span className="api-type-tag api">
                      API
                    </span>
                  </td>

                  <td>
                    <span className="api-status-tag running">
                      Running
                    </span>
                  </td>

                  <td>
                    <div className="api-progress-wrapper">
                      <div className="api-progress">
                        <span style={{ width: "67%" }} />
                      </div>

                      <strong>67%</strong>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="api-scan-id">DAST-023</td>

                  <td className="api-target">
                    calix.com
                  </td>

                  <td>
                    <span className="api-type-tag dast">
                      DAST
                    </span>
                  </td>

                  <td>
                    <span className="api-status-tag completed">
                      Completed
                    </span>
                  </td>

                  <td>
                    <div className="api-progress-wrapper">
                      <div className="api-progress">
                        <span style={{ width: "100%" }} />
                      </div>

                      <strong>100%</strong>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="api-scan-id">API-022</td>

                  <td className="api-target">
                    Test API
                  </td>

                  <td>
                    <span className="api-type-tag api">
                      API
                    </span>
                  </td>

                  <td>
                    <span className="api-status-tag completed">
                      Completed
                    </span>
                  </td>

                  <td>
                    <div className="api-progress-wrapper">
                      <div className="api-progress">
                        <span style={{ width: "100%" }} />
                      </div>

                      <strong>100%</strong>
                    </div>
                  </td>
                </tr>

              </tbody>

            </table>

          </div>
        </div>

        {/* FINDINGS BY SEVERITY */}
        <div className="api-panel">

          <div className="api-section-header">
            <div>
              <h2>Findings by Severity</h2>

              <p>
                Current API and DAST security findings.
              </p>
            </div>
          </div>

          <div className="api-severity-grid">

            <SeverityCard
              label="Critical"
              value="04"
              type="critical"
              width="18%"
              description="Immediate action required"
            />

            <SeverityCard
              label="High"
              value="08"
              type="high"
              width="32%"
              description="High-priority findings"
            />

            <SeverityCard
              label="Medium"
              value="21"
              type="medium"
              width="68%"
              description="Review and remediation required"
            />

            <SeverityCard
              label="Low"
              value="12"
              type="low"
              width="43%"
              description="Monitor and address"
            />

          </div>

          <button className="api-review-button">
            Review All Findings
            <ChevronRight size={19} />
          </button>

        </div>

      </section>

      {/* API SECURITY COVERAGE */}
      <section className="api-coverage-section">

        <div className="api-section-header">

          <div>
            <h2>API Security Coverage</h2>

            <p>
              Current security testing coverage across API assets.
            </p>
          </div>

        </div>

        <div className="api-coverage-grid">

          <CoverageCard
            type="blue"
            icon={<ShieldCheck size={26} />}
            label="Authentication Coverage"
            metric="94%"
            description="API authentication controls assessed"
          />

          <CoverageCard
            type="purple"
            icon={<Sparkles size={26} />}
            label="AI Validation"
            metric="87%"
            description="Findings validated using AI-assisted analysis"
          />

          <CoverageCard
            type="orange"
            icon={<AlertTriangle size={26} />}
            label="High Risk APIs"
            metric="08"
            description="Endpoints requiring security attention"
          />

          <CoverageCard
            type="green"
            icon={<CheckCircle2 size={26} />}
            label="Remediation"
            metric="76%"
            description="API security findings remediated"
          />

        </div>

      </section>

    </main>
  );
}
