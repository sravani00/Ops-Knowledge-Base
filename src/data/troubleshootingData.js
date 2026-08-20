export const troubleshootingCategories = [
  'All',
  'Campaign Issues',
  'Data Issues',
  'Scheduling Errors',
  'Tracking Errors',
  'Authentication Issues',
  'Deliverability Issues',
  'ESP Errors',
  'API Errors'
];

export const troubleshootingList = [
  {
    id: 'tb-001',
    title: 'Gmail 550 5.7.1 Rate Limit Exceeded / Suspended',
    category: 'Deliverability Issues',
    symptoms: 'High volume of 550 5.7.1 SMTP deferred or bounced responses specifically from @gmail.com or @googlemail.com recipients.',
    rootCause: 'Gmail domain reputation dropped below "Low" due to spam complaint surge (>0.3%) or sudden un-throttled volume spike on un-warmed IP.',
    resolution: [
      'Immediately pause active Gmail recipient broadcasts across affected ESP.',
      'Log into Gmail Postmaster Tools to inspect Domain and IP reputation trend lines.',
      'Reduce hourly send rate limit to Gmail by 60% (e.g., max 5,000 emails/hour).',
      'Filter list segment to target ONLY 3-day active openers for the next 72 hours until reputation recovers.'
    ],
    prevention: 'Maintain strict 0.1% spam complaint cap and enforce dynamic STO rate throttling.',
    escalationContact: 'Alex Rivera (Lead Deliverability Engineer) - Slack @alex.rivera | Phone: +1-555-0192'
  },
  {
    id: 'tb-002',
    title: 'SPF Record 10 DNS Lookup Limit Exceeded (PermError)',
    category: 'Authentication Issues',
    symptoms: 'Emails marked as Unauthenticated in Gmail headers; DMARC compliance tests failing with "SPF PermError: too many DNS lookups".',
    rootCause: 'Domain SPF TXT record contains too many "include:" statements (e.g. Ongage, Netcore, SendGrid, Google Workspace, Zendesk), exceeding the RFC 7208 10-lookup limit.',
    resolution: [
      'Run MXToolbox SPF lookup report to count nested DNS lookup depth.',
      'Flatten SPF record using an SPF flattening tool or remove legacy unused include blocks.',
      'Publish updated flattened SPF TXT record to domain DNS.'
    ],
    prevention: 'Never append new ESP includes without auditing total lookup count first.',
    escalationContact: 'Robert Chen (Infrastructure Specialist) - Slack @robert.chen'
  },
  {
    id: 'tb-003',
    title: 'Tracking CNAME Broken / Security SSL Warning',
    category: 'Tracking Errors',
    symptoms: 'Subscribers clicking email links receive "Your connection is not private" (NET::ERR_CERT_COMMON_NAME_INVALID) browser errors; click rate drops to zero.',
    rootCause: 'SSL certificate for the custom tracking CNAME (e.g. trk.domain.com) expired or failed auto-renewal on Cloudflare/Let\'s Encrypt.',
    resolution: [
      'Check tracking domain SSL status in Cloudflare or AWS ACM.',
      'Force manual SSL certificate renewal for tracking CNAME.',
      'Verify proxy status in Cloudflare DNS (Ensure DNS-only mode or full SSL proxy alignment).'
    ],
    prevention: 'Set 30-day automated SSL certificate expiration warnings.',
    escalationContact: 'David Kim (Analytics & Tracking Lead) - Slack @david.kim'
  },
  {
    id: 'tb-004',
    title: 'FTP Auto-Import Task Failed / File Mismatch',
    category: 'Data Issues',
    symptoms: 'Scheduled morning list import failed to load in ESP; automated campaign queue halted due to missing segment.',
    rootCause: 'Data provider changed CSV column header name (e.g. "email_address" instead of "email") or file encoding was non-UTF-8.',
    resolution: [
      'Download raw FTP file and open in text editor.',
      'Verify column header casing and names match ESP attribute mapping exact string.',
      'Re-save file as UTF-8 without BOM and re-trigger FTP import task.'
    ],
    prevention: 'Implement strict CSV schema validation script on FTP intake server.',
    escalationContact: 'Marcus Vance (Data Operations) - Slack @marcus.vance'
  },
  {
    id: 'tb-005',
    title: 'ESP API Rate Limit HTTP 429 Error',
    category: 'API Errors',
    symptoms: 'Automated list sync microservice throws HTTP 429 Too Many Requests errors and drops event payload.',
    rootCause: 'Microservice fired parallel worker threads exceeding ESP API max threshold (e.g. >10 requests/sec).',
    resolution: [
      'Implement exponential backoff retry mechanism in API consumer code.',
      'Reduce concurrent worker thread pool size from 20 to 5.',
      'Use batch endpoint (e.g., SendGrid /v3/marketing/contacts) instead of single contact POST calls.'
    ],
    prevention: 'Enforce rate limiter queues on microservices communicating with external ESP APIs.',
    escalationContact: 'Robert Chen (Infrastructure Specialist) - Slack @robert.chen'
  },
  {
    id: 'tb-006',
    title: 'Campaign Stuck in "Pending Queue" State',
    category: 'Scheduling Errors',
    symptoms: 'Campaign send time passed 30 minutes ago, but status remains "Processing" or "Pending Queue" with 0 emails sent.',
    rootCause: 'ESP SMTP worker pool deadlock, or daily sending volume credit limit exceeded for sub-account.',
    resolution: [
      'Check ESP status page for ongoing platform outages.',
      'Verify account credit/billing status and daily IP limits in ESP settings.',
      'Pause campaign, clone to a new broadcast draft, and re-schedule.'
    ],
    prevention: 'Audit ESP account credit limits at start of daily shift.',
    escalationContact: 'Sarah Jenkins (Ops Manager) - Slack @sarah.jenkins'
  },
  {
    id: 'tb-007',
    title: 'Spamhaus SBL Blacklist Notification',
    category: 'Deliverability Issues',
    symptoms: 'SMTP responses return 550 5.7.1 Service unavailable; Client host [x.x.x.x] blocked using Spamhaus SBL.',
    rootCause: 'Spamtrap hit detected on dedicated IP due to sending to unscrubbed purchased list or legacy list without double opt-in.',
    resolution: [
      'HALT all sending on the listed IP immediately.',
      'Identify list source dispatched in the last 24 hours and purge list.',
      'Submit formal remediation explanation to Spamhaus removal portal.',
      'Prepare warm backup IP pool to resume critical transactional streams.'
    ],
    prevention: 'Scrub all subscriber lists with ZeroBounce prior to initial send.',
    escalationContact: 'Alex Rivera (Lead Deliverability Engineer) - Slack @alex.rivera'
  },
  {
    id: 'tb-008',
    title: 'Unsubscribe Link Tag Not Replacing (Raw Tag Shown)',
    category: 'Campaign Issues',
    symptoms: 'Recipients see raw text "{{system.unsubscribe_url}}" instead of a clickable unsubscribe link.',
    rootCause: 'Incorrect tag syntax for the specific ESP (e.g., using Ongage tag syntax in a SendGrid template).',
    resolution: [
      'Check ESP dynamic tag syntax guide.',
      'Replace malformed tag with ESP specific syntax (e.g. {{{Unsubscribe}}} for SendGrid or {{system.unsubscribe_url}} for Ongage).',
      'Re-send seed test email to confirm rendering.'
    ],
    prevention: 'Always execute QA seed test before launching live broadcast.',
    escalationContact: 'Elena Rostova (QA Lead) - Slack @elena.rostova'
  }
];

