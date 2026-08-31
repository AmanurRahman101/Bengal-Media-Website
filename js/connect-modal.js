/**
 * Bengal Press & Media World Ltd — Connect Drawer & Division Modals
 * Inspired by Transcom BD minimal, elite corporate interaction patterns
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Connect Drawer Elements
  const connectTriggers = document.querySelectorAll('.trigger-connect');
  const connectDrawer = document.getElementById('connectDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerTabBtns = document.querySelectorAll('.drawer-tab-btn');
  const drawerForm = document.getElementById('drawerInquiryForm');

  function openConnectDrawer() {
    if (connectDrawer && drawerBackdrop) {
      connectDrawer.classList.add('open');
      drawerBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeConnectDrawer() {
    if (connectDrawer && drawerBackdrop) {
      connectDrawer.classList.remove('open');
      drawerBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  connectTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openConnectDrawer();
    });
  });

  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeConnectDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeConnectDrawer);

  // Switch Inquiry Tabs inside Drawer
  if (drawerTabBtns.length) {
    drawerTabBtns.forEach(tab => {
      tab.addEventListener('click', () => {
        drawerTabBtns.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const tabType = tab.getAttribute('data-tab');
        const subjectInput = document.getElementById('drawerSubject');
        const notesPlaceholder = document.getElementById('drawerNotes');

        if (tabType === 'editorial') {
          if (subjectInput) subjectInput.value = 'Confidential News Tip / Editorial Pitch';
          if (notesPlaceholder) notesPlaceholder.placeholder = 'Provide details, evidence, or background context (encrypted transmission)...';
        } else if (tabType === 'advertising') {
          if (subjectInput) subjectInput.value = 'Print & Digital Advertising Campaign';
          if (notesPlaceholder) notesPlaceholder.placeholder = 'Describe your target audience, campaign duration, and publication preference...';
        } else if (tabType === 'printing') {
          if (subjectInput) subjectInput.value = 'Commercial High-Speed Web Offset Printing';
          if (notesPlaceholder) notesPlaceholder.placeholder = 'Specify print volume, paper GSM, format (broadsheet/tabloid/magazine), and delivery timeline...';
        } else {
          if (subjectInput) subjectInput.value = 'General Media & Corporate Inquiry';
          if (notesPlaceholder) notesPlaceholder.placeholder = 'How can Bengal Press & Media World assist you?';
        }
      });
    });
  }

  // Drawer Form submission
  if (drawerForm) {
    drawerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = drawerForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Transmitting to Corporate Desk...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Thank you. Your inquiry has been encrypted and received by Bengal Press & Media World corporate desk.\nReference ID: BPMW-' + Math.floor(100000 + Math.random() * 900000) + '\nOur secretariat will review and respond within 24 hours.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        drawerForm.reset();
        closeConnectDrawer();
      }, 900);
    });
  }

  // 2. Division Details Modal Popup
  const divisionModal = document.getElementById('divisionModal');
  const divisionModalClose = document.getElementById('divisionModalClose');
  const divisionExploreBtns = document.querySelectorAll('.division-explore-btn');

  const divisionData = {
    'daily-bengal': {
      title: 'Daily Bengal (দৈনিক বেঙ্গল)',
      badge: 'Flagship National Broadsheet',
      img: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?q=80&w=1200&auto=format&fit=crop',
      desc: 'Bangladesh’s most respected and widely circulated morning broadsheet. Renowned for fearless investigative journalism, uncompromising editorial independence, deep economic analysis, and trusted regional coverage across all 64 districts.',
      specs: {
        'Daily Circulation': '450,000+ Verified Broadsheets',
        'Print Format': 'Standard Broadsheet (8-16 Full Color Pages)',
        'Circulation Delivery': 'Dispatched nationwide before 5:30 AM daily',
        'Key Weekly Pullouts': 'Economy & Industry, Tech World, Bengal Sahitya, Youth Voice'
      }
    },
    'bengal-herald': {
      title: 'The Bengal Herald',
      badge: 'English Broadsheet & Diplomatic Edition',
      img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop',
      desc: 'The nation’s authoritative voice in English journalism, favored by diplomats, foreign trade chambers, policymakers, and corporate institutions. Provides incisive geopolitical columns, macroeconomic briefs, and global news syndication.',
      specs: {
        'Daily Circulation': '85,000 Broadsheet + Global Digital Syndication',
        'Language': 'English (Broadsheet & Global Digital Edition)',
        'Distribution': 'Embassies, International Airports, Corporate HQs, Universities',
        'International Wire Syndication': 'Direct partnerships with leading global news syndicates'
      }
    },
    'bengal-digital': {
      title: 'Bengal Digital (24/7 Multimedia Newsroom)',
      badge: 'Real-Time Breaking Digital Portal',
      img: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1200&auto=format&fit=crop',
      desc: 'A state-of-the-art digital media ecosystem reaching over 42 million active monthly readers worldwide. Delivers continuous live reporting, interactive investigative graphics, real-time video coverage, verified fact-checking, and regional mobile alerts.',
      specs: {
        'Monthly Pageviews': '42,000,000+ Unique Readers',
        'Global Diaspora Reach': '138 Countries (USA, UK, Middle East, Europe, ASEAN)',
        'Multimedia Output': 'Live Video Streaming, Fact Check Desk, Micro-Bulletins',
        'Infrastructure': 'High-availability multi-CDN edge delivery architecture'
      }
    },
    'commercial-press': {
      title: 'Bengal Commercial Web Offset & High-Capacity Press',
      badge: 'Industrial Printing Facility',
      img: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?q=80&w=1200&auto=format&fit=crop',
      desc: 'The largest coldset and heatset industrial printing installation in South Asia. Houses high-velocity Goss Community and Heidelberg web presses capable of producing 180,000 full-color impressions per hour with automated robotic folding.',
      specs: {
        'Production Velocity': '180,000 Copies / Hour Peak Output',
        'Press Fleet': 'Goss Urbanite Coldset Web, Heidelberg Speedmaster',
        'Sustainability': '100% Non-toxic vegetable soy inks, FSC Certified Paper',
        'Plant Location': 'Gazipur Mega Industrial Media Park (120,000 sq ft)'
      }
    },
    'bengal-business-review': {
      title: 'Bengal Business Review',
      badge: 'Weekly Financial & Macroeconomic Journal',
      img: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop',
      desc: 'The definitive macroeconomic journal documenting Bangladesh’s industrial evolution, financial markets, textile manufacturing, banking governance, and startup landscape with rigorous investigative audits.',
      specs: {
        'Frequency': 'Weekly Print & Daily Premium Executive Briefing',
        'Target Audience': 'CEOs, Fund Managers, Ministers, Policy Economists',
        'Readership': '120,000 Corporate Decision Makers',
        'Annual Special': 'The Bengal 500 Corporate Leadership Index'
      }
    },
    'protiddhoni-media-labs': {
      title: 'Protiddhoni Media Labs & Broadcasting',
      badge: 'Documentary & Audio-Visual Journalism',
      img: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?q=80&w=1200&auto=format&fit=crop',
      desc: 'The investigative film and audio arm of Bengal Press & Media World Ltd. Produces deeply researched documentary films, human interest chronicles, investigative audio podcasts, and visual journalism exploring environmental and social themes.',
      specs: {
        'Production': '4K HDR Long-form Documentaries & Audio Series',
        'Awards': 'South Asian Investigative Film Award 2024, 2025',
        'Syndication': 'Licensed to global educational networks & streamers',
        'Studio Facilities': 'Acoustic Dolby-certified audio and video broadcast bays'
      }
    }
  };

  function openDivisionModal(divId) {
    const data = divisionData[divId];
    if (!data || !divisionModal) return;

    document.getElementById('modalDivisionImg').src = data.img;
    document.getElementById('modalDivisionBadge').textContent = data.badge;
    document.getElementById('modalDivisionTitle').textContent = data.title;
    document.getElementById('modalDivisionDesc').textContent = data.desc;

    const specsContainer = document.getElementById('modalDivisionSpecs');
    specsContainer.innerHTML = '';
    for (const [key, val] of Object.entries(data.specs)) {
      const item = document.createElement('div');
      item.className = 'spec-item';
      item.innerHTML = `<h6>${key}</h6><p>${val}</p>`;
      specsContainer.appendChild(item);
    }

    divisionModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDivisionModal() {
    if (divisionModal) {
      divisionModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  divisionExploreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const divId = btn.getAttribute('data-division');
      openDivisionModal(divId);
    });
  });

  if (divisionModalClose) divisionModalClose.addEventListener('click', closeDivisionModal);
  if (divisionModal) {
    divisionModal.addEventListener('click', (e) => {
      if (e.target === divisionModal) closeDivisionModal();
    });
  }

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeConnectDrawer();
      closeDivisionModal();
    }
  });
});
