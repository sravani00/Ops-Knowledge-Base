export const espList = [
  {
    id: 'ongage',
    name: 'Ongage',
    category: 'Multi-Vendor ESP Front-End (EMFE) Platform',
    logoBg: 'bg-blue-600',
    description: 'Enterprise Email Marketing Front-End (EMFE) platform that manages subscriber databases, segment filtering, 4-step email campaign wizard dispatches, A/B split testing, and multi-vendor SMTP routing across Amazon SES, SparkPost, Mailgun, and custom MTAs.',
    overview: {
      introduction: 'Ongage is an enterprise Email Marketing Front-End (EMFE) platform designed for managing high-volume email operations. It connects seamlessly to multiple back-end SMTP relays and ESP delivery vendors (Amazon SES, SparkPost, Mailgun, Ongage Complete, etc.), allowing operations teams to manage independent subscriber Lists, execute dynamic Segments, configure 4-step email dispatches, and evaluate ISP deliverability via Matrix & Aggregate reports.',
      features: [
        'Multi-Vendor SMTP Routing & Automatic Traffic Splitting (Single ESP, 50%/50% Multi-ESP, Domain/Segment Routing)',
        'Independent Subscriber Lists vs Filtered Dynamic Segments (List Field, Behavioral, System Field)',
        '4-Step Email Campaign Wizard: Email Settings, Email Design, Campaign Configuration, Campaign Scheduling',
        'Contacts Manager: Search, Edit, Delete, Change Status (Active, Unsubscribed, Hard Bounce, Complaint), and Bulk Updates',
        'Advanced Analytics: Aggregate Reports, ISP/Domain Matrix Reports, and Contacts Activity timeline reports',
        'Branded Tracking & Image Domains (otrack.domain.com, oimage.domain.com) with HTTPS status monitoring'
      ],
      useCases: [
        'High-volume affiliate marketing & promotional blasts routed across multi-carrier SMTP IPs',
        'Subscriber recency tiering (3-day, 7-day, 14-day, 30-day openers) and automated suppression exclusions',
        'A/B split testing comparing Message variations (A/B/C/D/E), ESP vendor performance, or Subject lines',
        'Individual subscriber activity lookup for client support queries via Contacts Activity'
      ],
      loginProcess: {
        url: 'https://esp.ongage.net/login',
        ssoSupport: true,
        steps: [
          'Navigate to Ongage portal URL (https://esp.ongage.net/login).',
          'Input your assigned operations credentials (format: ops.<name>@company.com).',
          'Complete 2FA verification using Google Authenticator or SMS token.',
          'Select the designated Account Workspace from the top-left dropdown.'
        ]
      },
      dashboardOverview: 'The Ongage main dashboard features the Sending Queue monitor, Daily Volume counter, Deliverability heatmaps, ISP performance breakdown (Gmail, Yahoo, Outlook, AOL), and Active Campaign status indicators.'
    },
    modules: [
      {
        id: 'list',
        name: '1. List Module',
        icon: 'Users',
        description: 'Houses all subscriber database management functions. A List is an independent subscriber database (e.g. ABC Loans List vs ABC Insurance List). A Segment is a filtered group of subscribers inside a List.',
        subModules: [
          {
            name: 'List vs Segment Architecture',
            purpose: 'Understand database isolation vs dynamic filtering. Use a new List to keep subscriber databases completely separate across brands or countries. Use Segments to target specific audiences within the same list without creating new databases.',
            keyActivities: ['Create independent subscriber lists', 'Group subscribers into dynamic rules', 'Manage brand database separation'],
            usageStatus: 'Frequently Used',
            usageNote: 'Core concept: List = Separate database, Segment = Filtered group inside that database.'
          },
          {
            name: 'Import (Subscriber Upload)',
            purpose: 'Upload subscriber CSV/TXT/ZIP data files (up to 500MB, UTF-8 encoded). Features options to Update existing contacts, Prevent null (empty) values from overwriting current value, and Preview Import File (grey = valid first 10 rows, orange = data issue).',
            keyActivities: ['Upload CSV/TXT/ZIP subscriber files', 'Verify UTF-8 encoding', 'Check Update Existing Contacts', 'Preview import file in grey/orange'],
            usageStatus: 'Frequently Used',
            usageNote: 'Supports bulk list imports up to 500MB per file.'
          },
          {
            name: 'Export (Data Download)',
            purpose: 'Download subscriber data into CSV or Excel ZIP files. Export from Campaign or Segment sources, select desired fields (Email, Name, Country, Status), and apply advanced filters (Complained, Unsubscribed, Bounced).',
            keyActivities: ['Export campaign or segment subscribers', 'Download bounce and unsubscribe files', 'Apply encryption (MD5, SHA-256)'],
            usageStatus: 'Frequently Used',
            usageNote: 'Used to pull suppression files or share campaign subscriber reports.'
          },
          {
            name: 'Segment Builder & Advanced Features',
            purpose: 'Build dynamic filter rules using List Fields (Country, Gender, City), Behavioral Activity (Opened, Clicked, Sent, Unsubscribed, Soft/Hard Bounce), or System Fields (Created Date). Features Whitelist Segment (seed emails), Segment Quota/Sample (random percentage e.g. 10%), and Default Include/Exclude rules.',
            keyActivities: ['Build dynamic filter rules', 'Click Count button to calculate matching contacts', 'Configure Whitelist & Quota samples'],
            usageStatus: 'Frequently Used',
            usageNote: 'Always verify segment contact count using the Count button before sending.'
          },
          {
            name: 'Contacts Manager',
            purpose: 'View, search, edit, or remove subscribers. Perform single contact search (e.g. john@gmail.com), view status (Active, Unsubscribed, Hard Bounce, Complaint), change contact status, or execute Bulk Updates (paste up to 100 emails or CSV upload).',
            keyActivities: ['Search single/multiple subscribers', 'Edit contact profile details', 'Manually change contact status', 'Perform Bulk Updates / Add-Delete'],
            usageStatus: 'Frequently Used',
            usageNote: 'Essential for client support queries and manual subscriber status updates.'
          }
        ]
      },
      {
        id: 'campaigns',
        name: '2. Campaigns Module & 4-Step Wizard',
        icon: 'Send',
        description: 'Handles the 4-Step Email Campaign Creation Wizard, A/B Split Testing, and campaign management in the Campaigns Overview dashboard.',
        subModules: [
          {
            name: 'Step 1 – Email Settings',
            purpose: 'Define Message Name (format: live_refi05_cross_tp), Description, Sender Name (From Name e.g. Insurvo, David), From Email (verified in ESP vendor e.g. Amazon SES), Reply Email, Overwrite button, Default Unsubscribe Link (Enabled), Unsubscribe Confirmation Page, and Header/Footer.',
            keyActivities: ['Set Message Name', 'Select verified From Email', 'Enable Default Unsubscribe link', 'Configure brand Header/Footer'],
            usageStatus: 'Frequently Used',
            usageNote: 'First step of email message creation. Ensure From Email is verified in back-end ESP.'
          },
          {
            name: 'Step 2 – Email Design',
            purpose: 'Configure Email Subject (max 50-60 chars, avoid spam words like FREE/WINNER), Pre-header text, WYSIWYG / HTML / BEE Editors, Dynamic merge tags ({{firstname}}, {{lastname}}, {{datasource}}, {{Address}}), and Litmus Rendering Test across Gmail, Yahoo, Outlook, and Apple Mail.',
            keyActivities: ['Input Subject & Preheader', 'Paste raw HTML or build in BEE editor', 'Insert dynamic merge tags', 'Run Litmus rendering test'],
            usageStatus: 'Frequently Used',
            usageNote: 'Always preview rendering across mobile and desktop views before proceeding.'
          },
          {
            name: 'Step 3 – Campaign Configuration',
            purpose: 'Set Campaign Name (format: Live_Client_Vertical_Date e.g. Live_9305_Roofing_Aug05), Open Test Campaign Manager (seed test to Gmail/Yahoo/Outlook), Select Include Segments, Exclude Segments (Soft Bounce, Hard Bounce, Complainers, RGR), Choose ESP Connection (Single ESP or Multi-ESP split), and set Campaign Quota.',
            keyActivities: ['Set Campaign Name', 'Dispatch seed test emails', 'Select Include & Exclude Segments', 'Choose ESP Connection (ECID)', 'Set Campaign Quota'],
            usageStatus: 'Frequently Used',
            usageNote: 'Most critical step. Double check Exclude Segments and ESP Connection selection.'
          },
          {
            name: 'Step 4 – Campaign Scheduling',
            purpose: 'Configure dispatch timing: Send Immediately, Schedule (Date, Time, Timezone e.g. GMT -06), Send Time Optimization (STO), Enable Throttling (Evenly spread e.g. 10,000/hr), Send Between Dates/Hours, Daily Limit, Subscriber Timezone Dispatch, and Notifications.',
            keyActivities: ['Set Schedule Date & Timezone', 'Enable hourly rate Throttling', 'Configure Send Time Optimization', 'Set notification alerts'],
            usageStatus: 'Frequently Used',
            usageNote: 'Always confirm client approval before clicking Schedule.'
          },
          {
            name: 'Split Campaign (A/B Testing)',
            purpose: 'Test multiple versions of an email to identify the highest performing variant. Compare Messages (Message A/B/C/D/E), ESP Vendors (Amazon SES vs Netcore), or Subject Lines.',
            keyActivities: ['Configure Split Type (Message, ESP, Subject)', 'Assign variants A/B/C', 'Distribute audience test split'],
            usageStatus: 'Used',
            usageNote: 'Used for optimizing offer conversions and vendor delivery comparison.'
          },
          {
            name: 'Campaigns Overview Dashboard',
            purpose: 'Main dashboard displaying all campaigns with ID, Name, Message, Scheduled Date, Status (New, Scheduled, Sending, Completed, Paused, Failed), Targeted count, Owner, Favorite (⭐), and More Options (⋮).',
            keyActivities: ['Search campaign by ID/Name', 'Filter by campaign status', 'Duplicate successful campaigns', 'Monitor sending progress'],
            usageStatus: 'Frequently Used',
            usageNote: 'Primary operational hub for campaign tracking and duplicating past dispatches.'
          }
        ]
      },
      {
        id: 'automation',
        name: '3. Automation Module',
        icon: 'Workflow',
        description: 'Set up Journeys and Automation Rules to deliver automated email workflows and list hygiene actions based on subscriber triggers.',
        subModules: [
          {
            name: 'Journeys',
            purpose: 'Visual canvas builder for automated multi-step email workflows triggered by subscriber actions (list subscription, tag addition, link clicks).',
            keyActivities: ['Design journey steps', 'Set conditional splits', 'Add delays and automated emails'],
            usageStatus: 'Used',
            usageNote: 'Used for automated drip campaigns and welcome series.'
          },
          {
            name: 'Automation Rules',
            purpose: 'Simple If/Then automated rules for performing automated tasks such as list hygiene, status updates, or triggering auto-responders.',
            keyActivities: ['Set trigger criteria', 'Define automated hygiene actions'],
            usageStatus: 'Used',
            usageNote: 'Useful for automated un-engagement list pruning.'
          }
        ]
      },
      {
        id: 'analytics',
        name: '4. Analytics & Reports Module',
        icon: 'BarChart2',
        description: 'Comprehensive reporting studio for analyzing campaign performance, ISP delivery breakdown, individual contact activity, and custom aggregate reports.',
        subModules: [
          {
            name: 'Aggregate Report',
            purpose: 'Provides a complete performance summary showing Sent, Delivered, Opens, Unique Opens, Clicks, Unique Clicks, Hard Bounces, Soft Bounces, Unsubscribes, Complaints, and Delivery Rate %. Filter by Date Range, Domain, and Campaign.',
            keyActivities: ['Analyze aggregate performance', 'Calculate Delivery Rate %', 'Monitor open & click rates', 'Export summary to CSV/Excel'],
            usageStatus: 'Frequently Used',
            usageNote: 'Primary report pulled after campaign completion.'
          },
          {
            name: 'Matrix Report',
            purpose: 'Detailed performance breakdown across dimensions: ISPs (Gmail 99%, Yahoo 98%, Outlook 96%, AOL 97%), Domains, SMTP Vendors (Amazon SES vs Netcore), Devices (Mobile 1,900, Desktop 700), and Browsers.',
            keyActivities: ['Compare ISP-wise delivery', 'Analyze mobile vs desktop opens', 'Compare SMTP vendor performance'],
            usageStatus: 'Frequently Used',
            usageNote: 'Critical for diagnosing ISP-specific deliverability issues (e.g., Outlook junk placement).'
          },
          {
            name: 'Contacts Activity Report',
            purpose: 'Tracks individual subscriber activity timeline after a send: Email Delivered, Opened, Link Clicked, Unsubscribed, Hard Bounce, Soft Bounce, and Complaint with exact timestamps.',
            keyActivities: ['Search contact activity by email', 'Verify if specific recipient opened/clicked email', 'Investigate delivery issues'],
            usageStatus: 'Frequently Used',
            usageNote: 'Primary tool for answering client support queries ("Did subscriber X receive email Y?").'
          },
          {
            name: 'Custom Aggregate Report',
            purpose: 'Generate customized analytics reports by grouping results based on selected fields (Group by First Field: Campaign Name, Group by Second Field: ISP) and applying text filters (e.g. Domain = securevasurvey.com).',
            keyActivities: ['Build custom grouped reports', 'Apply domain/vendor text filters', 'Export custom aggregate data'],
            usageStatus: 'Used',
            usageNote: 'Used for executive and client-specific performance reporting.'
          }
        ]
      },
      {
        id: 'vendors',
        name: '5. Vendors (My Connections) Module',
        icon: 'Server',
        description: 'Manage integrations with back-end delivery engines and SMTP connections (Amazon SES, Ongage Complete, Mailgun, SparkPost, SMTP Relays).',
        subModules: [
          {
            name: 'My Connections (ESP Connections)',
            purpose: 'The bridge between Ongage and the sending servers. Displays Connection ID (ECID), ESP Name, Sending Domain, Status (Active green badge), Setup Status (✔ green check), and Setup Date.',
            keyActivities: ['Search connection by ECID or Domain', 'Verify Active status & green checkmark', 'Add new SMTP connection', 'Configure routing rules'],
            usageStatus: 'Frequently Used',
            usageNote: 'Think of My Connections as the engine that sends emails. Never select an Inactive connection.'
          }
        ]
      },
      {
        id: 'settings',
        name: '6. Settings & Tracking/Image Domains Module',
        icon: 'Settings',
        description: 'Manage account profile information, mailing list configurations, users, and branded tracking/image domains.',
        subModules: [
          {
            name: 'Tracking & Image Domains',
            purpose: 'Manage branded domains for email click tracking (otrack.domain.com) and image/open tracking hosting (oimage.domain.com). Displays DNS Verification status (green checkmark), Default status, HTTPS Status (Available), and Expiration validity.',
            keyActivities: ['Configure branded CNAME tracking domains', 'Verify DNS settings', 'Enable HTTPS status', 'Assign domain per ESP/SMTP or per List'],
            usageStatus: 'Frequently Used',
            usageNote: 'Using branded tracking domains over generic click.ongage.net significantly improves inbox placement.'
          },
          {
            name: 'Profile & User Management',
            purpose: 'Manage company profile, user accounts, professional titles, login email, and role-based permissions.',
            keyActivities: ['Update profile details', 'Manage user accounts & permissions'],
            usageStatus: 'Admin Only',
            usageNote: 'Managed by Operations Administrators.'
          }
        ]
      }
    ],
    campaignProcess: [
      { step: 1, title: 'Receive & Verify Campaign Request', description: 'Receive campaign request from Campaign Planning Sheet (Google Sheet), Slack, or Jira. Verify all columns: Client (RESOLUTE), ESP (Ongage), ISP, Domain, Creative, Subject Line, From Name, Schedule Time, Volume, Throttling, Tracking Link, Footer, and Suppression List.' },
      { step: 2, title: 'Verify Required Assets', description: 'Ensure HTML creative, subject line string, From Name, tracking link, footer, and offer parameters are completely available before logging in.' },
      { step: 3, title: 'Login to Ongage & Access Campaigns', description: 'Log in to Ongage portal (https://esp.ongage.net/login). Navigate to Campaigns Overview dashboard.' },
      { step: 4, title: 'Locate & Duplicate Previous Campaign', description: 'Locate the most recent successful campaign for the same Client, Domain, Creative, and Offer. Click the three dots (⋮) and select DUPLICATE CAMPAIGN. Select message template and click Duplicate.' },
      { step: 5, title: 'Step 1 – Update Email Settings', description: 'In Email Settings wizard: Update Message Name according to naming convention (e.g. c04d_ratezipmrcrefi_tp). Verify From Name (e.g. Insurvo), verified From Email (e.g. cross@refinanceanalysis.com), Reply Email, Default Unsubscribe Link (Enabled), and Header/Footer.' },
      { step: 6, title: 'Step 2 – Update Email Design', description: 'In Email Design wizard: Update Subject Line (keep under 50-60 chars, avoid spam words FREE/WINNER), Pre-header text, paste HTML in HTML Editor or build in WYSIWYG/BEE Editor. Verify dynamic merge tags ({{firstname}}, {{lastname}}, {{datasource}}), tracking links, and footer address.' },
      { step: 7, title: 'Step 3 – Campaign Configuration', description: 'In Campaign Configuration: Set Campaign Name (format: Live_Client_Vertical_Date e.g. Live_9305_Roofing_Aug05). Select ESP Connection (e.g. bestlifeinsuranceportal.com), Include Segment (e.g. SENT_OPENERS_AUTO_RES_MATT_OTHERS), Exclude Segment (e.g. Exclude L10days Softbounce), Suppression Lists, Volume, and Throttling hours.' },
      { step: 8, title: 'Step 4 – Dispatch Seed Test Email & Verification', description: 'Click OPEN TEST CAMPAIGN MANAGER. Select seed test email addresses (Gmail, Yahoo, Outlook). Verify subject line tag, From Name, images, CTA button redirect, HTTPS tracking, footer address, and spam folder placement.' },
      { step: 9, title: 'Execute Final Pre-Live QA Checklist', description: 'Verify all 15 pre-live checklist items: Domain, Connection status (Active ✔), Creative, Subject, From Name/Email, Include/Exclude Segments, Suppression, Tracking Links, Footer, Volume, Schedule Time, Throttling, Dynamic Fields, HTML code, and Test Mail delivery.' },
      { step: 10, title: 'Step 5 – Configure Schedule & Go Live', description: 'Select Schedule Date, Time (e.g. 05 August 3:00 PM), Timezone (GMT -06 or subscriber timezone), and click SCHEDULE. Campaign status updates from New -> Ready to Send -> Sending -> Completed.' },
      { step: 11, title: 'Step 6 – Monitor Campaign & Update Tracker', description: 'Monitor live sending progress in Campaigns Overview. Once scheduled/completed, update campaign tracker sheet with Campaign ID, Status, Sent Volume, Delivered, Bounces (Hard/Soft), Total Opens, Unique Opens, and Total Clicks.' },
      { step: 12, title: 'Step 7 – Post-Mailing Performance Verification', description: 'After send completion, open Analytics -> Aggregate Report & Matrix Report. Verify Delivery Rate % (>98%), Open Rate %, Click Rate %, and compare ISP performance (Gmail vs Yahoo vs Outlook).' }
    ],
    listsAndSegments: {
      uploadProcess: 'Go to List -> Import -> click + Add File -> select CSV/TXT/ZIP (up to 500MB) -> verify UTF-8 encoding -> check Update Existing Contacts -> select Prevent null values from overwriting current value -> click Preview Import File (verify grey preview of first 10 rows) -> click Import.',
      attributes: ['{{firstname}}', '{{lastname}}', '{{email}}', '{{datasource}}', '{{City}}', '{{State}}', '{{Address}}'],
      segmentation: 'Go to List -> Segments -> click New Segment -> Enter Segment Name -> Select Condition (List Field, Behavioral Opened/Clicked/Sent/Bounced, or System Field Created Date) -> Click Count button (verify matching subscriber count) -> Click Save.',
      suppression: 'During Step 3 Campaign Configuration, select Exclude Segment (e.g. Exclude L10days Softbounce) and attach Campaign Suppression Lists (Unsubscribed, Complaints, Existing customers, Global suppression).',
      validation: 'Contacts Manager: Search contact by email -> view profile -> click Change Status (Active, Unsubscribed, Hard Bounce, Complaint) or perform Bulk Updates.'
    },
    templates: {
      creation: 'Go to Content -> Email Messages -> Create New Message. Use BEE Editor (drag-and-drop), WYSIWYG Editor, or HTML Editor (paste raw HTML code). Always run Litmus Testing across Gmail, Yahoo, Outlook, and Apple Mail.',
      variables: [
        { name: 'Subscriber First Name', tag: '{{firstname}}' },
        { name: 'Subscriber Last Name', tag: '{{lastname}}' },
        { name: 'Data Source', tag: '{{datasource}}' },
        { name: 'Subscriber City', tag: '{{City}}' },
        { name: 'Subscriber State', tag: '{{State}}' },
        { name: 'Physical Address', tag: '{{Address}}' }
      ],
      personalization: 'Go to Step 1 Email Settings -> Header & Footer section. Default Unsubscribe Link is automatically added. Customize Unsubscribe Confirmation Page URL (e.g. https://securevasurvey.com/thank-you) or Preference Center URL.'
    },
    tracking: {
      linkWrapping: 'All links are automatically wrapped with branded CNAME tracking domain (e.g. otrack.refinanceanalysis.com). Ensure HTTPS (https://) is included.',
      openTracking: 'Automatic tracking pixel injected via image domain (e.g. oimage.topcoverinsurance.com).',
      utmParameters: 'Configure URL Parameters in Step 1/Step 3 to append custom UTM tracking tags to all links.'
    },
    domainSetup: {
      spf: 'v=spf1 include:spf.ongage.net ~all',
      dkim: 'ongage._domainkey.yourdomain.com',
      dmarc: 'v=DMARC1; p=none; sp=none; pct=100;',
      dnsCheck: 'Verify CNAME DNS records for otrack.yourdomain.com and oimage.yourdomain.com in Settings -> Tracking & Image Domains. Ensure HTTPS status is Available.'
    },
    checklist: [
      { section: 'Step 1 – Email Settings Checklist', items: ['Message Name entered using naming convention', 'Description added (optional)', 'From Name selected & From Email verified in back-end ESP', 'Reply Email verified', 'Correct ESP Connection selected', 'Default Unsubscribe Link enabled', 'Header & Footer enabled'] },
      { section: 'Step 2 – Email Design Checklist', items: ['Subject line under 50-60 characters, no spam words (FREE, WINNER, CASH)', 'Preheader text configured', 'Dynamic merge tags verified ({{firstname}}, {{lastname}}, {{datasource}})', 'Litmus rendering test passed for Gmail, Yahoo, Outlook, Apple Mail'] },
      { section: 'Step 3 – Campaign Configuration Checklist', items: ['Campaign Name matches Live_Client_Vertical_Date format', 'Correct Include Segment selected & size verified via Count button', 'Correct Exclude Segment selected (Soft Bounces, Hard Bounces, Complainers)', 'Campaign Suppression List attached', 'ESP Connection status is Active with green checkmark (✔)'] },
      { section: 'Step 4 – Scheduling & Launch Checklist', items: ['Test email sent and verified in Gmail, Yahoo, Outlook inboxes', 'Schedule Date, Time, and Timezone confirmed (GMT -06 / local time)', 'Hourly rate Throttling enabled (e.g. 10,000/hr)', 'Client approval received before clicking Schedule'] }
    ],
    commonErrors: [
      { problem: 'Unverified From Email Rejection', reason: 'The From Email address used in Step 1 was not verified inside the back-end ESP vendor (e.g. Amazon SES).', solution: 'Verify the sending domain/email inside the ESP vendor settings or use the Overwrite button to select a verified sender.', prevention: 'Always verify sender domains in Settings -> My Connections before campaign setup.' },
      { problem: 'Orange Preview Warning During CSV Import', reason: 'Data syntax issues, encoding errors, or header attribute mismatches in the uploaded file.', solution: 'Ensure CSV file is UTF-8 encoded, remove empty header rows, and re-upload.', prevention: 'Pre-format client CSV files in UTF-8 encoding before importing.' },
      { problem: 'Wrong ESP Connection Selection', reason: 'Selected an Inactive or unconfigured SMTP connection in Step 3.', solution: 'Go to Settings -> My Connections, search connection ECID, ensure status is Active with green checkmark (✔).', prevention: 'Always check My Connections status before building campaigns.' }
    ],
    faqs: [
      { q: 'What is the difference between a List and a Segment in Ongage?', a: 'A List is an independent subscriber database (e.g. ABC Loans vs ABC Insurance). A Segment is a filtered group of subscribers inside a List.' },
      { q: 'What campaign naming format should be used in Ongage?', a: 'Campaign names should follow: Live_Client_Vertical_Date (e.g. Live_9305_Roofing_Aug05 or live_refi05_cross_tp).' },
      { q: 'How do I check if a specific contact received/opened an email?', a: 'Go to Reports -> Contacts Activity, select date range, search by contact email address (e.g. john@gmail.com), and view the full activity timeline.' },
      { q: 'What does the Count button do in Segment Builder?', a: 'The Count button calculates how many subscribers match the segment filter rules. Always verify the count before sending.' },
      { q: 'How do I duplicate an existing successful campaign?', a: 'In Campaigns Overview dashboard, locate the campaign, click the three dots (⋮) -> Duplicate Campaign -> select message -> click Duplicate.' }
    ]
  },
  {
    id: 'netcore',
    name: 'Netcore Cloud',
    category: 'Enterprise Email Delivery',
    logoBg: 'bg-emerald-600',
    description: 'Customer engagement and marketing automation platform used exclusively for Email Marketing — covering campaign creation, audience management, template design, and performance analytics.',
    overview: {
      introduction: 'Netcore Cloud is a customer engagement and marketing automation platform that enables businesses to create, manage, and track customer communication campaigns. While the platform supports multiple communication channels, our organization uses Netcore exclusively for Email Marketing. Netcore serves as the central platform for planning, building, executing, and monitoring email campaigns. It provides all the tools required to manage the end-to-end email marketing process, from importing recipient data to campaign deployment and performance analysis.',
      features: [
        'Creating and managing email campaigns',
        'Importing and organizing recipient data into lists',
        'Segmenting audiences based on campaign requirements',
        'Designing email templates using Drag-and-Drop or HTML Editor',
        'Configuring campaign settings, sender identities, subject lines, and scheduling',
        'Sending test emails for content and deliverability validation',
        'Launching one-time and recurring email campaigns',
        'Monitoring campaign performance (delivery, opens, clicks, bounces, unsubscribes)'
      ],
      useCases: [
        'High-volume promotional email broadcasts and newsletter dispatches',
        'Subscriber re-engagement sequences powered by behavioral triggers',
        'Audience segmentation for targeted campaign execution',
        'Email template management and reusable brand asset library'
      ],
      loginProcess: {
        url: 'https://netcorecloud.com/login/',
        ssoSupport: true,
        steps: [
          'Navigate to Netcore Customer Engagement Portal (https://netcorecloud.com/login/).',
          'Enter corporate credentials or authenticate via Single Sign-On (SSO / Okta / SAML 2.0).',
          'Complete Two-Factor Authentication (2FA) verification.',
          'Select the designated Email Workspace / Sub-account from the top application switcher.'
        ]
      },
      dashboardOverview: 'The Dashboard is the home page of Netcore ESP providing a centralized view of account activity, campaign performance, and customer engagement. It consists of Home Dashboard (Contacts, Campaigns, Revenue widgets), Engagement Dashboard (email campaign performance metrics), Behaviour Dashboard, Events Dashboard, and Revenue Dashboard. Our team primarily uses the Contacts and Campaigns widgets on the Home Dashboard and the Engagement Dashboard for email performance analysis.'
    },
    modules: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        icon: 'LayoutDashboard',
        description: 'The home page of Netcore ESP providing a centralized view of your account, campaign activities, customer engagement, and business insights. Administrators can customize the dashboard by enabling or disabling widgets.',
        subModules: [
          {
            name: 'Home Dashboard',
            purpose: 'Provides a quick overview of account information through various widgets. Monitor contacts, campaigns, and other business metrics from a single page.',
            keyActivities: ['View total contacts', 'Monitor recent campaigns', 'Access revenue and conversion data', 'View Co-marketer AI insights'],
            usageStatus: 'Frequently Used',
            usageNote: 'We primarily use the Contacts and Campaigns widgets.'
          },
          {
            name: 'Engagement Dashboard',
            purpose: 'Provides insights into the performance of communication campaigns — monitor email engagement, review campaign performance, analyze engagement trends, and export reports.',
            keyActivities: ['Monitor email engagement metrics', 'Review campaign performance', 'Analyze engagement trends over time periods', 'Export reports for analysis'],
            usageStatus: 'Frequently Used',
            usageNote: 'Useful for evaluating the effectiveness of email campaigns.'
          },
          {
            name: 'Behaviour Dashboard',
            purpose: 'Designed to analyze customer activities across websites and mobile applications including user behaviour analysis, event tracking, and conversion analysis.',
            keyActivities: ['User behaviour analysis', 'Event tracking', 'Conversion analysis', 'App and website usage metrics'],
            usageStatus: 'Not Used',
            usageNote: 'Our organization does not use Netcore for website or mobile application tracking.'
          },
          {
            name: 'Events Dashboard',
            purpose: 'Tracks customer actions such as registrations, purchases, checkouts, and other custom events across websites and mobile applications.',
            keyActivities: ['Monitor user events', 'Analyze customer interactions', 'View event trends', 'Generate event reports'],
            usageStatus: 'Not Used',
            usageNote: 'Outside the scope of our current email marketing operations.'
          },
          {
            name: 'Revenue Dashboard',
            purpose: 'Helps organizations measure revenue generated from customer interactions and marketing campaigns — track campaign ROI and analyze revenue trends.',
            keyActivities: ['Track campaign ROI', 'Analyze revenue trends', 'Measure marketing contribution to business growth'],
            usageStatus: 'Not Used',
            usageNote: 'Revenue attribution is managed outside Netcore.'
          }
        ]
      },
      {
        id: 'engage',
        name: 'Engage',
        icon: 'Send',
        description: 'Used to create, manage, and deliver customer communications. Provides features for campaign creation, on-site messaging, personalized content, and product recommendations. Our organization primarily uses the Campaigns section for Email Campaign Management.',
        subModules: [
          {
            name: 'Campaigns',
            purpose: 'The primary workspace used to create, schedule, execute, and monitor email campaigns. Configure campaign settings, select recipient lists or segments, choose email templates, schedule delivery, and track performance.',
            keyActivities: ['Create email campaigns', 'Select recipient lists or segments', 'Configure sender details', 'Choose email templates', 'Schedule or launch campaigns', 'Monitor campaign status', 'View campaign reports'],
            usageStatus: 'Frequently Used',
            usageNote: 'Primary feature used for daily email marketing activities.'
          },
          {
            name: 'On-site Messages',
            purpose: 'Allows businesses to display personalized messages, banners, pop-ups, and notifications to visitors on their websites based on predefined rules or user behavior.',
            keyActivities: ['Create website pop-ups', 'Define display rules', 'Target visitor segments'],
            usageStatus: 'Not Used',
            usageNote: 'Intended for website engagement — outside scope of email marketing operations.'
          },
          {
            name: 'Personalized Content',
            purpose: 'Enables businesses to display dynamic content to users based on their preferences, behavior, or profile information for improved customer experience across websites and applications.',
            keyActivities: ['Create dynamic content blocks', 'Set personalization rules', 'Target content by user behavior'],
            usageStatus: 'Not Used',
            usageNote: 'Our email campaigns use standard personalization fields where required.'
          },
          {
            name: 'Product (Personalization)',
            purpose: 'Allows businesses to create AI-powered product recommendations and personalized product suggestions for customers based on browsing or purchase behavior.',
            keyActivities: ['Create product recommendations', 'Configure AI-based suggestions', 'Manage product catalogs'],
            usageStatus: 'Not Used',
            usageNote: 'Designed for e-commerce personalization — not used in our email process.'
          }
        ]
      },
      {
        id: 'audience',
        name: 'Audience',
        icon: 'Users',
        description: 'Used to manage and organize recipient data. Create contact lists, segment audiences, manage subscriber information, and control who receives email campaigns. Ensures campaigns are sent to the correct recipients by maintaining accurate contact data.',
        subModules: [
          {
            name: 'Overview',
            purpose: 'Provides a summary of audience-related information including total number of contacts, lists, and segments available in the account.',
            keyActivities: ['View total contacts', 'Monitor list counts', 'View segment summary'],
            usageStatus: 'Frequently Used',
            usageNote: 'Used for monitoring audience statistics.'
          },
          {
            name: 'All Contacts',
            purpose: 'Contains every contact in the Netcore account. Search, filter, view, edit, and manage subscriber information from a single location.',
            keyActivities: ['View all contacts', 'Search and filter contacts', 'Edit contact details', 'View contact activity', 'Export contact data'],
            usageStatus: 'Frequently Used',
            usageNote: null
          },
          {
            name: 'Lists',
            purpose: 'Organize contacts into different groups based on campaign requirements. Lists make it easier to manage recipients and target specific audiences.',
            keyActivities: ['Create new lists', 'Import contacts', 'Manage recipient lists', 'View list statistics', 'Use lists while creating campaigns'],
            usageStatus: 'Frequently Used',
            usageNote: null
          },
          {
            name: 'Segments',
            purpose: 'Create dynamic or filtered groups of contacts based on specific conditions such as attributes, engagement, or campaign activity. Improves campaign targeting.',
            keyActivities: ['Create audience segments', 'Apply filtering conditions', 'Manage existing segments', 'Use segments in email campaigns'],
            usageStatus: 'Frequently Used',
            usageNote: null
          },
          {
            name: 'Blocklist Contacts',
            purpose: 'Contains email addresses restricted from receiving future communications. Contacts added manually or automatically due to unsubscribes, hard bounces, or suppression rules.',
            keyActivities: ['View blocked contacts', 'Add or remove contacts from blocklist', 'Manage suppressed recipients'],
            usageStatus: 'Used',
            usageNote: 'Used when managing suppressed contacts.'
          },
          {
            name: 'Attributes',
            purpose: 'Create and manage contact fields storing subscriber information — First Name, Last Name, Company, Country, or custom data for personalization and segmentation.',
            keyActivities: ['Create custom attributes', 'Modify existing attributes', 'Use attributes for personalization', 'Use attributes for segmentation'],
            usageStatus: 'Frequently Used',
            usageNote: null
          },
          {
            name: 'Control Group',
            purpose: 'Exclude a selected group of contacts from receiving campaigns to compare performance between recipients and non-recipients.',
            keyActivities: ['Create control groups', 'Compare campaign performance'],
            usageStatus: 'Not Used',
            usageNote: 'Not currently part of our workflow.'
          },
          {
            name: 'Facebook Custom Audience',
            purpose: 'Synchronize Netcore contacts with Facebook Custom Audiences for advertising campaigns.',
            keyActivities: ['Sync contacts to Facebook', 'Create custom audiences'],
            usageStatus: 'Not Used',
            usageNote: 'Intended for social media advertising — outside our email marketing workflow.'
          },
          {
            name: 'Google Audience',
            purpose: 'Synchronize contacts with Google advertising platforms for targeted advertising campaigns.',
            keyActivities: ['Sync contacts to Google Ads', 'Create targeted audiences'],
            usageStatus: 'Not Used',
            usageNote: 'Designed for digital advertising — not part of email operations.'
          }
        ]
      },
      {
        id: 'content',
        name: 'Content',
        icon: 'FileCode',
        description: 'Used to create, manage, and organize communication content. Design email templates, manage reusable assets, and maintain content used across marketing campaigns. The Email section is the primary feature used within this module.',
        subModules: [
          {
            name: 'Email',
            purpose: 'Create, edit, and manage email templates for marketing campaigns. Design emails using Drag-and-Drop Editor or HTML Editor depending on campaign requirements.',
            keyActivities: ['Create new email templates', 'Edit existing templates', 'Design via Drag-and-Drop or HTML', 'Add images, buttons, and links', 'Insert personalization variables', 'Preview and save templates'],
            usageStatus: 'Frequently Used',
            usageNote: null
          },
          {
            name: 'Brand Assets',
            purpose: 'Central repository for storing reusable branding resources — logos, banners, images, icons, and other creative assets for consistent branding across campaigns.',
            keyActivities: ['Upload brand images', 'Organize marketing assets', 'Reuse assets across templates'],
            usageStatus: 'Used',
            usageNote: 'Used when managing images and branding assets.'
          },
          {
            name: 'RCS',
            purpose: 'Create interactive mobile messages with rich media, buttons, images, and suggested replies for Android devices supporting RCS messaging.',
            keyActivities: ['Create RCS messages', 'Add rich media content'],
            usageStatus: 'Not Used',
            usageNote: 'Designed for mobile messaging — outside email marketing workflow.'
          },
          {
            name: 'Coupon',
            purpose: 'Generate and manage unique coupon or promotional codes distributed through marketing campaigns.',
            keyActivities: ['Create coupon campaigns', 'Manage coupon codes', 'Track coupon availability'],
            usageStatus: 'Not Used',
            usageNote: null
          },
          {
            name: 'Products',
            purpose: 'Manage product catalogs for personalized product recommendations in marketing campaigns. Primarily for e-commerce businesses.',
            keyActivities: ['Manage product catalogs', 'Configure AI product recommendations'],
            usageStatus: 'Not Used',
            usageNote: 'Our organization does not use product catalog integration.'
          }
        ]
      },
      {
        id: 'analytics',
        name: 'Analytics',
        icon: 'BarChart',
        description: 'Provides tools to analyze customer behavior, campaign performance, and audience engagement. Helps understand customer interactions, identify engagement patterns, and generate reports for decision-making.',
        subModules: [
          {
            name: 'Cohort',
            purpose: 'Groups contacts based on a common characteristic or activity (subscription date, first engagement). Analyzes how different groups behave over time.',
            keyActivities: ['Compare engagement across customer groups', 'Analyze retention trends', 'Measure campaign effectiveness over time'],
            usageStatus: 'Not Used',
            usageNote: 'Primarily for advanced customer behavior analysis — outside regular workflow.'
          },
          {
            name: 'RFM (Recency, Frequency, Monetary)',
            purpose: 'Classifies customers based on Recency (last interaction), Frequency (how often), and Monetary (purchase value). Identifies high-value customers for targeted campaigns.',
            keyActivities: ['Identify loyal customers', 'Segment by engagement behavior', 'Build targeted marketing campaigns'],
            usageStatus: 'Not Used',
            usageNote: 'Our organization does not use Netcore for customer purchase analysis.'
          },
          {
            name: 'Scheduled Reports',
            purpose: 'Automatically generate and deliver reports at predefined intervals (daily, weekly, monthly). Reports sent to selected email recipients.',
            keyActivities: ['Schedule campaign reports', 'Automate report delivery', 'Share performance reports with stakeholders'],
            usageStatus: 'Used',
            usageNote: 'Used when periodic campaign reports are required.'
          }
        ]
      },
      {
        id: 'settings',
        name: 'Settings',
        icon: 'Settings',
        description: 'Configure and manage platform settings including integrations, email domains, data transfer, unsubscribe pages, and account-level configurations. Most settings are configured during initial setup by administrators.',
        subModules: [
          {
            name: 'Apps',
            purpose: 'Configure and manage mobile applications integrated with Netcore.',
            keyActivities: ['Manage mobile app configs'],
            usageStatus: 'Not Used',
            usageNote: 'Intended for mobile application management.'
          },
          {
            name: 'Geofence',
            purpose: 'Trigger campaigns based on a user\'s geographic location.',
            keyActivities: ['Configure location-based triggers'],
            usageStatus: 'Not Used',
            usageNote: null
          },
          {
            name: 'Webhooks',
            purpose: 'Send real-time data to external applications whenever specific events occur. Enable campaign and event data sharing with external systems.',
            keyActivities: ['Configure webhook endpoints', 'Share campaign data externally', 'Automate integrations'],
            usageStatus: 'Admin Only',
            usageNote: 'Administrator Use Only (if applicable).'
          },
          {
            name: 'FTP',
            purpose: 'Configure File Transfer Protocol connections for importing or exporting data between Netcore and external systems.',
            keyActivities: ['Configure FTP connections', 'Schedule data imports/exports'],
            usageStatus: 'Admin Only',
            usageNote: 'Administrator Use Only.'
          },
          {
            name: 'Integrations',
            purpose: 'Connect with third-party platforms — CRM systems, e-commerce platforms, analytics tools, and business applications.',
            keyActivities: ['Connect third-party tools', 'Manage API integrations', 'Configure data sync'],
            usageStatus: 'Admin Only',
            usageNote: 'Administrator Use Only.'
          },
          {
            name: 'Data Transfer',
            purpose: 'Configure automated data imports and exports between Netcore and external systems.',
            keyActivities: ['Configure automated imports', 'Schedule data exports', 'Monitor transfer logs'],
            usageStatus: 'Used',
            usageNote: 'Used only if automated data synchronization is configured.'
          },
          {
            name: 'Events',
            purpose: 'Define and manage custom events tracked within Netcore for customer engagement and behavior analysis.',
            keyActivities: ['Create custom events', 'Track event data'],
            usageStatus: 'Not Used',
            usageNote: null
          },
          {
            name: 'Email Domain',
            purpose: 'Configure and verify sender domains for email campaigns. Manage authentication settings (SPF, DKIM, DMARC) to improve email deliverability.',
            keyActivities: ['Add sender domains', 'Verify domain ownership', 'Configure email authentication (SPF/DKIM/DMARC)', 'Manage sending domains'],
            usageStatus: 'Frequently Used',
            usageNote: 'Managed by Administrator / Email Operations team.'
          },
          {
            name: 'Target Audience',
            purpose: 'Define audience groups for specific communication channels and campaigns.',
            keyActivities: ['Define audience groups', 'Configure channel targeting'],
            usageStatus: 'Not Used',
            usageNote: null
          },
          {
            name: 'Countdown Timer',
            purpose: 'Create dynamic countdown timers embedded in email campaigns to create urgency for promotions or events.',
            keyActivities: ['Create countdown timers', 'Embed timers in emails', 'Set expiry dates'],
            usageStatus: 'Used',
            usageNote: 'Used when campaigns require countdown timers.'
          },
          {
            name: 'Unsubscribe Pages',
            purpose: 'Create and manage landing pages displayed when recipients choose to unsubscribe from email communications. Ensures compliance with email marketing regulations.',
            keyActivities: ['Create unsubscribe pages', 'Customize opt-out experience', 'Manage unsubscribe preferences'],
            usageStatus: 'Used',
            usageNote: 'Ensures CAN-SPAM and GDPR compliance.'
          }
        ]
      },
      {
        id: 'profile',
        name: 'Profile',
        icon: 'User',
        description: 'Manage user accounts, roles, account settings, and platform usage information. Provides access to account logs and user profile settings. Most features managed by administrators.',
        subModules: [
          {
            name: 'User Profile',
            purpose: 'View and manage account information. Access the account\'s API Key for integrating Netcore with external applications.',
            keyActivities: ['View profile information', 'Update personal details', 'Manage account preferences', 'View and copy API Key'],
            usageStatus: 'Frequently Used',
            usageNote: 'Profile Information: Frequently Used. API Key: Administrator Use Only.'
          },
          {
            name: 'Users',
            purpose: 'Manage all user accounts within the Netcore account. Add new users, modify existing users, assign permissions, or deactivate accounts.',
            keyActivities: ['Add new users', 'Edit user information', 'Activate or deactivate users', 'Manage user access'],
            usageStatus: 'Admin Only',
            usageNote: 'Administrator Use Only.'
          },
          {
            name: 'Roles',
            purpose: 'Create and manage user roles and permissions. Different roles assigned based on job responsibilities to control access to Netcore features.',
            keyActivities: ['Create roles', 'Assign permissions', 'Manage user access levels'],
            usageStatus: 'Admin Only',
            usageNote: 'Administrator Use Only.'
          },
          {
            name: 'Account Configuration',
            purpose: 'Account-level settings defining how the Netcore account is configured. Managed during account setup and modified only when required.',
            keyActivities: ['Configure account settings', 'Manage timezone settings', 'Update account preferences'],
            usageStatus: 'Admin Only',
            usageNote: 'Administrator Use Only.'
          },
          {
            name: 'Usage Overview',
            purpose: 'Summary of account usage — communication volume, resource utilization, and platform usage statistics. Helps monitor activity and usage limits.',
            keyActivities: ['Monitor account usage', 'Track communication volume', 'Review usage limits'],
            usageStatus: 'Admin Only',
            usageNote: 'Administrator Use Only.'
          },
          {
            name: 'Logs',
            purpose: 'Records important account activities and system events. Review user actions, monitor configuration changes, and troubleshoot issues.',
            keyActivities: ['View activity logs', 'Review system events', 'Troubleshoot issues', 'Audit user actions'],
            usageStatus: 'Admin Only',
            usageNote: 'Administrator Use Only.'
          },
          {
            name: 'Logout',
            purpose: 'Securely sign the user out of the Netcore account.',
            keyActivities: ['Securely end session'],
            usageStatus: 'Frequently Used',
            usageNote: null
          }
        ]
      },
      {
        id: 'user-menu',
        name: 'User Menu',
        icon: 'Menu',
        description: 'Accessed by clicking the username in the top-right corner. Provides quick access to account-related options, support resources, error logs, and logout functionality.',
        subModules: [
          {
            name: 'Error Logs',
            purpose: 'Displays errors encountered while using the platform. Helps identify and troubleshoot issues related to campaigns, integrations, or other platform activities.',
            keyActivities: ['View platform errors', 'Troubleshoot campaign issues', 'Review integration errors'],
            usageStatus: 'Used',
            usageNote: 'Used when troubleshooting platform-related issues.'
          },
          {
            name: 'User Community',
            purpose: 'Access the Netcore user community — explore discussions, best practices, product updates, and solutions shared by other Netcore users.',
            keyActivities: ['Browse community discussions', 'Access best practices', 'View product updates'],
            usageStatus: 'Optional',
            usageNote: 'Available as an additional learning resource but not part of daily workflow.'
          },
          {
            name: 'Help Center',
            purpose: 'Access Netcore\'s official documentation, user guides, and knowledge base. Search for articles and learn about platform features.',
            keyActivities: ['Search documentation', 'Read user guides', 'Explore knowledge base'],
            usageStatus: 'Used',
            usageNote: 'Used to refer to Netcore documentation and guides.'
          },
          {
            name: 'Raise Support Ticket',
            purpose: 'Contact Netcore Support by submitting technical issues, feature requests, or platform-related queries. Tickets should include issue description, Campaign ID, screenshots, and reproduction steps.',
            keyActivities: ['Submit support tickets', 'Report platform issues', 'Request feature assistance'],
            usageStatus: 'Used',
            usageNote: 'Used when assistance from Netcore Support is required.'
          },
          {
            name: 'Logout',
            purpose: 'Securely sign the user out of the Netcore account.',
            keyActivities: ['Securely end session'],
            usageStatus: 'Frequently Used',
            usageNote: null
          }
        ]
      }
    ],
    settings: {
      description: 'Configure and manage platform settings including integrations, email domains, data transfer, unsubscribe pages, and account-level configurations. Most settings are configured during initial setup by administrators.',
      subModules: [
        {
          name: 'Email Domain & Authentication',
          purpose: 'Configure and verify sender domains (SPF, DKIM, DMARC) to improve email deliverability. Manage sending domains and domain ownership verification.',
          keyActions: ['Add Sending Domain', 'Verify Domain Ownership', 'Configure SPF/DKIM/DMARC Authentication']
        },
        {
          name: 'Webhooks & FTP Configuration',
          purpose: 'Send real-time data to external applications via webhooks and configure FTP connections for automated data import/export. Administrator-managed.',
          keyActions: ['Configure Webhook Endpoints', 'Setup FTP Connections', 'Schedule Data Transfers']
        },
        {
          name: 'Unsubscribe Pages & Compliance',
          purpose: 'Create and manage unsubscribe landing pages ensuring CAN-SPAM and GDPR compliance. Customize opt-out experience for recipients.',
          keyActions: ['Create Unsubscribe Pages', 'Customize Opt-Out Flow', 'Manage Preference Centers']
        },
        {
          name: 'Countdown Timer Configuration',
          purpose: 'Create dynamic countdown timers embedded in email campaigns to create urgency for promotions, flash sales, or event registrations.',
          keyActions: ['Create Countdown Timers', 'Set Expiry Dates & Times', 'Embed Timer in Email Template']
        },
        {
          name: 'Integrations & Data Transfer',
          purpose: 'Connect Netcore with third-party CRM, e-commerce, and analytics platforms. Configure automated data synchronization between systems.',
          keyActions: ['Connect Third-Party Platforms', 'Configure Data Sync Schedules', 'Monitor Integration Logs']
        }
      ]
    },
    profile: {
      description: 'Manage user accounts, roles, account settings, and platform usage. Provides access to account logs, API keys, and user profile settings. Most features managed by administrators.',
      subModules: [
        {
          name: 'User Profile & API Key Management',
          purpose: 'View and manage personal account information. Access the account API Key for Netcore API integrations with external applications.',
          keyActions: ['View Profile Information', 'Update Personal Details', 'Copy API Key for Integrations']
        },
        {
          name: 'User Management & Roles (RBAC)',
          purpose: 'Add, modify, and deactivate user accounts. Create roles with granular permissions based on job responsibilities to control platform access.',
          keyActions: ['Add New Users', 'Assign Role-Based Permissions', 'Deactivate User Accounts']
        },
        {
          name: 'Account Configuration & Timezone',
          purpose: 'Account-level settings defining Netcore configuration — timezone settings, account preferences, and workspace configuration. Modified only when required.',
          keyActions: ['Configure Account Timezone', 'Update Account Preferences', 'Manage Workspace Settings']
        },
        {
          name: 'Usage Overview & Monitoring',
          purpose: 'Summary of account usage — communication volume, resource utilization, and platform usage limits. Helps administrators monitor overall activity.',
          keyActions: ['Monitor Communication Volume', 'Track Resource Utilization', 'Review Usage Limits']
        },
        {
          name: 'Activity Logs & Audit Trail',
          purpose: 'Records important account activities and system events. Review user actions, monitor configuration changes, and troubleshoot issues.',
          keyActions: ['View Activity Logs', 'Audit User Actions', 'Review System Events']
        }
      ]
    },
    campaignProcess: [
      { step: 1, title: 'Campaign Setup & Broadcast Type', description: 'Navigate to Engage -> Campaigns -> Create Campaign. Choose standard email broadcast, split test, or automated trigger.' },
      { step: 2, title: 'Audience List & Segment Selection', description: 'Select target contact lists or dynamic segments from the Audience module (e.g. 30-day active openers). Global suppression (Blocklist) is auto-applied.' },
      { step: 3, title: 'Content & Template Assembly', description: 'Select a pre-built template from Content -> Email or build via Drag-and-Drop / Raw HTML editor. Add images, buttons, links, and personalization variables.' },
      { step: 4, title: 'Header & Personalization Configuration', description: 'Set From Name, Sender Email Address, Subject Line, and Pre-header. Insert dynamic merge tags (e.g. [NAME], [EMAIL], [ATTRIBUTE_NAME]).' },
      { step: 5, title: 'Send Test Email & QA Validation', description: 'Send seed test emails to internal QA box (Gmail, Yahoo, Outlook). Verify rendering, links, personalization tags, and mobile layout.' },
      { step: 6, title: 'Scheduling & Throttling Setup', description: 'Select fixed schedule, immediate dispatch, or configure hourly batch throttling limits. Verify timezone settings in campaign scheduler.' },
      { step: 7, title: 'Live Monitoring & Post-Send Analytics', description: 'Track real-time dispatch velocity in Engagement Dashboard. Monitor open rate %, click-through rate %, hard bounce counts, and spam complaint metrics.' }
    ],
    listsAndSegments: {
      uploadProcess: 'Navigate to Audience -> Lists -> Import Contacts. Upload UTF-8 encoded CSV. Map mandatory fields (Email, Name) and custom attributes created in the Attributes section.',
      attributes: ['[EMAIL]', '[NAME]', '[MOBILE]', '[CITY]', '[COUNTRY]', '[CREATED_AT]', '[LAST_OPEN_DATE]'],
      segmentation: 'Use Audience -> Segments to build dynamic segment conditions based on contact attributes, email interaction history (e.g. Opened in last 14 days AND ISP equals Gmail), or campaign activity.',
      suppression: 'Audience -> Blocklist Contacts: Global Unsubscribes, Hard Bounces, and Spam Complaints are automatically suppressed. Contacts added manually or automatically due to unsubscribes, hard bounces, or suppression rules.',
      validation: 'Netcore built-in email hygiene scanner validates list syntax and screens against disposable domain databases during import.'
    },
    templates: {
      creation: 'Navigate to Content -> Email -> Create New. Choose Drag-and-Drop Editor for visual design or HTML Editor for raw HTML import. Store reusable images in Content -> Brand Assets.',
      variables: [
        { name: 'Subscriber First Name', tag: '[NAME]' },
        { name: 'Subscriber Email', tag: '[EMAIL]' },
        { name: 'Unsubscribe Link', tag: '[UNSUBSCRIBE_LINK]' },
        { name: 'Web Browser Version', tag: '[WEB_VERSION_LINK]' },
        { name: 'Custom Attribute', tag: '[ATTRIBUTE_NAME]' }
      ],
      personalization: 'Conditional content blocks (IF/ELSE) based on subscriber attributes. Use personalization variables to dynamically insert contact data. Preview templates before saving.'
    },
    commonErrors: [
      { problem: 'Domain Reputation Warning (Gmail / Yahoo)', reason: 'Spam complaint rate exceeded 0.1% or hard bounce rate exceeded 2%.', solution: 'Pause broadcast, tighten list segmentation to 7-day openers, and scrub inactive contacts via Audience -> Blocklist Contacts.', prevention: 'Consistently prune inactive subscribers. Use Audience -> Segments to target engaged contacts only.' },
      { problem: 'Hourly Rate Limit Throttling Triggered', reason: 'High volume dispatch exceeded assigned hourly rate limit for targeted IP pool.', solution: 'Increase hourly rate limit in Settings -> Email Domain or split dispatch into multi-hour batches via campaign scheduler.', prevention: 'Configure automated hourly dispatch throttling in Step 6 of campaign creation.' },
      { problem: 'Invalid Merge Tag Rendering ([TAG])', reason: 'Custom contact attribute name misspelled or missing brackets in HTML body.', solution: 'Verify exact attribute key in Audience -> Attributes and format as uppercase bracket syntax [ATTRIBUTE].', prevention: 'Use the Template Tag Picker dropdown in Content -> Email editor when inserting personalization.' }
    ],
    faqs: [
      { q: 'Where do I create email campaigns in Netcore?', a: 'Navigate to Engage -> Campaigns -> Create Campaign. This is the primary workspace for creating, scheduling, and monitoring email campaigns.' },
      { q: 'How do I import contacts into Netcore?', a: 'Go to Audience -> Lists -> select your list -> Import Contacts. Upload a UTF-8 CSV and map fields to the attributes defined in Audience -> Attributes.' },
      { q: 'How do I manage email templates?', a: 'Navigate to Content -> Email to create, edit, and manage templates. Use Drag-and-Drop Editor for visual design or HTML Editor for raw code. Store brand images in Content -> Brand Assets.' },
      { q: 'How does Netcore handle unsubscribe requests?', a: 'Netcore automatically processes opt-out requests and adds them to Audience -> Blocklist Contacts. Configure unsubscribe pages in Settings -> Unsubscribe Pages.' },
      { q: 'How do I access Netcore support?', a: 'Click your username in the top-right corner -> Raise Support Ticket. Include issue description, Campaign ID (if applicable), screenshots, and steps to reproduce.' },
      { q: 'Where can I view campaign performance reports?', a: 'Use the Dashboard -> Engagement Dashboard for quick performance overview. For automated scheduled reports, use Analytics -> Scheduled Reports.' }
    ]
  },
  {
    id: 'maropost',
    name: 'Maropost Marketing Cloud',
    category: 'Enterprise Marketing Automation Platform',
    logoBg: 'bg-orange-600',
    description: 'Cloud-based Email Service Provider (ESP) and customer engagement platform that helps businesses communicate with customers through email and SMS, organize customer data via CDP, automate journeys, and measure campaign performance.',
    overview: {
      introduction: 'Maropost Marketing Cloud is an enterprise Email Service Provider (ESP) and customer data management platform. It enables operations teams to create professional email campaigns, organize subscriber databases in the Customer Data Platform (CDP), automate multi-step customer journeys, and evaluate real-time campaign deliverability.',
      features: [
        'Customer Data Platform (CDP) for centralized subscriber database management',
        'Multi-step Journeys & Data Journeys for event-triggered email automation',
        'eRFM (Email Recency, Frequency, Monetary) reporting and subscriber cohort analysis',
        'Drag-and-Drop Editor & WYSIWYG Editor with raw HTML Source code access',
        'Mandatory Footer Management with Address tag {{campaign.address}} and Unsubscribe tags',
        'Comprehensive Analytics: Campaign Reports, A/B Reports, Recurring Reports, and Log Inspector'
      ],
      useCases: [
        'High-volume promotional campaigns with standardized naming conventions',
        'Behavioral and recency-based dynamic audience segmentation (3-day, 7-day, 14-day, 30-day openers)',
        'Event-triggered email automation journeys based on contact data changes',
        'Subscriber data imports and contact attribute enrichment via CDP'
      ],
      loginProcess: {
        url: 'https://mp.maropost.com',
        ssoSupport: true,
        steps: [
          'Navigate to Maropost Marketing Cloud login portal (https://mp.maropost.com).',
          'Input your assigned email operations credentials.',
          'Complete Two-Factor Authentication (2FA) verification.',
          'Select the designated Account Workspace from the top navbar dropdown.'
        ]
      },
      dashboardOverview: 'The Maropost Dashboard provides a centralized operational overview featuring Recent Sent Campaigns, overall Deliverability Score (e.g. 10/10 rating), 7-day Email Volume graph (Sent vs Delivered), and real-time campaign performance metrics.'
    },
    modules: [
      {
        id: 'dashboard',
        name: 'Dashboard Module',
        icon: 'LayoutDashboard',
        description: 'The first page after logging in. Provides a quick overview of recent sent campaigns, key campaign metrics, overall email volume graphs, and deliverability health score without navigating to individual sub-modules.',
        subModules: [
          {
            name: 'Recent Sent Campaigns',
            purpose: 'Displays recent dispatches with status, total sent, delivered, opens, clicks, revenue, and send timestamp.',
            keyActivities: ['View recent send status', 'Monitor immediate delivery metrics', 'Check campaign timestamp'],
            usageStatus: 'Frequently Used',
            usageNote: 'Core workspace for quick campaign status verification post-dispatch.'
          },
          {
            name: 'Deliverability Score & Email Volume Graph',
            purpose: 'Provides visual 10/10 deliverability rating dial and 7-day volume graph comparing Sent vs Delivered volume.',
            keyActivities: ['Monitor 10/10 deliverability score', 'Track 7-day email volume trends'],
            usageStatus: 'Frequently Used',
            usageNote: 'Essential for catching ISP connection drops early.'
          }
        ]
      },
      {
        id: 'analytics',
        name: 'Analytics Module',
        icon: 'BarChart2',
        description: 'Provides in-depth reporting and performance metrics showing how recipients interacted with sent emails. Features eRFM subscriber engagement reports, campaign reports, recurring reports, A/B split reports, and Log Inspector for troubleshooting.',
        subModules: [
          {
            name: 'eRFM Report (Email Recency, Frequency, Monetary)',
            purpose: 'Groups subscribers according to email recency, interaction frequency, and monetary value to identify active, inactive, and high-value audiences.',
            keyActivities: ['Identify active vs inactive subscribers', 'Segment high-value audience cohorts', 'Optimize targeting lists'],
            usageStatus: 'Used',
            usageNote: 'Used to evaluate overall list engagement health.'
          },
          {
            name: 'Campaign Reports',
            purpose: 'Detailed performance metrics for sent email campaigns: Sent, Delivered, Opens, Clicks, Bounces, Unsubscribes, and Spam Complaints.',
            keyActivities: ['Track delivery, open & click rates', 'Monitor bounce and complaint counts', 'Export campaign reports'],
            usageStatus: 'Frequently Used',
            usageNote: 'Primary reporting interface for all executed campaigns.'
          },
          {
            name: 'Recurring Campaign Reports',
            purpose: 'Displays performance of campaigns scheduled to run automatically at regular intervals (daily, weekly, or monthly).',
            keyActivities: ['Monitor recurring campaign stats', 'Track automated recurring performance'],
            usageStatus: 'Used',
            usageNote: 'Used for scheduled recurring email broadcasts.'
          },
          {
            name: 'A/B Campaign Reports',
            purpose: 'Compares performance of different email variations (subject lines, content, From Names) to identify winning variants.',
            keyActivities: ['Compare variant open and click rates', 'Identify winning subject lines and creatives'],
            usageStatus: 'Used',
            usageNote: 'Used when running split tests.'
          },
          {
            name: 'Test Campaign Reports',
            purpose: 'Displays results of test emails sent before launching a campaign to verify successful delivery and rendering.',
            keyActivities: ['Verify seed test delivery', 'Check test email open rendering'],
            usageStatus: 'Frequently Used',
            usageNote: 'Mandatory pre-flight verification step.'
          },
          {
            name: 'Website Reports',
            purpose: 'Displays web page views and contact drill-down details when Web Tracking is enabled.',
            keyActivities: ['Track page views and contact website visits'],
            usageStatus: 'Conditional',
            usageNote: 'Requires Web Tracking activation.'
          },
          {
            name: 'Journey Reports',
            purpose: 'Monitors performance of automated email campaigns sent through Maropost Journey Builder workflows.',
            keyActivities: ['Track journey email steps', 'Evaluate journey conversion effectiveness'],
            usageStatus: 'Used',
            usageNote: 'Used for active automated journey workflows.'
          },
          {
            name: 'Custom Reports',
            purpose: 'Create user-defined custom reports with specific filters, automated schedule delivery, and multi-recipient sharing.',
            keyActivities: ['Build custom reports', 'Schedule automated report emails'],
            usageStatus: 'Used',
            usageNote: 'Used for custom operational reporting requirements.'
          },
          {
            name: 'Transactional Campaign Reports',
            purpose: 'Performance details for automated transactional emails like order confirmations and password resets.',
            keyActivities: ['Monitor transactional email delivery', 'Track order confirmation metrics'],
            usageStatus: 'Used',
            usageNote: 'Used for transactional email monitoring.'
          },
          {
            name: 'Log Inspector',
            purpose: 'Displays failed API calls made to Maropost, providing technical details about requests that were not processed successfully.',
            keyActivities: ['View failed API calls', 'Troubleshoot API integration errors', 'Review request payload details'],
            usageStatus: 'Admin Only',
            usageNote: 'Used by technical operators and administrators for API troubleshooting.'
          }
        ]
      },
      {
        id: 'cdp',
        name: 'CDP (Customer Data Platform)',
        icon: 'Database',
        description: 'Centralized digital address book where all subscriber information is stored and managed. Houses All Contacts master database, Contact Lists, Segments, Contact Fields, and Contact Tags.',
        subModules: [
          {
            name: 'All Contacts',
            purpose: 'Master database where every contact is stored. Search for specific contacts (e.g. tobias@gmail.com), view profile details, edit attributes, or delete records.',
            keyActivities: ['View master database', 'Search contact by email', 'Edit contact information', 'Delete subscriber records'],
            usageStatus: 'Frequently Used',
            usageNote: 'Core contact management database.'
          },
          {
            name: 'Contact Lists',
            purpose: 'Collections of contacts grouped into specific lists. Upload list files via CSV import and map file columns to contact fields.',
            keyActivities: ['Create contact lists', 'Import CSV data files', 'Map file columns to contact attributes'],
            usageStatus: 'Frequently Used',
            usageNote: 'Primary list management section.'
          },
          {
            name: 'Segments',
            purpose: 'Filtered group of contacts created from lists based on specific conditions. Features both Legacy Segment Builder and Next-Gen Segment Builder (with AI rule assist).',
            keyActivities: ['Build dynamic segments', 'Apply recency and engagement filters', 'Check total segment contact count'],
            usageStatus: 'Frequently Used',
            usageNote: 'Critical for audience targeting. Always duplicate segments when modifying conditions.'
          },
          {
            name: 'Contact Fields',
            purpose: 'Custom attributes used to store subscriber details (Firstname, Lastname, Email, Mobile Number, Country, City, Date of Birth).',
            keyActivities: ['Create custom fields', 'Manage attribute data types (Text, Integer, String)'],
            usageStatus: 'Frequently Used',
            usageNote: 'Used for personalization tags and dynamic segmentation.'
          },
          {
            name: 'Contact Tags',
            purpose: 'Labels used to categorize contacts based on behavior, interests, or business requirements (e.g., Premium VIP, First Purchase).',
            keyActivities: ['Add contact tags', 'Target tagged subscriber cohorts'],
            usageStatus: 'Frequently Used',
            usageNote: 'Enables quick tag-based campaign targeting.'
          },
          {
            name: 'Relational Tables',
            purpose: 'Store additional data related to contacts, such as order details or transaction history.',
            keyActivities: ['Store order/transaction tables'],
            usageStatus: 'Not Used',
            usageNote: 'Currently Not in Use in our organization.'
          },
          {
            name: 'SQL Queries',
            purpose: 'Retrieve and filter customer data using raw SQL statements.',
            keyActivities: ['Run SQL queries for audience selection'],
            usageStatus: 'Not Used',
            usageNote: 'Currently Not in Use in our organization.'
          },
          {
            name: 'Secure Lists',
            purpose: 'Store sensitive customer information with restricted access permissions.',
            keyActivities: ['Manage secure data lists'],
            usageStatus: 'Not Used',
            usageNote: 'Currently Not in Use in our organization.'
          },
          {
            name: 'Web Tracking',
            purpose: 'Track visitor web activity (page visits, clicks, conversions) on websites.',
            keyActivities: ['Configure web tracking script'],
            usageStatus: 'Not Used',
            usageNote: 'Currently Not in Use in our organization.'
          }
        ]
      },
      {
        id: 'marketing',
        name: 'Marketing Module',
        icon: 'Megaphone',
        description: 'Main module used to create, manage, automate, and monitor email campaigns, acquisition forms, automation journeys, and email content.',
        subModules: [
          {
            name: 'Email Campaigns',
            purpose: 'Primary workspace for creating and dispatching email campaigns to target lists or segments.',
            keyActivities: ['Create campaign', 'Set campaign naming format', 'Select brand and lists', 'Configure sender details', 'Attach suppressions', 'Schedule and send test email'],
            usageStatus: 'Frequently Used',
            usageNote: 'Core daily workspace for campaign execution.'
          },
          {
            name: 'Campaign Tags',
            purpose: 'Labels used to organize, group, and report on email campaigns (e.g. GRA-R, GLO-T, GLO-R).',
            keyActivities: ['Create campaign tags', 'Assign tags to email campaigns', 'Filter campaign reports by tag'],
            usageStatus: 'Frequently Used',
            usageNote: 'Used to organize campaigns for quick tracking and reporting.'
          },
          {
            name: 'Acquisition (Forms, Pages, Surveys)',
            purpose: 'Collect new subscribers and leads via signup forms, landing pages, and customer feedback surveys.',
            keyActivities: ['Create signup forms', 'Build lead landing pages', 'Design customer surveys'],
            usageStatus: 'Used',
            usageNote: 'Used for lead generation and feedback collection.'
          },
          {
            name: 'Automation (Journeys & Data Journeys)',
            purpose: 'Automate marketing workflows triggered by customer actions/events (Journeys) or changes in contact data/field values (Data Journeys).',
            keyActivities: ['Build multi-step automated email workflows', 'Set entry triggers (list join, tag added)', 'Configure data change triggers'],
            usageStatus: 'Used',
            usageNote: 'Primary automation workflow builder.'
          },
          {
            name: 'Content (Email Content)',
            purpose: 'Create and manage email templates using Drag-and-Drop Content Editor or WYSIWYG Editor with raw HTML Source code view.',
            keyActivities: ['Build Drag-and-Drop templates', 'Edit raw HTML via Source button', 'Save reusable templates'],
            usageStatus: 'Frequently Used',
            usageNote: 'Essential for email creative management.'
          },
          {
            name: 'Content (Footer Management)',
            purpose: 'Create and manage mandatory email footers. MANDATORY REQUIREMENTS: Must contain Address Tag {{campaign.address}} and Unsubscribe Tag. Cannot be saved or used without them.',
            keyActivities: ['Create brand footers', 'Verify {{campaign.address}} tag', 'Include 1-Click Unsubscribe tag'],
            usageStatus: 'Frequently Used',
            usageNote: 'Mandatory compliance footer builder. Address tag {{campaign.address}} is strictly required.'
          },
          {
            name: 'Transactional Emails',
            purpose: 'Automated system-triggered emails sent when specific events occur.',
            keyActivities: ['Manage transactional triggers'],
            usageStatus: 'Not Used',
            usageNote: 'Currently Not in Use in our organization.'
          },
          {
            name: 'Products / Product Recommendations',
            purpose: 'Displays automated personalized product recommendations in emails based on purchase history.',
            keyActivities: ['Configure product recommendation feeds'],
            usageStatus: 'Not Used',
            usageNote: 'Currently Not in Use in our organization.'
          },
          {
            name: 'Dynamic Content / Image Library / Optimise on Open / Content Feeds / Coupon Banks / Preference Management / Countdown Timer',
            purpose: 'Advanced content tools listed in Marketing -> Content section.',
            keyActivities: ['Manage content assets'],
            usageStatus: 'Not Used',
            usageNote: 'Currently Not in Use in our organization.'
          },
          {
            name: 'Commerce / Retail / Service / Da Vinci AI / Apps',
            purpose: 'E-commerce commerce management, retail point of sale, customer service ticketing, Da Vinci AI assistant, and mobile apps.',
            keyActivities: ['Manage platform extensions'],
            usageStatus: 'Not Used',
            usageNote: 'Currently Not in Use in our organization.'
          }
        ]
      }
    ],
    campaignProcess: [
      { step: 1, title: 'Initiate Campaign Creation', description: 'Navigate to Marketing -> Campaigns -> Email Campaigns and click NEW CAMPAIGN.' },
      { step: 2, title: 'Set Campaign Details & Naming Convention', description: 'Enter Campaign Name strictly following format: live_creativename_offer_client_isp_date_domain (Example: live_lbh03_liz_tp_gmail_20260708_powerrefinance). Enter Subject Line, Preheader, and select Campaign Tag.' },
      { step: 3, title: 'Select Target Brand & Audience', description: 'Select Brand/Domain (e.g. infoquickenloans.com), target Segment (e.g. Deliverd_gmail_resolute_p0_ql_19may_Aug06), and target Contact List.' },
      { step: 4, title: 'Configure Sender Details & Physical Address', description: 'Enter From Name (e.g. Carolyn Holton), From Email, Reply-To Email, and mandatory physical postal address (e.g. 2800 N 6th Street #5027, St. Augustine, FL 32084).' },
      { step: 5, title: 'Attach Suppression Lists & Segments', description: 'In Add Suppress Contacts section, select Suppress List, Suppress Journey, Suppress Segment (e.g. softbounce segment 3months), or Suppress Secure List.' },
      { step: 6, title: 'Select Email Content Template', description: 'Select pre-built template from Content -> Email Content. Ensure footer contains mandatory Address Tag {{campaign.address}} and Unsubscribe Tag.' },
      { step: 7, title: 'Perform Built-In Spam Check', description: 'Click RENDER PREVIEW and execute built-in Spam Check to detect spam trigger content.' },
      { step: 8, title: 'Configure Dispatch Schedule', description: 'Select Priority Send, specify Schedule Date (DD/MM/YYYY) and Schedule Time.' },
      { step: 9, title: 'Dispatch Seed Test Email & Verify Attributes', description: 'In Send Test Email section, select seed test email addresses or seed list. Verify subject line tag (e.g. {{contact.address}} Term/Payment Update) and link rendering in test inbox.' },
      { step: 10, title: 'Review Campaign Parameters', description: 'Review complete campaign setup summary: Brand, Lists, Suppressions, Sender, Content, and Schedule.' },
      { step: 11, title: 'Send / Launch Campaign', description: 'Click SEND CAMPAIGN to initiate live dispatch to scheduled queue.' }
    ],
    listsAndSegments: {
      uploadProcess: 'Go to CDP -> Contact Lists -> select list or click Create -> click Import Contacts -> select File Import (CSV/TXT up to 128MB) -> select Delimiter (Comma) -> map CSV columns to Contact Fields (Email, Firstname, Lastname, Country).',
      attributes: ['firstname', 'lastname', 'email', 'mobilenumber', 'country', 'city', 'dateofbirth'],
      segmentation: 'Go to CDP -> Segments -> click Create Segment -> Enter Segment Name -> Select Contact List -> Add Filter Conditions -> Save Segment. Supports both Legacy Segment Builder and Next-Gen Segment Builder.',
      suppression: 'During Step 5 of Campaign Setup (Add Suppress Contacts), attach Suppress List, Suppress Segment (e.g. softbounce segment 3months), or offer-specific suppression files (e.g. RGR lists, Liz suppression lists).',
      validation: 'Verify uploaded CSV encoding (UTF-8) and check field mapping before completing contact import.'
    },
    templates: {
      creation: 'Go to Marketing -> Content -> Email Content -> click NEW CONTENT. Choose Drag-and-Drop Content editor or WYSIWYG Content editor (click Source button to edit raw HTML code).',
      variables: [
        { name: 'Subscriber First Name', tag: '{{contact.first_name}}' },
        { name: 'Subscriber Last Name', tag: '{{contact.last_name}}' },
        { name: 'Subscriber Email', tag: '{{contact.email}}' },
        { name: 'Physical Address (Mandatory)', tag: '{{campaign.address}}' },
        { name: 'Unsubscribe Link (Mandatory)', tag: '{{campaign.unsubscribe_link}}' },
        { name: 'Date Attribute', tag: '{{other.time_stamp}}' }
      ],
      personalization: 'Go to Marketing -> Content -> Footer Management. MANDATORY: All footers MUST include {{campaign.address}} and an Unsubscribe Tag. Footers cannot be saved or used without these mandatory fields.'
    },
    tracking: {
      linkWrapping: 'All links are automatically wrapped with Maropost click tracking CNAME. Ensure HTTPS (https://) is included when copying offer links.',
      openTracking: 'Automatic tracking pixel injected into HTML body.',
      utmParameters: 'Verify Subid & Publisher ID (as per offer requirements) and append standard UTM parameters.'
    },
    domainSetup: {
      spf: 'v=spf1 include:maropost.com ~all',
      dkim: 'mp._domainkey.yourdomain.com',
      dmarc: 'v=DMARC1; p=none; sp=none; pct=100;',
      dnsCheck: 'Verify SPF, DKIM, and DMARC authentications in DNS control panel prior to launch.'
    },
    checklist: [
      { section: 'Performance Check', items: ['Ensure previous day performance meets benchmarks:', 'Delivery Rate > 98%', 'Open Rate (OR) > 1%', 'Spam Rate < 0.02%'] },
      { section: 'Campaign Setup', items: ['Update campaign name as per format: (live_creativename_offer_client_isp_date_domain) e.g. live_lbh03_liz_tp_gmail_20260708_powerrefinance', 'Change creative & subject line as per plan'] },
      { section: 'Domain & ISP Handling', items: ['Domain OP: No indexing, check plan duration (L30, L15, etc.)', 'Other ISPs: Do indexing for the segment'] },
      { section: 'Links & Tracking', items: ['Verify Subid & Publisher ID (as per offer)', 'Check tracking link in the panel', 'Ensure HTTPS is added when copying links'] },
      { section: 'Authentication & Testing', items: ['Add live seeds and ensure attributes populate in test mail', 'Verify SPF, DKIM, DMARC authentications', 'Ensure dynamic values are correctly populated (firstname, lastname, address, etc.)'] },
      { section: 'Creative & Segment Rules', items: ['No changes in creative (create duplicate if needed)', 'No changes in segment (create duplicate if needed)', 'Check for hidden links in content (using href)'] },
      { section: 'Final Verification', items: ['Confirm suppression lists for particular offers e.g. (RGR lists, Liz suppression lists)', 'Ensure correct date attribute ({{other.time_stamp}})', 'Verify that all campaigns for respective connections are scheduled'] }
    ],
    commonErrors: [
      { problem: 'Footer Save Failure', reason: 'Missing mandatory Address Tag {{campaign.address}} or Unsubscribe Tag in Footer Management.', solution: 'Insert {{campaign.address}} and Unsubscribe link tags into footer HTML and save.', prevention: 'Always use standard footer templates with mandatory tags pre-configured.' },
      { problem: 'Campaign Name Format Rejection', reason: 'Campaign Name did not follow required format: live_creativename_offer_client_isp_date_domain.', solution: 'Rename campaign to follow exact naming convention string (e.g. live_lbh03_liz_tp_gmail_20260708_powerrefinance).', prevention: 'Use standardized campaign naming generator before setting up campaigns.' },
      { problem: 'Failed API Requests in Log Inspector', reason: 'Invalid API key or malformed JSON payload sent to Maropost API endpoint.', solution: 'Check Analytics -> Log Inspector for detailed error logs and fix payload parameters.', prevention: 'Test API payloads in staging environment before live webhook integration.' }
    ],
    faqs: [
      { q: 'What is the required campaign naming format in Maropost?', a: 'Campaign names MUST follow: live_creativename_offer_client_isp_date_domain (e.g. live_lbh03_liz_tp_gmail_20260708_powerrefinance).' },
      { q: 'What tags are mandatory in Maropost email footers?', a: 'The Address Tag {{campaign.address}} and an Unsubscribe Tag are strictly mandatory. Footers cannot be saved or used without them.' },
      { q: 'How do I upload contacts into a Maropost list?', a: 'Go to CDP -> Contact Lists -> select list -> click Import Contacts -> upload CSV -> map columns (Email, Firstname, Lastname, Country).' },
      { q: 'Where do I check failed API calls in Maropost?', a: 'Navigate to Analytics -> Log Inspector to review details of failed API requests and errors.' },
      { q: 'What performance benchmarks are required before launch?', a: 'Delivery Rate > 98%, Open Rate (OR) > 1%, and Spam Rate < 0.02%.' }
    ]
  }
];
