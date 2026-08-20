export const sopsList = [
  {
    id: 'campaign-execution',
    title: 'Campaign Execution SOP',
    category: 'Campaign Operations',
    icon: 'PlayCircle',
    purpose: 'Standardize the end-to-end process of executing email campaigns across all ESPs to eliminate dispatch errors and ensure 100% compliance.',
    scope: 'Applies to all Operations Specialists, Campaign Managers, and Junior Ops executing daily promotional or transactional campaigns.',
    prerequisites: [
      'Approved Creative HTML file & verified offer links',
      'Cleaned & scrubbed target email list',
      'Validated domain SPF/DKIM/DMARC records',
      'Completed Pre-Send QA Checklist signed off by Senior Ops'
    ],
    instructions: [
      { step: 1, title: 'Log into Target ESP Workspace', details: 'Access the designated ESP (e.g. Ongage, Netcore Cloud, Maropost Marketing Cloud). Verify account balance and active IP status.' },
      { step: 2, title: 'Import & Scrub Recipient List', details: 'Import recipient file. Ensure auto-suppression cross-reference is active.' },
      { step: 3, title: 'Load Creative & Subject Line', details: 'Paste tested HTML code. Set friendly From Name and Sender address. Verify handle tags.' },
      { step: 4, title: 'Configure Link Tracking & UTMs', details: 'Attach standard UTM parameters (source, medium, campaign, content). Test link redirect paths.' },
      { step: 5, title: 'Send Internal Seed Test Email', details: 'Dispatch seed email to internal QA box (Gmail, Yahoo, Outlook). Verify rendering and mobile layout.' },
      { step: 6, title: 'Initiate Dispatch or Schedule', details: 'Set send speed throttling (e.g. 25,000 emails/hr) and launch campaign.' },
      { step: 7, title: 'Perform 15-Minute Post-Send Health Check', details: 'Check live bounce rate and ISP block status. Ensure bounce rate remains below 2%.' }
    ],
    checklist: [
      'Target list segment matches offer demographic',
      'Master suppression list excluded',
      'All image URLs use secure HTTPS protocol',
      'Unsubscribe link functions correctly in seed test',
      'UTM tags correctly map to analytics dashboard'
    ],
    commonMistakes: [
      'Sending to an unscrubbed raw list causing high bounce spikes.',
      'Forgetting to attach the global suppression list during segment selection.',
      'Broken image source links due to HTTP non-SSL hosting.'
    ],
    bestPractices: [
      'Always perform a seed test before every major broadcast.',
      'Schedule high-volume sends during peak subscriber engagement windows.',
      'Stagger sending speed across warm IPs to protect domain reputation.'
    ],
    relatedDocs: ['qa-validation', 'suppression-process', 'data-upload'],
    revisionHistory: [
      { version: 'v2.1', date: '2026-06-15', author: 'Alex Rivera (Lead Ops)', changes: 'Added mandatory 15-minute post-send bounce check rule.' },
      { version: 'v2.0', date: '2026-01-10', author: 'Sarah Jenkins (Ops Mgr)', changes: 'Initial standardized version for multi-ESP team.' }
    ]
  },
  {
    id: 'campaign-scheduling',
    title: 'Campaign Scheduling SOP',
    category: 'Campaign Operations',
    icon: 'Calendar',
    purpose: 'Provide guidelines for setting send times, timezone alignment, and rate throttling across global campaigns.',
    scope: 'Operations team members scheduling recurring or batch broadcasts.',
    prerequisites: ['Finalized campaign draft in ESP', 'Approved send schedule calendar from Account Manager'],
    instructions: [
      { step: 1, title: 'Check Audience Timezones', details: 'Identify recipient primary timezone (e.g., EST, PST, GMT).' },
      { step: 2, title: 'Select Optimal Dispatch Window', details: 'Schedule between 8:00 AM - 10:00 AM local time or use Send Time Optimization (STO).' },
      { step: 3, title: 'Set Hourly Throttling Rate', details: 'Calculate max throughput per hour based on current IP warmup tier.' },
      { step: 4, title: 'Double-Check Schedule Date & Time', details: 'Verify AM/PM selection and server time zone setting in ESP.' }
    ],
    checklist: ['Server timezone verified', 'Send rate throttling configured', 'No schedule conflicts on same IP pool'],
    commonMistakes: ['Confusing AM with PM schedule times', 'Mismatching server UTC time with subscriber local time'],
    bestPractices: ['Use Send Time Optimization when available', 'Avoid scheduling massive blasts exactly on the top of the hour'],
    relatedDocs: ['campaign-execution'],
    revisionHistory: [{ version: 'v1.2', date: '2026-04-01', author: 'Alex Rivera', changes: 'Updated STO guidelines for Netcore.' }]
  },
  {
    id: 'qa-validation',
    title: 'QA Validation SOP',
    category: 'Quality Assurance',
    icon: 'CheckSquare',
    purpose: 'Enforce mandatory pre-send quality assurance checks to prevent broken links, typos, missing tags, or deliverability traps.',
    scope: 'QA Specialists and Ops team before approving any campaign for queue.',
    prerequisites: ['Completed campaign draft in ESP', 'QA Checklist form'],
    instructions: [
      { step: 1, title: 'Content & Spelling Audit', details: 'Review copy for grammatical errors, typos, and formatting alignment.' },
      { step: 2, title: 'Link Integrity Test', details: 'Click every single link in the seed test email. Confirm affiliate tracking IDs match.' },
      { step: 3, title: 'Personalization Tag Verification', details: 'Verify dynamic variables like {{first_name}} render with fallback defaults (e.g. "Friend").' },
      { step: 4, title: 'Spam Filter Inspection', details: 'Run Litmus or Mail-Tester check. Ensure spam score is below 2.0.' }
    ],
    checklist: ['Header & Footer address present', 'Unsubscribe link works in 1 click', 'Images render on mobile and desktop'],
    commonMistakes: ['Testing links in editor mode instead of actual rendered seed email', 'Failing to test on dark mode email clients'],
    bestPractices: ['Maintain an internal seed box list covering Gmail, Outlook, Yahoo, and iCloud', 'Rotate QA auditors weekly for fresh eyes'],
    relatedDocs: ['campaign-execution', 'creative-approval'],
    revisionHistory: [{ version: 'v1.5', date: '2026-03-20', author: 'Elena Rostova', changes: 'Added Dark Mode rendering test step.' }]
  },
  {
    id: 'suppression-process',
    title: 'Suppression List Management SOP',
    category: 'Data & Compliance',
    icon: 'ShieldAlert',
    purpose: 'Ensure CAN-SPAM, GDPR, and CASL compliance by maintaining up-to-date unsubscribe and complaint suppression files.',
    scope: 'Data Operations Specialists and Campaign Execs.',
    prerequisites: ['Latest Master Unsubscribe file', 'ESP Access'],
    instructions: [
      { step: 1, title: 'Download Daily Unsubscribe Feed', details: 'Pull unsubscribe logs from central database and affiliate portals.' },
      { step: 2, title: 'Format & Scrub Data', details: 'Normalize email addresses to lowercase, strip trailing spaces, and remove malformed entries.' },
      { step: 3, title: 'Upload to ESP Master Suppression', details: 'Import list into ESP suppression section. Verify record count increment.' },
      { step: 4, title: 'Cross-Verify Prior to Campaign Launch', details: 'Confirm target campaign segment automatically excludes master suppression.' }
    ],
    checklist: ['Unsubscribes processed within 24 hours', 'MD5/SHA256 hashed suppression matching verified', 'Global unsubscribe list locked from manual deletion'],
    commonMistakes: ['Overwriting suppression list instead of appending', 'Importing suppressions as active contacts'],
    bestPractices: ['Automate suppression list syncing via API webhooks', 'Run weekly suppression parity audits across all ESPs'],
    relatedDocs: ['data-upload', 'campaign-execution'],
    revisionHistory: [{ version: 'v2.0', date: '2026-02-14', author: 'Marcus Vance', changes: 'Standardized automated suppression API webhook protocol.' }]
  },
  {
    id: 'data-upload',
    title: 'Data Upload & Verification SOP',
    category: 'Data & Compliance',
    icon: 'Database',
    purpose: 'Establish safe list importing procedures preventing invalid data, spamtraps, and list corruption.',
    scope: 'Data Specialists importing subscriber data into ESP databases.',
    prerequisites: ['Raw CSV/TXT file', 'Verification tool API (Kickbox / ZeroBounce)'],
    instructions: [
      { step: 1, title: 'Pre-Validation Scrubbing', details: 'Pass raw list through Kickbox/ZeroBounce API to eliminate hard bounces and spamtraps.' },
      { step: 2, title: 'Header Mapping', details: 'Map CSV fields to ESP attributes (Email, First_Name, City, Join_Date).' },
      { step: 3, title: 'Import Execution', details: 'Select target list in ESP and execute import process.' },
      { step: 4, title: 'Post-Import Audit', details: 'Compare source record count vs imported valid record count. Log rejected rows.' }
    ],
    checklist: ['List hygiene score > 98%', 'No duplicates imported', 'Opt-in timestamp field preserved'],
    commonMistakes: ['Importing raw purchased or scraped lists without hygiene scrubbing', 'Field mapping mismatch resulting in corrupt names'],
    bestPractices: ['Always store original raw source files in encrypted cloud backup before cleaning', 'Set alert thresholds for import failure rates > 5%'],
    relatedDocs: ['suppression-process', 'qa-validation'],
    revisionHistory: [{ version: 'v1.1', date: '2026-05-10', author: 'Marcus Vance', changes: 'Updated minimum hygiene threshold to 98%.' }]
  },
  {
    id: 'creative-approval',
    title: 'Creative Approval SOP',
    category: 'Creative Operations',
    icon: 'FileCode',
    purpose: 'Ensure HTML email designs meet visual standards, dark mode compatibility, and mobile responsiveness.',
    scope: 'Email Designers and Operations Specialists.',
    prerequisites: ['HTML file', 'Image assets hosted on SSL CDN'],
    instructions: [
      { step: 1, title: 'HTML Syntax Validation', details: 'Check HTML code for unclosed tags, inline CSS styling, and table layout integrity.' },
      { step: 2, title: 'Image Asset Hosting', details: 'Verify all images hosted on HTTPS CDN with ALT text tags included.' },
      { step: 3, title: 'Litmus / Email on Acid Test', details: 'Preview render across 30+ email clients (iOS Mail, Gmail, Outlook 2019, Yahoo).' },
      { step: 4, title: 'Sign-Off & Archive', details: 'Save approved HTML code to central creative repository with version ID.' }
    ],
    checklist: ['Max email width 600px', 'Total HTML payload size under 100KB (prevents Gmail clipping)', 'CTA button visible above fold'],
    commonMistakes: ['Using external stylesheets instead of inline CSS', 'Heavy background images causing slow loading'],
    bestPractices: ['Use fluid hybrid HTML layout for seamless mobile responsiveness', 'Always include descriptive ALT text on all images'],
    relatedDocs: ['qa-validation', 'offer-setup'],
    revisionHistory: [{ version: 'v1.4', date: '2026-02-01', author: 'Elena Rostova', changes: 'Enforced 100KB limit to prevent Gmail clipping.' }]
  },
  {
    id: 'offer-setup',
    title: 'Offer Setup & Alignment SOP',
    category: 'Campaign Operations',
    icon: 'Tag',
    purpose: 'Map affiliate and advertiser offers to creative templates and target audience verticals.',
    scope: 'Account Managers and Operations Specialists.',
    prerequisites: ['Offer Link from Tracking Platform (Everflow / Cake / HasOffers)', 'Approved Suppressions'],
    instructions: [
      { step: 1, title: 'Retrieve Tracking Link', details: 'Copy affiliate tracking URL from network dashboard.' },
      { step: 2, title: 'Affiliate Unsubscribe Link Injection', details: 'Ensure offer-specific unsubscribe link and physical address are added to email footer.' },
      { step: 3, title: 'Link Testing', details: 'Test redirect path to landing page. Confirm landing page loads active conversion pixel.' },
      { step: 4, title: 'Link Mapping Document', details: 'Log offer ID, link URL, cap limits, and target verticals in campaign matrix.' }
    ],
    checklist: ['Offer cap checked', 'Allowed traffic types confirmed (Email traffic permitted)', 'Redirect URL active'],
    commonMistakes: ['Promoting expired or capped offers', 'Missing affiliate suppression file'],
    bestPractices: ['Double-check cap limits with Account Manager before launching high-volume blasts', 'Test redirect link in incognito browser window'],
    relatedDocs: ['click-tracking', 'creative-approval'],
    revisionHistory: [{ version: 'v1.0', date: '2025-11-15', author: 'David Kim', changes: 'Initial documentation.' }]
  },
  {
    id: 'click-tracking',
    title: 'Click Tracking & UTM SOP',
    category: 'Analytics & Tracking',
    icon: 'Link',
    purpose: 'Standardize UTM tagging and dynamic click tracking parameters for precise revenue attribution.',
    scope: 'Operations Specialists and Analytics Team.',
    prerequisites: ['Standardized UTM Matrix', 'Tracking CNAME configured'],
    instructions: [
      { step: 1, title: 'Build UTM Parameters', details: 'Construct string: utm_source={esp}&utm_medium=email&utm_campaign={campaign_name}&utm_content={offer_id}' },
      { step: 2, title: 'Apply Dynamic ESP Tokens', details: 'Insert ESP sub-tracking tags for subscriber ID tracking (e.g. subid={{contact.id}}).' },
      { step: 3, title: 'Wrap Links via Tracking Domain', details: 'Ensure ESP click-tracking domain wraps all hyperlinks.' },
      { step: 4, title: 'Test Attribution in Analytics', details: 'Fire test click and verify record populates in real-time tracking dashboard.' }
    ],
    checklist: ['No special characters in UTM strings', 'SSL enabled on tracking CNAME domain', 'All CTA buttons correctly tagged'],
    commonMistakes: ['Using spaces instead of underscores in campaign names', 'Mixing up subid parameters'],
    bestPractices: ['Use centralized UTM builder tool to eliminate typos', 'Verify SSL cert on custom tracking domain before sending'],
    relatedDocs: ['offer-setup', 'reporting-process'],
    revisionHistory: [{ version: 'v1.3', date: '2026-03-01', author: 'David Kim', changes: 'Updated UTM naming conventions.' }]
  },
  {
    id: 'domain-authentication',
    title: 'Domain Authentication SOP',
    category: 'Infrastructure & Security',
    icon: 'Globe',
    purpose: 'Configure and maintain SPF, DKIM, DMARC, and Custom Return-Path records to guarantee domain authenticity.',
    scope: 'Infrastructure Engineers and Senior Ops Specialists.',
    prerequisites: ['DNS Control Access (Cloudflare / Route53)', 'ESP Domain Keys'],
    instructions: [
      { step: 1, title: 'Generate ESP Domain Keys', details: 'Obtain SPF include string and DKIM CNAME selectors from ESP settings.' },
      { step: 2, title: 'Publish DNS Records', details: 'Add TXT record for SPF, CNAME records for DKIM, and TXT record for DMARC policy.' },
      { step: 3, title: 'Configure Custom Return-Path / Bounce Domain', details: 'Setup sub-domain CNAME (e.g., pm.domain.com) for mail-from alignment.' },
      { step: 4, title: 'Validate Alignment', details: 'Run MXToolbox or dmarcian audit. Confirm 100% SPF & DKIM DMARC alignment.' }
    ],
    checklist: ['SPF record has single v=spf1 tag', 'DKIM selector resolves', 'DMARC policy set to p=none or p=quarantine with RUA reporting email'],
    commonMistakes: ['Publishing multiple SPF TXT records on single domain (causes PermError)', 'DKIM CNAME copy-paste typo'],
    bestPractices: ['Enforce DMARC p=reject after 30 days of clean reporting', 'Use Cloudflare DNS for fast propagation'],
    relatedDocs: ['troubleshooting-auth', 'campaign-execution'],
    revisionHistory: [{ version: 'v2.2', date: '2026-05-01', author: 'Robert Chen', changes: 'Updated DMARC enforcement ramp-up protocol.' }]
  },
  {
    id: 'reporting-process',
    title: 'Post-Campaign Reporting SOP',
    category: 'Analytics & Tracking',
    icon: 'BarChart2',
    purpose: 'Systematically extract performance metrics, deliverability indicators, and conversion data after campaign dispatch.',
    scope: 'Operations Analysts and Campaign Managers.',
    prerequisites: ['ESP Reporting Access', 'Analytics Dashboard Access'],
    instructions: [
      { step: 1, title: 'Extract 24-Hour ESP Metrics', details: 'Export Sent, Delivered, Bounced, Opens, Clicks, Unsubscribes, Complaints.' },
      { step: 2, title: 'Calculate Deliverability Ratios', details: 'Delivery Rate % = (Delivered/Sent)*100. Bounce Rate % = (Bounced/Sent)*100.' },
      { step: 3, title: 'Cross-Reference Revenue & Conversion Data', details: 'Pull revenue numbers from tracking platform matching UTM parameters.' },
      { step: 4, title: 'Update Central Performance Matrix', details: 'Log metrics into team master performance sheet and flag any anomalies.' }
    ],
    checklist: ['Spam complaint rate below 0.1%', 'Unsubscribe rate below 0.5%', 'Revenue per mille (RPM) calculated'],
    commonMistakes: ['Reporting metrics immediately post-send before data stabilizes', 'Ignoring soft bounce trends'],
    bestPractices: ['Pull initial metrics at 4 hours and final numbers at 24 hours', 'Benchmark performance against 30-day vertical averages'],
    relatedDocs: ['click-tracking', 'incident-handling'],
    revisionHistory: [{ version: 'v1.1', date: '2026-01-20', author: 'Sarah Jenkins', changes: 'Added RPM calculation metric.' }]
  },
  {
    id: 'incident-handling',
    title: 'Deliverability Incident Handling SOP',
    category: 'Incident & Emergency',
    icon: 'AlertTriangle',
    purpose: 'Provide rapid response steps in the event of an ISP block, domain blacklisting, or sudden bounce surge.',
    scope: 'All Operations Specialists and Deliverability Leads.',
    prerequisites: ['Access to Deliverability Monitoring Tools (Spamhaus, MXToolbox, Postmaster Tools)'],
    instructions: [
      { step: 1, title: 'Immediately Pause Active Campaign Queue', details: 'Halt all scheduled or sending campaigns on affected IP/Domain.' },
      { step: 2, title: 'Identify Issue Category & Root Cause', details: 'Check SMTP bounce error codes (e.g. Gmail 550 5.7.1, Spamhaus SBL listing).' },
      { step: 3, title: 'Isolate Damaged IP / Domain', details: 'Route remaining traffic to backup IP pool or pause list segment.' },
      { step: 4, title: 'Submit Delisting / Mitigation Request', details: 'Submit official remediation request to ISP Postmaster or blacklist operator.' },
      { step: 5, title: 'Post-Mortem & Incident Logging', details: 'Document incident cause, duration, impact, and preventive action steps.' }
    ],
    checklist: ['Campaign paused within 5 minutes', 'Root cause identified', 'Incident ticket created', 'Postmaster contacted'],
    commonMistakes: ['Continuing to send through a blocked IP, causing deeper blacklisting', 'Failing to notify Account Managers'],
    bestPractices: ['Set automated bounce threshold alerts at 3%', 'Maintain warm backup IP pools for emergency fallback'],
    relatedDocs: ['escalation-process', 'troubleshooting-auth'],
    revisionHistory: [{ version: 'v2.0', date: '2026-04-15', author: 'Alex Rivera', changes: 'Added emergency IP failover automated trigger rules.' }]
  },
  {
    id: 'escalation-process',
    title: 'Operations Escalation SOP',
    category: 'Incident & Emergency',
    icon: 'TrendingUp',
    purpose: 'Define clear escalation paths for system outages, deliverability crises, or critical client issues.',
    scope: 'All Operations Team members.',
    prerequisites: ['Operations Duty Roster & Contact Matrix'],
    instructions: [
      { step: 1, title: 'Classify Incident Severity Tier', details: 'P1: Complete Outage/Blacklist. P2: High Bounce (>5%). P3: Minor Delay.' },
      { step: 2, title: 'Notify Tier 1 Lead', details: 'Post incident summary in Slack #ops-alerts channel and assign ticket.' },
      { step: 3, title: 'Escalate to Tier 2 (Infrastructure/Deliverability Lead)', details: 'If unresolved in 30 mins, call Tier 2 lead on duty.' },
      { step: 4, title: 'Escalate to Tier 3 (VP of Operations / Management)', details: 'If P1 outage exceeds 2 hours, notify VP of Ops for client advisory.' }
    ],
    checklist: ['Slack alert posted', 'P1 ticket logged', 'Client advisory template prepared if needed'],
    commonMistakes: ['Delaying escalation trying to fix P1 issues solo', 'Not updating Slack channel during resolution'],
    bestPractices: ['Keep updated phone numbers on printed emergency sheet near workstation', 'Conduct bi-weekly incident drills'],
    relatedDocs: ['incident-handling'],
    revisionHistory: [{ version: 'v1.3', date: '2026-03-10', author: 'Sarah Jenkins', changes: 'Updated P1 response SLA to 15 minutes.' }]
  },
  {
    id: 'netcore-campaign-execution',
    title: 'Netcore Cloud Campaign Execution SOP',
    category: 'Campaign Operations',
    icon: 'PlayCircle',
    purpose: 'Standardize the step-by-step process for executing email campaigns within Netcore Cloud — from campaign creation in the Engage module to post-send monitoring via the Engagement Dashboard.',
    scope: 'Operations Specialists and Campaign Managers using Netcore Cloud for email marketing.',
    prerequisites: [
      'Active Netcore Cloud account with Engage module access',
      'Approved email template saved in Content -> Email',
      'Cleaned contact list imported in Audience -> Lists',
      'Sender domain verified in Settings -> Email Domain'
    ],
    instructions: [
      { step: 1, title: 'Navigate to Engage -> Campaigns', details: 'Log into Netcore Cloud. Navigate to Engage -> Campaigns -> Create Campaign. Select the campaign type (standard broadcast or split test).' },
      { step: 2, title: 'Select Audience from Audience Module', details: 'Choose the target list from Audience -> Lists or apply a dynamic segment from Audience -> Segments. Verify Blocklist Contacts are auto-excluded.' },
      { step: 3, title: 'Select Email Template from Content Module', details: 'Navigate to Content -> Email and select the approved template. Verify personalization tags ([NAME], [EMAIL]) render correctly. Use Brand Assets for any image updates.' },
      { step: 4, title: 'Configure Sender Details & Subject Line', details: 'Set From Name, Sender Email Address, Subject Line, and Pre-header text. Ensure sender domain is authenticated in Settings -> Email Domain.' },
      { step: 5, title: 'Send Test Email & QA Validation', details: 'Send seed test emails to internal QA mailboxes (Gmail, Yahoo, Outlook). Verify rendering, links, personalization, mobile layout, and unsubscribe link functionality.' },
      { step: 6, title: 'Configure Schedule & Throttling', details: 'Set campaign schedule (immediate or future). Configure hourly throttling limits. Verify timezone settings in the campaign scheduler.' },
      { step: 7, title: 'Launch Campaign & Monitor', details: 'Launch the campaign. Navigate to Dashboard -> Engagement Dashboard to monitor real-time dispatch velocity, open rates, click rates, bounces, and spam complaints.' },
      { step: 8, title: 'Post-Send Performance Review', details: 'After 4 hours, review initial campaign metrics. After 24 hours, pull final performance report from Analytics -> Scheduled Reports or Engagement Dashboard.' }
    ],
    checklist: [
      'Campaign created via Engage -> Campaigns',
      'Audience selected from Lists or Segments with Blocklist exclusion verified',
      'Email template selected from Content -> Email with personalization verified',
      'Sender domain authenticated in Settings -> Email Domain',
      'Test email sent and QA validated on Gmail, Yahoo, Outlook',
      'Schedule and throttling configured with correct timezone',
      'Post-send metrics reviewed in Engagement Dashboard'
    ],
    commonMistakes: [
      'Selecting the wrong list or segment in the Audience module',
      'Skipping test email QA before launching campaign',
      'Forgetting to verify sender domain authentication in Settings -> Email Domain',
      'Incorrect timezone selection causing campaigns to send at wrong times'
    ],
    bestPractices: [
      'Always validate personalization tags in test emails before dispatch',
      'Use Audience -> Segments to target engaged contacts (e.g. opened in last 14 days)',
      'Monitor Dashboard -> Engagement Dashboard during first 30 minutes of dispatch',
      'Document campaign details and performance metrics for team review'
    ],
    relatedDocs: ['campaign-execution', 'netcore-audience-management', 'qa-validation'],
    revisionHistory: [
      { version: 'v1.0', date: '2026-08-01', author: 'Operations Team', changes: 'Initial Netcore-specific campaign execution SOP based on platform module documentation.' }
    ]
  },
  {
    id: 'netcore-audience-management',
    title: 'Netcore Audience & List Management SOP',
    category: 'Data & Compliance',
    icon: 'Database',
    purpose: 'Standardize contact import, list creation, audience segmentation, attribute management, and blocklist handling within the Netcore Cloud Audience module.',
    scope: 'Data Specialists and Operations team members managing subscriber data in Netcore Cloud.',
    prerequisites: [
      'Active Netcore Cloud account with Audience module access',
      'UTF-8 encoded CSV file with subscriber data',
      'Custom attributes defined in Audience -> Attributes'
    ],
    instructions: [
      { step: 1, title: 'Create or Select List in Audience -> Lists', details: 'Navigate to Audience -> Lists. Create a new list or select an existing list to import contacts into.' },
      { step: 2, title: 'Define Custom Attributes', details: 'Go to Audience -> Attributes. Create any custom contact fields needed (e.g. Company, Interest, Source). Set data types (String, Number, Date).' },
      { step: 3, title: 'Import Contacts via CSV Upload', details: 'Select the target list -> Import Contacts. Upload UTF-8 CSV file. Map CSV columns to Netcore attributes (Email, [NAME], custom attributes). Execute import.' },
      { step: 4, title: 'Verify Import Results', details: 'Review import summary: total records, successfully imported, rejected/failed rows. Check Audience -> All Contacts to verify imported data.' },
      { step: 5, title: 'Create Dynamic Segments', details: 'Navigate to Audience -> Segments -> Create Segment. Build conditions using attributes, engagement filters (opened in last X days), or campaign activity.' },
      { step: 6, title: 'Review Blocklist Contacts', details: 'Navigate to Audience -> Blocklist Contacts. Verify that unsubscribed, hard bounced, and spam-complained contacts are properly suppressed.' },
      { step: 7, title: 'Post-Import Validation', details: 'Cross-reference source file record count vs imported count. Log any discrepancies. Ensure no duplicate contacts were created.' }
    ],
    checklist: [
      'Custom attributes created in Audience -> Attributes before import',
      'CSV file is UTF-8 encoded with correct header mapping',
      'Import summary reviewed: successful vs rejected records',
      'Dynamic segments created with appropriate engagement filters',
      'Blocklist Contacts verified for proper suppression',
      'Source record count matches imported count'
    ],
    commonMistakes: [
      'Importing contacts without first defining custom attributes in Audience -> Attributes',
      'Using non-UTF-8 encoded CSV files causing character corruption',
      'Field mapping mismatch between CSV headers and Netcore attributes',
      'Not reviewing Blocklist Contacts before campaign execution'
    ],
    bestPractices: [
      'Always define attributes in Audience -> Attributes before importing data',
      'Use Audience -> Segments to create engagement-based targeting (e.g. 7-day, 14-day, 30-day openers)',
      'Regularly review Audience -> Blocklist Contacts to ensure suppression accuracy',
      'Keep a log of all import activities with record counts for audit purposes'
    ],
    relatedDocs: ['data-upload', 'suppression-process', 'netcore-campaign-execution'],
    revisionHistory: [
      { version: 'v1.0', date: '2026-08-01', author: 'Operations Team', changes: 'Initial Netcore-specific audience and list management SOP based on platform module documentation.' }
    ]
  },
  {
    id: 'maropost-sop',
    title: 'Maropost Campaign Execution & Operations SOP',
    category: 'ESP Operations',
    icon: 'Send',
    purpose: 'Standardized operational guide for creating, validating, scheduling, and executing campaigns in Maropost Marketing Cloud based on the official User Guide and Checklist.',
    scope: 'Applies to all email operations team members executing campaigns in Maropost Marketing Cloud.',
    prerequisites: [
      'Active Maropost Marketing Cloud credentials',
      'Approved creative HTML template and offer details',
      'Verified list/segment in CDP module',
      'Standard campaign naming string (live_creativename_offer_client_isp_date_domain)'
    ],
    instructions: [
      { step: 1, title: 'Verify Performance Benchmarks', details: 'Check previous day performance metrics: Delivery Rate > 98%, Open Rate (OR) > 1%, Spam Rate < 0.02%.' },
      { step: 2, title: 'Initiate Campaign in Marketing -> Email Campaigns', details: 'Navigate to Marketing -> Campaigns -> Email Campaigns and click NEW CAMPAIGN.' },
      { step: 3, title: 'Configure Campaign Details & Naming Convention', details: 'Set Campaign Name format: live_creativename_offer_client_isp_date_domain (e.g. live_lbh03_liz_tp_gmail_20260708_powerrefinance). Enter Subject Line, Preheader, and select Campaign Tag.' },
      { step: 4, title: 'Select Target Brand & Audience', details: 'Select Brand/Domain (e.g. infoquickenloans.com), target Segment (e.g. Deliverd_gmail_resolute_p0_ql_19may_Aug06), and target Contact List.' },
      { step: 5, title: 'Configure Sender Details & Mandatory Address', details: 'Enter From Name, From Email, Reply-To Email, and mandatory physical postal address (e.g. 2800 N 6th Street #5027, St. Augustine, FL 32084).' },
      { step: 6, title: 'Attach Suppression Lists & Segments', details: 'In Add Suppress Contacts section, select Suppress List, Suppress Journey, Suppress Segment (e.g. softbounce segment 3months), or offer suppressions (RGR lists, Liz suppression lists).' },
      { step: 7, title: 'Load Content & Verify Mandatory Footer Tags', details: 'Select template from Content -> Email Content. Ensure footer contains mandatory Address Tag {{campaign.address}} and Unsubscribe Tag.' },
      { step: 8, title: 'Execute Spam Check & Send Seed Test', details: 'Click RENDER PREVIEW and perform Spam Check. Send test email to live seed boxes. Verify Subid, Publisher ID, HTTPS links, and attribute tags ({{other.time_stamp}}).' },
      { step: 9, title: 'Configure Schedule & Final Launch', details: 'Select Priority Send, specify Schedule Date (DD/MM/YYYY) and Schedule Time. Review full campaign summary and click SEND CAMPAIGN.' }
    ],
    checklist: [
      'Name matches live_creativename_offer_client_isp_date_domain format',
      'HTTPS (https://) attached to all tracking links',
      'Mandatory Address Tag {{campaign.address}} present in footer',
      'Date attribute set to {{other.time_stamp}}',
      'SPF, DKIM, DMARC authentications verified',
      'Seed test email verified in live inboxes'
    ],
    commonMistakes: [
      'Omitting mandatory {{campaign.address}} tag in footer causing template save failure.',
      'Forgetting HTTPS prefix when copying offer tracking links.',
      'Making direct edits to active segments instead of creating a duplicate segment.',
      'Using wrong campaign naming format.'
    ],
    bestPractices: [
      'Always use CDP -> Segments duplicate feature when tweaking audience conditions.',
      'Verify Log Inspector in Analytics module if API data transfers report errors.',
      'Strictly follow the 0.02% spam rate limit rule.'
    ],
    relatedDocs: ['maropost-checklist', 'campaign-execution', 'qa-validation'],
    revisionHistory: [
      { version: 'v1.0', date: '2026-08-08', author: 'Email Ops Team', changes: 'Initial official Maropost Marketing Cloud SOP based on official User Guide PDF.' }
    ]
  },
  {
    id: 'ongage-sop',
    title: 'Ongage Complete 17-Step Campaign Mailing SOP',
    category: 'ESP Operations',
    icon: 'PlayCircle',
    purpose: 'Standardized 17-step production workflow for receiving campaign requests, duplicating past setups, configuring the 4-step email wizard, executing seed QA tests, and scheduling live dispatches in Ongage.',
    scope: 'Applies to all Email Operations Specialists and Campaign Managers executing campaigns in Ongage.',
    prerequisites: [
      'Active Ongage portal credentials (https://esp.ongage.net/login)',
      'Approved Campaign Planning Sheet (Google Sheet) or Jira ticket',
      'Verified HTML creative template and tracking links over HTTPS',
      'Active SMTP Connection (ECID) with green checkmark (✔)'
    ],
    instructions: [
      { step: 1, title: 'Receive & Verify Campaign Request', details: 'Receive request from Campaign Planning Sheet (Google Sheet), Slack, or Jira. Verify all columns: Client (e.g. RESOLUTE), ESP (Ongage), ISP, Domain, Creative, Subject Line, From Name, Schedule Time, Volume, Throttling, Tracking Link, Footer, and Suppression List.' },
      { step: 2, title: 'Verify Required Campaign Assets', details: 'Confirm that HTML creative, subject line, From Name, tracking link, footer, and offer parameters are completely available before logging into Ongage.' },
      { step: 3, title: 'Login to Ongage Portal', details: 'Access https://esp.ongage.net/login using operations credentials. Select the designated Account Workspace from the top-left dropdown.' },
      { step: 4, title: 'Locate Previous Successful Campaign', details: 'In Campaigns Overview, search for the most recent successful campaign matching the same Client, Domain, Creative, and Offer.' },
      { step: 5, title: 'Duplicate Campaign via Three-Dot Menu (⋮)', details: 'Click the three dots (⋮) on the campaign row -> select Duplicate Campaign -> choose message template -> click Duplicate. This copies HTML, configuration, tracking, sender settings, and footer.' },
      { step: 6, title: 'Step 1 – Update Email Settings', details: 'In Email Settings wizard: Rename Message Name (e.g. c04d_ratezipmrcrefi_tp). Verify From Name (e.g. Insurvo), verified From Email (e.g. cross@refinanceanalysis.com), Reply Email, and ensure Default Unsubscribe Link is enabled.' },
      { step: 7, title: 'Step 2 – Update Email Design & Merge Tags', details: 'In Email Design wizard: Update Subject Line (under 50-60 chars, avoid spam words FREE/WINNER), Pre-header text, HTML body, dynamic merge tags ({{firstname}}, {{lastname}}, {{datasource}}, {{Address}}), tracking links, and brand footer.' },
      { step: 8, title: 'Step 3 – Campaign Configuration & Connections', details: 'In Campaign Configuration wizard: Rename Campaign Name (format: Live_Client_Vertical_Date e.g. Live_9305_Roofing_Aug05). Select ESP Connection (ECID) ensuring status is Active (✔). Choose target Include Segment (click Count button to calculate matching count) and Exclude Segment (Soft Bounces, Hard Bounces, Complainers, RGR).' },
      { step: 9, title: 'Step 4 – Dispatch Seed Test Email & Verification', description: 'Click OPEN TEST CAMPAIGN MANAGER. Dispatch seed test emails to Gmail, Yahoo, and Outlook seed boxes. Verify subject line tag, From Name, images, CTA redirect over HTTPS, footer address, and spam folder placement.' },
      { step: 10, title: 'Execute Final Pre-Live Checklist', details: 'Verify all 15 pre-live checklist items: Domain, Connection, Creative, Subject, From Name/Email, Include/Exclude Segments, Suppression, Tracking Links, Footer, Volume, Schedule Time, Throttling, Dynamic Fields, HTML, and Seed Test delivery.' },
      { step: 11, title: 'Step 5 – Configure Schedule & Launch', details: 'Set Schedule Date, Time (e.g. 05 August 3:00 PM), Timezone (GMT -06 or subscriber timezone), and hourly Throttling (e.g. 10,000/hr). Click SCHEDULE button.' },
      { step: 12, title: 'Step 6 – Monitor Campaign & Update Tracker', details: 'Monitor campaign status transition: New -> Ready to Send -> Sending -> Completed. Update campaign tracker sheet with Campaign ID, Status, Sent Volume, Delivered, Bounces (Hard/Soft), Total Opens, Unique Opens, and Total Clicks.' },
      { step: 13, title: 'Step 7 – Post-Mailing Performance Audit', details: 'Open Analytics -> Aggregate Report & Matrix Report. Verify Delivery Rate % (>98%), Open Rate %, Click Rate %, and analyze ISP performance breakdown (Gmail vs Yahoo vs Outlook).' }
    ],
    checklist: [
      'Message Name and Campaign Name match naming conventions',
      'From Email is verified in back-end ESP Connection',
      'Include Segment size calculated via Count button',
      'Exclude Segments attached (Soft Bounces, Hard Bounces, Complainers)',
      'ESP Connection status is Active with green checkmark (✔)',
      'Seed test email verified in Gmail, Yahoo, Outlook inboxes',
      'Campaign tracker sheet updated after scheduling'
    ],
    commonMistakes: [
      'Selecting an Inactive SMTP connection in Step 3.',
      'Forgetting to click the Count button to verify segment recipient size.',
      'Using an unverified From Email causing SMTP rejection.',
      'Failing to attach Exclude Segments for recent soft/hard bounces.'
    ],
    bestPractices: [
      'Always duplicate the most recent successful campaign to preserve tested routing rules.',
      'Use Contacts Activity report to answer subscriber delivery questions.',
      'Use branded tracking domains (otrack.domain.com) with valid HTTPS certificates.'
    ],
    relatedDocs: ['ongage-checklist', 'campaign-execution', 'qa-validation'],
    revisionHistory: [
      { version: 'v1.0', date: '2026-08-08', author: 'Email Ops Team', changes: 'Initial official Ongage Complete 17-Step Production Campaign Mailing SOP based on 204-page PDF guide.' }
    ]
  }
];
