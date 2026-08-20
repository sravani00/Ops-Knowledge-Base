export const announcements = [
  {
    id: 1,
    title: 'Gmail & Yahoo Sender Policy Mandate Updated',
    category: 'Deliverability Alert',
    date: '2026-08-01',
    author: 'Alex Rivera (Lead Deliverability)',
    summary: 'All sending domains must strictly maintain DMARC p=quarantine or p=reject and keep complaint rates below 0.1%. Check the Domain Auth SOP.',
    badge: 'Urgent',
    badgeColor: 'rose'
  },
  {
    id: 2,
    title: 'Ongage Multi-Vendor SMTP Failover Routing Live',
    category: 'System Release',
    date: '2026-07-28',
    author: 'Robert Chen (Infra)',
    summary: 'Automatic failover between Netcore and Maropost is now enabled for all high-volume promotional lists in Ongage.',
    badge: 'New Feature',
    badgeColor: 'emerald'
  },
  {
    id: 3,
    title: 'Updated Daily Operations Checklist SOP v1.2 Released',
    category: 'Process Update',
    date: '2026-07-20',
    author: 'Sarah Jenkins (Ops Manager)',
    summary: 'Mandatory shift handover checklist step added to daily operational guidelines.',
    badge: 'SOP Update',
    badgeColor: 'blue'
  }
];

export const popularDocs = [
  { id: 'esp-ongage', title: 'Ongage Campaign Setup & Multi-Vendor Guide', category: 'ESP Doc', views: '2,420 views', path: '/esp/ongage' },
  { id: 'sop-campaign-execution', title: 'Campaign Execution SOP (v2.1)', category: 'SOP', views: '1,890 views', path: '/sops/campaign-execution' },
  { id: 'tb-001', title: 'Gmail 550 5.7.1 Rate Limit Resolution', category: 'Troubleshooting', views: '1,640 views', path: '/troubleshooting' },
  { id: 'esp-netcore', title: 'Netcore Raman AI & STO Guide', category: 'ESP Doc', views: '1,410 views', path: '/esp/netcore' },
  { id: 'qa-pre-send', title: 'Pre-Send Master QA Checklist', category: 'QA Center', views: '1,280 views', path: '/qa' },
  { id: 'sop-domain-auth', title: 'Domain Authentication (SPF/DKIM/DMARC)', category: 'SOP', views: '1,150 views', path: '/sops/domain-authentication' }
];

export const recentlyUpdatedDocs = [
  { id: 'sop-suppression-process', title: 'Suppression List Management SOP', updated: '2 days ago', author: 'Marcus Vance' },
  { id: 'tb-002', title: 'SPF 10 DNS Lookup Limit Flattening Guide', updated: '3 days ago', author: 'Robert Chen' },
  { id: 'esp-maropost', title: 'Maropost Marketing Cloud Guide', updated: '5 days ago', author: 'David Kim' },
  { id: 'sop-preflight-qa', title: 'Pre-Send Preflight QA Checklist SOP', updated: '1 week ago', author: 'Alex Rivera' }
];

export const quickLinks = [
  { title: 'Pre-Send QA Checklist', icon: 'CheckSquare', path: '/qa', color: 'emerald' },
  { title: 'Interactive Diagnostic Wizard', icon: 'HelpCircle', path: '/troubleshooting', color: 'blue' },
  { title: 'Training Quiz Platform', icon: 'GraduationCap', path: '/training', color: 'purple' }
];
