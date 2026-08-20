export const qaChecklists = [
  {
    id: 'pre-send',
    title: 'Pre-Send Master Checklist',
    category: 'Essential Pre-Send',
    description: 'Mandatory final sign-off checklist before launching any promotional or broadcast email campaign.',
    items: [
      { id: 'ps-1', text: 'Target list segment verified against campaign request document', mandatory: true },
      { id: 'ps-2', text: 'Master suppression list & campaign-specific unsubscribes excluded', mandatory: true },
      { id: 'ps-3', text: 'Friendly From Name and Verified Sender Address correctly set', mandatory: true },
      { id: 'ps-4', text: 'Subject Line and Preheader text free of typos and spam trigger symbols', mandatory: true },
      { id: 'ps-5', text: 'All images hosted on SSL HTTPS CDN and display ALT text', mandatory: true },
      { id: 'ps-6', text: 'Unsubscribe link clicked in seed test and verified working in 1 click', mandatory: true },
      { id: 'ps-7', text: 'Physical mailing address present in email footer (CAN-SPAM compliance)', mandatory: true },
      { id: 'ps-8', text: 'Internal seed email sent to Gmail, Outlook, Yahoo, and mobile client boxes', mandatory: true },
      { id: 'ps-9', text: 'UTM parameters attached to all hyperlinks and verified in tracking sandbox', mandatory: true },
      { id: 'ps-10', text: 'Hourly sending rate throttling configured matching IP warmup tier', mandatory: true }
    ]
  },
  {
    id: 'post-send',
    title: 'Post-Send Health & Deliverability Audit',
    category: 'Post-Send Operations',
    description: 'Perform 15 minutes, 1 hour, and 24 hours post-dispatch audits to catch deliverability spikes.',
    items: [
      { id: 'po-1', text: '15-Min Check: Hard bounce rate is below 1.5% in ESP real-time log', mandatory: true },
      { id: 'po-2', text: '15-Min Check: SMTP response codes show zero Spamhaus SBL or Gmail 550 blocks', mandatory: true },
      { id: 'po-3', text: '1-Hour Check: Open rate and click rate tracking data flowing into analytics', mandatory: true },
      { id: 'po-4', text: '1-Hour Check: Spam complaint rate remains under 0.08%', mandatory: true },
      { id: 'po-5', text: '24-Hour Check: Final delivery rate calculated and logged into central matrix', mandatory: false },
      { id: 'po-6', text: '24-Hour Check: Unsubscribes exported to central suppression database', mandatory: true }
    ]
  },
  {
    id: 'campaign-qa',
    title: 'Campaign Setup & Metadata QA',
    category: 'Campaign Quality',
    description: 'Detailed check of campaign settings, dynamic tags, and header attributes.',
    items: [
      { id: 'cqa-1', text: 'Campaign Name follows standardized naming convention: YYYYMMDD_OfferID_Segment_ESP', mandatory: true },
      { id: 'cqa-2', text: 'Dynamic tag defaults configured (e.g. {{contact.first_name|Friend}})', mandatory: true },
      { id: 'cqa-3', text: 'Reply-To email address monitored by customer ops team', mandatory: true },
      { id: 'cqa-4', text: 'A/B split test parameters defined with minimum 2-hour evaluation window', mandatory: false }
    ]
  },
  {
    id: 'data-qa',
    title: 'Data & Segment QA',
    category: 'Data Quality',
    description: 'Verify subscriber list integrity, opt-in records, and dynamic segment logic.',
    items: [
      { id: 'dqa-1', text: 'List hygiene scrub completed through ZeroBounce/Kickbox within last 7 days', mandatory: true },
      { id: 'dqa-2', text: 'Dynamic segment filters match recency criteria (e.g., opened within 30 days)', mandatory: true },
      { id: 'dqa-3', text: 'Zero duplicate records present in targeted upload', mandatory: true },
      { id: 'dqa-4', text: 'Domain balance checked (Gmail <= 45%, Yahoo <= 30%, Outlook <= 20%)', mandatory: false }
    ]
  },
  {
    id: 'tracking-qa',
    title: 'Click & UTM Tracking QA',
    category: 'Tracking Quality',
    description: 'Audit tracking link structures, SSL certificates, and conversion parameters.',
    items: [
      { id: 'tqa-1', text: 'Tracking CNAME domain resolves over HTTPS without SSL errors', mandatory: true },
      { id: 'tqa-2', text: 'utm_source, utm_medium, utm_campaign, and utm_content parameters present', mandatory: true },
      { id: 'tqa-3', text: 'Affiliate offer subid subscriber tag attached to link payload', mandatory: true },
      { id: 'tqa-4', text: 'Landing page conversion pixel verified firing on click', mandatory: true }
    ]
  },
  {
    id: 'creative-qa',
    title: 'Creative & Responsive Layout QA',
    category: 'Creative Quality',
    description: 'Ensure HTML rendering excellence across dark mode, desktop, and mobile screens.',
    items: [
      { id: 'crqa-1', text: 'Email HTML payload size strictly under 100KB to prevent Gmail clipping', mandatory: true },
      { id: 'crqa-2', text: 'Font sizes legible on mobile screens (Minimum 14px body text, 20px headers)', mandatory: true },
      { id: 'crqa-3', text: 'Dark mode color contrast verified (text remains visible on dark background)', mandatory: true },
      { id: 'crqa-4', text: 'CTA buttons have minimum 44x44px touch target area for mobile taps', mandatory: true }
    ]
  },
  {
    id: 'links-qa',
    title: 'Link Redirection & Payload QA',
    category: 'Links Quality',
    description: 'Click every hyperlink in seed render to ensure no 404s or broken affiliate links.',
    items: [
      { id: 'lqa-1', text: 'Primary Call-To-Action (CTA) link directs to target landing page', mandatory: true },
      { id: 'lqa-2', text: 'Header logo link directs to official brand homepage', mandatory: true },
      { id: 'lqa-3', text: 'Privacy Policy and Terms links in footer open active legal pages', mandatory: true },
      { id: 'lqa-4', text: 'View in Web Browser link renders correct web version', mandatory: true }
    ]
  },
  {
    id: 'suppression-qa',
    title: 'Suppression & Compliance QA',
    category: 'Compliance Quality',
    description: 'Verify legal compliance, global unsubscribes, and opt-out mechanics.',
    items: [
      { id: 'sqa-1', text: 'Global Master Suppression list attached as exclusion filter', mandatory: true },
      { id: 'sqa-2', text: 'Affiliate network suppression file cross-referenced', mandatory: true },
      { id: 'sqa-3', text: 'Unsubscribe processing completed within 24 hours requirement', mandatory: true }
    ]
  },
  {
    id: 'domain-qa',
    title: 'Domain & DNS Health QA',
    category: 'Domain Quality',
    description: 'Check SPF, DKIM, DMARC, and Return-Path DNS records before sending.',
    items: [
      { id: 'doqa-1', text: 'SPF record passes validation with no syntax errors', mandatory: true },
      { id: 'doqa-2', text: 'DKIM signature passes 2048-bit key verification', mandatory: true },
      { id: 'doqa-3', text: 'DMARC alignment status passes SPF and DKIM checks', mandatory: true },
      { id: 'doqa-4', text: 'Custom return-path subdomain DNS CNAME points to correct ESP server', mandatory: true }
    ]
  },
  {
    id: 'scheduling-qa',
    title: 'Schedule & Throttling QA',
    category: 'Schedule Quality',
    description: 'Confirm launch timing, server timezone, and hourly send volume limits.',
    items: [
      { id: 'schqa-1', text: 'Schedule date and time verified against approved sending calendar', mandatory: true },
      { id: 'schqa-2', text: 'Timezone set correctly (UTC vs EST vs PST)', mandatory: true },
      { id: 'schqa-3', text: 'Hourly rate throttling aligned with current IP warmup phase', mandatory: true }
    ]
  },
  {
    id: 'maropost-checklist',
    title: 'MAROPOST Email Campaign Checklist',
    category: 'ESP-Specific Checklists',
    description: 'Official Maropost Marketing Cloud pre-send verification checklist covering benchmarks, naming conventions, tracking, SPF/DKIM/DMARC authentication, and mandatory footer tags.',
    items: [
      { id: 'mc-1', text: 'Performance Check: Previous day Delivery Rate > 98%', mandatory: true },
      { id: 'mc-2', text: 'Performance Check: Previous day Open Rate (OR) > 1%', mandatory: true },
      { id: 'mc-3', text: 'Performance Check: Previous day Spam Rate < 0.02%', mandatory: true },
      { id: 'mc-4', text: 'Campaign Setup: Campaign name updated per format (live_creativename_offer_client_isp_date_domain, e.g. live_lbh03_liz_tp_gmail_20260708_powerrefinance)', mandatory: true },
      { id: 'mc-5', text: 'Campaign Setup: Creative and subject line changed as per plan', mandatory: true },
      { id: 'mc-6', text: 'Domain & ISP Handling: Domain OP - No indexing, check plan duration (L30, L15, etc.)', mandatory: true },
      { id: 'mc-7', text: 'Domain & ISP Handling: Other ISPs - Do indexing for the segment', mandatory: true },
      { id: 'mc-8', text: 'Links & Tracking: Verify Subid & Publisher ID (as per offer requirements)', mandatory: true },
      { id: 'mc-9', text: 'Links & Tracking: Check tracking link in Maropost panel', mandatory: true },
      { id: 'mc-10', text: 'Links & Tracking: Ensure HTTPS (https://) is added when copying offer links', mandatory: true },
      { id: 'mc-11', text: 'Authentication & Testing: Add live seeds and ensure attributes populate in test mail', mandatory: true },
      { id: 'mc-12', text: 'Authentication & Testing: Verify SPF, DKIM, and DMARC authentications', mandatory: true },
      { id: 'mc-13', text: 'Authentication & Testing: Ensure dynamic values populate correctly (firstname, lastname, address {{campaign.address}})', mandatory: true },
      { id: 'mc-14', text: 'Creative & Segment Rules: No changes in creative (create duplicate if needed)', mandatory: true },
      { id: 'mc-15', text: 'Creative & Segment Rules: No changes in segment (create duplicate if needed)', mandatory: true },
      { id: 'mc-16', text: 'Creative & Segment Rules: Check for hidden links in HTML content (using href tag)', mandatory: true },
      { id: 'mc-17', text: 'Final Verification: Confirm suppression lists for particular offers (e.g. RGR lists, Liz suppression lists)', mandatory: true },
      { id: 'mc-18', text: 'Final Verification: Ensure correct date attribute ({{other.time_stamp}})', mandatory: true },
      { id: 'mc-19', text: 'Final Verification: Verify all campaigns for respective connections are scheduled correctly', mandatory: true }
    ]
  },
  {
    id: 'ongage-checklist',
    title: 'ONGAGE Email Campaign Checklist',
    category: 'ESP-Specific Checklists',
    description: 'Official Ongage EMFE pre-send verification checklist covering the 4-step wizard steps, segment count verification, ESP connection health, and seed box testing.',
    items: [
      { id: 'oc-1', text: 'Step 1 Email Settings: Message Name entered using naming convention (e.g. c04d_ratezipmrcrefi_tp or live_refi05_cross_tp)', mandatory: true },
      { id: 'oc-2', text: 'Step 1 Email Settings: From Name selected and From Email verified in back-end ESP vendor (e.g. Amazon SES)', mandatory: true },
      { id: 'oc-3', text: 'Step 1 Email Settings: Reply Email verified and Overwrite settings checked if custom sender is required', mandatory: true },
      { id: 'oc-4', text: 'Step 1 Email Settings: Default Unsubscribe Link enabled (unless custom template link is present)', mandatory: true },
      { id: 'oc-5', text: 'Step 1 Email Settings: Brand Header and Footer enabled if required', mandatory: true },
      { id: 'oc-6', text: 'Step 2 Email Design: Subject line under 50-60 characters and free of spam trigger words (FREE, WINNER, CASH)', mandatory: true },
      { id: 'oc-7', text: 'Step 2 Email Design: Preheader preview text configured beside subject line', mandatory: true },
      { id: 'oc-8', text: 'Step 2 Email Design: Dynamic merge tags verified ({{firstname}}, {{lastname}}, {{datasource}}, {{Address}})', mandatory: true },
      { id: 'oc-9', text: 'Step 2 Email Design: Litmus rendering test passed across Gmail, Yahoo, Outlook, and Apple Mail', mandatory: true },
      { id: 'oc-10', text: 'Step 3 Configuration: Campaign Name matches Live_Client_Vertical_Date format (e.g. Live_9305_Roofing_Aug05)', mandatory: true },
      { id: 'oc-11', text: 'Step 3 Configuration: Target Include Segment selected and count verified using the Count button', mandatory: true },
      { id: 'oc-12', text: 'Step 3 Configuration: Target Exclude Segment selected (Soft Bounces, Hard Bounces, Complainers, RGR lists)', mandatory: true },
      { id: 'oc-13', text: 'Step 3 Configuration: Campaign Suppression List verified against planning sheet', mandatory: true },
      { id: 'oc-14', text: 'Step 3 Configuration: ESP Connection (ECID) status is Active with a green checkmark (✔)', mandatory: true },
      { id: 'oc-15', text: 'Step 3 Configuration: Branded tracking CNAME (otrack.domain.com) and image domain (oimage.domain.com) HTTPS status verified', mandatory: true },
      { id: 'oc-16', text: 'Step 4 Scheduling: Test email sent via Open Test Campaign Manager and verified in Gmail, Yahoo, Outlook seed inboxes', mandatory: true },
      { id: 'oc-17', text: 'Step 4 Scheduling: Schedule Date, Time, and Timezone confirmed (GMT -06 or subscriber local timezone)', mandatory: true },
      { id: 'oc-18', text: 'Step 4 Scheduling: Hourly rate Throttling enabled (e.g. 10,000/hr) to protect ISP reputation', mandatory: true },
      { id: 'oc-19', text: 'Step 4 Scheduling: Client approval received before clicking Schedule button', mandatory: true }
    ]
  }
];