export const diagnosticWizardSteps = [
  {
    id: 1,
    question: 'Where is the operational issue occurring?',
    options: [
      { label: 'Deliverability & Inboxing (Gmail/Yahoo/Spamhaus)', nextStep: 2 },
      { label: 'DNS / SPF / DKIM / DMARC Authentication', nextStep: 3 },
      { label: 'Links, Tracking & UTMs', nextStep: 4 },
      { label: 'Data Imports & Suppressions', nextStep: 5 },
      { label: 'ESP Platform / Scheduling / API', nextStep: 6 }
    ]
  },
  {
    id: 2,
    question: 'What error message or symptom are you seeing?',
    options: [
      { label: 'Gmail 550 5.7.1 Rate limit / deferred responses', resultId: 'tb-001' },
      { label: 'Spamhaus SBL / DBL listing error', resultId: 'tb-007' }
    ]
  },
  {
    id: 3,
    question: 'Select the authentication error:',
    options: [
      { label: 'SPF PermError: Too many DNS lookups (>10)', resultId: 'tb-002' }
    ]
  },
  {
    id: 4,
    question: 'Select tracking issue:',
    options: [
      { label: 'Tracking link SSL warning / NET::ERR_CERT_COMMON_NAME_INVALID', resultId: 'tb-003' },
      { label: 'Unsubscribe link tag displayed as raw text', resultId: 'tb-008' }
    ]
  },
  {
    id: 5,
    question: 'Select data issue:',
    options: [
      { label: 'FTP Auto-Import task failed or header mismatch', resultId: 'tb-004' }
    ]
  },
  {
    id: 6,
    question: 'Select system issue:',
    options: [
      { label: 'API returning HTTP 429 Too Many Requests', resultId: 'tb-005' },
      { label: 'Campaign stuck in pending queue status', resultId: 'tb-006' }
    ]
  }
];
