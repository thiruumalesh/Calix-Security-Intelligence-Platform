import {
  AlertTriangle,
  CheckCircle2,
  Download,
  FileText,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  getReportUrl,
  getReportZipUrl,
  getScanFindings,
  type ScanFinding,
} from "../services/bugtraceApi";

import "./ScanDetails.css";

interface ScanDetailsProps {
  /*
   * ApiDast only renders this component when a scan
   * has already been selected, therefore scanId is
   * always a valid number here.
   */
  scanId: number;
  scanLabel: string;
  target: string;
  onClose: () => void;
}

function severityClass(severity: string) {
  return severity
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

function formatConfidence(value: number) {
  if (value <= 1) {
    return `${Math.round(value * 100)}%`;
  }

  return `${Math.round(value)}%`;
}

export default function ScanDetails({
  scanId,
  scanLabel,
  target,
  onClose,
}: ScanDetailsProps) {
  const [findings, setFindings] =
    useState<ScanFinding[]>([]);

  const [
    selectedFinding,
    setSelectedFinding,
  ] = useState<ScanFinding | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadFindings() {
      try {
        setLoading(true);
        setError("");

        const response =
          await getScanFindings(
            scanId,
            1,
            100,
          );

        if (!cancelled) {
          setFindings(
            response.findings,
          );

          if (
            response.findings.length >
            0
          ) {
            setSelectedFinding(
              response.findings[0],
            );
          } else {
            setSelectedFinding(null);
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load findings.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadFindings();

    return () => {
      cancelled = true;
    };
  }, [scanId]);

  function downloadReport(
    format:
      | "json"
      | "html"
      | "pdf"
      | "csv",
  ) {
    window.open(
      getReportUrl(
        scanId,
        format,
      ),
      "_blank",
      "noopener,noreferrer",
    );
  }

  function downloadZip() {
    window.open(
      getReportZipUrl(scanId),
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="scan-details-overlay">

      <section className="scan-details-modal">

        <header className="scan-details-header">

          <div>

            <div className="scan-details-eyebrow">
              SECURITY ASSESSMENT
            </div>

            <h2>
              {scanLabel}
            </h2>

            <p>
              {target}
            </p>

          </div>

          <button
            className="scan-details-close"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            <X size={22} />
          </button>

        </header>

        <div className="scan-details-toolbar">

          <div className="scan-report-label">
            <FileText size={19} />
            Download Report
          </div>

          <div className="scan-report-buttons">

            <button
              type="button"
              onClick={() =>
                downloadReport("pdf")
              }
            >
              <Download size={17} />
              PDF
            </button>

            <button
              type="button"
              onClick={() =>
                downloadReport("html")
              }
            >
              <Download size={17} />
              HTML
            </button>

            <button
              type="button"
              onClick={() =>
                downloadReport("json")
              }
            >
              <Download size={17} />
              JSON
            </button>

            <button
              type="button"
              onClick={downloadZip}
            >
              <Download size={17} />
              ZIP
            </button>

          </div>

        </div>

        <div className="scan-details-content">

          <div className="scan-findings-panel">

            <div className="scan-details-section-title">

              <div>

                <h3>
                  Security Findings
                </h3>

                <p>
                  Issues identified and
                  validated during this
                  assessment.
                </p>

              </div>

              <strong>
                {findings.length}
              </strong>

            </div>

            {loading && (
              <div className="scan-details-state">
                Loading findings...
              </div>
            )}

            {error && (
              <div className="scan-details-error">

                <AlertTriangle
                  size={19}
                />

                {error}

              </div>
            )}

            {!loading &&
              !error &&
              findings.length ===
                0 && (
                <div className="scan-details-state">

                  <CheckCircle2
                    size={28}
                  />

                  No findings were
                  returned for this
                  assessment.

                </div>
              )}

            {!loading &&
              findings.length >
                0 && (
                <div className="scan-findings-list">

                  {findings.map(
                    (finding) => (
                      <button
                        type="button"
                        key={
                          finding.finding_id
                        }
                        className={`scan-finding-row ${
                          selectedFinding?.finding_id ===
                          finding.finding_id
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedFinding(
                            finding,
                          )
                        }
                      >

                        <span className="scan-finding-id">
                          #
                          {
                            finding.finding_id
                          }
                        </span>

                        <span className="scan-finding-name">
                          {finding.type}
                        </span>

                        <span
                          className={`scan-finding-severity ${severityClass(
                            finding.severity,
                          )}`}
                        >
                          {
                            finding.severity
                          }
                        </span>

                        <span className="scan-finding-status">
                          {finding.validated
                            ? "Validated"
                            : "Unvalidated"}
                        </span>

                      </button>
                    ),
                  )}

                </div>
              )}

          </div>

          <aside className="scan-finding-detail">

            <div className="scan-details-section-title">

              <div>

                <h3>
                  Issue Details
                </h3>

                <p>
                  Technical information
                  for the selected
                  finding.
                </p>

              </div>

            </div>

            {selectedFinding ? (
              <div className="scan-detail-card">

                <div className="scan-detail-title-row">

                  <div>

                    <span className="scan-detail-id">
                      Finding #
                      {
                        selectedFinding.finding_id
                      }
                    </span>

                    <h4>
                      {
                        selectedFinding.type
                      }
                    </h4>

                  </div>

                  <span
                    className={`scan-finding-severity ${severityClass(
                      selectedFinding.severity,
                    )}`}
                  >
                    {
                      selectedFinding.severity
                    }
                  </span>

                </div>

                <div className="scan-detail-grid">

                  <div>

                    <span>
                      URL
                    </span>

                    <strong>
                      {
                        selectedFinding.url
                      }
                    </strong>

                  </div>

                  <div>

                    <span>
                      Parameter
                    </span>

                    <strong>
                      {
                        selectedFinding
                          .parameter ||
                        "—"
                      }
                    </strong>

                  </div>

                  <div>

                    <span>
                      Validation
                    </span>

                    <strong>
                      {
                        selectedFinding.validated
                          ? "Confirmed"
                          : "Not Confirmed"
                      }
                    </strong>

                  </div>

                  <div>

                    <span>
                      Status
                    </span>

                    <strong>
                      {
                        selectedFinding.status
                      }
                    </strong>

                  </div>

                  <div>

                    <span>
                      Confidence
                    </span>

                    <strong>
                      {formatConfidence(
                        selectedFinding.confidence,
                      )}
                    </strong>

                  </div>

                </div>

                <div className="scan-detail-block">

                  <span>
                    Details
                  </span>

                  <pre>
                    {
                      selectedFinding.details ||
                      "No additional details available."
                    }
                  </pre>

                </div>

                <div className="scan-detail-block">

                  <span>
                    Payload / Evidence
                  </span>

                  <pre>
                    {
                      selectedFinding.payload ||
                      "No payload or evidence recorded."
                    }
                  </pre>

                </div>

              </div>
            ) : (
              <div className="scan-details-state">
                Select a finding to view
                its details.
              </div>
            )}

          </aside>

        </div>

      </section>

    </div>
  );
}
